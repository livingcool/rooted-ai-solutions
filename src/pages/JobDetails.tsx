import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/hiring";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, MapPin, Briefcase, DollarSign } from "lucide-react";
import { JobApplicationForm } from "@/components/hiring/JobApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [isApplyOpen, setIsApplyOpen] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            if (!id) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('jobs' as any)
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching job:", error);
            } else {
                setJob(data as unknown as Job);
            }
            setLoading(false);
        };

        fetchJob();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-4">
                <h1 className="text-2xl font-bold">Job Not Found</h1>
                <Button variant="outline" onClick={() => navigate("/")}>Back to Careers</Button>
            </div>
        );
    }

    // Helper to parse structured content if available, otherwise fallback
    const renderContent = () => {
        // Check if description has sections
        const sections = job.description.split(/(?=About RootedAI:|About the Role:|Key Responsibilities:|What We Offer:)/g).filter(Boolean);

        if (sections.length > 1) {
            return sections.map((section, idx) => {
                const [title, ...content] = section.split(':');
                return (
                    <div key={idx} className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">{title.trim()}</h3>
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{content.join(':').trim()}</p>
                    </div>
                );
            });
        }

        return (
            <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">About the Role</h3>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    className="mb-8 text-white/60 hover:text-white hover:bg-white/5 pl-0"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Careers
                </Button>

                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                            </div>
                            {job.department && (
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="border-white/20 text-white/60">{job.department}</Badge>
                                </div>
                            )}
                            {job.salary_range && (
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{job.salary_range}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                        {renderContent()}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Requirements</h3>
                            <ul className="space-y-2">
                                {job.requirements?.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-white/80">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-8 border-t border-white/10 flex justify-center">
                            <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 text-lg font-bold rounded-full">
                                        Apply for this Position
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-black border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <JobApplicationForm
                                        jobId={job.id}
                                        jobTitle={job.title}
                                        onSuccess={() => setIsApplyOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
