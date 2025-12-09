import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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

export const EnhancedTokenUsageStats = () => {
    const [logs, setLogs] = useState<UsageLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCost, setTotalCost] = useState(0);
    const [whisperStats, setWhisperStats] = useState({ totalSeconds: 0, totalTranscriptions: 0 });

    const PRICING = {
        'groq': { input: 0.59 / 1000000, output: 0.79 / 1000000 },
        'whisper': 0.00003083
    };

    const calculateCost = (data: UsageLog[]) => {
        let sum = 0;
        data.forEach(log => {
            if (log.model.includes('whisper')) {
                sum += log.input_tokens * PRICING.whisper;
            } else {
                const rates = PRICING.groq;
                sum += (log.input_tokens * rates.input) + (log.output_tokens * rates.output);
            }
        });
        setTotalCost(sum);
    };

    const calculateWhisperStats = (data: UsageLog[]) => {
        const whisperLogs = data.filter(log => log.model.includes('whisper'));
        const totalSeconds = whisperLogs.reduce((sum, log) => sum + log.input_tokens, 0);
        setWhisperStats({
            totalSeconds,
            totalTranscriptions: whisperLogs.length
        });
    };

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('ai_usage_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(500);

            if (error) throw error;

            setLogs(data || []);
            calculateCost(data || []);
            calculateWhisperStats(data || []);
        } catch (error: any) {
            console.error("Error fetching logs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();

        const channel = supabase
            .channel('ai-usage-logs-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ai_usage_logs' }, fetchLogs)
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">AI Usage Analytics</h2>
                    <p className="text-white/60 text-sm">Real-time token usage and cost tracking</p>
                </div>
                <Button onClick={fetchLogs} disabled={loading} variant="outline" size="sm">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white/70 flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            Total Tokens
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">
                            {logs.reduce((sum, log) => sum + log.total_tokens, 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-white/50 mt-1">{logs.length} API calls</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white/70 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Estimated Cost
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">
                            ${totalCost.toFixed(4)}
                        </div>
                        <p className="text-xs text-white/50 mt-1">Groq pricing</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white/70">Whisper Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">
                            {Math.floor(whisperStats.totalSeconds / 60)}m {whisperStats.totalSeconds % 60}s
                        </div>
                        <p className="text-xs text-white/50 mt-1">{whisperStats.totalTranscriptions} transcriptions</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white/70 flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Success Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">
                            {logs.length > 0 ? ((logs.filter(l => l.status === 'success').length / logs.length) * 100).toFixed(1) : 0}%
                        </div>
                        <p className="text-xs text-white/50 mt-1">{logs.filter(l => l.status === 'error').length} errors</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Recent API Calls</CardTitle>
                    <CardDescription>Latest AI model invocations</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-white/40" />
                        </div>
                    ) : (
                        <ScrollArea className="h-[500px]">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-black/50 backdrop-blur-sm">
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-3 text-white/70">Time</th>
                                        <th className="text-left p-3 text-white/70">Function</th>
                                        <th className="text-left p-3 text-white/70">Model</th>
                                        <th className="text-right p-3 text-white/70">Input</th>
                                        <th className="text-right p-3 text-white/70">Output</th>
                                        <th className="text-right p-3 text-white/70">Cost</th>
                                        <th className="text-left p-3 text-white/70">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => {
                                        const cost = log.model.includes('whisper')
                                            ? log.input_tokens * PRICING.whisper
                                            : (log.input_tokens * PRICING.groq.input) + (log.output_tokens * PRICING.groq.output);

                                        return (
                                            <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                                                <td className="p-3 text-white/60 text-xs">{new Date(log.created_at).toLocaleString()}</td>
                                                <td className="p-3 text-white/80 font-mono text-xs">{log.function_name}</td>
                                                <td className="p-3">
                                                    <Badge variant="outline" className="text-xs">{log.model.split('/').pop()}</Badge>
                                                </td>
                                                <td className="p-3 text-right text-white/70">{log.input_tokens.toLocaleString()}</td>
                                                <td className="p-3 text-right text-white/70">{log.output_tokens.toLocaleString()}</td>
                                                <td className="p-3 text-right text-green-400 text-xs">${cost.toFixed(6)}</td>
                                                <td className="p-3">
                                                    <Badge variant={log.status === 'success' ? "default" : "destructive"}>{log.status}</Badge>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
