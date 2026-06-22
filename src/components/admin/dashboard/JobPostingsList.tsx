import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/hiring";

interface JobPostingsListProps {
    jobs: Job[];
    setEditingJob: (job: Job) => void;
    setNewJob: (job: any) => void;
    setIsPostJobOpen: (open: boolean) => void;
    handleCloseJob: (id: string) => void;
    handleDeleteJob: (id: string) => void;
}

export const JobPostingsList = ({
    jobs,
    setEditingJob,
    setNewJob,
    setIsPostJobOpen,
    handleCloseJob,
    handleDeleteJob
}: JobPostingsListProps) => {
    return (
        <div className="grid gap-6">
            {jobs.map((job) => (
                <div key={job.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-[#F9EFE9] border-4 border-[#240747] shadow-[4px_4px_0_#240747] gap-4">
                    <div className="space-y-3">
                        <h4 className="text-2xl font-black text-[#240747]">{job.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="nb-tag-orange text-[0.6rem]">{job.type}</span>
                            {job.is_active ? (
                                <span className="px-2 py-0.5 bg-green-500 border-2 border-[#240747] text-[#240747] text-[0.6rem] font-bold uppercase tracking-widest rounded-md shadow-[2px_2px_0_#240747]">Active</span>
                            ) : (
                                <span className="px-2 py-0.5 bg-gray-400 border-2 border-[#240747] text-[#240747] text-[0.6rem] font-bold uppercase tracking-widest rounded-md shadow-[2px_2px_0_#240747]">Closed</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 w-full md:w-auto mt-2 md:mt-0">
                        <button
                            className="nb-btn nb-btn-primary py-2 px-6 text-xs h-auto"
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
                        </button>
                        <button
                            className="nb-btn nb-btn-ghost py-2 px-6 text-xs h-auto border-red-500/40 text-red-600"
                            onClick={() => handleCloseJob(job.id)}
                            disabled={!job.is_active}
                        >
                            Close
                        </button>
                        <button
                            className="nb-btn nb-btn-ghost py-2 px-6 text-xs h-auto border-red-500/40 text-red-600"
                            onClick={() => handleDeleteJob(job.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {jobs.length === 0 && (
                <div className="text-center py-12 border-4 border-dashed border-[#240747]/10 rounded-3xl">
                    <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-40 text-[#240747]">No active operations found.</p>
                </div>
            )}
        </div>
    );
};
