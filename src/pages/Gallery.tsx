import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import api from "@/lib/api";
import Loader from "@/components/ui/Loader";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultGalleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
      title: "Premium Basmati Rice",
      category: "Products",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
      title: "Container Shipping",
      category: "Logistics",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80",
      title: "Fresh Alphonso Mangoes",
      category: "Products",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
      title: "Spices Collection",
      category: "Products",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      title: "Warehouse Operations",
      category: "Facilities",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80",
      title: "Fresh Red Onions",
      category: "Products",
    },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get("/gallery");
        if (data && data.length > 0) {
          const formattedImages = data.map((item: any) => ({
            id: item._id,
            url: item.image || item.url,
            title: item.title || "Gallery Image",
            category: item.category || "General",
          }));
          setGalleryImages(formattedImages);
        } else {
          setGalleryImages(defaultGalleryImages);
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error);
        setGalleryImages(defaultGalleryImages);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return <Loader />;

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <Layout>
      <SEO
        title="Our Facilities & Product Gallery"
        description="A visual journey through NJR EXIM's premium products, state-of-the-art facilities, quality inspection process, and global logistics operations."
        canonical="/gallery"
      />
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground text-sm font-medium uppercase tracking-widest rounded-full mb-6 border border-primary/30">
              Gallery
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Visual <span className="text-golden">Journey</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed">
              Explore our collection of premium products, state-of-the-art facilities,
              and global operations through our image gallery.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary text-sm font-medium uppercase tracking-wider mb-1">
                    {image.category}
                  </span>
                  <h3 className="text-white text-lg font-bold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black border-0">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 text-white hover:text-primary transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery image"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Want to See More?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Visit our facilities or schedule a virtual tour to see our operations firsthand.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Schedule a Visit
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
