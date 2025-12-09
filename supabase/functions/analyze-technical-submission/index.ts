// analyze-technical-submission-optimized.ts
/**
 * Optimized analyze-technical-submission handler
 * - Signed URL TTL 300s + fallback
 * - Retries with backoff
 * - Idempotency (skip if already analyzed)
 * - Pass frame URLs as text (avoid deprecated vision model)
 * - AI prompt trimmed for token efficiency
 * - AI usage logging
 * - Queue email to outbox (async worker sends)
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function envOrThrow(key: string) {
    const v = Deno.env.get(key);
    if (!v) throw new Error(`Missing env var: ${key}`);
    return v;
}

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

async function retry<T>(fn: () => Promise<T>, tries = 3, baseDelay = 300, onRetry?: (err: unknown, attempt: number) => void): Promise<T> {
    let attempt = 0;
    let lastErr: unknown;
    while (attempt < tries) {
        try {
            return await fn();
        } catch (e) {
            lastErr = e;
            attempt++;
            if (onRetry) onRetry(e, attempt);
            const jitter = Math.random() * 100;
            await sleep(baseDelay * 2 ** (attempt - 1) + jitter);
        }
    }
    throw lastErr;
}

function buildEmailTemplates(candidateName: string, jobTitle: string, score: number | null) {
    const successSubject = `Final Round Invitation: AI Founder Interview`;
    const successBody = `Dear ${candidateName},

We are impressed with your technical submission! Your solution demonstrated strong product thinking (Score: ${score}/100), aligning well with the ${jobTitle} role.

Please follow the link on your dashboard to schedule the final interview.

Best regards,
RootedAI Recruiting Team`;

    const rejectSubject = `Update on your application for ${jobTitle}`;
    const rejectBody = `Dear ${candidateName},

Thank you for your technical submission. After a strict review (Score: ${score}/100), we will not be proceeding further for this role at this time.

We appreciate your effort and wish you the best.

Best regards,
RootedAI Recruiting Team`;

    return { successSubject, successBody, rejectSubject, rejectBody };
}

serve(async (req) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
    if (req.method === "GET") {
        return new Response(JSON.stringify({ message: "Service active. POST { applicationId }" }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }
    if (req.method !== "POST") return new Response("Method Not Allowed", { headers: CORS_HEADERS, status: 405 });

    // Validate envs
    let supabaseUrl: string, supabaseKey: string, groqKey: string, frontendUrl: string;
    try {
        supabaseUrl = envOrThrow("SUPABASE_URL");
        supabaseKey = envOrThrow("SUPABASE_SERVICE_ROLE_KEY");
        groqKey = envOrThrow("GROQ_API_KEY");
        frontendUrl = Deno.env.get("FRONTEND_URL") ?? "https://rooted-ai-solutions.vercel.app";
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" }, status: 500 });
    }

    const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseKey);

    try {
        const txt = await req.text();
        if (!txt) throw new Error("Empty request body");
        const body = JSON.parse(txt);
        const { applicationId, frames: inputFrames } = body;
        const frames = Array.isArray(inputFrames) ? inputFrames : [];

        if (!applicationId) throw new Error("Missing applicationId");

        // Fetch latest assessment for this application
        const { data: assessment, error: fetchError } = await supabaseAdmin
            .from("technical_assessments")
            .select("*, applications(full_name, email, jobs(title, description, technical_problem_statement))")
            .eq("application_id", applicationId)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

        if (fetchError) throw new Error(`DB fetch failed: ${fetchError.message}`);
        if (!assessment) throw new Error("Assessment not found");

        // Idempotency: if already Analyzed/Requires Review/Final Interview, skip
        if (["Analyzed", "Requires Review", "Final Interview"].includes(assessment.status)) {
            return new Response(JSON.stringify({ success: true, note: `Already processed (status=${assessment.status})` }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
        }

        const appData = assessment.applications ?? {};
        const jobData = appData.jobs ?? {};
        const problemStatement = jobData.technical_problem_statement ?? "No Problem Statement";
        const jobTitle = jobData.title ?? "Technologist";
        const jobDesc = (jobData.description ?? "").slice(0, 700);
        const candidateName = appData.full_name ?? "Candidate";
        const candidateEmail = appData.email ?? null;
        const apiKey = groqKey;

        // --- Download video (if exists) ---
        let transcription = "No video submitted or transcription failed.";
        if (assessment.video_url) {
            const videoKeyRaw = String(assessment.video_url);
            // Normalize path (strip bucket prefix if present)
            let videoKey = videoKeyRaw.startsWith("technical-submissions/") ? videoKeyRaw.slice("technical-submissions/".length) : videoKeyRaw;
            if (videoKey.startsWith("/")) videoKey = videoKey.slice(1);

            // Try signed URL with TTL 300s then fallback to storage.download
            try {
                const blob = await retry(async () => {
                    const TTL = 300;
                    const { data: signed, error: sErr } = await supabaseAdmin.storage.from("technical-submissions").createSignedUrl(videoKey, TTL);
                    if (sErr || !signed?.signedUrl) throw sErr ?? new Error("signed url failed");
                    const res = await fetch(signed.signedUrl);
                    if (!res.ok) throw new Error(`signed url fetch failed ${res.status}`);
                    const b = await res.blob();
                    if (!b || b.size === 0) throw new Error("signed url returned empty blob");
                    return b;
                }, 3, 400, (err, a) => console.warn(`signed url attempt ${a} failed:`, err));
                // transcribe using Groq Whisper
                const form = new FormData();
                form.append("file", blob as Blob, "video.mp4");
                form.append("model", "whisper-large-v3");
                // trimmed: rely on quick transcription (video 1min)
                const transRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${apiKey}` },
                    body: form,
                });
                if (!transRes.ok) {
                    const errTxt = await transRes.text().catch(() => "");
                    throw new Error(`transcription failed: ${errTxt}`);
                }
                const transJson = await transRes.json();
                transcription = String(transJson.text ?? "").trim() || "No speech detected";
            } catch (e) {
                console.warn("Video download/transcription failed, trying direct download fallback:", e);
                const { data, error } = await supabaseAdmin.storage.from("technical-submissions").download(videoKey);
                if (error || !data) {
                    transcription = `[Error processing video: ${String(error?.message ?? e?.message ?? e)}]`;
                } else {
                    try {
                        const form = new FormData();
                        form.append("file", data as Blob, "video.mp4");
                        form.append("model", "whisper-large-v3");
                        const transRes2 = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
                            method: "POST",
                            headers: { Authorization: `Bearer ${apiKey}` },
                            body: form,
                        });
                        if (transRes2.ok) {
                            const t = await transRes2.json();
                            transcription = String(t.text ?? "").trim() || "No speech detected";
                        } else {
                            const errTxt = await transRes2.text().catch(() => "");
                            transcription = `[Transcription failed: ${errTxt}]`;
                        }
                    } catch (err2) {
                        transcription = `[Error transcribing fallback: ${String(err2?.message ?? err2)}]`;
                    }
                }
            }
        }

        // --- Build prompt (token-efficient) ---
        // If frames provided, include first few URLs only (they are external resources)
        const MAX_FRAME_URLS = 6;
        const frameUrls = frames.slice(0, MAX_FRAME_URLS).map(String);
        const framesText = frameUrls.length ? `Frame URLs:\n${frameUrls.join("\n")}` : "";

        const submissionSummary = [
            `Problem: ${String(problemStatement).slice(0, 800)}`,
            `GitHub: ${String(assessment.github_url ?? "none")}`,
            `Tech Stack: ${String(assessment.tech_stack ?? "n/a")}`,
            `Process Flow: ${String(assessment.process_flow ?? "").slice(0, 800)}`,
            `Issues Faced: ${String(assessment.issues_faced ?? "").slice(0, 500)}`,
            `Cost Analysis: ${String(assessment.cost_analysis ?? "").slice(0, 300)}`,
            `Video Transcript (trimmed): ${transcription.slice(0, 2000)}`,
            framesText
        ].filter(Boolean).join("\n\n");

        const systemMessage = [
            `You are a Senior Lead Engineer assessing a technical submission for the role "${jobTitle}".`,
            `Be STRICT and practical. Score 0-100 (>=70 passes).`,
            `Focus: correctness, code quality, product thinking, role fit, and deployment feasibility.`,
            `Return ONLY valid JSON: {"score":0-100,"feedback":"<=150 words","improvement_suggestions":"<=50 words"}`
        ].join("\n");

        const userMessage = `SubmissionSummary:\n${submissionSummary}`;

        // --- Call Groq chat (deterministic) ---
        const aiFetch = async () => {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "qwen/qwen3-32b",
                    messages: [
                        { role: "system", content: systemMessage },
                        { role: "user", content: userMessage }
                    ],
                    temperature: 0.05,
                    max_tokens: 600,
                    response_format: { type: "json_object" },
                }),
            });
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Groq API failed: ${res.status} ${txt}`);
            }
            return await res.json();
        };

        const aiData = await retry(aiFetch, 3, 500, (err, attempt) => console.warn(`AI attempt ${attempt} failed:`, err));

        // Log AI usage (best-effort)
        if (aiData.usage) {
            try {
                const u = aiData.usage;
                await supabaseAdmin.from("ai_usage_logs").insert({
                    provider: "groq",
                    model: "qwen/qwen3-32b",
                    input_tokens: u.prompt_tokens ?? 0,
                    output_tokens: u.completion_tokens ?? 0,
                    total_tokens: u.total_tokens ?? 0,
                    function_name: "analyze-technical-submission",
                    status: "success",
                });
            } catch (e) {
                console.warn("AI usage log failed:", e);
            }
        }

        // Parse AI JSON robustly
        let content: any = {};
        try {
            const raw = aiData.choices?.[0]?.message?.content;
            content = typeof raw === "string" ? JSON.parse(raw) : raw ?? {};
        } catch (e) {
            console.warn("Failed to parse AI JSON:", e);
            content = {};
        }

        const score = Number.isFinite(Number(content.score)) ? Number(content.score) : -1;
        const feedback = String(content.feedback ?? "").slice(0, 1500);
        const improvement_suggestions = String(content.improvement_suggestions ?? "").slice(0, 300);

        // Decision logic
        const MIN_SCORE_TECH = 70;
        let newStatus = "Analyzed";
        let shouldQueueEmail = false;
        let emailSubject = "";
        let emailBody = "";

        if (!Number.isFinite(score) || score < 0) {
            newStatus = "Requires Review";
        } else if (score >= MIN_SCORE_TECH) {
            newStatus = "Final Interview";
            shouldQueueEmail = true;

            // Create final interview record (best-effort)
            let token: string | null = null;
            try {
                const { data: finalRound, error: createErr } = await supabaseAdmin
                    .from("final_interviews")
                    .insert({
                        application_id: applicationId,
                        status: "Scheduled",
                        project_questions: { context: `Built solution: ${String(assessment.tech_stack ?? "").slice(0, 200)}`, ai_notes: feedback }
                    })
                    .select("interview_token")
                    .single();
                if (!createErr && finalRound?.interview_token) token = finalRound.interview_token;
            } catch (e) {
                console.warn("Failed to create final_interview record:", e);
            }

            const interviewLink = token ? `${frontendUrl}/final-interview?token=${token}` : `${frontendUrl}/dashboard`;
            const templates = buildEmailTemplates(candidateName, jobTitle, score);
            emailSubject = templates.successSubject;
            emailBody = `${templates.successBody}\n\nStart: ${interviewLink}`;
        } else {
            newStatus = "Rejected";
            shouldQueueEmail = true;
            const templates = buildEmailTemplates(candidateName, jobTitle, score);
            emailSubject = templates.rejectSubject;
            emailBody = templates.rejectBody;
        }

        // Update assessment with AI results (idempotent)
        const { error: updateErr } = await supabaseAdmin
            .from("technical_assessments")
            .update({
                ai_score: Number.isFinite(score) && score >= 0 ? score : null,
                ai_feedback: feedback || null,
                improvement_suggestions: improvement_suggestions || null,
                transcription: transcription || null,
                status: newStatus,
            })
            .eq("id", assessment.id);

        if (updateErr) throw updateErr;

        // Update application status
        try {
            await supabaseAdmin.from("applications").update({ status: newStatus }).eq("id", applicationId);
        } catch (e) {
            console.warn("Failed to update application status:", e);
        }

        // Queue email to outbox table and attempt non-blocking immediate send
        if (shouldQueueEmail && candidateEmail) {
            try {
                await supabaseAdmin.from("outbox").insert({
                    to_email: candidateEmail,
                    subject: emailSubject,
                    body: emailBody,
                    metadata: { assessment_id: assessment.id, score },
                    status: "queued",
                    created_at: new Date().toISOString(),
                });
            } catch (e) {
                console.warn("Failed to enqueue email:", e);
            }

            (async () => {
                try {
                    await fetch(`${supabaseUrl}/functions/v1/send-rejection-email`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${supabaseKey}` },
                        body: JSON.stringify({ email: candidateEmail, subject: emailSubject, body: emailBody }),
                    });
                } catch (e) {
                    console.warn("Immediate-send attempt failed:", e);
                }
            })();
        }

        return new Response(JSON.stringify({ success: true, assessmentId: assessment.id, score: Number.isFinite(score) && score >= 0 ? score : null }), {
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("CRITICAL ERROR in analyze-technical-submission:", err);
        return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
