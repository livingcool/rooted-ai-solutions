// Part 2 - Charts and Detailed Analytics
// Append this to the EnhancedTokenUsageStats.tsx component

return (
    <div className="space-y-6">
        {/* ... (Previous code from Part 1) ... */}

        {/* Daily Limits Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyLimits.map(limit => {
                const config = GROQ_LIMITS[limit.model as keyof typeof GROQ_LIMITS];
                if (!config) return null;

                const isWarning = limit.percentage >= 80;
                const isCritical = limit.percentage >= 100;

                return (
                    <Card key={limit.model} className="bg-white/5 border-white/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white flex items-center justify-between">
                                <span>{config.label} Daily Limit</span>
                                <Badge variant={isCritical ? "destructive" : isWarning ? "default" : "outline"}>
                                    {limit.percentage.toFixed(1)}%
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Progress
                                    value={Math.min(limit.percentage, 100)}
                                    className="h-2"
                                    indicatorClassName={isCritical ? "bg-red-500" : isWarning ? "bg-yellow-500" : "bg-green-500"}
                                />
                                <div className="flex justify-between text-xs text-white/60">
                                    <span>{limit.usage.toLocaleString()} {config.unit}</span>
                                    <span>{limit.limit.toLocaleString()} {config.unit} limit</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Per-Function Usage Chart */}
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="w-5 h-5" />
                        Token Usage by Function
                    </CardTitle>
                    <CardDescription>Total tokens consumed per Edge Function</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={functionUsage.slice(0, 8)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="function_name"
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                            />
                            <YAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="total_tokens" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Model Distribution Pie Chart */}
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Zap className="w-5 h-5" />
                        Model Distribution
                    </CardTitle>
                    <CardDescription>Token usage by AI model</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={modelDistribution.slice(0, 6)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name.split('/').pop()}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {modelDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        {/* Per-Function Details Table */}
        <Card className="bg-white/5 border-white/10">
            <CardHeader>
                <CardTitle className="text-white">Function-Level Analytics</CardTitle>
                <CardDescription>Detailed breakdown of token usage and costs per function</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px]">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-black/50 backdrop-blur-sm">
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-white/70">Function</th>
                                <th className="text-right p-3 text-white/70">Calls</th>
                                <th className="text-right p-3 text-white/70">Tokens</th>
                                <th className="text-right p-3 text-white/70">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {functionUsage.map((func, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-3 text-white font-mono text-xs">{func.function_name}</td>
                                    <td className="p-3 text-right text-white/80">{func.call_count}</td>
                                    <td className="p-3 text-right text-white/80">{func.total_tokens.toLocaleString()}</td>
                                    <td className="p-3 text-right text-green-400">${func.cost.toFixed(6)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ScrollArea>
            </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex gap-4 items-center">
            <Select value={filterProvider} onValueChange={setFilterProvider}>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                    <SelectValue placeholder="Filter by provider" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="groq">Groq</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filterModel} onValueChange={setFilterModel}>
                <SelectTrigger className="w-[250px] bg-white/5 border-white/10">
                    <SelectValue placeholder="Filter by model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Models</SelectItem>
                    {uniqueModels.map(model => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="text-sm text-white/60">
                Showing {filteredLogs.length} of {logs.length} logs
            </div>
        </div>

        {/* Recent Logs Table */}
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
                                    <th className="text-left p-3 text-white/70">Timestamp</th>
                                    <th className="text-left p-3 text-white/70">Function</th>
                                    <th className="text-left p-3 text-white/70">Model</th>
                                    <th className="text-right p-3 text-white/70">Input</th>
                                    <th className="text-right p-3 text-white/70">Output</th>
                                    <th className="text-right p-3 text-white/70">Total</th>
                                    <th className="text-right p-3 text-white/70">Cost</th>
                                    <th className="text-left p-3 text-white/70">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log) => {
                                    let cost = 0;
                                    if (log.model.includes('whisper')) {
                                        cost = log.input_tokens * PRICING.whisper;
                                    } else {
                                        const rates = PRICING[log.provider as 'groq' | 'google'];
                                        if (typeof rates === 'object') {
                                            cost = (log.input_tokens * rates.input) + (log.output_tokens * rates.output);
                                        }
                                    }

                                    return (
                                        <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-3 text-white/60 text-xs">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="p-3 text-white/80 font-mono text-xs">{log.function_name}</td>
                                            <td className="p-3">
                                                <Badge variant="outline" className="text-xs">
                                                    {log.model.split('/').pop()}
                                                </Badge>
                                            </td>
                                            <td className="p-3 text-right text-white/70">{log.input_tokens.toLocaleString()}</td>
                                            <td className="p-3 text-right text-white/70">{log.output_tokens.toLocaleString()}</td>
                                            <td className="p-3 text-right text-white">{log.total_tokens.toLocaleString()}</td>
                                            <td className="p-3 text-right text-green-400 text-xs">${cost.toFixed(6)}</td>
                                            <td className="p-3">
                                                <Badge variant={log.status === 'success' ? "default" : "destructive"}>
                                                    {log.status}
                                                </Badge>
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
