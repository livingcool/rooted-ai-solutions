import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import { Suspense, lazy } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";

// — Core Public Pages —
const Index           = lazy(() => import("./pages/Index"));
const Pricing         = lazy(() => import("./pages/Pricing"));
const NotFound        = lazy(() => import("./pages/NotFound"));
const FAQ             = lazy(() => import("./pages/FAQ"));
const Impacts         = lazy(() => import("./pages/Impacts"));
const CaseStudies     = lazy(() => import("./pages/CaseStudies"));
const ProductsPage    = lazy(() => import("./pages/Products"));
const CareersPage     = lazy(() => import("./pages/CareersPage"));
const ServicesPage    = lazy(() => import("./pages/ServicesPage"));

// — Locations —
const Locations       = lazy(() => import("./pages/Locations"));
const Hosur           = lazy(() => import("./pages/locations/Hosur"));
const Coimbatore      = lazy(() => import("./pages/locations/Coimbatore"));
const Bangalore       = lazy(() => import("./pages/locations/Bangalore"));
const Chennai         = lazy(() => import("./pages/locations/Chennai"));

// — Service Detail Pages —
const AIAgents            = lazy(() => import("./pages/services/AIAgents"));
const ProcessAutomation   = lazy(() => import("./pages/services/ProcessAutomation"));
const WebSolutions        = lazy(() => import("./pages/services/WebSolutions"));
const NLPSystems          = lazy(() => import("./pages/services/NLPSystems"));
const PredictiveAnalytics = lazy(() => import("./pages/services/PredictiveAnalytics"));
const EnterpriseSecurity  = lazy(() => import("./pages/services/EnterpriseSecurity"));
const Outsourcing         = lazy(() => import("./pages/services/Outsourcing"));
const AISafety            = lazy(() => import("./pages/services/AISafety"));

// — Blog —
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogPost    = lazy(() => import("./pages/BlogPost"));
const BlogAdmin   = lazy(() => import("./pages/BlogAdmin"));

// — Hiring System (internal tools) —
const AdminHiringDashboard = lazy(() => import("./pages/AdminHiringDashboard"));
const AdminPassSet         = lazy(() => import("./pages/AdminPassSet"));
const Login                = lazy(() => import("./pages/Login"));
const Interview            = lazy(() => import("./pages/Interview"));
const CandidateLogin       = lazy(() => import("./pages/CandidateLogin"));
const JobDetails           = lazy(() => import("./pages/JobDetails"));
const TechnicalAssessment  = lazy(() => import("./pages/TechnicalAssessment"));
const CandidateStatus      = lazy(() => import("./pages/CandidateStatus"));
const FinalInterviewLogin  = lazy(() => import("./pages/FinalInterviewLogin"));
const AIInterviewRoom      = lazy(() => import("./pages/AIInterviewRoom"));

// — Misc —
const BusinessCardGenerator = lazy(() => import("./pages/BusinessCardGenerator"));

const queryClient = new QueryClient();

/* Pages that should NOT render the main nav/footer (internal tools) */
const INTERNAL_PATHS = [
  "/login", "/admin-hiring", "/admin-pass-set",
  "/candidate-login", "/assessment", "/technical-assessment",
  "/candidate-status", "/final-login", "/final-interview",
  "/blog/adminlogin", "/business-card",
];

const AnimatedRoutes = () => {
  const location = useLocation();
  const isInternal = INTERNAL_PATHS.some(p => location.pathname.startsWith(p));

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* — Public Pages — */}
        <Route path="/"              element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about"         element={<PageTransition><Index /></PageTransition>} />
        <Route path="/services"      element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/impacts"       element={<PageTransition><Impacts /></PageTransition>} />
        <Route path="/case-studies"  element={<PageTransition><CaseStudies /></PageTransition>} />
        <Route path="/products"      element={<PageTransition><ProductsPage /></PageTransition>} />
        <Route path="/careers"       element={<PageTransition><CareersPage /></PageTransition>} />
        <Route path="/contact"       element={<PageTransition><Index /></PageTransition>} />
        <Route path="/pricing"       element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/faq"           element={<PageTransition><FAQ /></PageTransition>} />

        {/* — Blog — */}
        <Route path="/blog"             element={<PageTransition><BlogListing /></PageTransition>} />
        <Route path="/blog/adminlogin"  element={<PageTransition><BlogAdmin /></PageTransition>} />
        <Route path="/blog/:slug"       element={<PageTransition><BlogPost /></PageTransition>} />

        {/* — Service Detail Pages — */}
        <Route path="/services/ai-agents"            element={<PageTransition><AIAgents /></PageTransition>} />
        <Route path="/services/process-automation"   element={<PageTransition><ProcessAutomation /></PageTransition>} />
        <Route path="/services/web-solutions"        element={<PageTransition><WebSolutions /></PageTransition>} />
        <Route path="/services/nlp-systems"          element={<PageTransition><NLPSystems /></PageTransition>} />
        <Route path="/services/predictive-analytics" element={<PageTransition><PredictiveAnalytics /></PageTransition>} />
        <Route path="/services/enterprise-security"  element={<PageTransition><EnterpriseSecurity /></PageTransition>} />
        <Route path="/services/outsourcing"          element={<PageTransition><Outsourcing /></PageTransition>} />
        <Route path="/services/ai-safety"            element={<PageTransition><AISafety /></PageTransition>} />

        {/* — Location Pages — */}
        <Route path="/locations"              element={<PageTransition><Locations /></PageTransition>} />
        <Route path="/locations/hosur"        element={<PageTransition><Hosur /></PageTransition>} />
        <Route path="/locations/coimbatore"   element={<PageTransition><Coimbatore /></PageTransition>} />
        <Route path="/locations/bangalore"    element={<PageTransition><Bangalore /></PageTransition>} />
        <Route path="/locations/chennai"      element={<PageTransition><Chennai /></PageTransition>} />

        {/* — Internal Hiring System — */}
        <Route path="/login"                 element={<PageTransition><Login /></PageTransition>} />
        <Route path="/admin-hiring"          element={<PageTransition><AdminHiringDashboard /></PageTransition>} />
        <Route path="/:orgSlug/admin-pass-set" element={<PageTransition><AdminPassSet /></PageTransition>} />
        <Route path="/candidate-login"       element={<PageTransition><CandidateLogin /></PageTransition>} />
        <Route path="/assessment"            element={<PageTransition><Interview /></PageTransition>} />
        <Route path="/jobs/:id"              element={<PageTransition><JobDetails /></PageTransition>} />
        <Route path="/technical-assessment"  element={<PageTransition><TechnicalAssessment /></PageTransition>} />
        <Route path="/candidate-status"      element={<PageTransition><CandidateStatus /></PageTransition>} />
        <Route path="/final-login"           element={<PageTransition><FinalInterviewLogin /></PageTransition>} />
        <Route path="/final-interview"       element={<PageTransition><AIInterviewRoom /></PageTransition>} />

        {/* — Misc — */}
        <Route path="/business-card" element={<PageTransition><BusinessCardGenerator /></PageTransition>} />

        {/* — 404 — */}
        <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
        <Route path="*"    element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppShell = () => {
  const location = useLocation();
  const isInternal = INTERNAL_PATHS.some(p => location.pathname.startsWith(p));

  return (
    <SmoothScroll>
      {!isInternal && <Navigation />}
      <Suspense fallback={null}>
        <AnimatedRoutes />
      </Suspense>
      {!isInternal && <Footer />}
      <Analytics />
    </SmoothScroll>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="rootedai-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
