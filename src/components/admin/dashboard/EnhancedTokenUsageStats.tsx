import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw, Database, DollarSign, Activity, Zap } from "lucide-react";
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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between nb-tile-inverted p-8 border-4 border-[#240747] shadow-[8px_8px_0_#F6851B] rounded-2xl gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[#F9EFE9] uppercase tracking-tight">AI Resource Intelligence</h2>
                    <p className="text-[#F9EFE9]/60 text-xs font-bold uppercase tracking-widest mt-1">Real-time token telemetry and cost analysis</p>
                </div>
                <button 
                    onClick={fetchLogs} 
                    disabled={loading} 
                    className="nb-btn nb-btn-primary flex items-center gap-2"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Refresh Stream
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border-4 border-[#240747] p-6 shadow-[8px_8px_0_#240747] rounded-2xl">
                    <h4 className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B] mb-4 flex items-center gap-2">
                        <Database className="w-3 h-3" /> Token Volume
                    </h4>
                    <div className="text-4xl font-black text-[#240747]">
                        {logs.reduce((sum, log) => sum + log.total_tokens, 0).toLocaleString()}
                    </div>
                    <p className="text-[0.6rem] font-bold text-[#240747]/40 uppercase tracking-widest mt-2">{logs.length} Operations executed</p>
                </div>

                <div className="bg-white border-4 border-[#240747] p-6 shadow-[8px_8px_0_#240747] rounded-2xl">
                    <h4 className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B] mb-4 flex items-center gap-2">
                        <DollarSign className="w-3 h-3" /> Operational Cost
                    </h4>
                    <div className="text-4xl font-black text-[#240747]">
                        ${totalCost.toFixed(4)}
                    </div>
                    <p className="text-[0.6rem] font-bold text-[#240747]/40 uppercase tracking-widest mt-2">Aggregate expenditure</p>
                </div>

                <div className="bg-white border-4 border-[#240747] p-6 shadow-[8px_8px_0_#240747] rounded-2xl">
                    <h4 className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B] mb-4 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Whisper Telemetry
                    </h4>
                    <div className="text-4xl font-black text-[#240747]">
                        {Math.floor(whisperStats.totalSeconds / 60)}m {whisperStats.totalSeconds % 60}s
                    </div>
                    <p className="text-[0.6rem] font-bold text-[#240747]/40 uppercase tracking-widest mt-2">{whisperStats.totalTranscriptions} Voice decodes</p>
                </div>

                <div className="bg-white border-4 border-[#240747] p-6 shadow-[8px_8px_0_#240747] rounded-2xl">
                    <h4 className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B] mb-4 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Success Rate
                    </h4>
                    <div className="text-4xl font-black text-[#240747]">
                        {logs.length > 0 ? ((logs.filter(l => l.status === 'success').length / logs.length) * 100).toFixed(1) : 0}%
                    </div>
                    <p className="text-[0.6rem] font-bold text-[#240747]/40 uppercase tracking-widest mt-2">{logs.filter(l => l.status === 'error').length} Faults detected</p>
                </div>
            </div>

            <div className="bg-white border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl overflow-hidden">
                <div className="nb-tile-inverted p-6 border-b-4 border-[#240747] rounded-none">
                    <h3 className="text-xl font-black text-[#F9EFE9] uppercase tracking-tight">Operation Logs</h3>
                    <p className="text-[#F9EFE9]/40 text-[0.6rem] font-bold uppercase tracking-widest mt-1">Real-time resource allocation records</p>
                </div>
                <div className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="w-12 h-12 animate-spin text-[#240747]/20" />
                        </div>
                    ) : (
                        <ScrollArea className="h-[600px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-[#F9EFE9] z-10">
                                    <tr className="border-b-4 border-[#240747]">
                                        <th className="p-4 text-[0.65rem] font-black uppercase tracking-widest text-[#240747]">Timestamp</th>
                                        <th className="p-4 text-[0.65rem] font-black uppercase tracking-widest text-[#240747]">Operation</th>
                                        <th className="p-4 text-[0.65rem] font-black uppercase tracking-widest text-[#240747]">Model Unit</th>
                                        <th className="p-4 text-[0.65rem] font-black uppercase tracking-widest text-[#240747] text-right">Volume</th>
                                        <th className="p-4 text-[0.65rem] font-black uppercase tracking-widest text-[#240747] text-right">Cost</th>
                                        <th className="p-4 text-[0.65rem] font-black uppercase tracking-widest text-[#240747]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-[#240747]/10">
                                    {logs.map((log) => {
                                        const cost = log.model.includes('whisper')
                                            ? log.input_tokens * PRICING.whisper
                                            : (log.input_tokens * PRICING.groq.input) + (log.output_tokens * PRICING.groq.output);

                                        return (
                                            <tr key={log.id} className="hover:bg-[#F6851B]/5 transition-colors">
                                                <td className="p-4 text-[0.65rem] font-bold text-[#240747]/60">{new Date(log.created_at).toLocaleString()}</td>
                                                <td className="p-4 text-[0.7rem] font-black text-[#240747] uppercase">{log.function_name}</td>
                                                <td className="p-4">
                                                    <span className="nb-tag-orange text-[0.6rem] px-2 py-0.5">{log.model.split('/').pop()}</span>
                                                </td>
                                                <td className="p-4 text-right font-mono text-[0.7rem] font-bold">{log.total_tokens.toLocaleString()}</td>
                                                <td className="p-4 text-right text-green-600 font-black text-[0.7rem]">${cost.toFixed(6)}</td>
                                                <td className="p-4">
                                                    <span className={`text-[0.6rem] font-black uppercase tracking-widest ${log.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </ScrollArea>
                    )}
                </div>
            </div>
        </div>
    );
};
