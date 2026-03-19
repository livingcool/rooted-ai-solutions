import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  DollarSign
} from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/hiring";
import { JobApplicationForm } from "@/components/hiring/JobApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase.from('jobs' as any).select('*').eq('is_active', true);
      if (data) {
        setJobs(data as unknown as Job[]);
        setFilteredJobs(data as unknown as Job[]);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.requirements.some(req => req.toLowerCase().includes(lowerQuery))
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  const benefits = [
    {
      icon: MapPin,
      title: "Flexible Work",
      description: "Remote-first culture with optional office collaboration"
    },
    {
      icon: Brain,
      title: "Learning & Growth",
      description: "Comprehensive training and AI technology mentorship"
    },
    {
      icon: Users,
      title: "Collaborative Team",
      description: "Work with passionate AI enthusiasts and industry experts"
    },
    {
      icon: Clock,
      title: "Career Development",
      description: "Clear growth path with hands-on project experience"
    }
  ];

  return (
    <section id="careers" className="py-24 border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
              Join RootedAI
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg font-light">
              Launch Your AI Career. Join our passionate team and grow with us as we transform businesses through intelligent automation.
            </p>
          </div>
        </div>

        <div className="relative mb-32">
          {/* Constellation Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="w-full h-full opacity-20 dark:opacity-40">
              <motion.path
                d="M 100 100 L 300 150 L 500 50 L 800 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="5,5"
                className="text-black/20 dark:text-white/20"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-full glass-premium p-8 rounded-[2rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-3xl overflow-hidden">
                  {/* Floating particles inside card */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                  
                  <div className="w-14 h-14 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <benefit.icon className="w-7 h-7 text-black dark:text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-3 tracking-tight">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-center justify-center mb-32 relative text-center">
          <div className="absolute -inset-24 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl p-1/2 pointer-events-none" />
          
          <div className="relative space-y-8 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-light text-black dark:text-white tracking-widest uppercase">
              Ready to <span className="font-bold">Evolve?</span>
            </h3>
            
            {!isExpanded && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setIsExpanded(true)}
                  className="h-20 px-12 text-xl font-bold rounded-full bg-black text-white dark:bg-white dark:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all group"
                >
                  Explore Global Openings
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Job Listings Expansion */}
        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mb-32">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <h3 className="text-3xl font-black text-black dark:text-white tracking-tighter">
                Open Positions
              </h3>
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Filter by role or tech stack..."
                  className="w-full glass-premium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-4 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6">
              {Object.entries(
                filteredJobs.reduce((acc, job) => {
                  const dept = job.department || "General";
                  if (!acc[dept]) acc[dept] = [];
                  acc[dept].push(job);
                  return acc;
                }, {} as Record<string, typeof jobs>)
              ).map(([department, deptJobs]) => (
                <div key={department} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60 px-4">{department}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
                  </div>
                  
                  <div className="grid gap-4">
                    {deptJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        whileHover={{ x: 10 }}
                        className="group relative glass-premium rounded-3xl border border-black/5 dark:border-white/5 p-8 transition-all hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-3">
                            <h4 className="text-2xl font-bold text-black dark:text-white group-hover:text-blue-500 transition-colors">{job.title}</h4>
                            <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
                              <span className="flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full">
                                <Briefcase className="w-4 h-4" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              {job.salary_range && (
                                <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full">
                                  <DollarSign className="w-4 h-4" />
                                  {job.salary_range}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="glow"
                            className="rounded-xl px-10 h-14 text-base font-bold shadow-xl"
                            onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground hover:bg-transparent"
              >
                ↑ Show Less
              </Button>
            </div>
          </div>
        </div>

        {/* Immersive Culture Panel */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-3xl rounded-[4rem] group-hover:opacity-20 transition duration-1000" />
          
          <div className="relative glass-premium p-12 md:p-24 rounded-[4rem] border border-white/10 dark:bg-slate-900/40 backdrop-blur-3xl overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter">
                  Beyond <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Boundaries</span>
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  RootedAI isn't just a workplace—it's a launchpad for the next generation of AI architects. 
                  We nurture talent through high-stakes challenges and deep technology mentorship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 mt-16 border-t border-white/10">
                {[
                  { label: "Learning", value: "Infinite", sub: "Mentorship & R&D" },
                  { label: "Growth", value: "Uncapped", sub: "Direct Scaling Path" },
                  { label: "Impact", value: "Global", sub: "Enterprise AI Scale" }
                ].map((item, i) => (
                  <div key={i} className="group/item relative">
                    <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500 mb-2 opacity-60 group-hover/item:opacity-100 transition-opacity">
                      {item.label}
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-black dark:text-white mb-3">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest leading-none">
                      {item.sub}
                    </div>
                    {/* Animated floor glow for stats */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 transition-all duration-700 group-hover/item:w-full opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
};

export default Careers;