'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";

export default function CandidateLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.functions.invoke('verify-candidate', {
                body: { email, accessCode }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            // Store session
            sessionStorage.setItem('candidateId', data.applicationId);
            sessionStorage.setItem('candidateName', data.candidateName);

            toast({
                title: "Login Successful",
                description: `Welcome, ${data.candidateName}!`,
            });

            if (data.status === 'Technical Round') {
                router.push('/technical-assessment');
            } else {
                router.push('/assessment');
            }

        } catch (error: any) {
            console.error("Login error:", error);

            let message = error.message || "Invalid credentials";

            if (message.includes("Edge Function returned a non-2xx status code")) {
                message = "Login failed. Please check your credentials.";
            }

            if (error instanceof Error && error.message.includes("deadline")) {
                message = error.message;
            }

            toast({
                title: "Login Failed",
                description: message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-white/10 rounded-full">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Candidate Login</CardTitle>
                    <CardDescription className="text-center text-white/60">
                        Enter your email and the access code sent to you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-white/20"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="code">Access Code</Label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="XXXXXXXX"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-white/20 uppercase tracking-widest"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-white text-black hover:bg-white/90"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Start Assessment"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
