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

    // Pricing for estimation (per million tokens)
    const PRICING = {
        'groq': { input: 0.59 / 1000000, output: 0.79 / 1000000 },
        'google': { input: 0.075 / 1000000, output: 0.30 / 1000000 }
    };

    const calculateCost = (data: UsageLog[]) => {
        let sum = 0;
        data.forEach(log => {
            const rates = PRICING[log.provider as keyof typeof PRICING] || { input: 0, output: 0 };
            sum += (log.input_tokens * rates.input) + (log.output_tokens * rates.output);
        });
        setTotalCost(sum);
    };

    const fetchLogs = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
            const { data, error } = await supabase
                .from('ai_usage_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) throw error;

            console.log("Fetched Token Usage Logs:", data);
            setLogs(data || []);
            calculateCost(data || []);
        } catch (error: any) {
            console.error("Error fetching logs:", error);
            setErrorMsg(error.message || "Failed to fetch logs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();

        // Real-time subscription
        const channel = supabase
            .channel('ai-usage-logs-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'ai_usage_logs'
                },
                (payload) => {
                    const newLog = payload.new as UsageLog;
                    setLogs((prevLogs) => {
                        const updated = [newLog, ...prevLogs].slice(0, 100); // Keep only last 100
                        calculateCost(updated);
                        return updated;
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const filteredLogs = filterProvider === "all"
        ? logs
        : logs.filter(l => l.provider === filterProvider);

    const totalTokens = filteredLogs.reduce((acc, curr) => acc + curr.total_tokens, 0);
    const avgTokensPerCall = filteredLogs.length > 0 ? Math.round(totalTokens / filteredLogs.length) : 0;

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

            {errorMsg && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
                    <p className="font-semibold">Error loading data:</p>
                    <p className="text-sm">{errorMsg}</p>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTokens.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Across {filteredLogs.length} call{filteredLogs.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Avg: {avgTokensPerCall.toLocaleString()} per call
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estimated Cost</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalCost.toFixed(5)}</div>
                        <p className="text-xs text-muted-foreground">
                            Based on public pricing
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Avg: ${filteredLogs.length > 0 ? (totalCost / filteredLogs.length).toFixed(5) : '0.00000'} per call
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Models</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">Llama 3.3 & Gemini</div>
                        <p className="text-xs text-muted-foreground">
                            Primary AI engines
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Select value={filterProvider} onValueChange={setFilterProvider}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter Provider" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Providers</SelectItem>
                        <SelectItem value="groq">Groq (Llama)</SelectItem>
                        <SelectItem value="google">Google (Gemini)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity Log</CardTitle>
                    <CardDescription>Real-time log of AI function executions (last 100 calls).</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && logs.length === 0 ? (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <ScrollArea className="h-[400px] w-full pr-4">
                            <div className="space-y-3">
                                {filteredLogs.map((log) => (
                                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-accent/50 transition-colors">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant={log.provider === 'groq' ? 'default' : 'secondary'}
                                                    className="uppercase text-[10px] font-semibold"
                                                >
                                                    {log.provider}
                                                </Badge>
                                                <span className="font-semibold text-sm">{log.function_name}</span>
                                                {log.status && log.status !== 'success' && (
                                                    <Badge variant="destructive" className="text-[10px]">
                                                        {log.status}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                                                <span>{new Date(log.created_at).toLocaleString()}</span>
                                                <span>•</span>
                                                <span className="font-mono">{log.model}</span>
                                            </div>
                                        </div>
                                        <div className="text-right ml-4">
                                            <div className="font-mono text-sm font-bold">{log.total_tokens.toLocaleString()} tks</div>
                                            <div className="text-xs text-muted-foreground">
                                                IN: {log.input_tokens.toLocaleString()} / OUT: {log.output_tokens.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredLogs.length === 0 && !loading && (
                                    <div className="text-center py-10 text-muted-foreground">
                                        <p>No logs found.</p>
                                        <p className="text-sm mt-2">Use features like <strong>Retry AI Analysis</strong> or <strong>Generate Report</strong> to generate usage data.</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};