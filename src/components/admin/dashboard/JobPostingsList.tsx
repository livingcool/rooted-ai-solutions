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
    );
};
