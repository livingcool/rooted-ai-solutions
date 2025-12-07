import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";

interface JobApplicationFormProps {
    jobId: string;
    jobTitle: string;
    onSuccess?: () => void;
}

export const JobApplicationForm = ({ jobId, jobTitle, onSuccess }: JobApplicationFormProps) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        portfolioUrl: "",
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                toast({
                    title: "File too large",
                    description: "Please upload a resume smaller than 5MB.",
                    variant: "destructive",
                });
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: "Resume required",
                description: "Please upload your resume to proceed.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            // 1. Upload Resume
            const fileExt = file.name.split('.').pop();
            const fileName = `${jobId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('resumes')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Submit Application via Edge Function (Handles duplicate check)
            const { data, error } = await supabase.functions.invoke('submit-application', {
                body: {
                    job_id: jobId,
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    resume_url: uploadData.path,
                    cover_letter: formData.coverLetter,
                    portfolio_url: formData.portfolioUrl
                }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            setApplicationId(data.applicationId);

            toast({
                title: "Application Submitted!",
                description: "We have received your application.",
            });

            if (onSuccess) onSuccess();

            // Trigger AI Analysis (Fire and forget)
            supabase.functions.invoke('analyze-application', {
                body: { applicationId: data.applicationId }
            }).then(({ error }) => {
                if (error) console.error('Error triggering AI analysis:', error);
            });

            // Reset form
            setFormData({ fullName: "", email: "", phone: "", coverLetter: "", portfolioUrl: "" });
            setFile(null);

        } catch (error: any) {
            console.error('Error submitting application:', error);
            toast({
                title: "Error",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (applicationId) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-green-500" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                    <p className="text-white/60 max-w-md mx-auto">
                        Thank you for applying. Your application has been successfully submitted.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-lg w-full max-w-md">
                    <p className="text-sm text-white/40 uppercase tracking-widest mb-2">Application ID</p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-xl font-medium text-white select-all">
                            {applicationId}
                        </span>
                    </div>
                    <p className="text-xs text-white/40 mt-4">
                        Please save this ID for future reference.
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/5"
                    onClick={() => setApplicationId(null)}
                >
                    Submit Another Application
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Apply for {jobTitle}</h3>
                <p className="text-sm text-white/60">Please fill out the form below to submit your application.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                    <Input
                        id="fullName"
                        required
                        className="bg-white/5 border-white/10 text-white"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        className="bg-white/5 border-white/10 text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        className="bg-white/5 border-white/10 text-white"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="portfolio" className="text-white">Portfolio URL</Label>
                    <Input
                        id="portfolio"
                        type="url"
                        className="bg-white/5 border-white/10 text-white"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="resume" className="text-white">Resume (PDF/DOCX) *</Label>
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        {file ? "Change File" : "Upload Resume"}
                    </Button>
                    <span className="text-sm text-white/60 truncate max-w-[200px]">
                        {file ? file.name : "No file chosen"}
                    </span>
                    <Input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="coverLetter" className="text-white">Cover Letter</Label>
                <Textarea
                    id="coverLetter"
                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit Application"
                )}
            </Button>
        </form>
    );
};
