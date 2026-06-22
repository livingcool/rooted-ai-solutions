'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { EnhancedTokenUsageStats } from "@/components/admin/dashboard/EnhancedTokenUsageStats";

export default function AdminHiringDashboardPage() {
    const { toast } = useToast();
    const router = useRouter();

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
        const demoAccess = localStorage.getItem("demo_access");
        
        if (!session && !demoAccess) {
            router.push("/login");
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("demo_access");
        router.push("/login");
    };

    const fetchData = async () => {
        try {
            const { data: jobsData, error: jobsError } = await supabase
                .from('jobs' as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (jobsError) throw jobsError;
            setJobs(jobsData as unknown as Job[]);

            const { data: appsData, error: appsError } = await supabase
                .from('applications' as any)
                .select('*, jobs(id, title, description, technical_problem_statement), interviews(*), technical_assessments(*), final_interviews(*)')
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

    // Sync selectedApp when applications list updates
    useEffect(() => {
        if (selectedApp) {
            const updatedApp = applications.find(app => app.id === selectedApp.id);
            if (updatedApp) {
                if (JSON.stringify(updatedApp) !== JSON.stringify(selectedApp)) {
                    setSelectedApp(updatedApp);
                }
            }
        }
    }, [applications]);

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
            const { data, error } = await supabase.functions.invoke('enhance-job-description', {
                body: {
                    title: newJob.title,
                    description: newJob.description,
                    requirements: newJob.requirements
                }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

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

    const handleDeleteApplication = async (appId: string) => {
        if (!confirm("Are you sure you want to delete this application? This action cannot be undone and will remove all associated data (Resume, Videos, Interviews).")) return;
        setLoading(true);
        try {
            const { error } = await supabase.functions.invoke('delete-application', {
                body: { applicationId: appId }
            });

            if (error) throw error;

            toast({ title: "Success", description: "Application and all data deleted successfully!" });
            setSelectedApp(null);
            fetchData();
        } catch (error: any) {
            console.error("Error deleting application:", error);
            toast({ title: "Error", description: error.message || "Failed to delete application.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

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
        return (
            <div className="min-h-screen bg-[#F9EFE9] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#240747] border-t-[#F6851B] rounded-full animate-spin"></div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#240747]">Initializing Ops...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9EFE9] text-[#240747] p-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 nb-tile-inverted p-8 border-4 border-[#240747] shadow-[8px_8px_0_#F6851B] rounded-3xl">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tight">Hiring Dashboard</h1>
                            <span className="nb-tag-orange text-[0.6rem]">v3.0 Secure</span>
                        </div>
                        <p className="text-[#F9EFE9]/60 font-medium italic">Manage tactical roles, intelligence applications, and AI mission reports.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={handleGenerateReport} 
                            disabled={isGeneratingReport}
                            className="nb-btn nb-btn-ghost border-[#F9EFE9]/20 text-[#F9EFE9] hover:bg-[#F9EFE9]/10"
                        >
                            {isGeneratingReport ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
                            AI Mission Report
                        </button>
                        <button 
                            onClick={() => {
                                setEditingJob(null);
                                setIsPostJobOpen(true);
                            }} 
                            className="nb-btn nb-btn-primary"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Operation
                        </button>
                        <button 
                            onClick={handleLogout} 
                            className="nb-btn nb-btn-ghost border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>

                <Tabs value={activeDashboardTab} onValueChange={setActiveDashboardTab} className="w-full space-y-8">
                    <TabsList className="bg-transparent border-b-4 border-[#240747] w-full justify-start rounded-none h-auto p-0 gap-8">
                        <TabsTrigger 
                            value="applications" 
                            className="data-[state=active]:bg-[#240747] data-[state=active]:text-[#F9EFE9] border-t-4 border-x-4 border-transparent data-[state=active]:border-[#240747] rounded-t-2xl px-8 py-4 font-black uppercase tracking-widest text-[0.7rem] transition-all"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Applications
                        </TabsTrigger>
                        <TabsTrigger 
                            value="jobs" 
                            className="data-[state=active]:bg-[#240747] data-[state=active]:text-[#F9EFE9] border-t-4 border-x-4 border-transparent data-[state=active]:border-[#240747] rounded-t-2xl px-8 py-4 font-black uppercase tracking-widest text-[0.7rem] transition-all"
                        >
                            <Briefcase className="w-4 h-4 mr-2" />
                            Operations
                        </TabsTrigger>
                        <TabsTrigger 
                            value="usage" 
                            className="data-[state=active]:bg-[#240747] data-[state=active]:text-[#F9EFE9] border-t-4 border-x-4 border-transparent data-[state=active]:border-[#240747] rounded-t-2xl px-8 py-4 font-black uppercase tracking-widest text-[0.7rem] transition-all"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Intelligence
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="applications" className="mt-0 focus-visible:outline-none">
                        <div className="bg-white border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl overflow-hidden">
                            <div className="nb-tile-inverted p-6 border-b-4 border-[#240747] rounded-none">
                                <h3 className="text-xl font-black text-[#F9EFE9]">Incoming Talent Feed</h3>
                                <p className="text-[#F9EFE9]/40 text-xs font-bold uppercase tracking-widest mt-1">Reviewing mission applicants.</p>
                            </div>
                            <div className="p-8">
                                <JobApplicationsTable
                                    applications={applications}
                                    setSelectedApp={setSelectedApp}
                                    handleDeleteApplication={handleDeleteApplication}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="jobs" className="mt-0 focus-visible:outline-none">
                        <div className="bg-white border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl overflow-hidden">
                            <div className="nb-tile-inverted p-6 border-b-4 border-[#240747] rounded-none">
                                <h3 className="text-xl font-black text-[#F9EFE9]">Active Mission Control</h3>
                                <p className="text-[#F9EFE9]/40 text-xs font-bold uppercase tracking-widest mt-1">Deploying new operational roles.</p>
                            </div>
                            <div className="p-8">
                                <JobPostingsList
                                    jobs={jobs}
                                    setEditingJob={setEditingJob}
                                    setNewJob={setNewJob}
                                    setIsPostJobOpen={setIsPostJobOpen}
                                    handleCloseJob={handleCloseJob}
                                    handleDeleteJob={handleDeleteJob}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="usage" className="mt-0 focus-visible:outline-none">
                        <div className="bg-white border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl p-8">
                            <EnhancedTokenUsageStats />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

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
                <DialogContent className="bg-[#F9EFE9] border-4 border-[#240747] p-0 overflow-hidden max-w-4xl h-[85vh] flex flex-col shadow-[16px_16px_0_#240747] rounded-3xl">
                    <div className="nb-tile-inverted p-8 border-b-4 border-[#240747] rounded-none">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-[#F9EFE9] uppercase tracking-tight flex items-center gap-3">
                                <Sparkles className="text-[#F6851B]" /> AI Mission Intelligence
                            </DialogTitle>
                            <DialogDescription className="text-[#F9EFE9]/40 text-xs font-bold uppercase tracking-widest mt-1">
                                Tactical candidate assessment and operational ranking.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <div className="flex-1 overflow-hidden p-8 flex flex-col gap-6">
                        <ScrollArea className="flex-1 bg-white border-4 border-[#240747] p-8 rounded-2xl shadow-[8px_8px_0_#240747] overflow-y-auto">
                            {hiringReport ? (
                                <div className="prose prose-lg max-w-none prose-headings:text-[#240747] prose-headings:font-black prose-p:text-[#240747]/80 prose-p:font-medium prose-strong:text-[#F6851B]">
                                    <ReactMarkdown>{hiringReport}</ReactMarkdown>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full gap-6">
                                    <div className="w-16 h-16 border-8 border-[#240747]/5 border-t-[#F6851B] rounded-full animate-spin"></div>
                                    <div className="text-center space-y-2">
                                        <p className="font-black text-xl text-[#240747] uppercase tracking-tight">Synthesizing Intelligence...</p>
                                        <p className="text-[#240747]/40 text-[0.65rem] font-bold uppercase tracking-[0.2em]">Analyzing operational performance and candidate fit.</p>
                                    </div>
                                </div>
                            )}
                        </ScrollArea>
                        <div className="flex justify-end pt-2">
                            <button onClick={() => setIsReportOpen(false)} className="nb-btn nb-btn-primary px-12">
                                Acknowledge Brief
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
