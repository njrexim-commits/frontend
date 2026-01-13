import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const productCategories = [
  { name: "Onion", slug: "onion" },
  { name: "Fruits", slug: "fruits" },
  { name: "Vegetables", slug: "vegetables" },
  { name: "Spices", slug: "spices" },
  { name: "Frozen Items", slug: "frozen-items" },
  { name: "Confectionery", slug: "confectionery" },
  { name: "Rice", slug: "rice" },
  { name: "Flour", slug: "flour" },
  { name: "Salt", slug: "salt" },
  { name: "Makhana / Fox Nuts", slug: "makhana" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
  { code: "zh", name: "中文" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PRODUCTS", path: "/products", hasDropdown: true },
    { name: "CERTIFICATE", path: "/certificates" },
    { name: "GALLERY", path: "/gallery" },
    { name: "BLOG", path: "/blog" },
    { name: "CONTACT", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-lg"
          : "bg-secondary"
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/sitelogo.png" alt="NJR EXIM" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${isActive(link.path)
                          ? "text-golden"
                          : "text-white/90 hover:text-golden"
                        }`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-white border-0 shadow-xl rounded-lg p-2"
                  >
                    {productCategories.map((category) => (
                      <DropdownMenuItem
                        key={category.slug}
                        asChild
                        className="cursor-pointer rounded-md transition-colors hover:bg-muted focus:bg-muted"
                      >
                        <Link
                          to={`/products/${category.slug}`}
                          className="w-full px-3 py-2 text-foreground"
                        >
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${isActive(link.path)
                      ? "text-golden"
                      : "text-white/90 hover:text-golden"
                    }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>
                    {languages.find((l) => l.code === selectedLanguage)?.name}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-0 shadow-xl rounded-lg p-2"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="cursor-pointer rounded-md transition-colors hover:bg-muted focus:bg-muted"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Brochure Button */}
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-secondary rounded-full px-6"
            >
              Brochure
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-secondary border-t border-white/10 animate-fade-in">
            <nav className="py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-between w-full px-4 py-3 text-white/90">
                          {link.name}
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-[calc(100vw-2rem)] bg-white border-0 shadow-xl rounded-lg p-2"
                      >
                        {productCategories.map((category) => (
                          <DropdownMenuItem
                            key={category.slug}
                            asChild
                            className="cursor-pointer"
                          >
                            <Link
                              to={`/products/${category.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="w-full px-3 py-2"
                            >
                              {category.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 ${isActive(link.path) ? "text-golden" : "text-white/90"
                        }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white hover:text-secondary rounded-full"
                >
                  Brochure
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
