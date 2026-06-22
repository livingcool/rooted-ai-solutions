'use client';

import Link from "next/link";
import { ArrowRight, Cpu, Activity, CheckCircle2, XCircle, Terminal, ArrowUpRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function MLaaSPage() {
  const { openLeadModal } = useModal();
  return (
    <div style={{ background: "#240747", color: "#F9EFE9" }} className="min-h-screen">
      
      {/* LAYER 1: Hero / Hook */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[#3b126d]">
        <div style={{ maxWidth: 1320 }} className="mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Tagline */}
            <span 
              style={{ fontFamily: "var(--font-mono)", color: "#F6851B" }} 
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-6"
            >
              MLAAS FOR WAREHOUSE ROBOTICS · INDIA
            </span>
            
            {/* Headline */}
            <h1 
              style={{ fontFamily: "var(--font-display)", lineHeight: 0.95, color: "#F9EFE9" }} 
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8"
            >
              Your robot sees perfectly in the lab.<br />
              <span style={{ color: "#F6851B" }}>We fix it for the floor.</span>
            </h1>
            
            {/* Sub-headline */}
            <p 
              style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.85)" }} 
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-3xl"
            >
              Object detection fine-tuning, continuous model performance monitoring, and data labeling pipelines—deployed into your existing ROS/WMS stack in 4 weeks. No downtime. Your IP, fully secured.
            </p>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button 
                onClick={openLeadModal}
                style={{ backgroundColor: "#F6851B", color: "#240747" }}
                className="nb-btn px-8 py-4 font-bold text-center flex items-center justify-center gap-2 hover:bg-[#ff9736] transition-colors rounded-xl cursor-pointer border-none"
              >
                Book Free ML Audit <ArrowRight size={18} />
              </button>
              <Link 
                href="/case-studies" 
                style={{ color: "#F9EFE9", borderColor: "rgba(249, 239, 233, 0.3)" }}
                className="px-8 py-4 border text-center flex items-center justify-center gap-2 hover:bg-[#F9EFE9]/10 transition-colors rounded-xl font-bold"
              >
                View Case Studies <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 border border-[#F9EFE9]/10 bg-[#2d0a56] divide-y md:divide-y-0 md:divide-x divide-[#F9EFE9]/10 rounded-xl overflow-hidden">
            <div className="p-6 md:p-8 text-center md:text-left">
              <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-3xl md:text-4xl font-extrabold mb-1">4 Wk</div>
              <div style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.6)" }} className="text-xs uppercase tracking-wider">Avg. Deployment</div>
            </div>
            <div className="p-6 md:p-8 text-center md:text-left">
              <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-3xl md:text-4xl font-extrabold mb-1">20%+</div>
              <div style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.6)" }} className="text-xs uppercase tracking-wider">Pick Efficiency Gain</div>
            </div>
            <div className="p-6 md:p-8 text-center md:text-left">
              <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-3xl md:text-4xl font-extrabold mb-1">0</div>
              <div style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.6)" }} className="text-xs uppercase tracking-wider">Pipeline Downtime</div>
            </div>
            <div className="p-6 md:p-8 text-center md:text-left">
              <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-3xl md:text-4xl font-extrabold mb-1">100%</div>
              <div style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.6)" }} className="text-xs uppercase tracking-wider">Your IP Secured</div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 2: Pain Points */}
      <section className="py-20 md:py-28 border-b border-[#3b126d]">
        <div style={{ maxWidth: 1320 }} className="mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span 
              style={{ fontFamily: "var(--font-mono)", color: "#F6851B" }} 
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              THE REALITY GAP
            </span>
            <h2 
              style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} 
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              Why good models break in the real world.
            </h2>
            <p 
              style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} 
              className="text-lg leading-relaxed"
            >
              Controlled environments breed false confidence. When your AI hits the chaos of a live warehouse, here is exactly what goes wrong—and how we engineer the fix.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#2d0a56] border border-[#F9EFE9]/10 p-8 rounded-xl flex flex-col justify-between hover:border-[#F6851B]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#240747] flex items-center justify-center mb-6 group-hover:bg-[#F6851B]/10 transition-colors">
                  <Cpu className="text-[#F6851B]" size={24} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-2xl font-bold mb-4">
                  The Illumination Illusion
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-sm leading-relaxed mb-6">
                  <strong style={{ color: "#F9EFE9" }} className="block mb-2">The Problem:</strong>
                  Shadows, dust, and glare aren't in your training data. The moment warehouse lighting shifts, your pick failure rates spike, and your clients notice.
                </p>
              </div>
              <div 
                style={{ fontFamily: "var(--font-sans)", color: "#F9EFE9", backgroundColor: "rgba(36, 7, 71, 0.4)" }} 
                className="mt-4 pt-4 border-t border-[#F9EFE9]/10 text-sm p-4 rounded-lg"
              >
                <span style={{ color: "#F6851B" }} className="font-bold block mb-1">→ The RootedAI Fix:</span>
                We aggressively fine-tune your detection models using raw, messy floor data, ensuring resilience in unpredictable environments.
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#2d0a56] border border-[#F9EFE9]/10 p-8 rounded-xl flex flex-col justify-between hover:border-[#F6851B]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#240747] flex items-center justify-center mb-6 group-hover:bg-[#F6851B]/10 transition-colors">
                  <Activity className="text-[#F6851B]" size={24} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-2xl font-bold mb-4">
                  The Silent Degradation
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-sm leading-relaxed mb-6">
                  <strong style={{ color: "#F9EFE9" }} className="block mb-2">The Problem:</strong>
                  95% accuracy on launch day doesn't last. Shifting SKU profiles and new packaging cause "model drift"—a silent performance bleed that happens without triggering a single error log.
                </p>
              </div>
              <div 
                style={{ fontFamily: "var(--font-sans)", color: "#F9EFE9", backgroundColor: "rgba(36, 7, 71, 0.4)" }} 
                className="mt-4 pt-4 border-t border-[#F9EFE9]/10 text-sm p-4 rounded-lg"
              >
                <span style={{ color: "#F6851B" }} className="font-bold block mb-1">→ The RootedAI Fix:</span>
                We deploy live telemetry and automated drift alerts so you can course-correct before it becomes a customer escalation.
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#2d0a56] border border-[#F9EFE9]/10 p-8 rounded-xl flex flex-col justify-between hover:border-[#F6851B]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#240747] flex items-center justify-center mb-6 group-hover:bg-[#F6851B]/10 transition-colors">
                  <Terminal className="text-[#F6851B]" size={24} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-2xl font-bold mb-4">
                  The Talent Trap
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-sm leading-relaxed mb-6">
                  <strong style={{ color: "#F9EFE9" }} className="block mb-2">The Problem:</strong>
                  Your highest-paid ML engineers are spending up to 40% of their time drawing bounding boxes. It kills momentum, burns runway, and creates a massive bottleneck for retraining.
                </p>
              </div>
              <div 
                style={{ fontFamily: "var(--font-sans)", color: "#F9EFE9", backgroundColor: "rgba(36, 7, 71, 0.4)" }} 
                className="mt-4 pt-4 border-t border-[#F9EFE9]/10 text-sm p-4 rounded-lg"
              >
                <span style={{ color: "#F6851B" }} className="font-bold block mb-1">→ The RootedAI Fix:</span>
                We automate your annotation pipeline, freeing your core team to build features instead of doing grunt work.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 3: How It Works */}
      <section className="py-20 md:py-28 bg-[#1f053e] border-b border-[#3b126d]">
        <div style={{ maxWidth: 1320 }} className="mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span 
              style={{ fontFamily: "var(--font-mono)", color: "#F6851B" }} 
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              DEPLOYMENT PROTOCOL
            </span>
            <h2 
              style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} 
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              From audit to autonomy in 4 weeks.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F6851B] rounded"></div>
              <div className="pt-8">
                <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-4xl font-extrabold mb-4">01</div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-xl font-bold mb-3">Diagnostic Audit</h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-sm leading-relaxed">
                  A 30-minute deep dive into your failure logs, current stack, and model bottlenecks. No fluff, just engineering reality.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F6851B] rounded"></div>
              <div className="pt-8">
                <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-4xl font-extrabold mb-4">02</div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-xl font-bold mb-3">Strategy Blueprint</h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-sm leading-relaxed">
                  We map the precise intervention—whether it’s fine-tuning, telemetry, or annotation—without ripping out your existing architecture.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F6851B] rounded"></div>
              <div className="pt-8">
                <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-4xl font-extrabold mb-4">03</div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-xl font-bold mb-3">API-First Integration</h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-sm leading-relaxed">
                  Seamless, modular deployment directly into your ROS or custom local server environment. Zero operational downtime.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F6851B] rounded"></div>
              <div className="pt-8">
                <div style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-4xl font-extrabold mb-4">04</div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-xl font-bold mb-3">Live & Monitored</h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-sm leading-relaxed">
                  Your robot operates with enhanced vision. You retain 100% of the IP, while we handle the continuous monitoring and retraining cycles in the background.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 4: Core Services */}
      <section className="py-20 md:py-28 border-b border-[#3b126d]">
        <div style={{ maxWidth: 1320 }} className="mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span 
              style={{ fontFamily: "var(--font-mono)", color: "#F6851B" }} 
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              CORE CAPABILITIES
            </span>
            <h2 
              style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} 
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              The arsenal for robotics teams.
            </h2>
            <p 
              style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} 
              className="text-lg leading-relaxed"
            >
              Targeted, API-first solutions designed to plug seamlessly into your existing tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <div className="bg-[#2d0a56] border border-[#F9EFE9]/10 p-8 rounded-xl flex flex-col justify-between hover:border-[#F6851B] transition-all">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-2xl font-bold mb-4">
                  Edge-Optimized Fine-Tuning
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.8)" }} className="text-sm leading-relaxed mb-8">
                  We recalibrate your existing YOLO or RT-DETR models using live environmental data. Built specifically to conquer heavy occlusion, erratic SKU positioning, and dynamic lighting.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">Custom Datasets</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">ROS Compatible</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">Edge Deployment</span>
              </div>
            </div>

            {/* Capability 2 */}
            <div className="bg-[#2d0a56] border border-[#F9EFE9]/10 p-8 rounded-xl flex flex-col justify-between hover:border-[#F6851B] transition-all">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-2xl font-bold mb-4">
                  Continuous Pulse Monitoring
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.8)" }} className="text-sm leading-relaxed mb-8">
                  Never fly blind. We implement live accuracy tracking and automated threshold alerts. Get notified in real-time via Slack or email the second your model's confidence drops.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">Drift Detection</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">Live Telemetry</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">WMS Integration</span>
              </div>
            </div>

            {/* Capability 3 */}
            <div className="bg-[#2d0a56] border border-[#F9EFE9]/10 p-8 rounded-xl flex flex-col justify-between hover:border-[#F6851B] transition-all">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#F6851B" }} className="text-2xl font-bold mb-4">
                  Intelligent Annotation Pipelines
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.8)" }} className="text-sm leading-relaxed mb-8">
                  We replace manual bottlenecks with active learning and semi-supervised auto-annotation. Slash your labeling costs and accelerate your retraining cycles by up to 80%.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">Active Learning</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">Auto-Annotation</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "rgba(249, 239, 233, 0.8)", borderColor: "rgba(249, 239, 233, 0.15)" }} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#240747] rounded-full border">CVAT/Label Studio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 5: ICP / Qualification */}
      <section className="py-20 md:py-28 bg-[#1f053e] border-b border-[#3b126d]">
        <div style={{ maxWidth: 1320 }} className="mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span 
              style={{ fontFamily: "var(--font-mono)", color: "#F6851B" }} 
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              WHO WE BUILD FOR
            </span>
            <h2 
              style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} 
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              Engineered for post-MVP operators scaling in the real world.
            </h2>
            <p 
              style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} 
              className="text-lg leading-relaxed"
            >
              We run tight, highly focused engineering sprints. We only partner with teams whose hardware is out of the lab and actively solving problems on the warehouse floor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Qualify */}
            <div className="bg-[#2d0a56]/50 border border-[#F9EFE9]/10 p-8 rounded-xl">
              <h3 style={{ fontFamily: "var(--font-display)", color: "#F9EFE9" }} className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-[#F6851B]" size={28} />
                You Qualify If:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#F6851B] mt-1">✓</span>
                  <span style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.9)" }} className="text-base">
                    Hardware is actively deployed in at least one live customer environment.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F6851B] mt-1">✓</span>
                  <span style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.9)" }} className="text-base">
                    You have an internal ML/Dev team of at least 2 people.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F6851B] mt-1">✓</span>
                  <span style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.9)" }} className="text-base">
                    You are past the MVP stage and actively scaling operations.
                  </span>
                </li>
              </ul>
            </div>

            {/* Not fit */}
            <div className="bg-[#2d0a56]/30 border border-[#F9EFE9]/5 p-8 rounded-xl opacity-80">
              <h3 style={{ fontFamily: "var(--font-display)", color: "rgba(249, 239, 233, 0.8)" }} className="text-2xl font-bold mb-6 flex items-center gap-3">
                <XCircle className="text-[#F9EFE9]/30" size={28} />
                Not the Right Fit If:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#F9EFE9]/40 mt-1">✗</span>
                  <span style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-base">
                    Your robots are strictly in the R&D or lab testing phase.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F9EFE9]/40 mt-1">✗</span>
                  <span style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-base">
                    You completely outsource your ML to a broad systems integrator.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F9EFE9]/40 mt-1">✗</span>
                  <span style={{ fontFamily: "var(--font-sans)", color: "rgba(249, 239, 233, 0.7)" }} className="text-base">
                    You are still looking for your first pilot customer.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 6 & 7: Validation & CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#240747] to-[#14022b]">
        <div style={{ maxWidth: 1320 }} className="mx-auto px-6">
          <div style={{ backgroundColor: "#F6851B" }} className="p-8 md:p-16 rounded-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl relative z-10">
              <span 
                style={{ fontFamily: "var(--font-mono)", color: "rgba(36, 7, 71, 0.8)" }} 
                className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-4"
              >
                NEXT STEPS
              </span>
              <h2 
                style={{ fontFamily: "var(--font-display)", color: "#240747" }} 
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-none"
              >
                Let's find out why your model is underperforming.
              </h2>
              <p 
                style={{ fontFamily: "var(--font-sans)", color: "rgba(36, 7, 71, 0.9)" }} 
                className="text-base md:text-lg leading-relaxed font-medium"
              >
                Book a 30-minute diagnostic session with our engineering team. We’ll look at your stack, identify the bottlenecks, and give you a clear path forward. No obligations. No sales pitches.
              </p>
            </div>
            <div className="shrink-0 relative z-10 w-full lg:w-auto">
              <button 
                onClick={openLeadModal}
                style={{ backgroundColor: "#240747", color: "#F9EFE9" }}
                className="inline-block w-full lg:w-auto text-center px-8 py-5 font-black rounded-xl hover:bg-[#1a0435] transition-colors shadow-2xl cursor-pointer border-none"
              >
                Book Free ML Audit
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
