import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-0 w-full h-full bg-background/90" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto space-y-8 animate-fade-down">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/90">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            The intelligent path you're looking for doesn't exist. It might have been moved or never existed in this dimension.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild variant="default" className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-12 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 backdrop-blur-sm">
            <Link to="/contact" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
