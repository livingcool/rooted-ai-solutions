
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw, Database, DollarSign, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsageLog {
    id: string;
    created_at: string;
    provider: string;
    model: string;
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    function_name: string;
    status: string;
}

export const TokenUsageStats = () => {
    const [logs, setLogs] = useState<UsageLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterProvider, setFilterProvider] = useState<string>("all");
    const [totalCost, setTotalCost] = useState(0);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Hardcoded pricing for estimation
    const PRICING = {
        'groq': { input: 0.59 / 1000000, output: 0.79 / 1000000 },
        'google': { input: 0.075 / 1000000, output: 0.30 / 1000000 }
    };

    const fetchLogs = async () => {
        setLoading(true);
        setErrorMsg(null);
        const { data, error } = await supabase
            .from('ai_usage_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            console.error("Error fetching logs:", error);
            setErrorMsg(error.message);
        } else {
            console.log("Fetched Token Usage Logs:", data);
            setLogs(data || []);
            calculateCost(data || []);
        }
        setLoading(false);
    };

    // ... (rest of code)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">AI Token Usage</h2>
                    <p className="text-muted-foreground">Monitor consumption across Groq & Gemini.</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                    Refresh
                </Button>
            </div>

            {/* ... Cards ... */}

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Recent Activity Log</CardTitle>
                    <CardDescription>Real-time log of AI function executions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px] w-full pr-4">
                        <div className="space-y-4">
                            {filteredLogs.map((log) => (
                                <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-accent/50 transition-colors">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant={log.provider === 'groq' ? 'default' : 'secondary'} className="uppercase text-[10px]">
                                                {log.provider}
                                            </Badge>
                                            <span className="font-semibold text-sm">{log.function_name}</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                                            <span>{new Date(log.created_at).toLocaleString()}</span>
                                            <span>•</span>
                                            <span>{log.model}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-sm font-bold">{log.total_tokens} tks</div>
                                        <div className="text-xs text-muted-foreground">
                                            I: {log.input_tokens} / O: {log.output_tokens}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredLogs.length === 0 && (
                                <div className="text-center py-10 text-muted-foreground">
                                    No logs found. Use features like <strong>Retry AI Analysis</strong> or <strong>Generate Questions</strong> to generate usage data.
                                </div>
                            )}
                            {errorMsg && (
                                <div className="text-center py-10 text-red-400">
                                    Error loading data: {errorMsg}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};
