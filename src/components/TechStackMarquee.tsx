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
import { LogoSlider } from "@/components/ui/LogoSlider";

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

    const logos = technologies.map((tech) => (
        <img
            key={tech.name}
            src={tech.logo}
            alt={`${tech.name} logo`}
            title={tech.name}
            className="h-12 w-auto object-contain min-w-[32px] block dark:brightness-0 dark:invert"
        />
    ));

    return (
        <div className="w-full py-12 relative z-10 border-y border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-8">
                <p className="text-sm uppercase tracking-widest text-muted-foreground text-center font-bold">
                    Powered by Modern Tech Stack
                </p>
            </div>

            <LogoSlider
                logos={logos}
                speed={60}
                direction="left"
            />
        </div>
    );
};

export default TechStackMarquee;
