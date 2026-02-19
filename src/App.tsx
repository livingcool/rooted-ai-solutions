import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalBackground from "@/components/GlobalBackground";
import PageTransition from "@/components/PageTransition";
import { Suspense, lazy, useState, useEffect } from "react";
import RevealLoader from "@/components/ui/RevealLoader";
import ScrollToHash from "@/components/ScrollToHash";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionIndicator from "@/components/SectionIndicator";
import { Analytics } from "@vercel/analytics/react";
const Index = lazy(() => import("./pages/Index"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminHiringDashboard = lazy(() => import("./pages/AdminHiringDashboard"));
const AdminPassSet = lazy(() => import("./pages/AdminPassSet"));
const Login = lazy(() => import("./pages/Login"));
const Interview = lazy(() => import("./pages/Interview"));
const CandidateLogin = lazy(() => import("./pages/CandidateLogin"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const TechnicalAssessment = lazy(() => import("./pages/TechnicalAssessment"));
const CandidateStatus = lazy(() => import("./pages/CandidateStatus"));
const FinalInterviewLogin = lazy(() => import("./pages/FinalInterviewLogin"));
const AIInterviewRoom = lazy(() => import("./pages/AIInterviewRoom"));

// Service Pages
const AIAgents = lazy(() => import("./pages/services/AIAgents"));
const ProcessAutomation = lazy(() => import("./pages/services/ProcessAutomation"));
const WebSolutions = lazy(() => import("./pages/services/WebSolutions"));
const NLPSystems = lazy(() => import("./pages/services/NLPSystems"));
const PredictiveAnalytics = lazy(() => import("./pages/services/PredictiveAnalytics"));
const EnterpriseSecurity = lazy(() => import("./pages/services/EnterpriseSecurity"));
const Outsourcing = lazy(() => import("./pages/services/Outsourcing"));
const AISafety = lazy(() => import("./pages/services/AISafety"));

// Blog
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));

// Services Page
const ServicesPage = lazy(() => import("./pages/ServicesPage"));

// Locations
const Locations = lazy(() => import("./pages/Locations"));
const Hosur = lazy(() => import("./pages/locations/Hosur"));
const Coimbatore = lazy(() => import("./pages/locations/Coimbatore"));
const Bangalore = lazy(() => import("./pages/locations/Bangalore"));
const Chennai = lazy(() => import("./pages/locations/Chennai"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground animate-pulse">Loading RootedAI...</p>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* Core Pages */}
      <Route path="/" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/about" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
      <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
      <Route path="/products" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/careers" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />

      {/* Blog */}
      <Route path="/blog" element={<PageTransition><BlogListing /></PageTransition>} />
      <Route path="/blog/adminlogin" element={<PageTransition><BlogAdmin /></PageTransition>} />
      <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />

      {/* Hiring System */}
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/admin-hiring" element={<PageTransition><AdminHiringDashboard /></PageTransition>} />
      <Route path="/:orgSlug/admin-pass-set" element={<PageTransition><AdminPassSet /></PageTransition>} />

      <Route path="/candidate-login" element={<PageTransition><CandidateLogin /></PageTransition>} />
      <Route path="/assessment" element={<PageTransition><Interview /></PageTransition>} />
      <Route path="/jobs/:id" element={<PageTransition><JobDetails /></PageTransition>} />
      <Route path="/technical-assessment" element={<PageTransition><TechnicalAssessment /></PageTransition>} />
      <Route path="/candidate-status" element={<PageTransition><CandidateStatus /></PageTransition>} />
      <Route path="/final-login" element={<PageTransition><FinalInterviewLogin /></PageTransition>} />
      <Route path="/final-interview" element={<PageTransition><AIInterviewRoom /></PageTransition>} />

      {/* Service Detail Pages */}
      <Route path="/services/ai-agents" element={<PageTransition><AIAgents /></PageTransition>} />
      <Route path="/services/process-automation" element={<PageTransition><ProcessAutomation /></PageTransition>} />
      <Route path="/services/web-solutions" element={<PageTransition><WebSolutions /></PageTransition>} />
      <Route path="/services/nlp-systems" element={<PageTransition><NLPSystems /></PageTransition>} />
      <Route path="/services/predictive-analytics" element={<PageTransition><PredictiveAnalytics /></PageTransition>} />
      <Route path="/services/enterprise-security" element={<PageTransition><EnterpriseSecurity /></PageTransition>} />
      <Route path="/services/outsourcing" element={<PageTransition><Outsourcing /></PageTransition>} />
      <Route path="/services/ai-safety" element={<PageTransition><AISafety /></PageTransition>} />

      {/* Location Pages */}
      <Route path="/locations" element={<PageTransition><Locations /></PageTransition>} />
      <Route path="/locations/hosur" element={<PageTransition><Hosur /></PageTransition>} />
      <Route path="/locations/coimbatore" element={<PageTransition><Coimbatore /></PageTransition>} />
      <Route path="/locations/bangalore" element={<PageTransition><Bangalore /></PageTransition>} />
      <Route path="/locations/chennai" element={<PageTransition><Chennai /></PageTransition>} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
    </Routes>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      // Show preloader ONLY on home page and ONLY once per session
      const path = window.location.pathname;
      const isHome = path === "/" || path === "/index.html" || path.endsWith("/rooted-ai-solutions/");
      const hasSeenLoader = sessionStorage.getItem("rooted-loader-shown");

      if (isHome && !hasSeenLoader) {
        setLoading(true);
        sessionStorage.setItem("rooted-loader-shown", "true");
      }
    } catch (e) {
      console.warn("Session storage not available:", e);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="rootedai-theme">
        <TooltipProvider>
          {loading && (
            <RevealLoader
              text="ROOTED AI"
              bgColors={["#000000"]}
              onComplete={() => setLoading(false)}
            />
          )}
          <GlobalBackground paused={loading} />
          <Toaster />
          <Sonner />
          <BrowserRouter>


            <ScrollProgress />
            <ScrollToHash />
            <SectionIndicator />
            <Suspense fallback={<LoadingFallback />}>
              <AnimatedRoutes />
            </Suspense>
            <Analytics />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider >
  );
};

export default App;
