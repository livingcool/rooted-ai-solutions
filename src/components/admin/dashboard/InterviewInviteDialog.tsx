import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface InterviewInviteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    deadline: string;
    setDeadline: (value: string) => void;
    handleInvite: () => void;
    loading: boolean;
}

export const InterviewInviteDialog = ({
    open,
    onOpenChange,
    deadline,
    setDeadline,
    handleInvite,
    loading
}: InterviewInviteDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-black border-white/10 text-white max-w-sm">
                <DialogHeader>
                    <DialogTitle>Invite to Interview</DialogTitle>
                    <DialogDescription className="text-white/60">
                        Set a deadline for the communication assessment.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Deadline</label>
                        <input
                            type="datetime-local"
                            className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 [color-scheme:dark]"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                    <Button
                        className="w-full bg-white text-black hover:bg-white/90"
                        onClick={handleInvite}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Send Invitation"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
