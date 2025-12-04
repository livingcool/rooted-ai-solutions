import { Button } from "@/components/ui/button";

import {
  Brain,
  Users,
  MapPin,
  Clock,
  ArrowRight
} from "lucide-react";

const Careers = () => {


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

        {/* Join Our Team - General Call to Action */}
        <div className="mt-24 mb-24">
          <div className="bw-card p-8 md:p-16 text-center border-white/10 bg-gradient-to-b from-white/5 to-transparent">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Shape the Future?
            </h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              We are always looking for exceptional talent to join our mission.
              If you're passionate about AI, automation, and engineering autonomy, we want to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                className="bw-button text-lg px-8 py-6 group"
                onClick={() => window.location.href = "mailto:rootedaiofficial@gmail.com"}
              >
                Send Your Resume
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-white/40 mt-6">
              Email us at <span className="text-white">rootedaiofficial@gmail.com</span>
            </p>
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

        {/* Contact for Custom Roles */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-6">
            Fresh graduate or career changer? We welcome diverse backgrounds.
          </p>
          <Button
            variant="outline"
            className="bw-button-outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Us About Opportunities
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Careers;