import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Zap, Shield, Rocket } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      tagline: "Less than your daily coffee",
      description: "Perfect for small businesses getting started with AI",
      icon: Sparkles,
      features: [
        "AI-powered chatbot integration",
        "Basic process automation",
        "Email support",
        "Up to 1,000 monthly interactions",
        "Single user access",
        "Standard analytics dashboard",
      ],
      popular: false,
    },
    {
      name: "Professional",
      tagline: "Cheaper than a gym membership",
      description: "Ideal for growing teams scaling their AI capabilities",
      icon: Zap,
      features: [
        "Everything in Starter",
        "Advanced AI automation workflows",
        "Custom model training",
        "Priority support (24/7)",
        "Up to 10,000 monthly interactions",
        "Multi-user access (up to 10)",
        "Advanced analytics & insights",
        "API access",
        "Integration with existing tools",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      tagline: "Investment that pays for itself",
      description: "Complete AI transformation for large organizations",
      icon: Rocket,
      features: [
        "Everything in Professional",
        "Unlimited interactions",
        "Dedicated AI consultant",
        "Custom development",
        "On-premise deployment options",
        "Unlimited users",
        "Advanced security & compliance",
        "SLA guarantees",
        "White-label solutions",
        "Quarterly strategy sessions",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Transparent Pricing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AI Solutions That Fit Your Budget
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan to transform your business with AI automation
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 flex flex-col ${plan.popular
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-heading mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {plan.tagline}
                    </div>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="block">
                      <Button
                        className="w-full button-3d"
                        variant="default"
                      >
                        Get Started
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-heading mb-4">
                Not Sure Which Plan Is Right?
              </CardTitle>
              <CardDescription className="text-lg">
                Book a free consultation call with our AI experts to discuss your specific needs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="#contact">
                <Button size="lg" className="button-3d">
                  Schedule Free Consultation
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
