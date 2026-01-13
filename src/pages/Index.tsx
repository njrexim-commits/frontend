import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import VideoBanner from "@/components/home/VideoBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Loader from "@/components/ui/Loader";

const Index = () => {
  const [content, setContent] = useState<{
    hero?: { title: string; highlightedText: string; description: string; buttonText: string; buttonLink: string; slides?: Array<{ id: number; image: string; alt: string }> };
    aboutSection?: { badge: string; title: string; description: string; stats: { label: string; value: string; }[] };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await api.get("/pages/home");
        setContent(data.content);
      } catch (error) {
        console.error("Failed to fetch home content", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading && !content) return <Loader />;

  return (
    <Layout>
      <SEO
        title="Premium Agricultural Export Company"
        description="NJR EXIM is a leading international exporter specializing in premium Indian agricultural products like Rice, Spices, Fruits, and Vegetables. Quality guaranteed."
        canonical="/"
      />
      <HeroSection content={content?.hero} />
      <AboutSection content={content?.aboutSection} />
      <ProductsSection />
      <FeaturesSection />
      <WhyUsSection />
      <VideoBanner />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
