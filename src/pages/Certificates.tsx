import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Award, CheckCircle, FileCheck, Globe, Shield } from "lucide-react";
import api from "@/lib/api";
import Loader from "@/components/ui/Loader";

const Certificates = () => {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const defaultCertifications = [
    {
      icon: Award,
      title: "FSSAI Certified",
      description: "Food Safety and Standards Authority of India certification ensuring compliance with food safety regulations.",
      number: "License No: 12345678901234",
      validUntil: "Valid until: December 2026",
    },
    {
      icon: Globe,
      title: "IEC Certificate",
      description: "Import Export Code issued by DGFT, Government of India, authorizing us for international trade operations.",
      number: "IEC No: 1234567890",
      validUntil: "Permanent",
    },
    {
      icon: Shield,
      title: "ISO 9001:2015",
      description: "International standard for Quality Management System, demonstrating our commitment to consistent quality.",
      number: "Certificate No: ISO-2023-12345",
      validUntil: "Valid until: March 2026",
    },
    {
      icon: FileCheck,
      title: "APEDA Registration",
      description: "Registered with Agricultural and Processed Food Products Export Development Authority for agricultural exports.",
      number: "Registration No: APEDA/2023/12345",
      validUntil: "Valid until: December 2025",
    },
    {
      icon: CheckCircle,
      title: "Phytosanitary Certificate",
      description: "Plant quarantine certification issued for export of agricultural products to international markets.",
      number: "Issued by: Department of Agriculture",
      validUntil: "Per Shipment Basis",
    },
    {
      icon: Shield,
      title: "HACCP Certified",
      description: "Hazard Analysis and Critical Control Points certification for food safety management system.",
      number: "Certificate No: HACCP-2023-6789",
      validUntil: "Valid until: June 2026",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certsData, pageData] = await Promise.all([
          api.get("/certificates"),
          api.get("/pages/certificates")
        ]);
        const { data } = certsData;
        if (data && data.length > 0) {
          const formattedCerts = data.map((cert: any) => ({
            icon: Award, // Default icon, can be customized based on cert type
            title: cert.title || cert.name,
            description: cert.description,
            number: cert.number || cert.certificateNumber,
            validUntil: cert.validUntil || cert.validity,
          }));
          setCertifications(formattedCerts);
        } else {
          setCertifications(defaultCertifications);
        }
        setPageContent(pageData.data.content);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setCertifications(defaultCertifications);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;


  const qualityStandards = [
    {
      title: "International Standards",
      items: [
        "Codex Alimentarius Guidelines",
        "EU Food Safety Regulations",
        "FDA Import Standards",
        "Gulf Food Safety Standards",
      ],
    },
    {
      title: "Quality Testing",
      items: [
        "Laboratory Testing for Each Batch",
        "Pesticide Residue Analysis",
        "Microbiological Testing",
        "Heavy Metal Analysis",
      ],
    },
    {
      title: "Documentation",
      items: [
        "Certificate of Origin",
        "Health Certificate",
        "Fumigation Certificate",
        "Analysis Report",
      ],
    },
  ];

  return (
    <Layout>
      <SEO
        title="Quality Certifications & Global Compliance"
        description="NJR EXIM is proud to hold ISO 9001:2015, FSSAI, IEC, and APEDA certifications. We maintain the highest standards of food safety and quality management."
        canonical="/certificates"
      />
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground text-sm font-medium uppercase tracking-widest rounded-full mb-6 border border-primary/30">
              Certifications
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Quality <span className="text-golden">Certifications</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed">
              Our commitment to quality is validated by international certifications and compliance
              with global food safety standards.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We hold various certifications that demonstrate our commitment to quality,
              safety, and compliance with international standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <cert.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{cert.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {cert.description}
                </p>
                <div className="space-y-2 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground">{cert.number}</p>
                  <p className="text-sm text-muted-foreground">{cert.validUntil}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quality Standards & Compliance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We adhere to stringent quality standards and provide comprehensive documentation
              for all our exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityStandards.map((standard) => (
              <div
                key={standard.title}
                className="bg-card p-8 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
                  {standard.title}
                </h3>
                <ul className="space-y-3">
                  {standard.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Certification Matters */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Our Certifications Matter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Trust & Credibility",
                  description: "Our certifications provide assurance of quality and compliance to our international clients.",
                },
                {
                  title: "Market Access",
                  description: "Certifications enable us to export to regulated markets with strict import requirements.",
                },
                {
                  title: "Quality Assurance",
                  description: "Systematic quality management ensures consistent product quality across all shipments.",
                },
                {
                  title: "Risk Mitigation",
                  description: "Compliance with international standards reduces risks of product rejection and recalls.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-secondary/50 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-secondary-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Certificate Copies?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Request digital or physical copies of our certifications and quality documentation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Certificates;
