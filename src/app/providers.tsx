'use client';

import { ReactNode, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModalProvider } from "@/context/ModalContext";
import SmoothScroll from "@/components/SmoothScroll";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || pathname?.startsWith('/blog-creation-page') || pathname?.startsWith('/blog-admin') || pathname?.startsWith('/login');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="rootedai-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ModalProvider>
            {isAdminPage ? (
              <div className="min-h-screen bg-[#F9EFE9]">
                {children}
              </div>
            ) : (
              <SmoothScroll>
                {children}
              </SmoothScroll>
            )}
          </ModalProvider>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
