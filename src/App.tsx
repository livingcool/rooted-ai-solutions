import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Suspense, lazy } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageSkeleton from "@/components/PageSkeleton";
import { ModalProvider } from "@/context/ModalContext";

const queryClient = new QueryClient();

// — Core Public Pages —
const Index           = lazy(() => import("./pages/Index"));
const NotFound        = lazy(() => import("./pages/NotFound"));
const CaseStudies     = lazy(() => import("./pages/CaseStudies"));
const ServicesPage    = lazy(() => import("./pages/ServicesPage"));
const BlogListing     = lazy(() => import("./pages/BlogListing"));
const BlogPost        = lazy(() => import("./pages/BlogPost"));

// — Internal Paths —
const INTERNAL_PATHS = [
  "/login", "/admin-hiring", "/technical-assessment", "/candidate-login", "/assessment", "/final-login", "/final-interview"
];

const AppShell = () => {
  const location = useLocation();
  const isInternal = INTERNAL_PATHS. some(p => location.pathname.startsWith(p));

  return (
    <SmoothScroll>
      {!isInternal && <Navigation />}
      <ErrorBoundary>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<BlogListing />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
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
          <ModalProvider>
            <AppShell />
          </ModalProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
