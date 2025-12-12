import { useEffect, useState } from "react";
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
    <section id="careers" className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Join RootedAI
            </h2>
            <p className="text-white/60 max-w-xl text-lg font-light">
              Launch Your AI Career. Join our passionate team and grow with us as we transform businesses through intelligent automation.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 border border-white/10 hover:bg-white/5 transition-colors duration-300">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">{benefit.title}</h4>
              <p className="text-sm text-white/60">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Collapsible Job Openings Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          {!isExpanded && (
            <Button
              onClick={() => setIsExpanded(true)}
              className="bw-button text-lg px-8 py-6 group"
            >
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>

        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mb-24">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h3 className="text-2xl font-bold text-white border-l-4 border-white pl-4">
                Open Positions
              </h3>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search roles or skills..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-12">
              {Object.entries(
                filteredJobs.reduce((acc, job) => {
                  const dept = job.department || "Other";
                  if (!acc[dept]) acc[dept] = [];
                  acc[dept].push(job);
                  return acc;
                }, {} as Record<string, typeof jobs>)
              ).map(([department, deptJobs]) => (
                <div key={department} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-2">{department}</h3>
                  <div className="grid gap-4">
                    {deptJobs.map((job) => (
                      <div
                        key={job.id}
                        className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-white/20"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">{job.title}</h4>
                            <div className="flex flex-wrap gap-2 text-sm text-white/60">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </span>
                              {job.salary_range && (
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  {job.salary_range}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            className="bg-white text-black hover:bg-white/90 font-medium px-6"
                            onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12 text-white/40">
                  No open positions found matching your criteria.
                </div>
              )}
            </div>

            <div className="flex justify-center mt-12">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                className="text-white/60 hover:text-white"
              >
                Show Less
              </Button>
            </div>
          </div>
        </div>



        {/* Culture Section */}
        <div className="mt-24 p-8 md:p-12 border border-white/10 bg-white/5">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h3 className="text-3xl font-bold text-white">
              Our Culture
            </h3>
            <p className="text-lg text-white/60 leading-relaxed">
              At RootedAI, we believe in nurturing fresh talent and fostering innovation through
              mentorship, hands-on learning, and a shared passion for transforming businesses through AI.
              Start your career with us and grow alongside cutting-edge technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-2">
                <div className="text-xl font-bold text-white">Learning</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Mentorship & Training</div>
              </div>
              <div className="space-y-2">
                <div className="text-xl font-bold text-white">Growth</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Career Progression</div>
              </div>
              <div className="space-y-2">
                <div className="text-xl font-bold text-white">Impact</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Real World Projects</div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
};

export default Careers;