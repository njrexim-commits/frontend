import { Link } from "react-router-dom";
import { Globe, Phone, Mail, MapPin, ArrowUp, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";

const Footer = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Products", path: "/products" },
    { name: "Certificates", path: "/certificates" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  const productLinks = [
    { name: "Onion", path: "/products/onion" },
    { name: "Fruits", path: "/products/fruits" },
    { name: "Vegetables", path: "/products/vegetables" },
    { name: "Spices", path: "/products/spices" },
    { name: "Rice", path: "/products/rice" },
    { name: "Makhana", path: "/products/makhana" },
  ];

  const socialLinks = [
    { icon: Facebook, href: settings?.socialMedia?.facebook || "#", label: "Facebook" },
    { icon: Twitter, href: settings?.socialMedia?.twitter || "#", label: "Twitter" },
    { icon: Linkedin, href: settings?.socialMedia?.linkedin || "#", label: "LinkedIn" },
    { icon: Instagram, href: settings?.socialMedia?.instagram || "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/sitelogo.png" alt="NJR EXIM" className="h-14 w-auto object-contain brightness-0 invert opacity-90" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted partner in global trade. Delivering quality agricultural
              and food products to international markets with excellence and reliability.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-golden transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-golden transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-white/70 text-sm">
                  {settings?.address} <br />
                  {settings?.city}, {settings?.state} {settings?.pincode}, {settings?.country}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <a
                    href={`tel:${settings?.contactPhone}`}
                    className="text-white/70 hover:text-golden transition-colors"
                  >
                    {settings?.contactPhone}
                  </a>
                  {settings?.alternatePhone && (
                    <a
                      href={`tel:${settings?.alternatePhone}`}
                      className="text-white/70 hover:text-golden transition-colors"
                    >
                      {settings?.alternatePhone}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a
                  href={`mailto:${settings?.contactEmail}`}
                  className="text-white/70 hover:text-golden transition-colors"
                >
                  {settings?.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © 2026 NJR Exim. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
