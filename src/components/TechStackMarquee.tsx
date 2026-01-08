const TechStackMarquee = () => {
    const technologies = [
        "Python",
        "LangChain",
        "PostgreSQL",
        "OpenAI",
        "Pinecone",
        "Gemini",
        "Claude",
        "Llama",
        "Mistral",
        "Ollama",
        "Groq",
        "HuggingFace",
        "TensorFlow",
        "PyTorch",
        "FastAPI",
        "Docker",
    ];

    return (
        <div className="w-full py-8 relative z-10 border-y border-black/5 dark:border-white/5 bg-black/5 dark:bg-black/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-6">
                <p className="text-sm uppercase tracking-widest text-muted-foreground text-center font-bold">
                    Powered by:
                </p>
            </div>
            <div className="relative flex items-center h-12">
                {/* Marquee Animation - Multiple duplicates for seamless loop */}
                {[...Array(3)].map((_, duplicateIndex) => (
                    <div
                        key={duplicateIndex}
                        className="flex animate-marquee whitespace-nowrap items-center gap-4"
                        aria-hidden={duplicateIndex > 0}
                    >
                        {technologies.map((tech, index) => (
                            <div
                                key={`tech-${duplicateIndex}-${index}`}
                                className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200"
                            >
                                <span className="text-sm text-black/70 dark:text-white/70 font-medium whitespace-nowrap">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechStackMarquee;

