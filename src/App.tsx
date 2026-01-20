import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Suspense, lazy } from "react";
import ScrollToHash from "@/components/ScrollToHash";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GlobalBackground from "@/components/GlobalBackground";
import { Preloader } from "@/components/Preloader";
import SectionIndicator from "@/components/SectionIndicator";

// Lazy Load Pages
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

// Blog
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));

// Locations
const Hosur = lazy(() => import("./pages/locations/Hosur"));
const Coimbatore = lazy(() => import("./pages/locations/Coimbatore"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground animate-pulse">Loading RootedAI...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="rootedai-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GlobalBackground />
        <BrowserRouter>
          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <ScrollToHash />
          <SectionIndicator />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogListing />} />
              <Route path="/blog/adminlogin" element={<BlogAdmin />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<Index />} />
              <Route path="/services" element={<Index />} />
              <Route path="/case-studies" element={<Index />} />
              <Route path="/products" element={<Index />} />
              <Route path="/careers" element={<Index />} />
              <Route path="/contact" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-hiring" element={<AdminHiringDashboard />} />
              <Route path="/:orgSlug/admin-pass-set" element={<AdminPassSet />} />
              <Route path="/:orgSlug" element={<AdminHiringDashboard />} />
              <Route path="/candidate-login" element={<CandidateLogin />} />
              <Route path="/assessment" element={<Interview />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/technical-assessment" element={<TechnicalAssessment />} />
              <Route path="/candidate-status" element={<CandidateStatus />} />
              <Route path="/final-login" element={<FinalInterviewLogin />} />
              <Route path="/final-interview" element={<AIInterviewRoom />} />

              {/* Service Detail Pages */}
              <Route path="/services/ai-agents" element={<AIAgents />} />
              <Route path="/services/process-automation" element={<ProcessAutomation />} />
              <Route path="/services/web-solutions" element={<WebSolutions />} />
              <Route path="/services/nlp-systems" element={<NLPSystems />} />
              <Route path="/services/predictive-analytics" element={<PredictiveAnalytics />} />
              <Route path="/services/enterprise-security" element={<EnterpriseSecurity />} />
              <Route path="/services/outsourcing" element={<Outsourcing />} />

              {/* Location Pages */}
              <Route path="/hosur" element={<Hosur />} />
              <Route path="/coimbatore" element={<Coimbatore />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider >
);

export default App;
