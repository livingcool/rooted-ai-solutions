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
            <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center">
                <div className="w-20 h-20 bg-green-500 border-4 border-[#240747] rounded-3xl flex items-center justify-center text-[#240747] shadow-[6px_6px_0_#240747]">
                    <Upload className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-3xl font-black text-[#240747]">Mission Initialized!</h3>
                    <p className="text-[#240747]/60 max-w-md mx-auto font-medium">
                        Your application has been logged in our tactical database. 
                    </p>
                </div>
                <div className="bg-white border-4 border-[#240747] p-8 rounded-3xl w-full max-w-md shadow-[10px_10px_0_#240747]">
                    <p className="text-[0.6rem] font-black text-[#F6851B] uppercase tracking-widest mb-3">Application Identifier</p>
                    <div className="bg-[#F9EFE9] p-4 border-2 border-[#240747] rounded-xl">
                        <span className="text-xl font-black text-[#240747] select-all break-all">
                            {applicationId}
                        </span>
                    </div>
                    <p className="text-xs font-bold text-[#240747]/40 mt-6 uppercase tracking-widest">
                        Reference this ID in all secure comms.
                    </p>
                </div>
                <button
                    className="nb-btn nb-btn-ghost py-3 px-8"
                    onClick={() => setApplicationId(null)}
                >
                    Submit New Brief
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#240747] uppercase tracking-tight">Deploy Application</h3>
                <p className="text-sm font-medium text-[#240747]/60">Target Role: <span className="text-[#F6851B] font-bold">{jobTitle}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Full Name *</Label>
                    <Input
                        id="fullName"
                        required
                        className="bg-white border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus-visible:ring-4 focus-visible:ring-[#F6851B]/20 shadow-[4px_4px_0_#240747]"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="email" className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        className="bg-white border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus-visible:ring-4 focus-visible:ring-[#F6851B]/20 shadow-[4px_4px_0_#240747]"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label htmlFor="phone" className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Phone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        className="bg-white border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus-visible:ring-4 focus-visible:ring-[#F6851B]/20 shadow-[4px_4px_0_#240747]"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="portfolio" className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Portfolio URL</Label>
                    <Input
                        id="portfolio"
                        type="url"
                        className="bg-white border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus-visible:ring-4 focus-visible:ring-[#F6851B]/20 shadow-[4px_4px_0_#240747]"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Label htmlFor="resume" className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Resume (PDF/DOCX) *</Label>
                <div className="flex items-center gap-6">
                    <button
                        type="button"
                        className="nb-btn nb-btn-ghost py-3 px-6 h-auto text-xs"
                        onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        {file ? "Change File" : "Upload Resume"}
                    </button>
                    <span className="text-[0.7rem] font-mono font-bold text-[#240747]/40 truncate max-w-[200px]">
                        {file ? file.name : "NO FILE ATTACHED"}
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

            <div className="space-y-3">
                <Label htmlFor="coverLetter" className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Mission Cover Letter</Label>
                <Textarea
                    id="coverLetter"
                    className="bg-white border-2 border-[#240747] p-4 min-h-[140px] rounded-xl font-bold focus-visible:ring-4 focus-visible:ring-[#F6851B]/20 shadow-[4px_4px_0_#240747]"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Describe your tactical advantage..."
                />
            </div>

            <button
                type="submit"
                className="w-full nb-btn nb-btn-primary h-16 text-xl"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        BROADCASTING...
                    </>
                ) : (
                    "SUBMIT APPLICATION"
                )}
            </button>
        </form>
    );
};
