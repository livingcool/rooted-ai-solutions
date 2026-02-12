import { useState } from "react";
import { TestimonialsCard } from "@/components/ui/testimonials-card";
import { motion, AnimatePresence } from "framer-motion";
import SocialFlipButton from "@/components/ui/social-flip-button";

const participants = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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

const teamItems = participants.map(p => ({
    id: p.id,
    title: p.name,
    description: p.bio,
    image: p.image,
    role: p.role
}));

const Team = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeMember = participants[activeIndex] || participants[0];

    return (
        <div className="py-24 relative overflow-hidden bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
            <div className="absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-5xl font-bold font-heading text-black dark:text-white tracking-tight mb-6">
                        Meet the Builders
                    </h3>
                    <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        The minds behind the machines. We are a collective of engineers, researchers, and optimists building the future of work.
                    </p>
                </div>

                {/* Team Carousel */}
                <div className="mb-12">
                    <TestimonialsCard
                        items={teamItems}
                        onChange={setActiveIndex}
                        className="w-full"
                    />
                </div>

                {/* Social Flip Button with Container Transition */}
                <div className="flex justify-center h-32 items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, rotateX: -90 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            exit={{ opacity: 0, rotateX: 90 }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                            className="perspective-1000"
                        >
                            <SocialFlipButton
                                socials={{
                                    linkedin: activeMember.socials.linkedin,
                                    twitter: activeMember.socials.twitter,
                                    github: activeMember.socials.github,
                                    email: "contact@rootedai.com" // Default email for now
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Name Indicator */}
                <div className="mt-4 text-center">
                    <p className="text-sm font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        Connect with {activeMember.name.split(' ')[0]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Team;
