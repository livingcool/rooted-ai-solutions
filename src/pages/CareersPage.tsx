import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Careers from "@/components/Careers";

const CareersPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
            <Seo
                title="Careers - Join RootedAI | Shape the Future of AI"
                description="Join the team building the future of autonomous work. View open positions and apply to launch your AI career today."
                canonical="https://www.rootedai.co.in/careers"
            />
            <Navigation />
            <main className="pt-20">
                <Careers />
            </main>
            <Footer />
        </div>
    );
};

export default CareersPage;
