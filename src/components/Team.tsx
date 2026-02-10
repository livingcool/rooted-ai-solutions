import { Linkedin, Twitter, Github } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const teamColors = [
    "from-blue-500/20 to-purple-500/20",
    "from-amber-500/20 to-orange-500/20",
    "from-green-500/20 to-emerald-500/20",
];

const participants = [
    {
        name: "Ganesh Khovalan",
        role: "Founder & CEO",
        bio: "Visionary leader driving the autonomous enterprise revolution.",
        image: "/team/ganesh.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/ganeshkhovalan/",
            twitter: "https://x.com/Ganesh45949",
            github: "https://github.com/livingcool"
        }
    },
    {
        name: "Ajai Senthil",
        role: "CTO",
        bio: "Architecting the neural frameworks that power our intelligence.",
        image: "/team/ajai.jpg",
        socials: {
            linkedin: "#",
            twitter: "#",
            github: "#"
        }
    },
    {
        name: "Ganesh Kumar S",
        role: "Lead Engineer",
        bio: "Pushing the boundaries of what large language models can achieve.",
        image: "/team/ganesh-kumar.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/ganeshkumar09",
            twitter: "#",
            github: "https://github.com/Ganeshkumar09092003"
        }
    }
];

const Team = () => {
    return (
        <div className="py-24 relative overflow-hidden">
            <div className="text-center mb-16">
                <h3 className="text-3xl md:text-5xl font-bold font-heading text-black dark:text-white tracking-tight mb-6">
                    Meet the Builders
                </h3>
                <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    The minds behind the machines. We are a collective of engineers, researchers, and optimists building the future of work.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {participants.map((member, idx) => (
                    <TiltCard
                        key={idx}
                        className="bw-card p-0 overflow-hidden group hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Avatar / Image */}
                        <div className={`h-64 w-full bg-gradient-to-br ${teamColors[idx % teamColors.length]} relative overflow-hidden group-hover:scale-105 transition-transform duration-700`}>
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top transition-all duration-500 grayscale group-hover:grayscale-0"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement?.classList.add('fallback-active');
                                    }}
                                />
                            ) : null}

                            {/* Fallback (shown if no image or error) */}
                            <div className={`absolute inset-0 bg-black/10 dark:bg-white/10 backdrop-blur-[2px] ${member.image ? 'hidden fallback-active:block' : 'block'}`}>
                                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/20 dark:bg-black/20 rounded-full blur-3xl" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-black/10 dark:text-white/10">
                                    {member.name.charAt(0)}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 relative">
                            <h4 className="text-xl font-bold text-black dark:text-white mb-1 group-hover:text-primary transition-colors">
                                {member.name}
                            </h4>
                            <p className="text-sm font-medium text-black/40 dark:text-white/40 uppercase tracking-wider mb-4">
                                {member.role}
                            </p>
                            <p className="text-black/70 dark:text-white/70 leading-relaxed mb-6">
                                {member.bio}
                            </p>

                            <div className="flex gap-4 border-t border-black/5 dark:border-white/5 pt-6">
                                <a href={member.socials.linkedin} className="text-black/40 dark:text-white/40 hover:text-[#0077b5] transition-colors"><Linkedin size={18} /></a>
                                <a href={member.socials.twitter} className="text-black/40 dark:text-white/40 hover:text-[#1DA1F2] transition-colors"><Twitter size={18} /></a>
                                <a href={member.socials.github} className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"><Github size={18} /></a>
                            </div>
                        </div>
                    </TiltCard>
                ))}
            </div>
        </div>
    );
};

export default Team;
