const features = [
  {
    title: "Trusted Suppliers",
    description: "We work with verified and certified suppliers to ensure consistent quality across all our product lines.",
  },
  {
    title: "Global Shipping",
    description: "Our extensive logistics network ensures timely delivery to any destination worldwide.",
  },
  {
    title: "Quality Assurance",
    description: "Every product undergoes rigorous quality checks to meet international standards and regulations.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Feature Header - Blue */}
        <div className="bg-primary p-8 md:p-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Our Features
            </h2>
          </div>
        </div>

        {/* Feature Cards - Dark */}
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="bg-secondary p-8 md:p-12 border-l border-white/10 first:border-l-0 md:first:border-l"
          >
            <div className="space-y-4">
              <div className="w-12 h-1 bg-golden" />
              <h3 className="text-xl font-bold text-secondary-foreground">
                {feature.title}
              </h3>
              <p className="text-secondary-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
