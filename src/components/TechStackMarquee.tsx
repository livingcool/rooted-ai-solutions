import pythonLogo from "../assets/python.svg";
import langchainLogo from "../assets/langchain.svg";
import postgresqlLogo from "../assets/postgresql.svg";
import googleGeminiLogo from "../assets/googlegemini.svg";
import claudeLogo from "../assets/claude.svg";
import mistralLogo from "../assets/mistralai.svg";
import ollamaLogo from "../assets/ollama.svg";
import huggingfaceLogo from "../assets/huggingface.svg";
import tensorflowLogo from "../assets/tensorflow.svg";
import pytorchLogo from "../assets/pytorch.svg";
import fastapiLogo from "../assets/fastapi.svg";
import dockerLogo from "../assets/docker.svg";
import langflowLogo from "../assets/langflow.svg";
import langgraphLogo from "../assets/langgraph.svg";
import metaLogo from "../assets/meta.svg";
import ngrokLogo from "../assets/ngrok.svg";
import reactLogo from "../assets/react.svg";
import supabaseLogo from "../assets/supabase.svg";

const TechStackMarquee = () => {
    const technologies = [
        { name: "Python", logo: pythonLogo },
        { name: "LangChain", logo: langchainLogo },
        { name: "LangFlow", logo: langflowLogo },
        { name: "LangGraph", logo: langgraphLogo },
        { name: "PostgreSQL", logo: postgresqlLogo },
        { name: "Supabase", logo: supabaseLogo },
        { name: "Gemini", logo: googleGeminiLogo },
        { name: "Claude", logo: claudeLogo },
        { name: "Meta AI", logo: metaLogo },
        { name: "Mistral", logo: mistralLogo },
        { name: "Ollama", logo: ollamaLogo },
        { name: "HuggingFace", logo: huggingfaceLogo },
        { name: "TensorFlow", logo: tensorflowLogo },
        { name: "PyTorch", logo: pytorchLogo },
        { name: "FastAPI", logo: fastapiLogo },
        { name: "Docker", logo: dockerLogo },
        { name: "React", logo: reactLogo },
        { name: "Ngrok", logo: ngrokLogo },
    ];

    return (
        <div className="w-full py-12 relative z-10 border-y border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-8">
                <p className="text-sm uppercase tracking-widest text-muted-foreground text-center font-bold">
                    Powered by Modern Tech Stack
                </p>
            </div>

            <div className="relative flex items-center h-20">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-20" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-20" />

                {/* Marquee Animation - Multiple duplicates for seamless loop */}
                {[...Array(3)].map((_, duplicateIndex) => (
                    <div
                        key={duplicateIndex}
                        className="flex animate-marquee whitespace-nowrap items-center gap-12 px-6"
                        aria-hidden={duplicateIndex > 0}
                    >
                        {technologies.map((tech, index) => (
                            <div
                                key={`tech-${duplicateIndex}-${index}`}
                                className="group relative transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center p-2"
                                title={tech.name}
                            >
                                <img
                                    src={tech.logo}
                                    alt={`${tech.name} logo`}
                                    className="h-12 w-auto object-contain min-w-[32px] block dark:brightness-0 dark:invert"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechStackMarquee;
