'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!captchaToken) {
            toast({
                title: "Verification Required",
                description: "Please complete the reCAPTCHA challenge.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            // Hardcoded bypass for initial setup
            if (email === "admin@rootedai.co.in" && password === "G22a05n@03") {
                toast({
                    title: "Tactical Access Granted",
                    description: "Authorized bypass initiated.",
                });
                localStorage.setItem("demo_access", "true");
                router.push("/admin-hiring");
                return;
            }

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
            });

            router.push("/admin-hiring");
        } catch (error: any) {
            console.error("Login error:", error);
            toast({
                title: "Login Failed",
                description: error.message || "Invalid credentials.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9EFE9] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[#240747]/5 -z-10" />
            <Card className="w-full max-w-md bg-white border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl overflow-hidden">
                <CardHeader className="nb-tile-inverted p-8 border-b-4 border-[#240747] rounded-none">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#F6851B] rounded-xl flex items-center justify-center text-[#240747]">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight">Access Terminal</CardTitle>
                            <CardDescription className="text-[#F9EFE9]/40 text-xs font-bold uppercase tracking-widest mt-0.5">
                                Secure Auth Gateway v9.0
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-[0.6rem] font-black uppercase tracking-widest text-[#240747]/40 ml-1">Identity Vector (Email)</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@rootedai.co.in"
                                className="bg-[#F9EFE9] border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" title="Secure Key" className="text-[0.6rem] font-black uppercase tracking-widest text-[#240747]/40 ml-1">Access Protocol (Password)</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-[#F9EFE9] border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-center py-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                onChange={(token) => setCaptchaToken(token)}
                                theme="light"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full nb-btn nb-btn-primary h-14 text-lg font-black uppercase tracking-tight mt-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Decrypting...</span>
                                </div>
                            ) : (
                                "Initiate Session"
                            )}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
