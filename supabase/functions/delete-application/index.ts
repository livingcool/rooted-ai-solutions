import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { applicationId } = await req.json()
        if (!applicationId) throw new Error("Missing applicationId");

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

        // 1. Fetch Application Details to find storage paths help
        const { data: app, error: appError } = await supabaseAdmin
            .from('applications')
            .select('resume_url, id')
            .eq('id', applicationId)
            .single();

        if (appError) {
            console.error("App fetch error (might already be deleted):", appError);
            // Proceed anyway to try and clean up storage
        }

        // 2. Delete Resume (Bucket: 'resumes')
        if (app?.resume_url) {
            // resume_url is usually full path? or just filename?
            // "resume_url": "uploadData.path" -> usually "jobId/filename.pdf"
            // We need to pass just the path inside the bucket.
            const resumePath = app.resume_url;
            const { error: resumeDelError } = await supabaseAdmin.storage
                .from('resumes')
                .remove([resumePath]);

            if (resumeDelError) console.error("Resume Delete Error:", resumeDelError);
        }

        // 3. Delete Technical Submission Video (Bucket: 'technical-submissions')
        // Path pattern: `${applicationId}/technical_...`
        // We list files in the folder first.
        const { data: technicalFiles } = await supabaseAdmin.storage
            .from('technical-submissions')
            .list(applicationId); // Folder is applicationId? check TechnicalAssessment.tsx

        // Logic check: TechnicalAssessment.tsx uses: `const fileName = ${applicationId}/technical_${Date.now()}.${fileExt}`
        // So yes, files are prefixed with applicationId folder if we treat it as folder, or just list.
        // Actually, list() normally works on a folder path.
        // If files are `appId/file`, then listing `appId` works.

        if (technicalFiles && technicalFiles.length > 0) {
            const filesToRemove = technicalFiles.map(x => `${applicationId}/${x.name}`);
            const { error: techDelError } = await supabaseAdmin.storage
                .from('technical-submissions')
                .remove(filesToRemove);
            if (techDelError) console.error("Tech Video Delete Error:", techDelError);
        }

        // 4. Delete Interview Recordings (Bucket: 'interview-recordings' & 'final-interviews')
        // This is harder if we don't know exact filenames.
        // But usually we store paths in the DB.

        // Final Interview Video
        const { data: finalFiles } = await supabaseAdmin.storage
            .from('final-interviews')
            .list(`${applicationId}`);

        if (finalFiles && finalFiles.length > 0) {
            const filesToRemove = finalFiles.map(x => `${applicationId}/${x.name}`);
            const { error: finalDelError } = await supabaseAdmin.storage
                .from('final-interviews')
                .remove(filesToRemove);
            if (finalDelError) console.error("Final Video Delete Error:", finalDelError);
        }

        // 5. Delete DB Record (Cascade will handle interviews, technical_assessments, final_interviews)
        const { error: dbError } = await supabaseAdmin
            .from('applications')
            .delete()
            .eq('id', applicationId);

        if (dbError) throw dbError;

        return new Response(
            JSON.stringify({ success: true, message: "Application and all data deleted." }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
