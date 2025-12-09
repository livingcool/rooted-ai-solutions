import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Job, JobApplication } from "@/types/hiring";
import { Loader2, Sparkles, LogOut, FileText, Briefcase, Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Imported Components
import { CandidateDetailDialog } from "@/components/admin/dashboard/CandidateDetailDialog";
import { JobApplicationsTable } from "@/components/admin/dashboard/JobApplicationsTable";
import { JobPostingsList } from "@/components/admin/dashboard/JobPostingsList";
import { JobPostingDialog } from "@/components/admin/dashboard/JobPostingDialog";

const AdminHiringDashboard = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    // State
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
    const [isPostJobOpen, setIsPostJobOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [enhancing, setEnhancing] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [activeDashboardTab, setActiveDashboardTab] = useState("applications");

    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        requirements: "",
        type: "Full-time",
        location: "Remote",
        salary_range: "",
        department: "Engineering"
    });

    // Report State
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [hiringReport, setHiringReport] = useState("");
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

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
        // Don't set loading true here avoids flicker on background updates? 
        // But logic needs it? Let's minimal flicker.
        // specific loading state for table vs global? Keep global simple.
        try {
            const { data: jobsData, error: jobsError } = await supabase
                .from('jobs' as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (jobsError) throw jobsError;
            setJobs(jobsData as unknown as Job[]);

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
                description: "Failed to fetch dashboard data.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // --- Job Handlers ---

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

            toast({ title: "Success", description: "Job updated successfully!" });
            setIsPostJobOpen(false);
            setEditingJob(null);
            fetchData();
            setNewJob({ title: "", description: "", requirements: "", type: "Full-time", location: "Remote", salary_range: "", department: "Engineering" });
        } catch (error: any) {
            console.error("Error updating job:", error);
            toast({ title: "Error", description: "Failed to update job.", variant: "destructive" });
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

            toast({ title: "Success", description: "Job posted successfully!" });
            setIsPostJobOpen(false);
            fetchData();
            setNewJob({ title: "", description: "", requirements: "", type: "Full-time", location: "Remote", salary_range: "", department: "Engineering" });
        } catch (error: any) {
            console.error("Error posting job:", error);
            toast({ title: "Error", description: "Failed to post job.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleEnhanceDescription = async () => {
        if (!newJob.title || !newJob.description) {
            toast({ title: "Missing Information", description: "Please enter a Job Title and a rough Description first.", variant: "destructive" });
            return;
        }

        setEnhancing(true);
        try {
            const response = await fetch('https://gtxbxdgnfpaxwxrgcrgz.supabase.co/functions/v1/enhance-job-description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newJob.title,
                    description: newJob.description,
                    requirements: newJob.requirements
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to enhance description");
            }

            const data = await response.json();
            setNewJob(prev => ({
                ...prev,
                description: data.enhanced_description,
                requirements: data.recommended_requirements
            }));

            toast({ title: "AI Enhancement Complete", description: "Job description and requirements have been polished." });
        } catch (error: any) {
            console.error("Error enhancing description:", error);
            toast({ title: "Error", description: "Failed to enhance description.", variant: "destructive" });
        } finally {
            setEnhancing(false);
        }
    };

    const handleCloseJob = async (jobId: string) => {
        setLoading(true);
        try {
            const { error } = await supabase.from('jobs' as any).update({ is_active: false }).eq('id', jobId);
            if (error) throw error;
            toast({ title: "Success", description: "Job closed successfully!" });
            fetchData();
        } catch (error: any) {
            console.error("Error closing job:", error);
            toast({ title: "Error", description: "Failed to close job.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (jobId: string) => {
        if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('jobs' as any).delete().eq('id', jobId);
            if (error) throw error;
            toast({ title: "Success", description: "Job deleted successfully!" });
            fetchData();
        } catch (error: any) {
            console.error("Error deleting job:", error);
            toast({ title: "Error", description: "Failed to delete job.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    // --- Application Handlers ---

    const handleDeleteApplication = async (appId: string) => {
        if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;
        setLoading(true);
        try {
            await supabase.from('interviews' as any).delete().eq('application_id', appId);
            const { error } = await supabase.from('applications' as any).delete().eq('id', appId);
            if (error) throw error;
            toast({ title: "Success", description: "Application deleted successfully!" });
            setSelectedApp(null);
            fetchData();
        } catch (error: any) {
            console.error("Error deleting application:", error);
            toast({ title: "Error", description: "Failed to delete application.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    // --- Report Handler ---

    const handleGenerateReport = async () => {
        setIsGeneratingReport(true);
        setIsReportOpen(true);
        setHiringReport("");
        try {
            const { data, error } = await supabase.functions.invoke('generate-hiring-report');
            if (error) throw error;
            setHiringReport(data.report);
        } catch (error: any) {
            console.error("Error generating report:", error);
            setHiringReport("**Error generating report.** Please try again.");
            toast({ title: "Error", description: error.message || "Failed to generate report.", variant: "destructive" });
        } finally {
            setIsGeneratingReport(false);
        }
    };


    if (loading && jobs.length === 0 && applications.length === 0) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Hiring Dashboard</h1>
                        <p className="text-white/60 mt-1">Manage jobs, applications, and AI insights.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="border-white/10 hover:bg-white/10 text-white" onClick={handleGenerateReport} disabled={isGeneratingReport}>
                            {isGeneratingReport ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
                            Generate Hiring Report
                        </Button>
                        <Button onClick={() => {
                            setEditingJob(null);
                            setIsPostJobOpen(true);
                        }} className="bg-white text-black hover:bg-white/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Post Job
                        </Button>
                        <Button variant="ghost" onClick={handleLogout} className="text-white/60 hover:text-white">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Dashboard Tabs */}
                <Tabs value={activeDashboardTab} onValueChange={setActiveDashboardTab} className="w-full">
                    <TabsList className="bg-white/5 border border-white/10 w-full justify-start rounded-lg p-1">
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
                                <CardDescription className="text-white/60">Manage candidate applications and view AI insights.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <JobApplicationsTable
                                    applications={applications}
                                    setSelectedApp={setSelectedApp}
                                    handleDeleteApplication={handleDeleteApplication}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="jobs" className="mt-6">
                        <Card className="bg-white/5 border-white/10 text-white">
                            <CardHeader>
                                <CardTitle>Active Job Postings</CardTitle>
                                <CardDescription className="text-white/60">Manage your open positions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <JobPostingsList
                                    jobs={jobs}
                                    setEditingJob={setEditingJob}
                                    setNewJob={setNewJob}
                                    setIsPostJobOpen={setIsPostJobOpen}
                                    handleCloseJob={handleCloseJob}
                                    handleDeleteJob={handleDeleteJob}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Dialogs */}
            <JobPostingDialog
                open={isPostJobOpen}
                onOpenChange={setIsPostJobOpen}
                editingJob={editingJob}
                newJob={newJob}
                setNewJob={setNewJob}
                handleUpdateJob={handleUpdateJob}
                handlePostJob={handlePostJob}
                handleEnhanceDescription={handleEnhanceDescription}
                enhancing={enhancing}
            />

            <CandidateDetailDialog
                open={!!selectedApp}
                onOpenChange={(open) => !open && setSelectedApp(null)}
                selectedApp={selectedApp}
                setSelectedApp={setSelectedApp}
                fetchData={fetchData}
            />

            <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                <DialogContent className="bg-black border-white/10 text-white max-w-4xl h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Sparkles className="text-blue-400" /> AI Hiring Report
                        </DialogTitle>
                        <DialogDescription className="text-white/60">
                            Executive Summary & Candidate Ranking generated by Llama 3.3.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 bg-white/5 p-6 rounded-lg border border-white/10">
                        {hiringReport ? (
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown>{hiringReport}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-white/50">
                                <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-400" />
                                Analyzing candidates...
                            </div>
                        )}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminHiringDashboard;