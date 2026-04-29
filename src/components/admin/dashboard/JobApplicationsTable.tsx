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
            <div className="text-center py-12 border-4 border-dashed border-[#240747]/10 rounded-3xl bg-[#F9EFE9]/50">
                <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-40 text-[#240747]">No active applicants found.</p>
            </div>
        );
    }

    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-4 border-[#240747] hover:bg-transparent">
                            <TableHead className="text-[#240747] font-black uppercase tracking-widest text-[0.65rem] py-6">Candidate</TableHead>
                            <TableHead className="text-[#240747] font-black uppercase tracking-widest text-[0.65rem] py-6">Role</TableHead>
                            <TableHead className="text-[#240747] font-black uppercase tracking-widest text-[0.65rem] py-6">Status</TableHead>
                            <TableHead className="text-[#240747] font-black uppercase tracking-widest text-[0.65rem] py-6">AI Score</TableHead>
                            <TableHead className="text-[#240747] font-black uppercase tracking-widest text-[0.65rem] py-6">Date</TableHead>
                            <TableHead className="text-[#240747] font-black uppercase tracking-widest text-[0.65rem] py-6 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map((app) => (
                            <TableRow key={app.id} className="border-b-2 border-[#240747]/10 hover:bg-[#F9EFE9]/50 transition-colors">
                                <TableCell className="py-6">
                                    <div className="font-black text-[#240747]">{app.full_name}</div>
                                    <div className="text-[0.65rem] font-bold text-[#240747]/40 uppercase tracking-widest">{app.email}</div>
                                </TableCell>
                                <TableCell className="font-bold text-[#240747]/70 text-sm">{(app as any).jobs?.title || 'Unknown'}</TableCell>
                                <TableCell>
                                    <span className={getStatusColor(app.status)}>
                                        {app.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {app.ai_score ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-2 bg-[#240747]/10 rounded-full overflow-hidden border border-[#240747]/20">
                                                <div 
                                                    className={`h-full ${app.ai_score >= 80 ? 'bg-green-500' : app.ai_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${app.ai_score}%` }}
                                                />
                                            </div>
                                            <span className={`text-xs font-black ${app.ai_score >= 80 ? 'text-green-600' : app.ai_score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {app.ai_score}%
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-[#240747]/20 font-mono text-xs">NO_DATA</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-[#240747]/50 font-bold text-xs">
                                    {new Date(app.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="nb-btn nb-btn-ghost py-1.5 px-4 text-[0.65rem] h-auto"
                                            onClick={() => setSelectedApp(app)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="nb-btn nb-btn-ghost py-1.5 px-4 text-[0.65rem] h-auto border-red-500/20 text-red-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteApplication(app.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
                {applications.map((app) => (
                    <div key={app.id} className="bg-[#F9EFE9] border-4 border-[#240747] p-6 rounded-2xl shadow-[6px_6px_0_#240747] space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h4 className="text-xl font-black text-[#240747] leading-none">{app.full_name}</h4>
                                <p className="text-[0.65rem] font-bold text-[#240747]/40 uppercase tracking-widest">{app.email}</p>
                            </div>
                            <span className="text-[0.6rem] font-black text-[#240747]/30 uppercase tracking-[0.2em]">
                                {new Date(app.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-[#240747]/5">
                            <div className="space-y-1">
                                <p className="text-[0.55rem] font-black text-[#F6851B] uppercase tracking-widest">Operation</p>
                                <p className="text-sm font-bold text-[#240747]">{(app as any).jobs?.title || 'Unknown'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[0.55rem] font-black text-[#F6851B] uppercase tracking-widest">Status</p>
                                <div>
                                    <span className={getStatusColor(app.status)}>
                                        {app.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                className="flex-1 nb-btn nb-btn-primary py-3 text-xs"
                                onClick={() => setSelectedApp(app)}
                            >
                                <Eye size={14} className="mr-2" />
                                View Brief
                            </button>
                            <button
                                className="nb-btn nb-btn-ghost p-3 border-red-500/20 text-red-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteApplication(app.id);
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
