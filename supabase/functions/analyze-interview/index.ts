// analyze-interview-communication.ts
/**
 * Analyze interview (communication-focused)
 * - Same robust infra as before (retries, signed URL TTL 300s, idempotency, outbox)
 * - Prompt and JSON output tailored to communication assessment (non-technical)
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function envOrThrow(k: string): string {
    const v = Deno.env.get(k);
    if (!v) throw new Error(`Missing env var: ${k}`);
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
    const successSubject = `Congratulations! You've moved to the Technical Round`;
    const successBody = `Dear ${candidateName},

Great job on your communication assessment! You scored ${score}/100.

We are excited to invite you to the **Technical Assessment Round**.
Please log in to your dashboard to view the technical problem statement and submit your solution.

Best,
RootedAI Recruiting Team`;

    const rejectSubject = `Update on your application for ${jobTitle}`;
    const rejectBody = `Dear ${candidateName},

Thank you for completing the communication assessment. Unfortunately, your score (${score}/100) did not meet our threshold for this specific role.

We appreciate your time and wish you success in your future endeavors.

Best,
RootedAI Recruiting Team`;

    return { successSubject, successBody, rejectSubject, rejectBody };
}

serve(async (req) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
    if (req.method !== "POST") return new Response("Method Not Allowed", { headers: CORS_HEADERS, status: 405 });

    let supabaseUrl: string;
    let supabaseKey: string;
    let groqKey: string;
    try {
        supabaseUrl = envOrThrow("SUPABASE_URL");
        supabaseKey = envOrThrow("SUPABASE_SERVICE_ROLE_KEY");
        groqKey = envOrThrow("GROQ_API_KEY");
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" }, status: 500 });
    }

    const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseKey);

    try {
        const body = await req.json();
        const { interviewId, audioUrl, question } = body ?? {};

        // Diagnostic logging
        console.log("analyze-interview received body:", JSON.stringify(body));
        console.log("Extracted fields:", { interviewId, audioUrl, question });

        if (!interviewId || !audioUrl || !question) {
            console.error("Missing fields error:", { interviewId: !!interviewId, audioUrl: !!audioUrl, question: !!question });
            return new Response(JSON.stringify({ error: "Missing required fields: interviewId, audioUrl, question" }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" }, status: 400 });
        }

        // Fetch interview context & idempotency
        const { data: interviewData, error: interviewError } = await supabaseAdmin
            .from("interviews")
            .select("id, status, application_id, applications(full_name, email, jobs(title, description))")
            .eq("id", interviewId)
            .single();

        if (interviewError || !interviewData) throw new Error("Failed to fetch interview context");
        if (["Analyzed", "Requires Review"].includes(interviewData.status)) {
            return new Response(JSON.stringify({ success: true, note: `Already processed (status=${interviewData.status})` }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
        }

        const jobTitle = interviewData.applications?.jobs?.title ?? "Generic Role";
        const jobDesc = String(interviewData.applications?.jobs?.description ?? "").slice(0, 800);
        const candidateName = interviewData.applications?.full_name ?? "Candidate";
        const candidateEmail = interviewData.applications?.email ?? null;

        // Normalize audioPath
        let audioPath = String(audioUrl);
        if (audioPath.startsWith("interview-recordings/")) audioPath = audioPath.slice("interview-recordings/".length);
        if (audioPath.startsWith("/")) audioPath = audioPath.slice(1);

        // Download audio (signed URL TTL 300s with retry, fallback to direct download)
        let audioBlob: Blob | undefined;
        try {
            audioBlob = await retry(async () => {
                const TTL = 300;
                const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin
                    .storage
                    .from("interview-recordings")
                    .createSignedUrl(audioPath, TTL);

                if (signedUrlError || !signedUrlData?.signedUrl) throw signedUrlError ?? new Error("Signed URL creation failed");
                const res = await fetch(signedUrlData.signedUrl);
                if (!res.ok) throw new Error(`Signed URL fetch failed: ${res.status}`);
                const blob = await res.blob();
                if (!blob || blob.size === 0) throw new Error("Signed URL returned empty blob");
                return blob;
            }, 3, 400, (err, attempt) => console.warn(`Signed URL attempt ${attempt} failed:`, err));
        } catch (e) {
            const { data, error } = await supabaseAdmin.storage.from("interview-recordings").download(audioPath);
            if (error || !data) throw new Error(`Audio download fallback failed: ${error?.message ?? "no data"}`);
            audioBlob = data;
        }

        if (!audioBlob || audioBlob.size === 0) throw new Error("Downloaded audio is empty");

        // Transcribe (Groq Whisper) with retry
        const transcription = await retry(async () => {
            const form = new FormData();
            form.append("file", audioBlob as Blob, "audio.webm");
            form.append("model", "whisper-large-v3");

            const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
                method: "POST",
                headers: { Authorization: `Bearer ${groqKey}` },
                body: form,
            });
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Transcription failed: ${res.status} ${txt}`);
            }
            const json = await res.json();
            const txt = String(json.text ?? "").trim();
            if (!txt) throw new Error("Transcription empty");
            return txt;
        }, 3, 500, (err, attempt) => console.warn(`Transcription attempt ${attempt} failed:`, err));

        // COMMUNICATION-Focused Prompt (concise, token-efficient)
        // Ask for JSON only including: score (0-100), communication_score (0-100), strengths[], weaknesses[], feedback (<=100 words)
        const promptParts = [
            `You are an expert COMMUNICATION assessor. Score the candidate's spoken answer on: clarity, structure, relevance, brevity, grammar/readability, confidence, comprehension.`,
            `Job context (for role-fit only): "${jobTitle}" - "${jobDesc}..."`,
            `Question asked: "${String(question).slice(0, 200)}"`,
            `Candidate's transcribed answer: "${transcription.slice(0, 2000)}"`,
            `Output ONLY valid JSON with keys:`,
            `  "score": 0-100,             // overall match to communication expectations`,
            `  "communication_score": 0-100, // communication-specific score (clarity, structure, grammar, confidence)`,
            `  "strengths": ["short strings"],`,
            `  "weaknesses": ["short strings"],`,
            `  "feedback": "short summary under 100 words"`,
            `Return JSON only.`,
        ];
        const prompt = promptParts.join("\n");

        // Call Groq chat (deterministic, low creativity)
        const aiData = await retry(async () => {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: { Authorization: `Bearer ${groqKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "qwen/qwen3-32b",
                    messages: [
                        { role: "system", content: "You are a concise assistant that MUST output JSON only." },
                        { role: "user", content: prompt },
                    ],
                    temperature: 0.1,
                    max_tokens: 500,
                    response_format: { type: "json_object" },
                }),
            });
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Groq analysis failed: ${res.status} ${txt}`);
            }
            return await res.json();
        }, 3, 500, (err, attempt) => console.warn(`Groq attempt ${attempt} failed:`, err));

        // log usage if present (best-effort)
        if (aiData.usage) {
            try {
                const u = aiData.usage;
                await supabaseAdmin.from("ai_usage_logs").insert({
                    provider: "groq",
                    model: "qwen/qwen3-32b",
                    input_tokens: u.prompt_tokens ?? 0,
                    output_tokens: u.completion_tokens ?? 0,
                    total_tokens: u.total_tokens ?? 0,
                    function_name: "analyze-interview-comm",
                    status: "success",
                });
            } catch (e) {
                console.warn("AI usage log failed:", e);
            }
        }

        // Parse returned JSON robustly
        let content: any = {};
        try {
            const raw = aiData.choices?.[0]?.message?.content;
            content = typeof raw === "string" ? JSON.parse(raw) : raw ?? {};
        } catch (e) {
            console.warn("Failed to parse AI JSON:", e);
            content = {};
        }

        // Normalize fields
        const overallScore = Number.isFinite(Number(content.score)) ? Number(content.score) : -1;
        const commScore = Number.isFinite(Number(content.communication_score)) ? Number(content.communication_score) : -1;
        const strengths = Array.isArray(content.strengths) ? content.strengths.slice(0, 10).map(String) : [];
        const weaknesses = Array.isArray(content.weaknesses) ? content.weaknesses.slice(0, 10).map(String) : [];
        const feedback = String(content.feedback ?? "").slice(0, 1000);

        // Decide status
        // Update interview record with AI analysis (NO auto-status change to Technical/Rejected)
        // Admin will review ALL interviews and decide manually

        const { error: updateError } = await supabaseAdmin
            .from("interviews")
            .update({
                transcription: transcription,
                ai_score: Number.isFinite(overallScore) && overallScore >= 0 ? overallScore : null,
                ai_feedback: feedback || null,
                ai_strengths: strengths.length ? strengths : null,
                ai_weaknesses: weaknesses.length ? weaknesses : null,
                communication_score: Number.isFinite(commScore) && commScore >= 0 ? commScore : null,
                status: "Analyzed",
            })
            .eq("id", interviewId);

        if (updateError) throw updateError;

        // Calculate average communication score across ALL interviews for this application
        const { data: allInterviews, error: fetchAllError } = await supabaseAdmin
            .from("interviews")
            .select("communication_score, status")
            .eq("application_id", interviewData.application_id);

        if (!fetchAllError && allInterviews && allInterviews.length > 0) {
            const analyzedInterviews = allInterviews.filter(i => i.status === "Analyzed" && Number.isFinite(i.communication_score));

            if (analyzedInterviews.length > 0) {
                const avgScore = analyzedInterviews.reduce((sum, i) => sum + (i.communication_score || 0), 0) / analyzedInterviews.length;

                // Store average in applications table (for admin review)
                try {
                    await supabaseAdmin
                        .from("applications")
                        .update({
                            communication_average_score: Math.round(avgScore)
                            // Status stays "Communication Round" - admin will change it
                        })
                        .eq("id", interviewData.application_id);
                } catch (e) {
                    console.warn("Failed to update average score:", e);
                }
            }
        }

        return new Response(JSON.stringify({
            success: true,
            interviewId,
            score: Number.isFinite(overallScore) && overallScore >= 0 ? overallScore : null,
            communication_score: Number.isFinite(commScore) && commScore >= 0 ? commScore : null,
            strengths,
            weaknesses,
            feedback,
            note: "Interview analyzed. Admin will review all responses and decide."
        }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });

    } catch (error) {
        console.error("analyze-interview-comm error:", error);
        return new Response(JSON.stringify({ error: String(error?.message ?? error) }), { headers: { ...CORS_HEADERS, "Content-Type": "application/json" }, status: 400 });
    }
});
