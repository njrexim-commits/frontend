import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import api from "@/lib/api";

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await api.get("/testimonials");
                setTestimonials(response.data);
            } catch (error) {
                console.error("Failed to fetch testimonials", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading || testimonials.length === 0) return null;

    return (
        <section className="section-padding bg-muted/30">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What Our <span className="text-primary">Clients Say</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Trusted by businesses worldwide for our quality and reliability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="bg-background border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative group"
                        >
                            <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-foreground/80 mb-6 italic leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center text-primary font-bold">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{testimonial.name}</h4>
                                    {testimonial.designation && (
                                        <p className="text-xs text-muted-foreground">{testimonial.designation}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
