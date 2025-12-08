import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Job } from "@/types/hiring";

interface JobPostingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingJob: Job | null;
    newJob: any;
    setNewJob: (job: any) => void;
    handleUpdateJob: (e: React.FormEvent) => void;
    handlePostJob: (e: React.FormEvent) => void;
    handleEnhanceDescription: () => void;
    enhancing: boolean;
}

export const JobPostingDialog = ({
    open,
    onOpenChange,
    editingJob,
    newJob,
    setNewJob,
    handleUpdateJob,
    handlePostJob,
    handleEnhanceDescription,
    enhancing
}: JobPostingDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-white text-black hover:bg-white/90">
                            {editingJob ? "Update Job" : "Post Job"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
