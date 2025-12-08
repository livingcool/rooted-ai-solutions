import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface TechnicalInviteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectDescription: string;
    setProjectDescription: (value: string) => void;
    technicalDeadline: string;
    setTechnicalDeadline: (value: string) => void;
    handleTechnicalInvite: () => void;
    loading: boolean;
    generatedProjects: any[];
    setGeneratedProjects: (projects: any[]) => void;
    isGeneratingProjects: boolean;
    handleGenerateProjects: () => void;
    customFeedback: string;
    setCustomFeedback: (value: string) => void;
    handleSelectProject: (project: any) => void;
}

export const TechnicalInviteDialog = ({
    open,
    onOpenChange,
    projectDescription,
    setProjectDescription,
    technicalDeadline,
    setTechnicalDeadline,
    handleTechnicalInvite,
    loading,
    generatedProjects,
    setGeneratedProjects,
    isGeneratingProjects,
    handleGenerateProjects,
    customFeedback,
    setCustomFeedback,
    handleSelectProject
}: TechnicalInviteDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
    );
};
