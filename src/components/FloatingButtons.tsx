import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

const FloatingButtons = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const openWhatsApp = () => {
        window.open("https://wa.me/918800326418", "_blank");
    };

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
            {/* WhatsApp Button */}
            <Button
                onClick={openWhatsApp}
                className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg flex items-center justify-center p-0 group overflow-hidden transition-all duration-300 hover:scale-110"
                title="Contact on WhatsApp"
            >
                <MessageCircle className="w-8 h-8 text-white" />
                <span className="absolute right-full mr-3 bg-black/75 text-white text-sm py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat with us
                </span>
            </Button>

            {/* Back to Top Button */}
            {showScrollTop && (
                <Button
                    onClick={scrollToTop}
                    variant="secondary"
                    className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center p-0 animate-fade-in group"
                    title="Go to Top"
                >
                    <ArrowUp className="w-6 h-6" />
                    <span className="absolute right-full mr-3 bg-black/75 text-white text-sm py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Back to top
                    </span>
                </Button>
            )}
        </div>
    );
};

export default FloatingButtons;
