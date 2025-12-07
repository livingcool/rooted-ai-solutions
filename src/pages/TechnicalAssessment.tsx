import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TechnicalAssessment = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [application, setApplication] = useState<any>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        githubUrl: "",
        issuesFaced: "",
        techStack: "",
        processFlow: "",
        costAnalysis: ""
    });

    // Get ID from session
    const applicationId = sessionStorage.getItem('candidateId');

    useEffect(() => {
        if (!applicationId) {
            navigate('/candidate-login');
            return;
        }
        fetchApplication();
    }, [applicationId]);

    const fetchApplication = async () => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('*, jobs(title, technical_problem_statement)')
                .eq('id', applicationId)
                .single();

            if (error) throw error;
            setApplication(data);
        } catch (error) {
            console.error("Error fetching application:", error);
            toast({
                title: "Error",
                description: "Failed to load assessment details.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let videoUrl = "";

            // Upload Video if present
            if (videoFile) {
                const fileExt = videoFile.name.split('.').pop();
                const fileName = `${applicationId}/technical_${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('technical-submissions')
                    .upload(fileName, videoFile);

                if (uploadError) throw uploadError;
                videoUrl = fileName;
            }

            // Save to Database
            const { error: dbError } = await supabase
                .from('technical_assessments')
                .insert({
                    application_id: applicationId,
                    video_url: videoUrl,
                    github_url: formData.githubUrl,
                    issues_faced: formData.issuesFaced,
                    tech_stack: formData.techStack,
                    process_flow: formData.processFlow,
                    cost_analysis: formData.costAnalysis,
                    status: 'Submitted'
                });

            if (dbError) throw dbError;

            // Trigger AI Analysis
            supabase.functions.invoke('analyze-technical-submission', {
                body: { applicationId }
            }).then(({ error }) => {
                if (error) console.error("Error triggering AI analysis:", error);
            });

            // Update Application Status
            await supabase.from('applications').update({ status: 'Technical Round Completed' }).eq('id', applicationId);

            toast({
                title: "Assessment Submitted",
                description: "Your technical assessment has been submitted successfully.",
            });

            navigate('/'); // Or success page

        } catch (error: any) {
            console.error("Error submitting assessment:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to submit assessment.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!application) return null;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="z-10 w-full max-w-3xl space-y-8 py-12">
                <div className="text-center space-y-2">
                    <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs tracking-widest uppercase text-white/60 mb-4">
                        Technical Assessment
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">{application.jobs?.title} Challenge</h1>
                </div>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Problem Statement</CardTitle>
                        <CardDescription className="text-white/60">
                            {application.jobs?.technical_problem_statement || "No problem statement available."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* GitHub URL */}
                            <div className="space-y-2">
                                <Label htmlFor="githubUrl">GitHub Repository URL</Label>
                                <div className="relative">
                                    <Github className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                    <Input
                                        id="githubUrl"
                                        placeholder="https://github.com/username/repo"
                                        className="pl-10 bg-white/5 border-white/10 text-white"
                                        value={formData.githubUrl}
                                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Video Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="video">Demo Video (Optional)</Label>
                                <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        id="video"
                                        accept="video/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                    />
                                    <Upload className="mx-auto h-8 w-8 text-white/40 mb-2" />
                                    <p className="text-sm text-white/60">
                                        {videoFile ? videoFile.name : "Click to upload demo video"}
                                    </p>
                                </div>
                            </div>

                            {/* Text Areas */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="techStack">Tech Stack Used</Label>
                                    <Textarea
                                        id="techStack"
                                        placeholder="React, Supabase, Tailwind..."
                                        className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                        value={formData.techStack}
                                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="processFlow">Process Flow</Label>
                                    <Textarea
                                        id="processFlow"
                                        placeholder="Explain your architectural decisions..."
                                        className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                        value={formData.processFlow}
                                        onChange={(e) => setFormData({ ...formData, processFlow: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="issuesFaced">Issues Faced</Label>
                                    <Textarea
                                        id="issuesFaced"
                                        placeholder="Challenges encountered and how you solved them..."
                                        className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                        value={formData.issuesFaced}
                                        onChange={(e) => setFormData({ ...formData, issuesFaced: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="costAnalysis">Cost Analysis (Optional)</Label>
                                    <Textarea
                                        id="costAnalysis"
                                        placeholder="Estimated infrastructure costs..."
                                        className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                        value={formData.costAnalysis}
                                        onChange={(e) => setFormData({ ...formData, costAnalysis: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-white text-black hover:bg-white/90" disabled={submitting}>
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Assessment"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TechnicalAssessment;
