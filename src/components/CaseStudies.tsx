import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TiltCard from "@/components/ui/TiltCard";

const caseStudies = [
  {
    title: "WhatsApp Pet Food Ordering Automation",
    client: "",
    description: "Automated ordering system via WhatsApp, streamlining customer orders and reducing manual entry errors.",
    metric: "100% Automated",
    tags: ["WhatsApp Automation", "Order Processing"],
    link: "https://www.linkedin.com/pulse/5-critical-automation-mistakes-indian-smes-make-how-fix-them-u5tme/?trackingId=Qp1WkEtnRk2IZi0eQcpYTQ%3D%3D"
  },
  {
    title: "Voter Verification Automation",
    client: "",
    description: "Automated verification of voter lists, comparing historical data to ensure accuracy and integrity.",
    metric: "Data Integrity",
    tags: ["Government", "Verification", "Data Analysis"],
    link: "https://www.linkedin.com/pulse/data-archaeology-comparing-2002-vs-2024-voter-lists-rootdai-bo0me/?trackingId=VFBJkwh6CiBd8GfgPZUHUw%3D%3D"
  },
  {
    title: "E-Commerce Logistics",
    client: "",
    description: "Predictive inventory management system optimizing stock levels and reducing waste.",
    metric: "20% Cost Saving",
    tags: ["Predictive Analytics", "Supply Chain"],
    link: null
  }
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Proven Impact
            </h2>
            <p className="text-white/60 max-w-xl text-lg font-light">
              Real-world results from our strategic AI implementations.
            </p>
          </div>
          <Button
            variant="ghost"
            className="bw-button-outline hidden md:flex text-white hover:text-black"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Project
          </Button>
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
                  <TiltCard className="bw-card h-full p-6 md:p-8 flex flex-col justify-between group hover:bg-white/5 transition-colors duration-500">

                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                          {study.title}
                        </h3>
                        <p className="text-sm text-white/40 uppercase tracking-widest mb-4">
                          {study.client}
                        </p>
                        <p className="text-white/60 leading-relaxed">
                          {study.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white">{study.metric}</div>
                        <div className="text-xs text-white/40">Key Result</div>
                      </div>
                      {study.link ? (
                        <a
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                  </TiltCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black" />
            <CarouselNext className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black" />
          </div>
        </Carousel>

        <div className="mt-12 text-center md:hidden">
          <Button
            variant="ghost"
            className="bw-button-outline w-full text-white hover:text-black"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Project
          </Button>
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;