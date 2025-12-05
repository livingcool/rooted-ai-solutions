import { useRef, useEffect } from "react";

const techStack = [
    { name: "Python", type: "Backend", icon: "https://cdn.simpleicons.org/python/white" },
    { name: "LangChain", type: "Orchestration", icon: "https://cdn.simpleicons.org/langchain/white" },
    { name: "Groq", type: "Inference Engine", icon: "https://cdn.brandfetch.io/idxygbEPCQ/w/201/h/201/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1668515712972" },
    { name: "PostgreSQL", type: "Database", icon: "https://cdn.simpleicons.org/postgresql/white" },
    { name: "Pinecone", type: "Vector Memory", icon: "https://images.seeklogo.com/logo-png/48/1/pinecone-icon-logo-png_seeklogo-482365.png" },
    { name: "LangGraph", type: "Agentic Workflow", icon: "https://cdn.simpleicons.org/langgraph/white" },
    { name: "Gemini", type: "LLM", icon: "https://cdn.simpleicons.org/googlegemini/white" },
    { name: "ChatGPT", type: "LLM", icon: "https://cdn.simpleicons.org/openai/white" },
    { name: "Claude", type: "LLM", icon: "https://cdn.simpleicons.org/anthropic/white" },
    { name: "OpenSource", type: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface/white" },
];

const TechStackMarquee = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollerRef.current) return;
        const scrollerContent = scrollerRef.current.querySelector(".scroller__inner");
        if (!scrollerContent) return;

        const scrollerContentArray = Array.from(scrollerContent.children);
        scrollerContentArray.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerContent.appendChild(duplicatedItem);
        });
    }, []);

    return (
        <div className="w-full py-12 overflow-hidden relative z-10 bg-black/50 backdrop-blur-sm border-y border-white/5">
            <div
                ref={scrollerRef}
                className="scroller w-full max-w-7xl mx-auto px-4 md:px-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
            >
                <div className="scroller__inner flex gap-8 w-max flex-nowrap animate-scroll">
                    {techStack.map((tech, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-default"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors p-1.5">
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                    onError={(e) => {
                                        // Fallback if icon doesn't exist
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = '<span class="text-xs text-white font-bold">?</span>';
                                    }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white tracking-wide">
                                    {tech.name}
                                </span>
                                <span className="text-[10px] text-white/40 uppercase tracking-wider">
                                    {tech.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 1rem));
          }
        }
        .scroller__inner:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};

export default TechStackMarquee;
