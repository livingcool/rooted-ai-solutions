import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobApplication } from "@/types/hiring";
import { getStatusColor } from "@/utils/adminUtils";

interface JobApplicationsTableProps {
    applications: JobApplication[];
    setSelectedApp: (app: JobApplication) => void;
    handleDeleteApplication: (id: string) => void;
}

export const JobApplicationsTable = ({
    applications,
    setSelectedApp,
    handleDeleteApplication
}: JobApplicationsTableProps) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
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
        </div>
    );
};
