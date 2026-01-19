import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/ui/Loader";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  Phone,
  Mail,
  Clock
};

const Contact = () => {
  const [content, setContent] = useState<{
    hero?: { badge: string; title: string; description: string };
    info?: { address: string[]; phones: string[]; emails: string[]; workingHours: string[] };
  } | null>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageData, settingsData] = await Promise.all([
          api.get("/pages/contact").catch(err => ({ data: { content: null } })),
          api.get("/settings").catch(err => ({ data: null }))
        ]);
        if (pageData?.data) {
          setContent(pageData.data.content || null);
        }
        if (settingsData?.data) {
          setSettings(settingsData.data);
        }
      } catch (error) {
        console.error("Failed to fetch contact page data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/inquiries", formData);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "", email: "", phone: "", company: "", country: "", subject: "", message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  if (loading && !content) return <Loader />;

  const hero = content?.hero || {
    badge: "Get In Touch",
    title: "Contact Us",
    description: "Have questions about our products or services? We're here to help. Reach out to us and we'll respond as soon as possible."
  };

  // Use settings data if available, otherwise use page content or defaults
  const info = content?.info;
  const contactCards = settings ? [
    {
      icon: MapPin,
      title: "Visit Us",

      details: [
        `${settings.address}`,
        `${settings.city}, ${settings.state} ${settings.pincode}, ${settings.country}`
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        settings.contactPhone ? `Hotline: ${settings.contactPhone}` : "+91 123 456 7890",
        settings.alternatePhone ? `Mobile: ${settings.alternatePhone}` : null
      ].filter(Boolean)
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [settings.contactEmail || "info@njrexim.com" /*, settings.alternateEmail */].filter(Boolean)
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: settings.workingHours || ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM"]
    },
  ] : (info ? [
    { icon: MapPin, title: "Visit Us", details: info.address || ["Address details unavailable"] },
    { icon: Phone, title: "Call Us", details: info.phones || ["Phone unavailable"] },
    { icon: Mail, title: "Email Us", details: info.emails || ["Email unavailable"] },
    { icon: Clock, title: "Working Hours", details: info.workingHours || ["Working hours unavailable"] },
  ] : [
    { icon: MapPin, title: "Visit Us", details: ["Address details unavailable"] },
    { icon: Phone, title: "Call Us", details: ["Phone unavailable"] },
    { icon: Mail, title: "Email Us", details: ["Email unavailable"] },
    { icon: Clock, title: "Working Hours", details: ["Working hours unavailable"] },
  ]);

  return (
    <Layout>
      <SEO
        title="Contact Us for Global Export Inquiries"
        description="Get in touch with NJR EXIM for premium agricultural product quotes, export inquiries, and international trade partnerships. We respond within 24 hours."
        canonical="/contact"
      />
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground text-sm font-medium uppercase tracking-widest rounded-full mb-6 border border-primary/30">
              {hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {hero.title.includes("Us") ? (
                <>Contact <span className="text-golden">Us</span></>
              ) : hero.title}
            </h1>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactCards.map((info) => (
              <div
                key={info.title}
                className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{info.title}</h3>
                {info.details.map((detail, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-foreground mb-2">
                      Country
                    </label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="United States"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Select value={formData.subject} onValueChange={handleSubjectChange} required>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                        <SelectItem value="quote-request">Quote Request</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="quality-concern">Quality Concern</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Map & Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Location</h2>
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <iframe
                    src="https://maps.google.com/maps?q=E+109,+Girija+Marvel,+Friends+colony,+Chanda+Nagar,+Hyderabad,+Pin+code+500050&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="NJR Exim Location"
                  />
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Quick Response Guarantee</h3>
                <p className="text-primary-foreground/90 mb-6">
                  We understand the importance of timely communication in international trade.
                  Our team is committed to responding to all inquiries within 24 hours.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-golden" />
                    <span>Response within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-golden" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-golden" />
                    <span>Multilingual support available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Have Questions Before Reaching Out?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Check out our FAQ section for answers to common questions about our products,
            services, and export process.
          </p>
          <a
            href="/#faq"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            View FAQs
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
