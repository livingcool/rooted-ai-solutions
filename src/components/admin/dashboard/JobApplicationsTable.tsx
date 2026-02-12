import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobApplication } from "@/types/hiring";
import { getStatusColor } from "@/utils/adminUtils";
import { Eye, Trash2 } from "lucide-react";

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
    if (applications.length === 0) {
        return (
            <div className="text-center py-8 text-white/40 bg-white/5 border border-white/10 rounded-lg">
                No applications found.
            </div>
        );
    }

    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:block bg-white/5 border border-white/10 rounded-lg overflow-hidden">
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
                    </TableBody>
                </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {applications.map((app) => (
                    <Card key={app.id} className="bg-white/5 border-white/10 text-white">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-bold">{app.full_name}</CardTitle>
                                    <p className="text-sm text-white/40">{app.email}</p>
                                </div>
                                <span className="text-xs text-white/40">
                                    {new Date(app.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-white/60 mb-1">Role</p>
                                <p className="text-sm font-medium">{(app as any).jobs?.title || 'Unknown'}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-white/60 mb-1">Status</p>
                                    <Badge className={`${getStatusColor(app.status)} border-0`}>
                                        {app.status}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-xs text-white/60 mb-1 text-right">AI Score</p>
                                    {app.ai_score ? (
                                        <span className={`font-bold ${app.ai_score >= 80 ? 'text-green-400' : app.ai_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {app.ai_score}%
                                        </span>
                                    ) : (
                                        <span className="text-white/20">-</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2 mt-2 border-t border-white/10">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-white/10 hover:bg-white/10 text-white h-11"
                                    onClick={() => setSelectedApp(app)}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 h-11"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteApplication(app.id);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};
