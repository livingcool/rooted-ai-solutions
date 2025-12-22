const TechStackMarquee = () => {
    return (
        <div className="w-full py-8 relative z-10 border-y border-white/5 bg-black/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <p className="text-xs uppercase tracking-widest text-white/40 font-medium">
                        Powered by: Python • LangChain • PostgreSQL • Groq • Pinecone • LangGraph • Gemini • ChatGPT • Claude
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TechStackMarquee;
