const stats = [
  { value: "50+", label: "Deployments" },
  { value: "Zero", label: "Compliance Incidents" },
  { value: "99.8%", label: "Accuracy" },
  { value: "40%", label: "Cost Reduction" },
];

const SocialProof = () => {
  return (
    <section className="py-16 border-t border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight">
                {stat.value}
              </div>
              <p className="text-sm text-black/50 dark:text-white/50 uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
