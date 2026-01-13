import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Globe, Target, Eye, Award, Users, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Loader from "@/components/ui/Loader";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Eye,
  Award,
  Users,
  Globe
};

const About = () => {
  const [content, setContent] = useState<{
    hero?: { badge: string; title: string; description: string };
    values?: Array<{ icon: string; title: string; description: string }>;
    story?: { badge: string; title: string; content: string[]; image: string; statValue: string; statLabel: string };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await api.get("/pages/about");
        setContent(data.content);
      } catch (error) {
        console.error("Failed to fetch page content", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const defaultValues = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide premium quality agricultural and food products to global markets, establishing long-term partnerships built on trust, reliability, and excellence.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become a leading international export company recognized for quality, innovation, and customer satisfaction in the global agricultural trade industry.",
    },
    {
      icon: Award,
      title: "Quality Commitment",
      description: "We maintain the highest quality standards through rigorous testing, certifications, and partnerships with verified suppliers who share our commitment to excellence.",
    },
  ];

  const milestones = [
    { year: "2018", title: "Company Founded", description: "NJR Exim established with a vision to connect global markets" },
    { year: "2019", title: "First Export", description: "Successfully exported our first shipment to Middle East markets" },
    { year: "2020", title: "10+ Countries", description: "Expanded operations to serve clients across 10+ countries" },
    { year: "2022", title: "1000+ Tons", description: "Achieved milestone of exporting 1000+ tons of premium products" },
    { year: "2024", title: "Industry Leader", description: "Recognized as a trusted partner in international agricultural trade" },
  ];

  const team = [
    {
      name: "Leadership Team",
      description: "Experienced professionals with decades of combined expertise in international trade, agriculture, and logistics.",
      icon: Users,
    },
    {
      name: "Quality Assurance",
      description: "Dedicated team ensuring every product meets international standards and customer specifications.",
      icon: Award,
    },
    {
      name: "Global Network",
      description: "Strategic partnerships with suppliers, logistics providers, and distributors worldwide.",
      icon: Globe,
    },
  ];

  if (loading && !content) return <Loader />;

  const pageValues = content?.values && Array.isArray(content.values) ? content.values.map((v) => ({
    ...v,
    icon: iconMap[v.icon] || Target
  })) : defaultValues;

  const getSafeHero = () => {
    const defaultHero = {
      badge: "About NJR Exim",
      title: "Your Trusted Partner in Global Trade",
      description: "With years of experience in international trade, we've built a reputation for delivering premium agricultural and food products to markets across the globe."
    };
    if (!content?.hero) return defaultHero;
    return { ...defaultHero, ...content.hero };
  };
  const hero = getSafeHero();

  const getSafeStory = () => {
    const defaultStory = {
      badge: "Our Story",
      title: "Building Bridges Between Markets",
      content: [
        "NJR Exim was founded with a simple yet powerful vision: to connect the finest agricultural products from India with global markets seeking quality, reliability, and consistency.",
        "Starting from humble beginnings, we've grown into a trusted name in international export, serving clients across the Middle East, Europe, Southeast Asia, and beyond.",
        "Today, we handle everything from sourcing and quality control to packaging, documentation, and logistics, ensuring a seamless experience for our clients."
      ],
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      statValue: "100%",
      statLabel: "Customer Satisfaction"
    };

    if (!content?.story) return defaultStory;

    // Ensure content.story.content is an array
    const storyContent = Array.isArray(content.story.content) ? content.story.content : defaultStory.content;

    return { ...defaultStory, ...content.story, content: storyContent };
  };
  const story = getSafeStory();

  return (
    <Layout>
      <SEO
        title="About Our Export Excellence"
        description="Learn about NJR EXIM's journey, our mission to connect global markets with premium Indian agricultural products, and our unwavering commitment to quality."
        canonical="/about"
      />
      <section className="relative bg-secondary text-secondary-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground text-sm font-medium uppercase tracking-widest rounded-full mb-6 border border-primary/30">
              {hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {hero.title.includes("Global Trade") ? (
                <>Your Trusted Partner in <span className="text-golden">Global Trade</span></>
              ) : hero.title}
            </h1>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Quality */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageValues.map((value) => (
              <div key={value.title} className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
                {story.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {story.title}
              </h2>
              {story.content.map((p: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>
            <div className="relative">
              <img
                src={story.image}
                alt="Story illustration"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3" />
                  <span className="block text-3xl font-bold">{story.statValue}</span>
                  <span className="text-sm uppercase tracking-wider opacity-90">
                    {(story.statLabel || "Customer Satisfaction").split(' ').map((word, i) => (
                      <span key={i}>{word}{i === 0 && <br />}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A timeline of our growth and success in the international export industry.
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl font-bold text-primary">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team & Network */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-golden font-semibold uppercase tracking-wider text-sm mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The People Behind NJR Exim
            </h2>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
              Our success is driven by passionate professionals dedicated to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((item) => (
              <div key={item.name} className="bg-secondary/50 border border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                <p className="text-secondary-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join hundreds of satisfied clients worldwide who trust NJR Exim for their agricultural product needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              View Products
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
