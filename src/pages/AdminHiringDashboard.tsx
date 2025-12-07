import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Job, JobApplication } from "@/types/hiring";
import { Loader2, Plus, Briefcase, Users, Sparkles, RefreshCw, Github, Video, Code } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminHiringDashboard = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
    const [isPostJobOpen, setIsPostJobOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        requirements: "",
        type: "Full-time",
        location: "Remote",
        salary_range: "",
        department: "Engineering"
    });
    const [enhancing, setEnhancing] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);

    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [activeTab, setActiveTab] = useState("resume");

    const handleUpdateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingJob) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('jobs' as any)
                .update({
                    title: newJob.title,
                    description: newJob.description,
                    requirements: newJob.requirements.split(/[,\n]/).map(r => r.trim()).filter(r => r.length > 0),
                    type: newJob.type,
                    location: newJob.location,
                    salary_range: newJob.salary_range,
                    department: newJob.department
                })
                .eq('id', editingJob.id);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Job updated successfully!",
            });
            setIsPostJobOpen(false);
            setEditingJob(null);
            fetchData();
            setNewJob({ title: "", description: "", requirements: "", type: "Full-time", location: "Remote", salary_range: "", department: "Engineering" });
        } catch (error: any) {
            console.error("Error updating job:", error);
            toast({
                title: "Error",
                description: "Failed to update job.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePostJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase
                .from('jobs' as any)
                .insert({
                    title: newJob.title,
                    description: newJob.description,
                    requirements: newJob.requirements.split(/[,\n]/).map(r => r.trim()).filter(r => r.length > 0),
                    type: newJob.type,
                    location: newJob.location,
                    salary_range: newJob.salary_range,
                    department: newJob.department,
                    is_active: true
                });

            if (error) throw error;

            toast({
                title: "Success",
                description: "Job posted successfully!",
            });
            setIsPostJobOpen(false);
            fetchData();
            setNewJob({ title: "", description: "", requirements: "", type: "Full-time", location: "Remote", salary_range: "", department: "Engineering" });
        } catch (error: any) {
            console.error("Error posting job:", error);
            toast({
                title: "Error",
                description: "Failed to post job.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEnhanceDescription = async () => {
        if (!newJob.title || !newJob.description) {
            toast({
                title: "Missing Information",
                description: "Please enter a Job Title and a rough Description first.",
                variant: "destructive",
            });
            return;
        }

        setEnhancing(true);
        setEnhancing(true);
        try {
            const { data, error } = await supabase.functions.invoke('enhance-job-description', {
                body: {
                    title: newJob.title,
                    description: newJob.description,
                    requirements: newJob.requirements
                }
            });

            if (error) throw error;

            setNewJob(prev => ({
                ...prev,
                description: data.enhanced_description,
                requirements: data.recommended_requirements
            }));

            toast({
                title: "AI Enhancement Complete",
                description: "Job description and requirements have been polished.",
            });
        } catch (error: any) {
            console.error("Error enhancing description:", error);
            toast({
                title: "Error",
                description: "Failed to enhance description.",
                variant: "destructive",
            });
        } finally {
            setEnhancing(false);
        }
    };

    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [deadline, setDeadline] = useState("");

    const [isTechnicalInviteOpen, setIsTechnicalInviteOpen] = useState(false);
    const [technicalDeadline, setTechnicalDeadline] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [generatedProjects, setGeneratedProjects] = useState<any[]>([]);
    const [isGeneratingProjects, setIsGeneratingProjects] = useState(false);
    const [customFeedback, setCustomFeedback] = useState("");

    // Check for existing standardized project when opening dialog
    useEffect(() => {
        if (isTechnicalInviteOpen && selectedApp) {
            const job = (selectedApp as any).jobs;
            if (job && job.technical_problem_statement) {
                setProjectDescription(job.technical_problem_statement);
            } else {
                setProjectDescription(""); // Reset if no standard project
            }
        }
    }, [isTechnicalInviteOpen, selectedApp]);

    const handleInvite = async () => {
        if (!selectedApp || !deadline) {
            toast({
                title: "Error",
                description: "Please select an application and set a deadline.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('invite-candidate', {
                body: { applicationId: selectedApp.id, deadline },
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            toast({
                title: "Success",
                description: "Invitation sent successfully!",
            });
            setIsInviteOpen(false);
            setDeadline("");
            fetchData(); // Refresh data to show updated status
        } catch (error: any) {
            console.error("Error sending invitation:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to send invitation.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTechnicalInvite = async () => {
        if (!selectedApp || !technicalDeadline || !projectDescription) {
            toast({
                title: "Error",
                description: "Please fill in all fields.",
                variant: "destructive",
            });
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

            toast({
                title: "Success",
                description: "Technical assessment invitation sent!",
            });
            setIsTechnicalInviteOpen(false);
            setTechnicalDeadline("");
            setProjectDescription("");
            fetchData();
        } catch (error: any) {
            console.error("Error sending technical invitation:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to send invitation.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [rejectionEmail, setRejectionEmail] = useState({ subject: "", body: "" });
    const [generatingRejection, setGeneratingRejection] = useState(false);

    const handleGenerateProjects = async () => {
        if (!selectedApp) return;
        setIsGeneratingProjects(true);
        try {
            const job = (selectedApp as any).jobs;
            const response = await supabase.functions.invoke('generate-technical-projects', {
                body: {
                    jobTitle: job.title,
                    jobDescription: job.description,
                    customFeedback: customFeedback
                }
            });

            if (response.error) throw response.error;

            setGeneratedProjects(response.data.projects || []);
            toast({
                title: "Projects Generated",
                description: "Select a project to standardize it for this role.",
            });
        } catch (error: any) {
            console.error("Error generating projects:", error);
            toast({
                title: "Error",
                description: "Failed to generate projects.",
                variant: "destructive",
            });
        } finally {
            setIsGeneratingProjects(false);
        }
    };

    const handleSelectProject = async (project: any) => {
        if (!selectedApp) return;

        // Use the pre-formatted email format from the backend
        const formattedDescription = project.email_format;

        setProjectDescription(formattedDescription);
        setGeneratedProjects([]); // Clear suggestions
        setCustomFeedback(""); // Clear feedback

        // Save as standardized project for this job
        const job = (selectedApp as any).jobs;
        if (job) {
            const { error } = await supabase
                .from('jobs' as any)
                .update({ technical_problem_statement: formattedDescription })
                .eq('id', job.id);

            if (error) {
                console.error("Error saving standardized project:", error);
                toast({
                    title: "Warning",
                    description: "Project selected but failed to save as standard for the role.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Project Standardized",
                    description: "This project is now the default for this job role.",
                });
            }
        }
    };

    const handleGenerateRejection = async () => {
        if (!selectedApp) return;
        setGeneratingRejection(true);
        try {
            const { data, error } = await supabase.functions.invoke('generate-rejection', {
                body: {
                    candidateName: selectedApp.full_name,
                    jobTitle: (selectedApp as any).jobs?.title || "the role",
                    reason: rejectionReason
                }
            });

            if (error) throw error;

            setRejectionEmail({ subject: data.subject, body: data.body });
        } catch (error: any) {
            console.error("Error generating rejection:", error);
            toast({
                title: "Error",
                description: "Failed to generate rejection email.",
                variant: "destructive",
            });
        } finally {
            setGeneratingRejection(false);
        }
    };

    const handleConfirmRejection = async () => {
        if (!selectedApp) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('applications' as any)
                .update({ status: 'Rejected' })
                .eq('id', selectedApp.id);

            if (error) throw error;

            // Send Rejection Email
            if (rejectionEmail.subject && rejectionEmail.body) {
                const { error: emailError } = await supabase.functions.invoke('send-rejection-email', {
                    body: {
                        email: selectedApp.email,
                        subject: rejectionEmail.subject,
                        body: rejectionEmail.body
                    }
                });

                if (emailError) {
                    console.error("Error sending rejection email:", emailError);
                    toast({
                        title: "Warning",
                        description: "Candidate rejected, but failed to send email.",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Candidate Rejected",
                        description: "Application status updated and email sent.",
                    });
                }
            } else {
                toast({
                    title: "Candidate Rejected",
                    description: "Application status updated to Rejected (No email sent).",
                });
            }

            setIsRejectOpen(false);
            setRejectionReason("");
            setRejectionEmail({ subject: "", body: "" });
            fetchData();
        } catch (error: any) {
            console.error("Error rejecting candidate:", error);
            toast({
                title: "Error",
                description: "Failed to reject candidate.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseJob = async (jobId: string) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('jobs' as any)
                .update({ is_active: false })
                .eq('id', jobId);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Job closed successfully!",
            });
            fetchData();
        } catch (error: any) {
            console.error("Error closing job:", error);
            toast({
                title: "Error",
                description: "Failed to close job.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (jobId: string) => {
        if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('jobs' as any)
                .delete()
                .eq('id', jobId);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Job deleted successfully!",
            });
            fetchData();
        } catch (error: any) {
            console.error("Error deleting job:", error);
            toast({
                title: "Error",
                description: "Failed to delete job.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteApplication = async (appId: string) => {
        if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;

        setLoading(true);
        try {
            // Manually delete related interviews first to avoid FK constraints if cascade isn't set
            await supabase.from('interviews' as any).delete().eq('application_id', appId);

            const { error } = await supabase
                .from('applications' as any)
                .delete()
                .eq('id', appId);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Application deleted successfully!",
            });
            setSelectedApp(null);
            fetchData();
        } catch (error: any) {
            console.error("Error deleting application:", error);
            toast({
                title: "Error",
                description: "Failed to delete application.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
        fetchData();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate("/login");
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Jobs
            const { data: jobsData, error: jobsError } = await supabase
                .from('jobs' as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (jobsError) throw jobsError;
            setJobs(jobsData as unknown as Job[]);

            // Fetch Applications
            const { data: appsData, error: appsError } = await supabase
                .from('applications' as any)
                .select('*, jobs(id, title, description, technical_problem_statement), interviews(*), technical_assessments(*)')
                .order('created_at', { ascending: false });

            if (appsError) throw appsError;
            setApplications(appsData as any[]);

        } catch (error: any) {
            console.error('Error fetching data:', error);
            toast({
                title: "Error",
                description: "Failed to load dashboard data.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Applied': return 'bg-blue-500/20 text-blue-400';
            case 'AI Assessed': return 'bg-white/10 text-white/80';
            case 'Communication Round': return 'bg-yellow-500/20 text-yellow-400';
            case 'Technical Round': return 'bg-orange-500/20 text-orange-400';
            case 'Hired': return 'bg-green-500/20 text-green-400';
            case 'Rejected': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    const handleRetryAnalysis = async () => {
        setIsRetrying(true);
        let appCount = 0;
        let interviewCount = 0;

        try {
            // Identify items to retry
            const unanalyzedApps = applications.filter(app => !app.ai_score && app.resume_url);
            const unanalyzedInterviews = applications.flatMap(app => app.interviews || []).filter((int: any) => !int.ai_score && int.audio_url);

            toast({
                title: "Starting Analysis Retry",
                description: `Found ${unanalyzedApps.length} applications and ${unanalyzedInterviews.length} interviews to process.`,
            });

            // 1. Retry Applications
            for (const app of unanalyzedApps) {
                try {
                    const { error } = await supabase.functions.invoke('analyze-application', {
                        body: { applicationId: app.id }
                    });
                    if (!error) appCount++;
                    else console.error(`Failed to retry application ${app.id}`, error);
                } catch (e) {
                    console.error(`Failed to retry application ${app.id}`, e);
                }
            }

            // 2. Retry Interviews
            for (const int of unanalyzedInterviews) {
                try {
                    const { error } = await supabase.functions.invoke('analyze-interview', {
                        body: {
                            interviewId: int.id,
                            audioUrl: int.audio_url,
                            question: int.question
                        }
                    });
                    if (!error) interviewCount++;
                    else console.error(`Failed to retry interview ${int.id}`, error);
                } catch (e) {
                    console.error(`Failed to retry interview ${int.id}`, e);
                }
            }

            toast({
                title: "Retry Complete",
                description: `Retried analysis for ${appCount} applications and ${interviewCount} interviews.`,
            });
            fetchData();

        } catch (error) {
            console.error("Error retrying analysis:", error);
            toast({
                title: "Error",
                description: "Failed to retry analysis.",
                variant: "destructive",
            });
        } finally {
            setIsRetrying(false);
        }
    };

    const handleMoveToFinalRound = async (applicationId: string) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('applications' as any)
                .update({ status: 'Final Interview' })
                .eq('id', applicationId);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Candidate moved to Final Interview round.",
            });

            if (selectedApp && selectedApp.id === applicationId) {
                setSelectedApp({ ...selectedApp, status: 'Final Interview' });
            }
            fetchData();
        } catch (error) {
            console.error("Error updating status:", error);
            toast({
                title: "Error",
                description: "Failed to update candidate status.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Hiring Dashboard</h1>
                        <p className="text-white/60">Manage jobs and applications</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
                            onClick={handleRetryAnalysis}
                            disabled={isRetrying}
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
                            {isRetrying ? 'Retrying...' : 'Retry AI Analysis'}
                        </Button>
                        <Button className="bg-white text-black hover:bg-white/90" onClick={() => setIsPostJobOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Post New Job
                        </Button>
                    </div>
                </div >

                <Tabs defaultValue="applications" className="w-full">
                    <TabsList className="bg-white/5 border-white/10">
                        <TabsTrigger value="applications" className="data-[state=active]:bg-white/10">
                            <Users className="w-4 h-4 mr-2" />
                            Applications
                        </TabsTrigger>
                        <TabsTrigger value="jobs" className="data-[state=active]:bg-white/10">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Jobs
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="applications" className="mt-6">
                        <Card className="bg-white/5 border-white/10 text-white">
                            <CardHeader>
                                <CardTitle>Recent Applications</CardTitle>
                                <CardDescription className="text-white/60">
                                    Manage candidate applications and view AI insights.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/10 hover:bg-white/5">
                                            <TableHead className="text-white/60">Candidate</TableHead>
                                            <TableHead className="text-white/60">Role</TableHead>
                                            <TableHead className="text-white/60">Status</TableHead>
                                            <TableHead className="text-white/60">AI Score</TableHead>
                                            <TableHead className="text-white/60">Date</TableHead>
                                            <TableHead className="text-white/60">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {applications.map((app) => (
                                            <TableRow key={app.id} className="border-white/10 hover:bg-white/5">
                                                <TableCell className="font-medium">
                                                    <div>{app.full_name}</div>
                                                    <div className="text-xs text-white/40">{app.email}</div>
                                                </TableCell>
                                                <TableCell>{(app as any).jobs?.title || 'Unknown'}</TableCell>
                                                <TableCell>
                                                    <Badge className={`${getStatusColor(app.status)} border-0`}>
                                                        {app.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {app.ai_score ? (
                                                        <span className={`font-bold ${app.ai_score >= 80 ? 'text-green-400' : app.ai_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                            {app.ai_score}%
                                                        </span>
                                                    ) : (
                                                        <span className="text-white/20">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-white/60">
                                                    {new Date(app.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="hover:bg-white/10"
                                                        onClick={() => setSelectedApp(app)}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-400 hover:bg-red-500/10 hover:text-red-300 ml-2"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteApplication(app.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {applications.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8 text-white/40">
                                                    No applications found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="jobs" className="mt-6">
                        <Card className="bg-white/5 border-white/10 text-white">
                            <CardHeader>
                                <CardTitle>Active Job Postings</CardTitle>
                                <CardDescription className="text-white/60">
                                    Manage your open positions.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    {jobs.map((job) => (
                                        <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                            <div>
                                                <h4 className="font-bold text-lg">{job.title}</h4>
                                                <div className="flex gap-2 mt-1">
                                                    <Badge variant="outline" className="border-white/20 text-white/60">{job.type}</Badge>
                                                    <Badge variant="outline" className="border-white/20 text-white/60">{job.location}</Badge>
                                                    {job.is_active ? (
                                                        <Badge className="bg-green-500/20 text-green-400 border-0">Active</Badge>
                                                    ) : (
                                                        <Badge className="bg-gray-500/20 text-gray-400 border-0">Closed</Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-white/10 hover:bg-white/10"
                                                    onClick={() => {
                                                        setEditingJob(job);
                                                        setNewJob({
                                                            title: job.title,
                                                            description: job.description,
                                                            requirements: job.requirements?.join(', ') || "",
                                                            type: job.type,
                                                            location: job.location,
                                                            salary_range: job.salary_range || "",
                                                            department: (job as any).department || "Engineering"
                                                        });
                                                        setIsPostJobOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                                    onClick={() => handleCloseJob(job.id)}
                                                    disabled={!job.is_active}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                                    onClick={() => handleDeleteJob(job.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {jobs.length === 0 && (
                                        <div className="text-center py-8 text-white/40">
                                            No jobs posted yet.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
                    <DialogContent className="bg-black border-white/10 text-white max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Candidate Performance Dashboard</DialogTitle>
                            <DialogDescription className="text-white/60">
                                Comprehensive analysis of candidate profile and assessment.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedApp && (
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
                                            <div className="mt-4 flex gap-2">
                                                {selectedApp.portfolio_url && (
                                                    <a href={selectedApp.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white hover:underline">
                                                        View Portfolio
                                                    </a>
                                                )}
                                                {selectedApp.resume_url && (
                                                    <Button variant="link" className="text-sm text-white/80 hover:text-white hover:underline h-auto p-0" onClick={async () => {
                                                        const { data } = await supabase.storage.from('resumes').createSignedUrl(selectedApp.resume_url, 60);
                                                        if (data?.signedUrl) window.open(data.signedUrl, '_blank');
                                                    }}>
                                                        View Resume
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <Badge className={`${getStatusColor(selectedApp.status)} border-0 px-3 py-1 text-sm`}>
                                                {selectedApp.status}
                                            </Badge>
                                            {selectedApp.status === 'Technical Round' ? (
                                                (selectedApp as any).technical_assessments?.length > 0 ? (
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-500 text-white hover:bg-green-600 border-0"
                                                        onClick={() => handleMoveToFinalRound(selectedApp.id)}
                                                    >
                                                        Select for Final Interview
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        className="bg-white text-black hover:bg-white/90"
                                                        onClick={() => setIsTechnicalInviteOpen(true)}
                                                    >
                                                        Invite to Technical Project Round
                                                    </Button>
                                                )
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    className="bg-white text-black hover:bg-white/90"
                                                    onClick={() => setIsInviteOpen(true)}
                                                >
                                                    {selectedApp.status === 'Applied' || selectedApp.status === 'AI Assessed' ? 'Invite to Interview' : 'Resend Interview Invite'}
                                                </Button>
                                            )}
                                            {selectedApp.status === 'Communication Round Completed' && (
                                                <Button
                                                    size="sm"
                                                    className="bg-green-500 text-white hover:bg-green-600 border-0"
                                                    onClick={() => setIsTechnicalInviteOpen(true)}
                                                >
                                                    Select for Next Round
                                                </Button>
                                            )}
                                            {selectedApp.status === 'Rejected' ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-white/20 hover:bg-white/10"
                                                    onClick={async () => {
                                                        const { error } = await supabase
                                                            .from('applications' as any)
                                                            .update({ status: 'Applied' })
                                                            .eq('id', selectedApp.id);
                                                        if (!error) {
                                                            toast({ title: "Success", description: "Candidate restored to Applied status" });
                                                            setSelectedApp({ ...selectedApp, status: 'Applied' });
                                                            fetchData();
                                                        }
                                                    }}
                                                >
                                                    Restore to Applied
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                                                    onClick={() => setIsRejectOpen(true)}
                                                >
                                                    Reject
                                                </Button>
                                            )}
                                            {(selectedApp as any).access_code && (
                                                <div className="text-xs text-white/40 font-mono bg-white/5 px-2 py-1 rounded">
                                                    Access Code: {(selectedApp as any).access_code}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Resume Match Score */}
                                        <Card className="bg-white/5 border-white/10">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium text-white/60">Resume Match</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-end justify-between">
                                                    <div className="text-3xl font-bold">
                                                        {selectedApp.ai_score || 0}%
                                                    </div>
                                                    <div className={`text-sm mb-1 ${selectedApp.ai_score && selectedApp.ai_score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                                                        {selectedApp.ai_score && selectedApp.ai_score >= 80 ? 'Excellent' : 'Good'}
                                                    </div>
                                                </div>
                                                <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${selectedApp.ai_score && selectedApp.ai_score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                        style={{ width: `${selectedApp.ai_score || 0}%` }}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Communication Score (Average if multiple) */}
                                        <Card className="bg-white/5 border-white/10">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium text-white/60">Communication</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {/* Calculate average score logic here if needed, for now taking first interview or 0 */}
                                                {(() => {
                                                    const interviews = (selectedApp as any).interviews || [];
                                                    const score = interviews.length > 0 ? interviews[0].ai_score : 0;
                                                    return (
                                                        <>
                                                            <div className="flex items-end justify-between">
                                                                <div className="text-3xl font-bold">
                                                                    {score > 0 ? `${score}%` : 'N/A'}
                                                                </div>
                                                                {score > 0 && (
                                                                    <div className={`text-sm mb-1 ${score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                                                                        {score >= 80 ? 'Excellent' : 'Average'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full ${score >= 80 ? 'bg-white' : 'bg-white/40'}`}
                                                                    style={{ width: `${score}%` }}
                                                                />
                                                            </div>
                                                        </>
                                                    );
                                                })()}
                                            </CardContent>
                                        </Card>

                                        {/* Status / Timeline */}
                                        <Card className="bg-white/5 border-white/10">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium text-white/60">Timeline</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-white/60">Applied</span>
                                                        <span>{new Date(selectedApp.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    {(selectedApp as any).communication_deadline && (
                                                        <div className="flex justify-between">
                                                            <span className="text-white/60">Deadline</span>
                                                            <span className={new Date((selectedApp as any).communication_deadline) < new Date() ? 'text-red-400' : ''}>
                                                                {new Date((selectedApp as any).communication_deadline).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Checkpoint Stepper */}
                                    <div className="flex justify-between items-center relative mb-8 px-4">
                                        {/* Progress Line */}
                                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10" />

                                        {[
                                            { id: 'resume', label: 'Resume Screening', status: 'Completed' },
                                            { id: 'communication', label: 'Communication', status: (selectedApp as any).interviews?.length > 0 ? 'Completed' : 'Pending' },
                                            { id: 'technical', label: 'Technical Round', status: (selectedApp as any).technical_assessments?.length > 0 ? 'Completed' : (selectedApp.status === 'Technical Round' ? 'In Progress' : 'Pending') },
                                            { id: 'final', label: 'Final Interview', status: 'Pending' }
                                        ].map((step, idx) => (
                                            <div
                                                key={step.id}
                                                className={`flex flex-col items-center gap-2 cursor-pointer group`}
                                                onClick={() => setActiveTab(step.id)}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step.status === 'Completed' ? 'bg-green-500 border-green-500 text-black' :
                                                    step.status === 'In Progress' ? 'bg-yellow-500 border-yellow-500 text-black animate-pulse' :
                                                        'bg-black border-white/20 text-white/40 group-hover:border-white/60'
                                                    }`}>
                                                    {step.status === 'Completed' ? '✓' : idx + 1}
                                                </div>
                                                <span className={`text-xs font-medium ${step.status === 'Completed' ? 'text-green-400' :
                                                    step.status === 'In Progress' ? 'text-yellow-400' :
                                                        'text-white/40'
                                                    }`}>{step.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Detailed Analysis Tabs (Hidden triggers, controlled by stepper) */}
                                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                        <TabsList className="hidden">
                                            <TabsTrigger value="resume" data-value="resume">Resume</TabsTrigger>
                                            <TabsTrigger value="communication" data-value="communication">Communication</TabsTrigger>
                                            <TabsTrigger value="technical" data-value="technical">Technical</TabsTrigger>
                                            <TabsTrigger value="final" data-value="final">Final</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="resume" className="mt-4 space-y-4">
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                                <h4 className="font-semibold mb-2 text-white">AI Feedback</h4>
                                                <p className="text-white/80 leading-relaxed">
                                                    {selectedApp.ai_feedback || "No feedback available."}
                                                </p>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="communication" className="mt-4 space-y-4">
                                            {(selectedApp as any).interviews && (selectedApp as any).interviews.length > 0 ? (
                                                (selectedApp as any).interviews
                                                    .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                                                    .map((interview: any, index: number) => (
                                                        <div key={interview.id} className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-6">
                                                            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                                                                <h4 className="font-bold text-white text-lg">Attempt {index + 1}</h4>
                                                                <span className="text-xs text-white/40">{new Date(interview.created_at).toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h4 className="font-semibold text-lg mb-1">Question</h4>
                                                                    <p className="text-white/80 italic">"{interview.question}"</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-2xl font-bold text-blue-400">{interview.ai_score}/100</div>
                                                                    <div className="text-xs text-white/40">AI Score</div>
                                                                </div>
                                                            </div>

                                                            <div className="bg-black/40 p-3 rounded border border-white/5">
                                                                <audio controls className="w-full h-10" src={interview.audio_signed_url} />
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div>
                                                                    <h5 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Transcription</h5>
                                                                    <div className="bg-black/20 p-3 rounded text-sm text-white/70 max-h-40 overflow-y-auto">
                                                                        "{interview.transcription}"
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h5 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">AI Analysis</h5>
                                                                    <div className="bg-black/20 p-3 rounded text-sm text-white/70">
                                                                        {interview.ai_feedback || (
                                                                            <div className="flex items-center gap-2 text-yellow-400/80">
                                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                                <span>Analysis in progress...</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                            ) : (
                                                <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10 border-dashed">
                                                    <div className="text-white/40">No communication assessment data available yet.</div>
                                                    <Button variant="link" className="text-white underline mt-2" onClick={() => setIsInviteOpen(true)}>
                                                        Send Invitation
                                                    </Button>
                                                </div>
                                            )}
                                        </TabsContent>

                                        <TabsContent value="technical" className="mt-4 space-y-4">
                                            {(selectedApp as any).technical_assessments && (selectedApp as any).technical_assessments.length > 0 ? (
                                                (selectedApp as any).technical_assessments.map((tech: any) => (
                                                    <div key={tech.id} className="space-y-6">
                                                        {/* AI Score Card */}
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <Card className="bg-white/5 border-white/10 col-span-1">
                                                                <CardHeader className="pb-2">
                                                                    <CardTitle className="text-sm font-medium text-white/60">Technical Score</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                    <div className="flex items-end justify-between">
                                                                        <div className="text-4xl font-bold text-orange-400">{tech.ai_score || 0}/100</div>
                                                                        <div className="text-sm text-white/60 mb-1">AI Evaluated</div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                            <Card className="bg-white/5 border-white/10 col-span-2">
                                                                <CardHeader className="pb-2">
                                                                    <CardTitle className="text-sm font-medium text-white/60">AI Feedback</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                    <p className="text-white/80 text-sm leading-relaxed">{tech.ai_feedback || "Pending Analysis..."}</p>
                                                                </CardContent>
                                                            </Card>
                                                        </div>

                                                        {/* Submission Details */}
                                                        <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-6">
                                                            <div className="flex justify-between items-start">
                                                                <h4 className="font-bold text-white text-lg">Submission Details</h4>
                                                                <div className="flex gap-2">
                                                                    {tech.github_url && (
                                                                        <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10" onClick={() => window.open(tech.github_url, '_blank')}>
                                                                            <Github className="w-4 h-4 mr-2" /> GitHub Repo
                                                                        </Button>
                                                                    )}
                                                                    {tech.video_url && (
                                                                        <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10" onClick={async () => {
                                                                            const { data } = await supabase.storage.from('technical-submissions').createSignedUrl(tech.video_url, 60);
                                                                            if (data?.signedUrl) window.open(data.signedUrl, '_blank');
                                                                        }}>
                                                                            <Video className="w-4 h-4 mr-2" /> Watch Demo
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="space-y-6">
                                                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                                                    <h5 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                                                                        <Code className="w-4 h-4" /> Tech Stack
                                                                    </h5>
                                                                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-black/20 p-3 rounded">{tech.tech_stack}</p>
                                                                </div>

                                                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                                                    <h5 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                                                                        <RefreshCw className="w-4 h-4" /> Process Flow
                                                                    </h5>
                                                                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-sans">{tech.process_flow}</p>
                                                                </div>

                                                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                                                    <h5 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                                                                        <Sparkles className="w-4 h-4 text-yellow-400" /> Issues Faced & Solutions
                                                                    </h5>
                                                                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">{tech.issues_faced}</p>
                                                                </div>

                                                                {(tech as any).transcription && (
                                                                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                                                        <h5 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                                                                            <Video className="w-4 h-4 text-blue-400" /> Video Transcription (AI Generated)
                                                                        </h5>
                                                                        <div className="text-white/80 text-sm bg-black/20 p-4 rounded border border-white/5 max-h-60 overflow-y-auto italic leading-relaxed">
                                                                            "{(tech as any).transcription}"
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-12 space-y-4">
                                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                                        <Code className="w-8 h-8 text-white/20" />
                                                    </div>
                                                    <p className="text-white/40">No technical assessment submitted yet.</p>
                                                </div>
                                            )}
                                        </TabsContent>


                                        <TabsContent value="cover_letter" className="mt-4">
                                            <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-white/80 whitespace-pre-wrap leading-relaxed">
                                                {selectedApp.cover_letter || "No cover letter provided."}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>


                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogContent className="bg-black border-white/10 text-white max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Invite to Interview</DialogTitle>
                            <DialogDescription className="text-white/60">
                                Set a deadline for the communication assessment.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Deadline</label>
                                <input
                                    type="datetime-local"
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 [color-scheme:dark]"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                            <Button
                                className="w-full bg-white text-black hover:bg-white/90"
                                onClick={handleInvite}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Send Invitation"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

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
                                <textarea
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

                <Dialog open={isTechnicalInviteOpen} onOpenChange={setIsTechnicalInviteOpen}>
                    <DialogContent className="bg-black border-white/10 text-white max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Invite to Technical Round</DialogTitle>
                            <DialogDescription className="text-white/60">
                                Send the technical project brief and set a deadline.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            {!projectDescription && generatedProjects.length === 0 && (
                                <div className="text-center py-8 space-y-4">
                                    <p className="text-white/60">No standardized project found for this role.</p>

                                    <div className="space-y-2 text-left">
                                        <Label>Custom Requirements / Feedback (Optional)</Label>
                                        <Textarea
                                            placeholder="e.g., Focus on B2B SaaS, Make it a Fintech app..."
                                            value={customFeedback}
                                            onChange={(e) => setCustomFeedback(e.target.value)}
                                            className="bg-white/5 border-white/10"
                                        />
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="border-white/20 hover:bg-white/10 text-white w-full"
                                        onClick={handleGenerateProjects}
                                        disabled={isGeneratingProjects}
                                    >
                                        {isGeneratingProjects ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />}
                                        Generate Startup-Style Projects
                                    </Button>
                                </div>
                            )}

                            {generatedProjects.length > 0 && (
                                <div className="space-y-4">
                                    <Label>Select a Project to Standardize</Label>
                                    <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2">
                                        {generatedProjects.map((project, idx) => (
                                            <div key={idx} className="bg-white/5 p-4 rounded border border-white/10 hover:border-white/30 transition-colors">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="font-bold text-white text-lg">{project.title}</h4>
                                                    <Button size="sm" variant="secondary" onClick={() => handleSelectProject(project)}>Select & Standardize</Button>
                                                </div>

                                                {/* Startup Analysis Accordion-style display */}
                                                <div className="space-y-3 text-sm text-white/80 bg-black/20 p-3 rounded">
                                                    <p className="font-semibold text-yellow-400">{project.startup_analysis.verdict}</p>

                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                                        <div><span className="text-white/50">Willingness to Pay:</span> <br />{project.startup_analysis.willingness_to_pay}</div>
                                                        <div><span className="text-white/50">Market Demand:</span> <br />{project.startup_analysis.market_demand}</div>
                                                        <div><span className="text-white/50">Time to Value:</span> <br />{project.startup_analysis.time_to_value}</div>
                                                        <div><span className="text-white/50">Feasibility:</span> <br />{project.startup_analysis.feasibility}</div>
                                                        <div><span className="text-white/50">Moat:</span> <br />{project.startup_analysis.moat}</div>
                                                        <div><span className="text-white/50">Defensibility:</span> <br />{project.startup_analysis.defensibility}</div>
                                                        <div><span className="text-white/50">Monetization:</span> <br />{project.startup_analysis.monetization}</div>
                                                        <div><span className="text-white/50">Retention:</span> <br />{project.startup_analysis.retention}</div>
                                                        <div><span className="text-white/50">ROI:</span> <br />{project.startup_analysis.roi}</div>
                                                        <div><span className="text-white/50">Why AI?:</span> <br />{project.startup_analysis.why_ai}</div>
                                                        <div className="col-span-2"><span className="text-white/50">ICP & Pricing:</span> <br />{project.startup_analysis.icp_pricing}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setGeneratedProjects([])} className="w-full text-white/50 hover:text-white">
                                        Discard & Try Again
                                    </Button>
                                </div>
                            )}

                            {projectDescription && (
                                <>
                                    <div className="space-y-2">
                                        <Label>Project Description</Label>
                                        <Textarea
                                            className="min-h-[150px] bg-white/5 border-white/10"
                                            placeholder="Describe the technical task..."
                                            value={projectDescription}
                                            onChange={(e) => setProjectDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Deadline</Label>
                                        <Input
                                            type="datetime-local"
                                            className="bg-white/5 border-white/10 [color-scheme:dark]"
                                            value={technicalDeadline}
                                            onChange={(e) => setTechnicalDeadline(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        className="w-full bg-white text-black hover:bg-white/90"
                                        onClick={handleTechnicalInvite}
                                        disabled={loading}
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Invitation"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={isPostJobOpen} onOpenChange={(open) => {
                    setIsPostJobOpen(open);
                    if (!open) {
                        setEditingJob(null);
                        setNewJob({ title: "", description: "", requirements: "", type: "Full-time", location: "Remote", salary_range: "", department: "Engineering" });
                    }
                }}>
                    <DialogContent className="bg-black border-white/10 text-white max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingJob ? "Edit Job" : "Post New Job"}</DialogTitle>
                            <DialogDescription className="text-white/60">
                                {editingJob ? "Update job details." : "Create a new job opening."}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={editingJob ? handleUpdateJob : handlePostJob} className="space-y-4">
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Department</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                                            value={newJob.department}
                                            onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                                        >
                                            <option value="Engineering">Engineering</option>
                                            <option value="Product">Product</option>
                                            <option value="Design">Design</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Operations">Operations</option>
                                            <option value="HR">HR</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Type</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                                            value={newJob.type}
                                            onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                        value={newJob.title}
                                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Salary Range</label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                            value={newJob.salary_range}
                                            onChange={(e) => setNewJob({ ...newJob, salary_range: e.target.value })}
                                            placeholder="e.g. $80k - $120k"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Location</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                                            value={newJob.location}
                                            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                        >
                                            <option value="Remote">Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="On-site">On-site</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium">Description</label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-white/60 hover:text-white hover:bg-white/10"
                                            onClick={handleEnhanceDescription}
                                            disabled={enhancing}
                                        >
                                            {enhancing ? (
                                                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                            ) : (
                                                <Sparkles className="w-3 h-3 mr-2 text-yellow-400" />
                                            )}
                                            Enhance with AI
                                        </Button>
                                    </div>
                                    <textarea
                                        className="flex min-h-[100px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                        value={newJob.description}
                                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Requirements (comma separated)</label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                        value={newJob.requirements}
                                        onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                                        placeholder="React, TypeScript, Node.js..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsPostJobOpen(false)} className="hover:bg-white/10">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-white text-black hover:bg-white/90">
                                    {editingJob ? "Update Job" : "Post Job"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div >
        </div >
    );
};

export default AdminHiringDashboard;
