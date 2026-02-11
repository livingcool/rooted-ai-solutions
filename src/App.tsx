import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { UnicornScene } from "@/components/animations/UnicornScene";
import { Suspense, lazy } from "react";
import { Preloader } from "@/components/Preloader";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Locations = lazy(() => import("./pages/Locations"));

// Locations
const Hosur = lazy(() => import("./pages/locations/Hosur"));
const Coimbatore = lazy(() => import("./pages/locations/Coimbatore"));
const Bangalore = lazy(() => import("./pages/locations/Bangalore"));
const Chennai = lazy(() => import("./pages/locations/Chennai"));

// Service Detail Pages
const AIAgents = lazy(() => import("./pages/services/AIAgents"));
const ProcessAutomation = lazy(() => import("./pages/services/ProcessAutomation"));
const WebSolutions = lazy(() => import("./pages/services/WebSolutions"));
const NLPSystems = lazy(() => import("./pages/services/NLPSystems"));
const PredictiveAnalytics = lazy(() => import("./pages/services/PredictiveAnalytics"));
const EnterpriseSecurity = lazy(() => import("./pages/services/EnterpriseSecurity"));
const Outsourcing = lazy(() => import("./pages/services/Outsourcing"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UnicornScene projectId="pqwKA5ssKODpjx3JdLPc" />
        <Navigation />
        <main className="min-h-screen">
          <Suspense fallback={<Preloader />}>
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<Index />} />
              <Route path="/contact" element={<Index />} />
              <Route path="/careers" element={<Index />} />

              {/* Feature Pages */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog" element={<BlogListing />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Service Details */}
              <Route path="/services/ai-agents" element={<AIAgents />} />
              <Route path="/services/process-automation" element={<ProcessAutomation />} />
              <Route path="/services/web-solutions" element={<WebSolutions />} />
              <Route path="/services/nlp-systems" element={<NLPSystems />} />
              <Route path="/services/predictive-analytics" element={<PredictiveAnalytics />} />
              <Route path="/services/enterprise-security" element={<EnterpriseSecurity />} />
              <Route path="/services/outsourcing" element={<Outsourcing />} />

              {/* Locations */}
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/hosur-ai-company" element={<Hosur />} />
              <Route path="/locations/coimbatore-ai-company" element={<Coimbatore />} />
              <Route path="/locations/bangalore" element={<Bangalore />} />
              <Route path="/locations/chennai" element={<Chennai />} />

              {/* Legacy Location Routes (Redirects or Alias) */}
              <Route path="/hosur" element={<Hosur />} />
              <Route path="/coimbatore" element={<Coimbatore />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
