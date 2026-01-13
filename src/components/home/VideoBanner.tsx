import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const VideoBanner = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')",
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Play Button */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-2xl group"
          aria-label="Play video"
        >
          <Play className="w-8 h-8 md:w-10 md:h-10 ml-1 group-hover:scale-110 transition-transform" />
        </button>
        
        <h3 className="mt-8 text-2xl md:text-3xl font-bold text-white">
          Watch Our Story
        </h3>
        <p className="mt-2 text-white/80 max-w-md">
          Discover how NJR Exim is transforming global trade with quality and reliability.
        </p>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-0">
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="NJR Exim Company Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoBanner;
