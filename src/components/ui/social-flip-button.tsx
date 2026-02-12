import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, Facebook, Mail, Monitor, MessageCircle } from "lucide-react";

interface SocialFlipButtonProps {
    socials: {
        github?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        facebook?: string;
        email?: string;
        website?: string;
        discord?: string;
    }
}

const SocialFlipButton = ({ socials }: SocialFlipButtonProps) => {
    // Config for each slot mapping letters to social platforms
    const slots = [
        { letter: "C", icon: Github, href: socials.github, label: "Github", color: "bg-neutral-900" },
        { letter: "O", icon: Linkedin, href: socials.linkedin, label: "LinkedIn", color: "bg-blue-600" },
        { letter: "N", icon: Twitter, href: socials.twitter, label: "Twitter", color: "bg-sky-500" },
        { letter: "T", icon: Instagram, href: socials.instagram, label: "Instagram", color: "bg-pink-600" },
        { letter: "A", icon: Facebook, href: socials.facebook, label: "Facebook", color: "bg-blue-700" },
        { letter: "C", icon: MessageCircle, href: socials.discord, label: "Discord", color: "bg-indigo-500" },
        { letter: "T", icon: Mail, href: socials.email, label: "Email", color: "bg-red-500" },
    ];

    return (
        <div className="flex gap-1 md:gap-2">
            {slots.map((slot, i) => (
                <FlipBlock key={i} {...slot} />
            ))}
        </div>
    );
};

const FlipBlock = ({ letter, icon: Icon, href, color }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-10 h-10 md:w-12 md:h-12 block cursor-pointer"
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{ rotateX: isHovered ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front: Letter */}
                <div
                    className="absolute inset-0 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center font-bold text-lg md:text-xl text-black dark:text-white shadow-sm border border-black/5 dark:border-white/5"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {letter}
                </div>

                {/* Back: Icon */}
                <div
                    className={`absolute inset-0 ${color} rounded-lg flex items-center justify-center text-white shadow-md border border-white/10`}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateX(180deg)"
                    }}
                >
                    <Icon size={20} className="md:w-6 md:h-6" />
                </div>
            </motion.div>
        </motion.a>
    );
};

export default SocialFlipButton;
