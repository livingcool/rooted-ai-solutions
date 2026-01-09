import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";

import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import AdminHiringDashboard from "./pages/AdminHiringDashboard";
import AdminPassSet from "./pages/AdminPassSet";
import Login from "./pages/Login";
import Interview from "./pages/Interview";
import CandidateLogin from "./pages/CandidateLogin";
import JobDetails from "./pages/JobDetails";
import TechnicalAssessment from "./pages/TechnicalAssessment";
import CandidateStatus from "./pages/CandidateStatus";
import FinalInterviewLogin from './pages/FinalInterviewLogin';
import AIInterviewRoom from "./pages/AIInterviewRoom";

// Service Pages
import AIAgents from "./pages/services/AIAgents";
import ProcessAutomation from "./pages/services/ProcessAutomation";
import WebSolutions from "./pages/services/WebSolutions";
import NLPSystems from "./pages/services/NLPSystems";
import PredictiveAnalytics from "./pages/services/PredictiveAnalytics";
import EnterpriseSecurity from "./pages/services/EnterpriseSecurity";
import Outsourcing from "./pages/services/Outsourcing";

import ScrollToHash from "@/components/ScrollToHash";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GlobalBackground from "@/components/GlobalBackground";
import SectionIndicator from "@/components/SectionIndicator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="rootedai-theme">
      <GlobalBackground />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CustomCursor />
          <ScrollProgress />
          <ScrollToHash />
          <SectionIndicator />
          <Routes>
            <Route path="/" element={<Index />} />

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

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
