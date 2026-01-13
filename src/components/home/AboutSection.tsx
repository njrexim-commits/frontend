interface AboutSectionProps {
  content?: {
    badge: string;
    title: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
  };
}

const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm">
              {content?.badge || "About Us"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {content?.title || "At NJR Exim, we don't just export goods — we export trust, quality, and long-term value."}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {content?.description || "With years of experience in international trade, NJR Exim has established itself as a reliable partner for businesses seeking premium agricultural and food products."}
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">✓</span>
                </div>
                <span className="font-medium text-foreground">Quality Assured</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">✓</span>
                </div>
                <span className="font-medium text-foreground">Global Reach</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">✓</span>
                </div>
                <span className="font-medium text-foreground">Trusted Partner</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80"
                alt="Shipping containers at port representing global trade"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            {content?.stats && content.stats.length > 0 && (
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-primary text-white rounded-2xl p-6 shadow-xl animate-fade-in">
                <div className="text-center">
                  <span className="block text-4xl md:text-5xl font-bold">{content.stats[0].value}</span>
                  <span className="text-sm uppercase tracking-wider opacity-90">
                    {content.stats[0].label.includes(' ') ? (
                      <>{content.stats[0].label.split(' ')[0]}<br />{content.stats[0].label.split(' ')[1]}</>
                    ) : content.stats[0].label}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
