'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import React from "react";

export default function AdminPassSetPage() {
    const params = useParams();
    const orgSlug = params?.orgSlug;
    const router = useRouter();
    const { toast } = useToast();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                variant: "destructive",
                title: "Passwords do not match",
                description: "Please ensure both passwords are the same.",
            });
            return;
        }

        if (password.length < 6) {
            toast({
                variant: "destructive",
                title: "Password too short",
                description: "Password must be at least 6 characters long.",
            });
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            toast({
                title: "Password Set Successfully",
                description: "Redirecting to your dashboard...",
            });

            router.push(`/${orgSlug}`);

        } catch (error: any) {
            console.error("Error setting password:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.data?.msg || error.message || "Failed to set password",
            });
        } finally {
            setIsLoading(false);
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
                            <CardTitle className="text-2xl font-black uppercase tracking-tight">Security Protocol</CardTitle>
                            <CardDescription className="text-[#F9EFE9]/40 text-xs font-bold uppercase tracking-widest mt-0.5">
                                Set Access Key for {orgSlug?.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#240747]/40 ml-1">New Access Key</label>
                            <Input
                                type="password"
                                placeholder="Min 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-[#F9EFE9] border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#240747]/40 ml-1">Confirm Access Key</label>
                            <Input
                                type="password"
                                placeholder="Re-enter key"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-[#F9EFE9] border-2 border-[#240747] p-4 h-auto rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full nb-btn nb-btn-primary h-14 text-lg font-black uppercase tracking-tight mt-4 flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Finalize Credential
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
