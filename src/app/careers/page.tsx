'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, MapPin, Briefcase, Zap, Globe, Shield, Sparkles, Code, Cpu } from "lucide-react";

const VALUES = [
  { icon: Zap, title: "Production First", desc: "We build systems that survive the factory floor, not just the research paper." },
  { icon: Shield, title: "IP Sovereignty", desc: "Our clients own their intelligence. We build for long-term strategic value." },
  { icon: Globe, title: "Global Impact", desc: "Deploying AI across continents to secure and optimize industrial lifelines." },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs' as any)
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching jobs:', error);
      else setJobs(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9EFE9]">
      {/* ── Hero Section ── */}
      <section className="pt-32 pb-20 border-b-4 border-[#240747] blog-hero">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-8">
              <div className="nb-tag-orange px-4 py-1.5 flex items-center gap-2 rounded-full border-2 border-[#240747] shadow-[2px_2px_0_#240747] w-fit">
                <Sparkles size={14} />
                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">Recruitment v2.5</span>
              </div>
              <h1 className="nb-headline-xl text-[#240747]">
                Build the AI<br />that runs <span className="text-[#F6851B]">the world.</span>
              </h1>
              <p className="max-w-2xl text-lg md:text-xl font-medium text-[#240747]/70 leading-relaxed">
                We're a tactical engineering team scaling global Machine Learning models 
                and high-performance software services. Join us in building the next generation of enterprise intelligence.
              </p>
              <div className="flex gap-4 pt-4">
                <a href="#roles" className="nb-btn nb-btn-primary">View Positions <ArrowRight size={18} /></a>
                <div className="hidden md:flex items-center gap-2 px-6 text-[#240747]/40 font-mono text-xs font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Currently Hiring
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-[#240747] p-8 border-4 border-[#240747] shadow-[12px_12px_0_#F6851B] rounded-3xl space-y-6">
                <div className="w-16 h-16 bg-[#F6851B] rounded-2xl flex items-center justify-center text-[#240747]">
                  <Cpu size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#F9EFE9]">The Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "Rust", "TypeScript", "Distributed Training", "Cloud Infrastructure", "Next.js", "Kubernetes"].map(s => (
                    <span key={s} className="px-3 py-1 bg-[#F9EFE9]/10 border border-[#F9EFE9]/20 text-[#F9EFE9] text-[0.65rem] font-bold uppercase tracking-wider rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 border-b-4 border-[#240747] bg-[#240747]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-[#F9EFE9] border-4 border-[#240747] p-8 shadow-[8px_8px_0_#F6851B] rounded-2xl group hover:translate-x-1 hover:-translate-y-1 transition-transform">
                <v.icon size={40} className="text-[#F6851B] mb-6" />
                <h3 className="text-2xl font-black text-[#240747] mb-4">{v.title}</h3>
                <p className="text-[#240747]/70 font-medium leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="roles" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-16 space-y-4">
            <span className="nb-label-orange">Tactical Deployment</span>
            <h2 className="nb-headline-lg text-[#240747]">Open Operations</h2>
          </div>

          <div className="space-y-6">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-[#240747]/5 border-4 border-[#240747] rounded-2xl animate-pulse" />
              ))
            ) : jobs.length === 0 ? (
              <div className="p-12 text-center border-4 border-dashed border-[#240747]/20 rounded-3xl">
                <p className="font-mono text-sm font-bold uppercase tracking-widest opacity-40">No active operations at this time.</p>
              </div>
            ) : (
              jobs.map((role, i) => (
                <div key={i} className="blog-grid-card group">
                  <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="nb-tag-orange text-[0.6rem]">{role.dept}</span>
                        <span className="text-[0.65rem] font-bold text-[#240747]/40 uppercase tracking-widest">{role.type}</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#240747] group-hover:text-[#F6851B] transition-colors">{role.title}</h3>
                      <div className="flex items-center gap-6 text-[0.7rem] font-bold text-[#240747]/60 uppercase tracking-wider">
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-[#F6851B]" /> {role.location}</div>
                        <div className="flex items-center gap-2"><Briefcase size={14} className="text-[#F6851B]" /> {role.dept}</div>
                      </div>
                    </div>
                    <Link href={`/careers/${role.slug || role.id}`} className="nb-btn nb-btn-primary min-w-[180px]">
                      View Mission <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── General Application ── */}
      <section className="py-24 border-t-4 border-[#240747]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#240747] border-4 border-[#240747] p-8 md:p-16 relative overflow-hidden shadow-[16px_16px_0_#F6851B] rounded-3xl">
            <div className="relative z-10 space-y-8 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-[#F9EFE9] leading-none">
                Don't see <br /> your <span className="text-[#F6851B]">mission?</span>
              </h2>
              <p className="text-[#F9EFE9] text-xl font-medium opacity-80 leading-relaxed">
                We're always looking for high-performance engineers, designers, 
                and strategists who want to build real systems.
              </p>
              <div className="pt-4">
                <a 
                  href="mailto:careers@rootedai.co.in" 
                  className="nb-btn nb-btn-primary text-xl px-12 py-6 rounded-2xl"
                >
                  Send tactical CV <ArrowRight size={24} className="ml-2" />
                </a>
              </div>
            </div>
            {/* Decorative Icons */}
            <div className="absolute top-12 right-12 opacity-5 rotate-12 hidden lg:block">
              <Code size={240} strokeWidth={3} className="text-[#F9EFE9]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
