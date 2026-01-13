import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "NJR Exim has been our trusted partner for over 3 years. Their quality of rice and spices is consistently excellent, and their team is incredibly responsive to our needs.",
    author: "Ahmed Al-Rashid",
    country: "United Arab Emirates",
    company: "Al-Rashid Trading Co.",
  },
  {
    id: 2,
    content: "The professionalism and reliability of NJR Exim is unmatched. They handle all documentation seamlessly, making international trade hassle-free for us.",
    author: "Sarah Chen",
    country: "Singapore",
    company: "Asia Pacific Foods Ltd.",
  },
  {
    id: 3,
    content: "We've sourced agricultural products from many suppliers, but NJR Exim stands out for their commitment to quality and timely delivery. Highly recommended!",
    author: "Michael Thompson",
    country: "United Kingdom",
    company: "British Import House",
  },
  {
    id: 4,
    content: "Outstanding service and premium quality products. NJR Exim understands the European market requirements perfectly and delivers accordingly.",
    author: "Hans Mueller",
    country: "Germany",
    company: "Mueller Foods GmbH",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Image Side */}
          <div className="relative h-[300px] lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80"
              alt="Shipping logistics and global trade"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* Testimonial Side */}
          <div className="bg-secondary p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <span className="inline-block text-golden font-semibold uppercase tracking-wider text-sm">
                Testimonials
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mt-2">
                What Our Clients Say
              </h2>
            </div>

            <div className="relative min-h-[250px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <Quote className="w-12 h-12 text-primary/30 mb-4" />
                  <p className="text-secondary-foreground/90 text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-secondary-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-secondary-foreground/60 text-sm">
                      {testimonial.company} • {testimonial.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
