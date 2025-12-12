import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { JobApplication } from "@/types/hiring";
import { Loader2, Github, Video, Code, Brain, Globe, FileText, Mic, Send, Sparkles, CheckCircle, XCircle, MoreVertical, MoveRight, Check, X, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getStatusColor } from "@/utils/adminUtils";
import { InterviewInviteDialog } from "./InterviewInviteDialog";
import { TechnicalInviteDialog } from "./TechnicalInviteDialog";
import { Textarea } from "@/components/ui/textarea";

interface CandidateDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedApp: JobApplication | null;
    setSelectedApp: (app: JobApplication | null) => void;
    fetchData: () => void;
}

export const CandidateDetailDialog = ({
    open,
    onOpenChange,
    selectedApp,
    setSelectedApp,
    fetchData
}: CandidateDetailDialogProps) => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("resume");
    const [loading, setLoading] = useState(false);

    // Invite Dialog State
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [deadline, setDeadline] = useState("");

    // Technical Invite Dialog State
    const [isTechnicalInviteOpen, setIsTechnicalInviteOpen] = useState(false);
    const [technicalDeadline, setTechnicalDeadline] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [generatedProjects, setGeneratedProjects] = useState<any[]>([]);
    const [isGeneratingProjects, setIsGeneratingProjects] = useState(false);
    const [customFeedback, setCustomFeedback] = useState("");

    // Reject Dialog State
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [rejectionEmail, setRejectionEmail] = useState({ subject: "", body: "" });
    const [generatingRejection, setGeneratingRejection] = useState(false);

    // Final Invite State
    const [isFinalInviteOpen, setIsFinalInviteOpen] = useState(false);
    const [finalScheduledAt, setFinalScheduledAt] = useState("");

    useEffect(() => {
        if (isTechnicalInviteOpen && selectedApp) {
            const job = (selectedApp as any).jobs;
            if (job && job.technical_problem_statement) {
                setProjectDescription(job.technical_problem_statement);
            } else {
                setProjectDescription("");
            }
        }
    }, [isTechnicalInviteOpen, selectedApp]);

    const handleInvite = async () => {
        if (!selectedApp || !deadline) {
            toast({ title: "Error", description: "Please select an application and set a deadline.", variant: "destructive" });
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('invite-candidate', {
                body: { applicationId: selectedApp.id, deadline },
            });
            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            toast({ title: "Success", description: "Invitation sent successfully!" });
            setIsInviteOpen(false);
            setDeadline("");
            if (selectedApp) setSelectedApp({ ...selectedApp, status: 'Communication Round' });
            fetchData();
        } catch (error: any) {
            console.error("Error sending invitation:", error);
            toast({ title: "Error", description: error.message || "Failed to send invitation.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleTechnicalInvite = async () => {
        if (!selectedApp || !technicalDeadline || !projectDescription) {
            toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('invite-technical', {
                body: {
                    applicationId: selectedApp.id,
                    deadline: technicalDeadline,
                    projectDescription: projectDescription
                },
            });
            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            toast({ title: "Success", description: "Technical assessment invitation sent!" });
            setIsTechnicalInviteOpen(false);
            setTechnicalDeadline("");
            setProjectDescription("");
            if (selectedApp) setSelectedApp({ ...selectedApp, status: 'Technical Round' });
            fetchData();
        } catch (error: any) {
            console.error("Error sending technical invitation:", error);
            toast({ title: "Error", description: error.message || "Failed to send invitation.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleFinalInvite = async () => {
        if (!finalScheduledAt) {
            toast({ title: "Error", description: "Please select a date and time.", variant: "destructive" });
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('invite-final-interview', {
                body: {
                    applicationId: selectedApp?.id,
                    scheduledAt: new Date(finalScheduledAt).toISOString()
                }
            });
            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            toast({ title: "Success", description: "Interview Scheduled & Candidate Invited!" });
            setIsFinalInviteOpen(false);
            if (selectedApp) setSelectedApp({ ...selectedApp, status: 'Final Interview' });
            fetchData();
        } catch (error: any) {
            console.error("Error inviting candidate:", error);
            toast({ title: "Scheduling Failed", description: error.message || "Failed to invite.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleMoveToFinalRound = (applicationId: string) => {
        setIsFinalInviteOpen(true); // Open Dialog instead of direct call
    };

    const handleGenerateProjects = async () => {
        if (!selectedApp) return;
        setIsGeneratingProjects(true);
        try {
            const job = (selectedApp as any).jobs;
            const response = await supabase.functions.invoke('generate-technical-projects', {
                body: {
                    jobTitle: job.title,
                    department: job.department,
                    customFeedback
                }
            });

            if (response.error) throw response.error;
            setGeneratedProjects(response.data.projects || []);
        } catch (error: any) {
            console.error("Error generating projects:", error);
            toast({ title: "Error", description: "Failed to generate projects.", variant: "destructive" });
        } finally {
            setIsGeneratingProjects(false);
        }
    };

    const handleSelectProject = (project: any) => {
        setProjectDescription(
            `Title: ${project.title}\n\nObjective: ${project.description}\n\nKey Requirements:\n${project.requirements.map((r: string) => `- ${r}`).join('\n')}\n\nDeliverables:\n${project.deliverables.map((d: string) => `- ${d}`).join('\n')}`
        );
        setGeneratedProjects([]);
    };

    const handleGenerateRejection = async () => {
        if (!selectedApp) return;
        setGeneratingRejection(true);
        try {
            const { data, error } = await supabase.functions.invoke('generate-rejection-email', {
                body: {
                    candidateName: selectedApp.full_name,
                    reason: rejectionReason,
                    stage: selectedApp.status
                }
            });
            if (error) throw error;
            setRejectionEmail({ subject: data.subject, body: data.body });
        } catch (error: any) {
            console.error("Error generating rejection:", error);
            toast({ title: "Error", description: "Failed to generate email.", variant: "destructive" });
        } finally {
            setGeneratingRejection(false);
        }
    };

    const handleConfirmRejection = async () => {
        if (!selectedApp) return;
        setLoading(true);
        try {
            const { error } = await supabase.functions.invoke('send-rejection-email', {
                body: {
                    email: selectedApp.email,
                    subject: rejectionEmail.subject || "Application Update",
                    body: rejectionEmail.body || "Thank you for applyin..."
                }
            });
            if (error) throw error;

            await supabase
                .from('applications' as any)
                .update({ status: 'Rejected' })
                .eq('id', selectedApp.id);

            toast({ title: "Rejection Sent", description: "Candidate has been notified." });
            setIsRejectOpen(false);
            fetchData();
            setSelectedApp(null);
        } catch (error: any) {
            console.error("Error rejecting:", error);
            toast({ title: "Error", description: "Failed to reject candidate.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    // Status Logic for Stepper
    const getStepStatus = (stepId: string) => {
        if (!selectedApp) return 'Pending';
        const interviews = (selectedApp as any).interviews || [];
        const technicals = (selectedApp as any).technical_assessments || [];

        switch (stepId) {
            case 'resume': return 'Completed';
            case 'communication': return interviews.length > 0 ? 'Completed' : 'Pending';
            case 'technical': return technicals.length > 0 ? 'Completed' : (selectedApp.status === 'Technical Round' ? 'In Progress' : 'Pending');
            case 'final': return selectedApp.status === 'Final Interview' || selectedApp.status === 'Offer Sent' || selectedApp.status === 'Hired' ? 'Completed' : 'Pending';
            default: return 'Pending';
        }
    }


    // Communication Round - Admin Approval Handler
    const handleApproveTechnicalRound = async () => {
        if (!selectedApp) return;
        if (!confirm("Approve candidate for Technical Round?")) return;
        setLoading(true);
        try {
            const candidateName = selectedApp.full_name || "Candidate";
            const jobTitle = (selectedApp as any).jobs?.title || "[Job Title]";
            const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

            await supabase.from('applications').update({ status: 'Technical Round' }).eq('id', selectedApp.id);

            const emailSubject = `🎉 Technical Round Invitation - ${jobTitle}`;
            const emailBody = `<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px}.button{display:inline-block;padding:15px 30px;background:#667eea;color:white;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:bold}.footer{text-align:center;margin-top:30px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>🎉 Congratulations!</h1></div><div class="content"><p>Dear <strong>${candidateName}</strong>,</p><p>Great news! After carefully reviewing your communication assessment, we're impressed with your responses and would like to invite you to the <strong>Technical Round</strong> for the <strong>${jobTitle}</strong> position.</p><p>Your communication skills and personal growth mindset stood out, and we're excited to see your technical capabilities!</p><p style="text-align:center;"><a href="${frontendUrl}/candidate-status" class="button">Access Your Dashboard</a></p><p><strong>Next Steps:</strong></p><ul><li>Click the button above to access your candidate dashboard</li><li>Review the technical problem statement</li><li>Submit your solution via GitHub</li></ul><p>Best of luck with your technical assessment!</p><p>Warm regards,<br><strong>RootedAI Recruiting Team</strong></p></div><div class="footer"><p>This is an automated message from RootedAI Solutions.</p></div></div></body></html>`;

            await supabase.functions.invoke('send-rejection-email', { body: { email: selectedApp.email, subject: emailSubject, body: emailBody } });

            toast({ title: "Success", description: "Candidate approved and email sent!" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleRejectAfterCommunication = async () => {
        if (!selectedApp) return;
        if (!confirm("Reject candidate after communication round?")) return;
        setLoading(true);
        try {
            const candidateName = selectedApp.full_name || "Candidate";
            const jobTitle = (selectedApp as any).jobs?.title || "[Job Title]";

            await supabase.from('applications').update({ status: 'Rejected' }).eq('id', selectedApp.id);

            const emailSubject = `Update on Your Application - ${jobTitle}`;
            const emailBody = `<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:#4a5568;color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px}.footer{text-align:center;margin-top:30px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>Application Update</h1></div><div class="content"><p>Dear <strong>${candidateName}</strong>,</p><p>Thank you for taking the time to complete the communication assessment for the <strong>${jobTitle}</strong> position at RootedAI.</p><p>After careful consideration of all candidates, we have decided to move forward with other applicants whose qualifications more closely match our current needs.</p><p>We genuinely appreciate your interest in RootedAI and the effort you put into your application. We encourage you to apply for future opportunities that match your skills and experience.</p><p>We wish you all the best in your job search and future endeavors.</p><p>Best regards,<br><strong>RootedAI Recruiting Team</strong></p></div><div class="footer"><p>This is an automated message from RootedAI Solutions.</p></div></div></body></html>`;

            await supabase.functions.invoke('send-rejection-email', { body: { email: selectedApp.email, subject: emailSubject, body: emailBody } });

            toast({ title: "Success", description: "Candidate rejected and email sent!" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    // Technical Round - Admin Approval Handler
    const handleApproveFinalInterview = async () => {
        if (!selectedApp) return;
        if (!confirm("Approve candidate for Final Interview?")) return;
        setLoading(true);
        try {
            const candidateName = selectedApp.full_name || "Candidate";
            const jobTitle = (selectedApp as any).jobs?.title || "[Job Title]";
            const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

            await supabase.from('applications').update({ status: 'Final Interview' }).eq('id', selectedApp.id);

            const emailSubject = `🎉 Final Interview Invitation - ${jobTitle}`;
            const emailBody = `<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px}.button{display:inline-block;padding:15px 30px;background:#667eea;color:white;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:bold}.footer{text-align:center;margin-top:30px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>🎉 Excellent Work!</h1></div><div class="content"><p>Dear <strong>${candidateName}</strong>,</p><p>Congratulations! Your technical assessment was impressive, and we would love to invite you to the <strong>Final Interview</strong> for the <strong>${jobTitle}</strong> position.</p><p>This is the last step in our hiring process. We're excited to meet you!</p><p style="text-align:center;"><a href="${frontendUrl}/final-interview-login" class="button">Schedule Your Interview</a></p><p><strong>Next Steps:</strong></p><ul><li>Click the button above to access the scheduling portal</li><li>Choose a convenient time slot</li><li>Complete the final interview</li></ul><p>Looking forward to speaking with you!</p><p>Best regards,<br><strong>RootedAI Recruiting Team</strong></p></div><div class="footer"><p>This is an automated message from RootedAI Solutions.</p></div></div></body></html>`;

            await supabase.functions.invoke('send-rejection-email', { body: { email: selectedApp.email, subject: emailSubject, body: emailBody } });

            toast({ title: "Success", description: "Candidate approved for final interview!" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleRejectAfterTechnical = async () => {
        if (!selectedApp) return;
        if (!confirm("Reject candidate after technical round?")) return;
        setLoading(true);
        try {
            const candidateName = selectedApp.full_name || "Candidate";
            const jobTitle = (selectedApp as any).jobs?.title || "[Job Title]";

            await supabase.from('applications').update({ status: 'Rejected' }).eq('id', selectedApp.id);

            const emailSubject = `Update on Your Application - ${jobTitle}`;
            const emailBody = `<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:#4a5568;color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px}.footer{text-align:center;margin-top:30px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>Application Update</h1></div><div class="content"><p>Dear <strong>${candidateName}</strong>,</p><p>Thank you for completing the technical assessment for the <strong>${jobTitle}</strong> position at RootedAI.</p><p>After careful review of your submission, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.</p><p>We appreciate the time and effort you invested in this process and encourage you to apply for future opportunities that match your skills.</p><p>We wish you the very best in your career.</p><p>Best regards,<br><strong>RootedAI Recruiting Team</strong></p></div><div class="footer"><p>This is an automated message from RootedAI Solutions.</p></div></div></body></html>`;

            await supabase.functions.invoke('send-rejection-email', { body: { email: selectedApp.email, subject: emailSubject, body: emailBody } });

            toast({ title: "Success", description: "Candidate rejected and email sent!" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    // Final Interview - Admin Approval Handler
    const handleMakeOffer = async () => {
        if (!selectedApp) return;
        if (!confirm("Make job offer to this candidate?")) return;
        setLoading(true);
        try {
            const candidateName = selectedApp.full_name || "Candidate";
            const jobTitle = (selectedApp as any).jobs?.title || "[Job Title]";

            await supabase.from('applications').update({ status: 'Offered' }).eq('id', selectedApp.id);

            const emailSubject = `🎊 Job Offer - ${jobTitle} at RootedAI`;
            const emailBody = `<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px}.highlight{background:#d1fae5;padding:20px;border-left:4px solid #10b981;margin:20px 0}.footer{text-align:center;margin-top:30px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>🎊 Congratulations!</h1></div><div class="content"><p>Dear <strong>${candidateName}</strong>,</p><p>We are thrilled to extend an offer for the <strong>${jobTitle}</strong> position at RootedAI Solutions!</p><div class="highlight"><p><strong>What's Next:</strong></p><ul><li>Our HR team will contact you within 24 hours with offer details</li><li>You'll receive the formal offer letter via email</li><li>We'll discuss compensation, benefits, and start date</li></ul></div><p>Your performance throughout the hiring process has been outstanding, and we're excited to have you join our team!</p><p>Welcome to RootedAI! 🚀</p><p>Best regards,<br><strong>RootedAI Recruiting Team</strong></p></div><div class="footer"><p>This is an automated message from RootedAI Solutions.</p></div></div></body></html>`;

            await supabase.functions.invoke('send-rejection-email', { body: { email: selectedApp.email, subject: emailSubject, body: emailBody } });

            toast({ title: "Success", description: "Job offer sent!" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleRejectAfterFinal = async () => {
        if (!selectedApp) return;
        if (!confirm("Reject candidate after final interview?")) return;
        setLoading(true);
        try {
            const candidateName = selectedApp.full_name || "Candidate";
            const jobTitle = (selectedApp as any).jobs?.title || "[Job Title]";

            await supabase.from('applications').update({ status: 'Rejected' }).eq('id', selectedApp.id);

            const emailSubject = `Update on Your Application - ${jobTitle}`;
            const emailBody = `<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:#4a5568;color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9f9f9;padding:30px;border-radius:0 0 10px 10px}.footer{text-align:center;margin-top:30px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>Application Update</h1></div><div class="content"><p>Dear <strong>${candidateName}</strong>,</p><p>Thank you for taking the time to complete the final interview for the <strong>${jobTitle}</strong> position at RootedAI.</p><p>After thorough consideration, we have decided to proceed with another candidate for this role.</p><p>We were impressed by your skills and experience, and we encourage you to apply for future positions that align with your background.</p><p>Thank you again for your interest in RootedAI, and we wish you continued success.</p><p>Best regards,<br><strong>RootedAI Recruiting Team</strong></p></div><div class="footer"><p>This is an automated message from RootedAI Solutions.</p></div></div></body></html>`;

            await supabase.functions.invoke('send-rejection-email', { body: { email: selectedApp.email, subject: emailSubject, body: emailBody } });

            toast({ title: "Success", description: "Candidate rejected!" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const [resumeUrl, setResumeUrl] = useState("");

    useEffect(() => {
        const fetchResumeUrl = async () => {
            if (selectedApp?.resume_url) {
                if (selectedApp.resume_url.startsWith('http')) {
                    setResumeUrl(selectedApp.resume_url);
                } else {
                    const { data, error } = await supabase.storage.from('resumes').createSignedUrl(selectedApp.resume_url, 3600); // 1 hour expiry
                    if (data?.signedUrl) {
                        setResumeUrl(data.signedUrl);
                    } else {
                        console.error("Error creating signed URL:", error);
                    }
                }
            } else {
                setResumeUrl("");
            }
        };
        fetchResumeUrl();
    }, [selectedApp]);


    if (!selectedApp) return null;

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="bg-black border-white/10 text-white max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Candidate Performance Dashboard</DialogTitle>
                        <DialogDescription className="text-white/60">
                            Comprehensive analysis of candidate profile and assessment.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto pr-4 min-h-0">
                        <div className="space-y-8 p-1">
                            {/* Header Section */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold">{selectedApp.full_name}</h3>
                                    <div className="flex items-center gap-4 mt-1 text-white/60">
                                        <span>{selectedApp.email}</span>
                                        <span>•</span>
                                        <span>{selectedApp.phone}</span>
                                    </div>
                                    <div className="flex flex-col items-start gap-3 mt-2">
                                        <Badge className={`${getStatusColor(selectedApp.status)} border-0 px-3 py-1 text-sm`}>
                                            {selectedApp.status}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    {/* Admin Super Powers Dropdown */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 gap-2">
                                                Manage Application <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-black border-white/20 text-white min-w-[220px]">
                                            <DropdownMenuLabel>Move Candidate To...</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="bg-white/10" />

                                            <DropdownMenuItem onClick={() => setIsInviteOpen(true)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10 gap-2">
                                                <MoveRight className="w-4 h-4 text-blue-400" />
                                                <span>Communication Round</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem onClick={() => setIsTechnicalInviteOpen(true)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10 gap-2">
                                                <MoveRight className="w-4 h-4 text-purple-400" />
                                                <span>Technical Round</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem onClick={() => setIsFinalInviteOpen(true)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10 gap-2">
                                                <MoveRight className="w-4 h-4 text-green-400" />
                                                <span>Final Interview</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator className="bg-white/10" />
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                            <DropdownMenuItem onClick={handleMakeOffer} className="cursor-pointer hover:bg-white/10 focus:bg-white/10 gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>Make Job Offer</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem onClick={() => setIsRejectOpen(true)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10 gap-2 text-red-400">
                                                <X className="w-4 h-4" />
                                                <span>Reject Candidate</span>
                                            </DropdownMenuItem>

                                            {selectedApp.status === 'Rejected' && (
                                                <DropdownMenuItem
                                                    onClick={async () => {
                                                        const { error } = await supabase.from('applications' as any).update({ status: 'Applied' }).eq('id', selectedApp.id);
                                                        if (!error) {
                                                            toast({ title: "Success", description: "Candidate restored to Applied status" });
                                                            setSelectedApp({ ...selectedApp, status: 'Applied' });
                                                            fetchData();
                                                        }
                                                    }}
                                                    className="cursor-pointer hover:bg-white/10 focus:bg-white/10 gap-2"
                                                >
                                                    <RefreshCcw className="w-4 h-4" />
                                                    <span>Restore to Applied</span>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {/* Final Invite Dialog (Custom) */}
                                    <Dialog open={isFinalInviteOpen} onOpenChange={setIsFinalInviteOpen}>
                                        <DialogContent className="bg-black border-white/10 text-white">
                                            <DialogHeader>
                                                <DialogTitle>Schedule Final Interview</DialogTitle>
                                                <DialogDescription>
                                                    Select a strict time slot. The system will check for conflicts.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4 space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm">Interview Date & Time</label>
                                                    <input
                                                        type="datetime-local"
                                                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white [color-scheme:dark]"
                                                        value={finalScheduledAt}
                                                        onChange={(e) => setFinalScheduledAt(e.target.value)}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={handleFinalInvite}
                                                    disabled={loading}
                                                    className="w-full bg-green-600 hover:bg-green-500"
                                                >
                                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Invitation"}
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-white/5 border-white/10">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-white/60">Resume Match</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex items-end justify-between">
                                            <div className="text-3xl font-bold">{selectedApp.ai_score || 0}%</div>
                                            <div className={`text-sm mb-1 ${selectedApp.ai_score && selectedApp.ai_score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                                                {selectedApp.ai_score && selectedApp.ai_score >= 80 ? 'Excellent' : 'Good'}
                                            </div>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                            <div className={`h-full rounded-full ${selectedApp.ai_score && selectedApp.ai_score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${selectedApp.ai_score || 0}%` }} />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-white/60">Communication</CardTitle></CardHeader>
                                    <CardContent>
                                        {(() => {
                                            const interviews = (selectedApp as any).interviews || [];
                                            const score = interviews.length > 0 ? interviews[0].ai_score : 0;
                                            return (
                                                <>
                                                    <div className="flex items-end justify-between">
                                                        <div className="text-3xl font-bold">{score > 0 ? `${score}%` : 'N/A'}</div>
                                                        {score > 0 && <div className={`text-sm mb-1 ${score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>{score >= 80 ? 'Excellent' : 'Average'}</div>}
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                        <div className={`h-full rounded-full ${score >= 80 ? 'bg-white' : 'bg-white/40'}`} style={{ width: `${score}%` }} />
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-white/60">Timeline</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="text-white/60">Applied</span><span>{new Date(selectedApp.created_at).toLocaleDateString()}</span></div>
                                            {(selectedApp as any).communication_deadline && (
                                                <div className="flex justify-between">
                                                    <span className="text-white/60">Deadline</span>
                                                    <span className={new Date((selectedApp as any).communication_deadline) < new Date() ? 'text-red-400' : ''}>{new Date((selectedApp as any).communication_deadline).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Stepper */}
                            <div className="flex justify-between items-center relative mb-8 px-4">
                                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10" />
                                {[
                                    { id: 'resume', label: 'Resume Screening', status: 'Completed' },
                                    { id: 'communication', label: 'Communication', status: getStepStatus('communication') },
                                    { id: 'technical', label: 'Technical Round', status: getStepStatus('technical') },
                                    { id: 'final', label: 'Final Interview', status: getStepStatus('final') }
                                ].map((step, idx) => (
                                    <div key={step.id} className={`flex flex-col items-center gap-2 cursor-pointer group`} onClick={() => setActiveTab(step.id)}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step.status === 'Completed' ? 'bg-green-500 border-green-500 text-black' : step.status === 'In Progress' ? 'bg-yellow-500 border-yellow-500 text-black animate-pulse' : 'bg-black border-white/20 text-white/40 group-hover:border-white/60'}`}>
                                            {step.status === 'Completed' ? '✓' : idx + 1}
                                        </div>
                                        <span className={`text-xs font-medium ${step.status === 'Completed' ? 'text-green-400' : step.status === 'In Progress' ? 'text-yellow-400' : 'text-white/40'}`}>{step.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Tabs */}
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="bg-white/5 border border-white/10 w-full justify-start rounded-lg p-1">
                                    <TabsTrigger value="resume" className="data-[state=active]:bg-white/10">Resume & Profile</TabsTrigger>
                                    <TabsTrigger value="communication" className="data-[state=active]:bg-white/10">Communication Round</TabsTrigger>
                                    <TabsTrigger value="technical" className="data-[state=active]:bg-white/10">Technical Assessment</TabsTrigger>
                                    <TabsTrigger value="final" className="data-[state=active]:bg-white/10">Final Interview</TabsTrigger>
                                </TabsList>

                                <TabsContent value="resume" className="mt-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 h-[500px]">
                                            {resumeUrl ? (
                                                <iframe src={resumeUrl} className="w-full h-full rounded" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-white/40 flex-col gap-2">
                                                    <FileText className="w-8 h-8" />
                                                    <span>No Resume Uploaded</span>
                                                </div>
                                            )}
                                        </div>

                                        {(selectedApp.ai_score || selectedApp.ai_feedback) && (
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-semibold text-white">AI Resume Analysis</h4>
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        className="h-6 text-xs border-white/10 text-white/60 hover:text-white bg-transparent"
                                                        disabled={loading}
                                                        onClick={async () => {
                                                            if (!confirm("Re-run AI Analysis for Resume?")) return;
                                                            setLoading(true);
                                                            try {
                                                                const { error } = await supabase.functions.invoke('analyze-application', {
                                                                    body: { applicationId: selectedApp.id },
                                                                    method: 'POST'
                                                                });
                                                                if (error) throw error;
                                                                toast({ title: "Analysis Queued", description: "Refreshed result." });
                                                                fetchData();
                                                            } catch (err: any) {
                                                                toast({ title: "Error", description: err.message, variant: "destructive" });
                                                            } finally {
                                                                setLoading(false);
                                                            }
                                                        }}
                                                    >
                                                        {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />} Retry
                                                    </Button>
                                                </div>
                                                {selectedApp.ai_score && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="text-sm text-white/60">Match Score:</div>
                                                        <div className={`font-bold ${selectedApp.ai_score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>{selectedApp.ai_score}/100</div>
                                                    </div>
                                                )}
                                                {selectedApp.ai_feedback ? (
                                                    <div className="bg-black/20 p-4 rounded text-sm text-white/80 whitespace-pre-wrap">
                                                        {selectedApp.ai_feedback}
                                                    </div>
                                                ) : (
                                                    <div className="text-white/40 italic">No feedback text generated.</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="communication" className="mt-4 space-y-4">
                                    {/* Average Score Display */}
                                    {(selectedApp as any).communication_average_score && (
                                        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm text-white/60 mb-1">Average Communication Score</div>
                                                        <div className="text-3xl font-bold text-white">
                                                            {(selectedApp as any).communication_average_score}/100
                                                        </div>
                                                        <div className="text-xs text-white/40 mt-1">
                                                            Calculated across {((selectedApp as any).interviews || []).length} interview responses
                                                        </div>
                                                    </div>
                                                    {selectedApp.status === 'Communication Round' && (
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                onClick={handleApproveTechnicalRound}
                                                                disabled={loading}
                                                                className="bg-green-600 hover:bg-green-700"
                                                            >
                                                                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                                                Approve for Technical
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                onClick={handleRejectAfterCommunication}
                                                                disabled={loading}
                                                                variant="destructive"
                                                            >
                                                                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Interview Responses */}
                                    {((selectedApp as any).interviews || []).length === 0 && (
                                        <div className="text-center py-12 text-white/40 bg-white/5 rounded-lg border border-white/10">
                                            <Mic className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            Candidate has not started the communication round yet.
                                        </div>
                                    )}
                                    {((selectedApp as any).interviews || []).map((int: any, i: number) => (
                                        <Card key={i} className="bg-white/5 border-white/10">
                                            <CardHeader className="flex flex-row items-center justify-between">
                                                <div>
                                                    <CardTitle>Question {i + 1}</CardTitle>
                                                    <div className="text-sm text-white/60 mt-1">{int.question}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {int.communication_score && (
                                                        <Badge variant="outline" className={int.communication_score >= 80 ? 'border-green-500 text-green-400' : int.communication_score >= 60 ? 'border-yellow-500 text-yellow-400' : 'border-red-500 text-red-400'}>
                                                            {int.communication_score}/100
                                                        </Badge>
                                                    )}
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        className="h-6 text-xs border-white/10 text-white/60 hover:text-white bg-transparent"
                                                        disabled={loading}
                                                        onClick={async () => {
                                                            if (!confirm("Re-run AI Analysis for this Interview?")) return;
                                                            setLoading(true);
                                                            try {
                                                                const { error } = await supabase.functions.invoke('analyze-interview', {
                                                                    body: {
                                                                        interviewId: int.id,
                                                                        audioUrl: int.audio_url,
                                                                        question: int.question
                                                                    },
                                                                    method: 'POST'
                                                                });
                                                                if (error) throw error;
                                                                toast({ title: "Analysis Queued", description: "Refreshed result." });
                                                                fetchData();
                                                            } catch (err: any) {
                                                                toast({ title: "Error", description: err.message, variant: "destructive" });
                                                            } finally {
                                                                setLoading(false);
                                                            }
                                                        }}
                                                    >
                                                        {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />} Retry AI
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                {int.audio_url && <audio controls src={int.audio_url} className="w-full mb-4" />}
                                                <div className="bg-black/20 p-4 rounded text-sm text-white/80 whitespace-pre-wrap font-mono">
                                                    {int.ai_feedback || "No feedback generated."}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>

                                <TabsContent value="technical" className="mt-4 space-y-4">
                                    {/* Admin Controls for Technical Round */}
                                    {selectedApp.status === 'Technical Round' && ((selectedApp as any).technical_assessments || []).length > 0 && (
                                        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm font-medium text-white mb-1">Technical Round Complete</div>
                                                        <div className="text-xs text-white/60">Review the submission and decide next action</div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={handleApproveFinalInterview} disabled={loading} className="bg-green-600 hover:bg-green-700">
                                                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                                            Approve for Final Interview
                                                        </Button>
                                                        <Button size="sm" onClick={handleRejectAfterTechnical} disabled={loading} variant="destructive">
                                                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {((selectedApp as any).technical_assessments || []).length === 0 && (
                                        <div className="text-center py-12 text-white/40 bg-white/5 rounded-lg border border-white/10">
                                            <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            No technical submissions yet.
                                        </div>
                                    )}
                                    {((selectedApp as any).technical_assessments || []).map((tech: any, i: number) => (
                                        <Card key={i} className="bg-white/5 border-white/10">
                                            <CardHeader className="flex flex-row items-center justify-between">
                                                <CardTitle>Submission {i + 1}</CardTitle>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        className="h-6 text-xs border-white/10 text-white/60 hover:text-white bg-transparent"
                                                        disabled={loading}
                                                        onClick={async () => {
                                                            if (!confirm("Re-run AI Analysis for this Technical Submission?")) return;
                                                            setLoading(true);
                                                            try {
                                                                const { error } = await supabase.functions.invoke('analyze-technical-submission', {
                                                                    body: {
                                                                        assessmentId: tech.id,
                                                                        force: true
                                                                    },
                                                                    method: 'POST'
                                                                });
                                                                if (error) throw error;
                                                                toast({ title: "Analysis Queued", description: "Refreshed result." });
                                                                fetchData();
                                                            } catch (err: any) {
                                                                toast({ title: "Error", description: err.message, variant: "destructive" });
                                                            } finally {
                                                                setLoading(false);
                                                            }
                                                        }}
                                                    >
                                                        {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />} Retry AI
                                                    </Button>
                                                    <div className="text-sm text-white/40">{new Date(tech.created_at || tech.updated_at).toLocaleString()}</div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-4 mb-4">
                                                    {tech.github_url && <a href={tech.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-md"><Github className="w-4 h-4" /> GitHub Repo</a>}
                                                    {tech.deployed_url && <a href={tech.deployed_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors bg-green-500/10 px-3 py-1.5 rounded-md"><Globe className="w-4 h-4" /> Live Demo</a>}
                                                    {tech.video_url && (
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    // Normalize path (handle if it starts with 'technical-submissions/')
                                                                    let path_ = tech.video_url;
                                                                    if (path_.startsWith('technical-submissions/')) path_ = path_.replace('technical-submissions/', '');

                                                                    const { data, error } = await supabase.storage
                                                                        .from('technical-submissions')
                                                                        .createSignedUrl(path_, 3600);
                                                                    if (error) throw error;
                                                                    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
                                                                } catch (err: any) {
                                                                    toast({ title: "Error", description: "Failed to load video: " + err.message, variant: "destructive" });
                                                                }
                                                            }}
                                                            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 px-3 py-1.5 rounded-md"
                                                        >
                                                            <Video className="w-4 h-4" /> Watch Video
                                                        </button>
                                                    )}
                                                    {tech.documentation_url && (
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    const { data, error } = await supabase.storage
                                                                        .from('technical-documentation')
                                                                        .createSignedUrl(tech.documentation_url, 3600);
                                                                    if (error) throw error;
                                                                    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
                                                                } catch (err: any) {
                                                                    toast({ title: "Error", description: "Failed to load documentation", variant: "destructive" });
                                                                }
                                                            }}
                                                            className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors bg-orange-500/10 px-3 py-1.5 rounded-md"
                                                        >
                                                            <FileText className="w-4 h-4" /> Documentation
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="space-y-4">
                                                    {tech.ai_score ? (
                                                        <>
                                                            <div className="bg-white/5 p-4 rounded border border-white/10">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <div className="font-semibold text-white">AI Analysis Score</div>
                                                                    <div className={`text-xl font-bold ${tech.ai_score >= 80 ? 'text-green-400' : tech.ai_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{tech.ai_score}/100</div>
                                                                </div>
                                                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                                    <div className={`h-full ${tech.ai_score >= 80 ? 'bg-green-500' : tech.ai_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${tech.ai_score}%` }}></div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-sm font-medium text-white/60 mb-2">Feedback</h4>
                                                                <div className="bg-black/20 p-4 rounded text-sm text-white/80 whitespace-pre-wrap">
                                                                    {tech.ai_feedback}
                                                                </div>
                                                            </div>

                                                            {tech.improvement_suggestions && (
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-white/60 mb-2">Improvement Suggestions</h4>
                                                                    <div className="bg-black/20 p-4 rounded text-sm text-white/80 whitespace-pre-wrap">
                                                                        {tech.improvement_suggestions}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="text-center py-6 text-white/40 bg-white/5 rounded border border-white/10">
                                                            <Brain className="w-6 h-6 mx-auto mb-2 opacity-50" />
                                                            AI Analysis Pending...
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>

                                <TabsContent value="final" className="mt-4 space-y-4">
                                    {/* Admin Controls for Final Interview */}
                                    {selectedApp.status === 'Final Interview' && ((selectedApp as any).final_interviews || []).some((int: any) => int.status === 'Analyzed') && (
                                        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm font-medium text-white mb-1">Final Interview Complete</div>
                                                        <div className="text-xs text-white/60">Make hiring decision</div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={handleMakeOffer} disabled={loading} className="bg-green-600 hover:bg-green-700">
                                                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                                            Make Job Offer
                                                        </Button>
                                                        <Button size="sm" onClick={handleRejectAfterFinal} disabled={loading} variant="destructive">
                                                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {((selectedApp as any).final_interviews || []).length === 0 ? (
                                        <div className="text-center py-12 text-white/40 bg-white/5 rounded-lg border border-white/10">
                                            <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            No final interview scheduled yet.
                                        </div>
                                    ) : (
                                        ((selectedApp as any).final_interviews || []).map((interview: any, i: number) => (
                                            <Card key={i} className="bg-white/5 border-white/10">
                                                <CardHeader className="flex flex-row items-center justify-between">
                                                    <CardTitle>Interview Session</CardTitle>
                                                    <div className="flex gap-2 items-center">
                                                        <Button
                                                            size="xs"
                                                            variant="outline"
                                                            className="text-white/60 hover:text-white border-white/10 bg-transparent text-xs h-7"
                                                            disabled={loading}
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                if (!confirm("Re-run AI Analysis for this Final Interview?")) return;
                                                                setLoading(true);
                                                                try {
                                                                    const { error } = await supabase.functions.invoke('analyze-final-interview', {
                                                                        body: { interviewId: interview.id },
                                                                        method: 'POST'
                                                                    });
                                                                    if (error) throw error;
                                                                    toast({ title: "Analysis Queued/Completed", description: "Refreshed result." });
                                                                    fetchData();
                                                                } catch (err: any) {
                                                                    toast({ title: "Error", description: err.message, variant: "destructive" });
                                                                } finally {
                                                                    setLoading(false);
                                                                }
                                                            }}
                                                        >
                                                            {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />} Retry AI
                                                        </Button>
                                                        <Badge variant="outline" className={`${getStatusColor(interview.status)}`}>{interview.status}</Badge>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    {interview.status === 'Analyzed' || interview.status === 'Offer' || interview.status === 'Rejected' ? (
                                                        <>
                                                            {/* Scores Grid */}
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="bg-black/20 p-4 rounded border border-white/5 text-center">
                                                                    <div className="text-sm text-white/60 mb-1">Confidence Score</div>
                                                                    <div className="text-3xl font-bold text-blue-400">{((interview.ai_confidence_score || 0) * 100).toFixed(0)}%</div>
                                                                </div>
                                                                <div className="bg-black/20 p-4 rounded border border-white/5 text-center">
                                                                    <div className="text-sm text-white/60 mb-1">Role Fit</div>
                                                                    <div className="text-3xl font-bold text-purple-400">{(interview.ai_role_fit_score || 0).toFixed(1)}/10</div>
                                                                </div>
                                                            </div>

                                                            {/* Report Generation */}
                                                            <div className="flex justify-end mb-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                                                                    onClick={() => {
                                                                        const reportContent = [
                                                                            `ROOTED AI - CANDIDATE HIRING REPORT`,
                                                                            `===================================`,
                                                                            `Candidate: ${selectedApp.full_name}`,
                                                                            `Email: ${selectedApp.email}`,
                                                                            `Role: ${selectedApp.jobs?.title || 'N/A'}`,
                                                                            `Date: ${new Date().toLocaleDateString()}`,
                                                                            `\n--- SCORES ---`,
                                                                            `Type: ${interview.ai_recommendation}`,
                                                                            `Confidence: ${((interview.ai_confidence_score || 0) * 100).toFixed(1)}%`,
                                                                            `Role Fit: ${(interview.ai_role_fit_score || 0).toFixed(1)}/10`,
                                                                            `\n--- AI FEEDBACK ---`,
                                                                            interview.ai_feedback || "No feedback generated.",
                                                                            `\n--- TRANSCRIPT EXCERPT ---`,
                                                                            (interview.transcript || "").slice(0, 2000) + "..."
                                                                        ].join("\n");

                                                                        const blob = new Blob([reportContent], { type: 'text/plain' });
                                                                        const url = window.URL.createObjectURL(blob);
                                                                        const a = document.createElement('a');
                                                                        a.href = url;
                                                                        a.download = `${selectedApp.full_name.replace(/\s+/g, '_')}_Hiring_Report.txt`;
                                                                        document.body.appendChild(a);
                                                                        a.click();
                                                                        window.URL.revokeObjectURL(url);
                                                                        document.body.removeChild(a);
                                                                    }}
                                                                >
                                                                    <FileText className="w-4 h-4 mr-2" /> Generate Hiring Report
                                                                </Button>
                                                            </div>

                                                            {/* Recommendation */}
                                                            <div className="flex items-center justify-between bg-white/5 p-4 rounded border border-white/10">
                                                                <span className="font-semibold">AI Recommendation</span>
                                                                <Badge className={`${interview.ai_recommendation === 'Strong Hire' || interview.ai_recommendation === 'Hire' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} border-0 text-lg py-1 px-4`}>
                                                                    {interview.ai_recommendation || 'N/A'}
                                                                </Badge>
                                                            </div>

                                                            {/* Feedback */}
                                                            <div className="space-y-2">
                                                                <h4 className="text-sm font-medium text-white/60">AI Feedback</h4>
                                                                <div className="bg-black/20 p-4 rounded text-sm text-white/80 whitespace-pre-wrap">
                                                                    {interview.ai_feedback}
                                                                </div>
                                                            </div>

                                                            {/* Transcript */}
                                                            {interview.transcript && (
                                                                <div className="space-y-2">
                                                                    <h4 className="text-sm font-medium text-white/60">Transcript</h4>
                                                                    <div className="bg-black/20 p-4 rounded text-xs text-white/60 font-mono h-[200px] overflow-y-auto whitespace-pre-wrap">
                                                                        {interview.transcript}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="text-center py-8 text-white/40">
                                                            <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin text-blue-400" />
                                                            Interview is {interview.status}... Waiting for completion and analysis.
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Invite Dialogs */}
            <InterviewInviteDialog
                open={isInviteOpen}
                onOpenChange={setIsInviteOpen}
                deadline={deadline}
                setDeadline={setDeadline}
                handleInvite={handleInvite}
                loading={loading}
            />

            <TechnicalInviteDialog
                open={isTechnicalInviteOpen}
                onOpenChange={setIsTechnicalInviteOpen}
                technicalDeadline={technicalDeadline}
                setTechnicalDeadline={setTechnicalDeadline}
                projectDescription={projectDescription}
                setProjectDescription={setProjectDescription}
                handleTechnicalInvite={handleTechnicalInvite}
                loading={loading}
                generatedProjects={generatedProjects}
                setGeneratedProjects={setGeneratedProjects}
                isGeneratingProjects={isGeneratingProjects}
                handleGenerateProjects={handleGenerateProjects}
                customFeedback={customFeedback}
                setCustomFeedback={setCustomFeedback}
                handleSelectProject={handleSelectProject}
            />

            <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
                <DialogContent className="bg-black border-white/10 text-white max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Reject Candidate</DialogTitle>
                        <DialogDescription className="text-white/60">
                            Generate a polite rejection email and update status.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reason (Optional)</label>
                            <Textarea
                                className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                placeholder="e.g. Not enough experience with React..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                            />
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-white/10 hover:bg-white/10 text-white"
                            onClick={handleGenerateRejection}
                            disabled={generatingRejection}
                        >
                            {generatingRejection ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />}
                            Generate Rejection Email with AI
                        </Button>

                        {rejectionEmail.body && (
                            <div className="space-y-2 bg-white/5 p-4 rounded-md border border-white/10">
                                <div className="text-sm font-bold text-white/80">Subject: {rejectionEmail.subject}</div>
                                <div className="text-sm text-white/60 whitespace-pre-wrap">{rejectionEmail.body}</div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <Button variant="ghost" className="flex-1 hover:bg-white/10" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
                            <Button
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleConfirmRejection}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Rejection"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
