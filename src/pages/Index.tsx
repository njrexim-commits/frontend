import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import VideoBanner from "@/components/home/VideoBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <FeaturesSection />
      <StatsSection />
      <WhyUsSection />
      <VideoBanner />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
