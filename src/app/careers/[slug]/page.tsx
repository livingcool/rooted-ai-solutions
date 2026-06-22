'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Calendar, Shield, Zap, Sparkles, CheckCircle2, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobApplicationForm } from "@/components/hiring/JobApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function JobDetailPage() {
    const params = useParams();
    const slugOrId = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string || "");
    const router = useRouter();
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isApplyOpen, setIsApplyOpen] = useState(false);

    useEffect(() => {
        if (slugOrId) fetchJob();
    }, [slugOrId]);

    const fetchJob = async () => {
        try {
            // Check if slugOrId is a UUID
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

            let data, error;

            if (isUuid) {
                // If it's a UUID, try by ID first
                const { data: idData, error: idError } = await supabase
                    .from('jobs' as any)
                    .select('*')
                    .eq('id', slugOrId)
                    .single();
                data = idData;
                error = idError;
            } else {
                // Otherwise try by slug
                const { data: slugData, error: slugError } = await supabase
                    .from('jobs' as any)
                    .select('*')
                    .eq('slug', slugOrId)
                    .single();
                data = slugData;
                error = slugError;
            }

            if (error || !data) {
                console.error('Error fetching job:', error);
                router.push('/careers');
                return;
            }

            setJob(data);
        } catch (error) {
            console.error('Error:', error);
            router.push('/careers');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9EFE9]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#240747] border-t-[#F6851B] rounded-full animate-spin"></div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#240747]">Accessing Mission Brief...</span>
                </div>
            </div>
        );
    }

    if (!job) return null;

    return (
        <div className="min-h-screen bg-[#F9EFE9] text-[#240747]">
            {/* ── Mission Header ── */}
            <header className="pt-32 pb-20 border-b-4 border-[#240747] bg-[#F9EFE9] blog-hero relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <Link href="/careers" className="nb-btn nb-btn-ghost mb-12 inline-flex items-center gap-2 py-2 px-4 text-xs">
                        <ArrowLeft size={14} /> Back to Operations
                    </Link>

                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="nb-tag-orange">{job.department || "Engineering"}</span>
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-40">Role ID: {job.id?.slice(0,8)}</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight max-w-4xl">
                            {job.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 pt-8 border-t-2 border-[#240747]/10">
                            <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider opacity-60">
                                <MapPin size={14} className="text-[#F6851B]" /> {job.location || "Remote"}
                            </div>
                            <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider opacity-60">
                                <Briefcase size={14} className="text-[#F6851B]" /> {job.type || "Full-time"}
                            </div>
                            {job.salary_range && (
                                <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider opacity-60">
                                    <DollarSign size={14} className="text-[#F6851B]" /> {job.salary_range}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="py-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Sidebar / Apply */}
                        <aside className="lg:col-span-4 lg:order-last">
                            <div className="sticky top-32 space-y-8">
                                <div className="bg-[#240747] p-8 border-4 border-[#240747] shadow-[12px_12px_0_#F6851B] rounded-3xl text-[#F9EFE9] space-y-6">
                                    <h3 className="text-2xl font-black">Ready to Deploy?</h3>
                                    <p className="opacity-70 text-sm leading-relaxed">
                                        Join a tactical team building high-stakes AI architectures for global industries.
                                    </p>
                                    
                                    <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="lg" className="w-full bg-[#F6851B] text-[#240747] hover:bg-[#F9EFE9] hover:scale-[1.02] transition-all font-black py-6 rounded-xl border-b-4 border-[#240747]">
                                                Initialize Application
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-[#F9EFE9] border-4 border-[#240747] p-0 overflow-y-auto max-w-2xl max-h-[90vh]">
                                            <div className="bg-[#240747] p-6 border-b-4 border-[#240747] sticky top-0 z-10">
                                                <h2 className="text-2xl font-black text-[#F9EFE9]">Application Portal</h2>
                                                <p className="text-[#F6851B] text-[0.6rem] font-bold uppercase tracking-widest mt-1">Target Role: {job.title}</p>
                                            </div>
                                            <div className="p-8">
                                                <JobApplicationForm
                                                    jobId={job.id}
                                                    jobTitle={job.title}
                                                    onSuccess={() => {
                                                        setIsApplyOpen(false);
                                                    }}
                                                />
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <div className="pt-6 border-t border-[#F9EFE9]/10 space-y-4">
                                        <div className="flex items-center gap-3 text-xs font-bold">
                                            <CheckCircle2 size={16} className="text-[#F6851B]" /> Verified Opportunity
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-bold">
                                            <Shield size={16} className="text-[#F6851B]" /> IP Protected Workflow
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-8 border-4 border-[#240747] rounded-3xl space-y-4">
                                    <h4 className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Operation Support</h4>
                                    <p className="text-xs font-bold opacity-60">Questions about the mission?</p>
                                    <a href="mailto:careers@rootedai.co.in" className="block text-sm font-black hover:text-[#F6851B] underline">careers@rootedai.co.in</a>
                                </div>
                            </div>
                        </aside>

                        {/* Role Details */}
                        <div className="lg:col-span-8 space-y-16">
                            <section className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-[#240747]">Mission Briefing</h2>
                                    <div className="h-1.5 w-24 bg-[#F6851B] border border-[#240747]"></div>
                                </div>
                                <div className="prose prose-lg max-w-none prose-p:text-[#240747]/80 prose-p:font-medium prose-p:leading-relaxed whitespace-pre-wrap">
                                    {job.description}
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-[#240747]">Requirements</h2>
                                    <div className="h-1.5 w-24 bg-[#F6851B] border border-[#240747]"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Array.isArray(job.requirements) ? job.requirements.map((req: string, i: number) => (
                                        <div key={i} className="flex items-start gap-4 p-5 bg-white border-2 border-[#240747] shadow-[4px_4px_0_#240747] rounded-xl">
                                            <div className="mt-1 w-5 h-5 flex-shrink-0 bg-[#F6851B] border border-[#240747] flex items-center justify-center">
                                                <Zap size={10} className="text-[#240747] fill-current" />
                                            </div>
                                            <span className="text-sm font-bold text-[#240747]">{req}</span>
                                        </div>
                                    )) : (
                                        <p className="text-[#240747]/70 font-medium italic">Contact operations for specific technical requirements.</p>
                                    )}
                                </div>
                            </section>

                            {/* Share / Footer */}
                            <div className="pt-12 border-t-2 border-[#240747]/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-[0.6rem] font-black uppercase tracking-widest opacity-40 text-[#240747]">Share Mission</span>
                                    <div className="flex gap-2">
                                        {/* Social placeholders using Neobrutalist buttons */}
                                        <button className="nb-btn nb-btn-ghost p-2 rounded-lg"><Twitter size={14} /></button>
                                        <button className="nb-btn nb-btn-ghost p-2 rounded-lg"><Linkedin size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Values Re-entry ── */}
            <section className="py-24 border-t-4 border-[#240747] bg-[#240747]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-12 justify-between items-center">
                        <div className="space-y-4 max-w-xl text-center md:text-left">
                            <h3 className="text-3xl md:text-5xl font-black text-[#F9EFE9]">The Rooted Advantage.</h3>
                            <p className="text-[#F9EFE9]/70 font-medium">Build software that actually matters. No fluff, no "vanity" features. Pure tactical engineering.</p>
                        </div>
                        <Link href="/careers" className="nb-btn nb-btn-primary text-xl px-10 py-5 rounded-2xl">
                            Explore All Positions
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
