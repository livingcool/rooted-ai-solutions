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
import Login from "./pages/Login";
import Interview from "./pages/Interview";
import CandidateLogin from "./pages/CandidateLogin";
import JobDetails from "./pages/JobDetails";
import TechnicalAssessment from "./pages/TechnicalAssessment";
import CandidateStatus from "./pages/CandidateStatus";
import AIInterviewRoom from "./pages/AIInterviewRoom";
import ScrollToHash from "@/components/ScrollToHash";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import NoiseOverlay from "./components/ui/NoiseOverlay";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="rootedai-theme">
      <NoiseOverlay />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CustomCursor />
          <ScrollProgress />
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-hiring" element={<AdminHiringDashboard />} />
            <Route path="/candidate-login" element={<CandidateLogin />} />
            <Route path="/assessment" element={<Interview />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/technical-assessment" element={<TechnicalAssessment />} />
            <Route path="/candidate-status" element={<CandidateStatus />} />
            <Route path="/final-interview" element={<AIInterviewRoom />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
