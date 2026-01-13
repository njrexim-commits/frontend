import { Check } from "lucide-react";

const values = [
  {
    title: "Honesty & Integrity",
    description: "We conduct business with transparency and ethical standards, building trust with every transaction.",
  },
  {
    title: "Innovation & Change",
    description: "Continuously adapting to market trends and embracing new technologies for better service.",
  },
  {
    title: "Teamwork",
    description: "Our collaborative approach ensures seamless operations from sourcing to delivery.",
  },
  {
    title: "Open Communication",
    description: "We maintain clear and consistent communication with all our partners and clients.",
  },
  {
    title: "Variety of Products",
    description: "Offering a comprehensive range of premium agricultural and food products.",
  },
  {
    title: "Satisfaction Guarantee",
    description: "Your satisfaction is our priority. We stand behind every product we export.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-golden font-semibold uppercase tracking-wider text-sm mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Why NJR Exim?
          </h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            Our commitment to excellence and customer satisfaction sets us apart 
            in the global export industry.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-secondary/50 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-secondary-foreground/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
