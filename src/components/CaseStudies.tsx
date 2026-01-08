import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Building, TrendingDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import TiltCard from "@/components/ui/TiltCard";

const caseStudies = [
  {
    title: "WhatsApp Pet Food Ordering Automation",
    clientType: "Pet Food Distributor",
    problem: "Manual order entry via WhatsApp led to 15% error rate and 2+ hour response time",
    solution: "Built AI agent to auto-parse orders, validate inventory, send confirmations",
    metric: "100% Automated",
    subMetric: "Replaced 3 data-entry staff",
    impact: "0% errors, instant confirmations",
    tags: ["WhatsApp Automation", "Order Processing"],
    link: "https://www.linkedin.com/pulse/5-critical-automation-mistakes-indian-smes-make-how-fix-them-u5tme/?trackingId=Qp1WkEtnRk2IZi0eQcpYTQ%3D%3D"
  },
  {
    title: "Voter Verification Automation",
    clientType: "Government / NGO",
    problem: "Manual comparison of 50,000+ voter records took weeks and was error-prone",
    solution: "Automated data archaeology system to compare 2002 vs 2024 voter lists",
    metric: "99.8% Accuracy",
    subMetric: "Completed in 3 days vs 4 weeks",
    impact:
      "85% time saved",
    tags: ["Government", "Data Analysis", "Verification"],
    link: "https://www.linkedin.com/pulse/data-archaeology-comparing-2002-vs-2024-voter-lists-rootdai-bo0me/?trackingId=VFBJkwh6CiBd8GfgPZUHUw%3D%3D"
  },
  {
    title: "E-Commerce Inventory Optimization",
    clientType: "Logistics Firm",
    problem: "Overstocking led to 25% wastage; understocking caused lost sales",
    solution: "Predictive ML model for demand forecasting with real-time stock alerts",
    metric: "23% Cost Saving",
    subMetric: "Reduced wastage from 25% to 7%",
    impact: "₹12L saved annually",
    tags: ["Predictive Analytics", "Supply Chain"],
    link: null
  }
];

const CaseStudies = () => {
  const handleBookCall = () => {
    const message = encodeURIComponent("Hi, I'd like to see if you can automate my process in 7 days. Let's book a 20-min call.");
    window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
  };

  return (
    <section id="case-studies" className="py-24 border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
              Proven Impact
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg font-light">
              Real businesses. Real savings. Real results.
            </p>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {caseStudies.map((study, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <TiltCard className="bw-card h-full p-6 md:p-8 flex flex-col justify-between group hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500">
                    <div className="space-y-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-mono text-muted-foreground opacity-80 border border-black/10 dark:border-white/10 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Client Type */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-70">
                        <Building className="w-4 h-4" />
                        {study.clientType}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-black dark:text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        {study.title}
                      </h3>

                      {/* Problem-Solution */}
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-red-500/80 dark:text-red-400/80 font-semibold mb-1">Problem:</div>
                          <p className="text-muted-foreground leading-relaxed">
                            {study.problem}
                          </p>
                        </div>
                        <div>
                          <div className="text-green-500/80 dark:text-green-400/80 font-semibold mb-1">Solution:</div>
                          <p className="text-muted-foreground leading-relaxed">
                            {study.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Metrics & CTA */}
                    <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-3xl font-bold text-black dark:text-white">{study.metric}</div>
                          <div className="text-xs text-muted-foreground opacity-60">Key Result</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-black/80 dark:text-white/80">{study.subMetric}</div>
                          <div className="text-xs text-muted-foreground mt-1">{study.impact}</div>
                        </div>
                      </div>

                      {study.link ? (
                        <a
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full p-3 rounded-lg border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group/link"
                        >
                          <span className="text-sm font-medium">Read Full Case Study</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <div className="flex items-center justify-center w-full p-3 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                          <span className="text-xs text-muted-foreground opacity-50">Case study coming soon</span>
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
            <CarouselNext className="static translate-y-0 bg-transparent border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
          </div>
        </Carousel>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bw-card p-8 md:p-12 max-w-3xl mx-auto bg-gradient-to-b from-black/5 to-transparent dark:from-white/5">
            <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
              See if we can automate your process in 7 days
            </h3>
            <p className="text-muted-foreground mb-6">
              Book a 20‑minute discovery call to identify quick wins
            </p>
            <Button
              onClick={handleBookCall}
              className="bw-button text-lg px-8 py-6 group"
            >
              Book Discovery Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;