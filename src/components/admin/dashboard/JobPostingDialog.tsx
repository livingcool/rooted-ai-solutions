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
            <DialogContent className="bg-[#F9EFE9] border-4 border-[#240747] p-0 overflow-hidden max-w-2xl shadow-[12px_12px_0_#240747] rounded-3xl">
                <div className="nb-tile-inverted p-8 border-b-4 border-[#240747] rounded-none">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black text-[#F9EFE9] uppercase tracking-tight">{editingJob ? "Edit Operation" : "New Operation"}</DialogTitle>
                        <DialogDescription className="text-[#F9EFE9]/40 text-xs font-bold uppercase tracking-widest mt-1">
                            {editingJob ? "Update tactical mission details." : "Initialize a new operational role."}
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <form onSubmit={editingJob ? handleUpdateJob : handlePostJob} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Department</label>
                            <select
                                className="w-full bg-white border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
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
                        <div className="space-y-3">
                            <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Contract Type</label>
                            <select
                                className="w-full bg-white border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
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

                    <div className="space-y-3">
                        <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Role Title</label>
                        <input
                            className="w-full bg-white border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                            value={newJob.title}
                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                            placeholder="e.g. Tactical AI Engineer"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Budget / Salary Range</label>
                            <input
                                className="w-full bg-white border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                                value={newJob.salary_range}
                                onChange={(e) => setNewJob({ ...newJob, salary_range: e.target.value })}
                                placeholder="e.g. $80k - $120k"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Mission Description</label>
                            <button
                                type="button"
                                onClick={handleEnhanceDescription}
                                disabled={enhancing}
                                className="nb-btn nb-btn-ghost py-1 px-3 text-[0.6rem] h-auto flex items-center gap-2 border-[#F6851B]/20 text-[#F6851B]"
                            >
                                {enhancing ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                    <Sparkles className="w-3 h-3" />
                                )}
                                AI Enhance
                            </button>
                        </div>
                        <textarea
                            className="w-full min-h-[120px] bg-white border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                            value={newJob.description}
                            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Mission Requirements (Comma Separated)</label>
                        <textarea
                            className="w-full min-h-[100px] bg-white border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                            value={newJob.requirements}
                            onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                            placeholder="PyTorch, Distributed Systems, High-Performance Compute..."
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t-2 border-[#240747]/5">
                        <button type="button" onClick={() => onOpenChange(false)} className="nb-btn nb-btn-ghost py-3 px-8">
                            Cancel
                        </button>
                        <button type="submit" className="nb-btn nb-btn-primary py-3 px-12 text-lg">
                            {editingJob ? "Update Mission" : "Deploy Mission"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
