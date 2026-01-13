import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1920&q=80",
    alt: "Premium rice in bowl on slate background",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1920&q=80",
    alt: "Fresh fruits export display",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1920&q=80",
    alt: "Fresh vegetables export quality",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=80",
    alt: "Premium spices export collection",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80",
    alt: "Agricultural products logistics and shipping",
  },
];

interface HeroSectionProps {
  content?: {
    title: string;
    highlightedText: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image?: string;
    slides?: Array<{ id: number; image: string; alt: string }>;
  };
}

const HeroSection = ({ content }: HeroSectionProps) => {
  const defaultSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1920&q=80",
      alt: "Premium rice in bowl on slate background",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1920&q=80",
      alt: "Fresh fruits export display",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1920&q=80",
      alt: "Fresh vegetables export quality",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=80",
      alt: "Premium spices export collection",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80",
      alt: "Agricultural products logistics and shipping",
    },
  ];

  // If a specific hero image is set via content management, use it as a single slide
  const slides = content?.image
    ? [{ id: 1, image: content.image, alt: content.title }]
    : (content?.slides && content.slides.length > 0 ? content.slides : defaultSlides);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (slides.length <= 1) return;
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length <= 1) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, slides.length]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center ${index === currentSlide ? "animate-zoom-slow" : ""
              }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {content?.title ? (
                content.title.split(content.highlightedText).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-golden">{content.highlightedText}</span>}
                  </span>
                ))
              ) : (
                <>
                  Discover Excellence in{" "}
                  <span className="text-golden">Exporting</span> Quality Goods
                </>
              )}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
              {content?.description || "Explore our diverse range of top-quality export products including premium rice, fresh fruits, vegetables, spices, and essential food items."}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              <Link to={content?.buttonLink || "/products"}>{content?.buttonText || "Explore Products"}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? "bg-golden w-8"
              : "bg-white/50 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
