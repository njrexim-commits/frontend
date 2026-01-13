import { useState } from "react";
import { Eye, Heart, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  specifications: string[];
  packaging: string[];
  grades: string[];
}

const products: Product[] = [
  {
    id: "onion-1",
    name: "Red Onion",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80",
    category: "Onion",
    description: "Premium quality red onions sourced from the finest farms in India, known for their pungent flavor and long shelf life.",
    specifications: ["Size: 40-80mm", "Moisture: Max 85%", "Color: Dark Red", "Shelf Life: 3-4 months"],
    packaging: ["Mesh bags (5kg, 10kg, 25kg)", "Jute bags", "Carton boxes"],
    grades: ["Grade A", "Grade B"],
  },
  {
    id: "rice-1",
    name: "Basmati Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    category: "Rice",
    description: "Aromatic long-grain basmati rice with exceptional taste and aroma, perfect for premium culinary applications.",
    specifications: ["Grain Length: 7.5mm+", "Moisture: Max 12%", "Broken: Max 1%", "Aroma: Extra Long"],
    packaging: ["PP bags (5kg, 10kg, 25kg)", "Jute bags (50kg)", "Custom packaging available"],
    grades: ["1121 Sella", "Traditional Basmati", "Pusa Basmati"],
  },
  {
    id: "mango-1",
    name: "Alphonso Mango",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80",
    category: "Fruits",
    description: "The king of mangoes - Alphonso, known for its rich, creamy, tender texture and unique sweet taste.",
    specifications: ["Size: 180-350g", "Brix: 16-18%", "Color: Golden Yellow", "Season: April-June"],
    packaging: ["Corrugated boxes (2kg, 5kg)", "Air-freight packaging", "Ripening controlled"],
    grades: ["Premium", "Standard"],
  },
  {
    id: "potato-1",
    name: "Fresh Potato",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVA0QSQmqNrCqzRia7jGiRApkCzPemTxb0w&s",
    category: "Vegetables",
    description: "High-quality potatoes ideal for chips, fries, and various culinary preparations.",
    specifications: ["Size: 40-80mm", "Moisture: 78-80%", "Starch: 12-14%", "Clean & Disease-free"],
    packaging: ["PP bags (25kg, 50kg)", "Mesh bags", "Bulk containers"],
    grades: ["Grade A", "Processing Grade"],
  },
  {
    id: "turmeric-1",
    name: "Turmeric Powder",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80",
    category: "Spices",
    description: "Premium turmeric powder with high curcumin content, sourced from the finest farms.",
    specifications: ["Curcumin: 3-5%", "Moisture: Max 10%", "Mesh Size: 60-80", "Color Value: 8-10"],
    packaging: ["PP bags (25kg)", "Paper bags", "Custom bulk packaging"],
    grades: ["Premium", "Standard", "Organic certified"],
  },
  {
    id: "chilli-1",
    name: "Red Chilli",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80",
    category: "Spices",
    description: "Hot and vibrant red chillies known for their intense color and heat level.",
    specifications: ["Heat Units: 15,000-30,000 SHU", "Moisture: Max 11%", "Color: ASTA 120+", "Length: 8-12cm"],
    packaging: ["PP woven bags (25kg)", "Vacuum packs", "Cartons"],
    grades: ["Teja", "S17", "334"],
  },
  {
    id: "frozen-1",
    name: "Frozen Green Peas",
    image: "https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=600&q=80",
    category: "Frozen Items",
    description: "IQF frozen green peas, maintaining freshness and nutritional value.",
    specifications: ["Temperature: -18°C", "Size: 7-9mm", "Defect: Max 2%", "Blanched"],
    packaging: ["PE bags (1kg, 10kg)", "Cartons (10kg)", "Bulk IQF"],
    grades: ["Premium", "Standard"],
  },
  {
    id: "confec-1",
    name: "Cashew Nuts",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&q=80",
    category: "Confectionery",
    description: "Premium grade cashew nuts, perfect for snacking and confectionery applications.",
    specifications: ["Size: W240, W320", "Moisture: Max 5%", "Broken: Max 5%", "Light color"],
    packaging: ["Vacuum tins (10kg)", "Cartons (20kg)", "Custom retail packs"],
    grades: ["W180", "W240", "W320", "Splits"],
  },
  {
    id: "flour-1",
    name: "Wheat Flour",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    category: "Flour",
    description: "Fine quality wheat flour ideal for bread, pastries, and traditional recipes.",
    specifications: ["Protein: 10-12%", "Moisture: Max 14%", "Ash: Max 0.6%", "Gluten: 28-32%"],
    packaging: ["PP bags (25kg, 50kg)", "Paper bags", "Bulk containers"],
    grades: ["Premium", "Standard", "Whole Wheat"],
  },
  {
    id: "salt-1",
    name: "Rock Salt",
    image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&q=80",
    category: "Salt",
    description: "Natural rock salt with minerals, perfect for cooking and industrial applications.",
    specifications: ["NaCl: 98%+", "Moisture: Max 0.5%", "Mesh: Various sizes", "Iodized options"],
    packaging: ["PP bags (25kg, 50kg)", "Jumbo bags (1MT)", "Retail packs"],
    grades: ["Food Grade", "Industrial Grade"],
  },
  {
    id: "makhana-1",
    name: "Fox Nuts (Makhana)",
    image: "https://tiimg.tistatic.com/fp/1/009/018/fox-nuts-691.jpg",
    category: "Makhana",
    description: "Premium quality fox nuts, a healthy superfood snack rich in protein and antioxidants.",
    specifications: ["Size: 12-14mm+", "Moisture: Max 10%", "Color: White/Cream", "Handpicked"],
    packaging: ["PP bags (10kg, 25kg)", "Vacuum packs", "Retail pouches"],
    grades: ["Premium 4-Sutta", "Standard 3-Sutta", "Regular"],
  },
  {
    id: "banana-1",
    name: "Fresh Banana",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80",
    category: "Fruits",
    description: "Export-quality bananas with excellent taste and extended shelf life.",
    specifications: ["Finger length: 15-22cm", "Grade: 1-2", "Ripeness: Green", "Brix: 18-20"],
    packaging: ["Cartons (13kg, 18kg)", "Modified atmosphere", "Controlled ripening"],
    grades: ["Cavendish Premium", "Standard"],
  },
];

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Premium Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of high-quality agricultural and food products,
            carefully sourced and prepared for international export.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-card shadow-md hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
              >
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{product.name}</h3>

                {/* Action Icons */}
                <div className="flex gap-3 mt-4">
                  <button
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {selectedProduct.category}
                  </span>
                </div>
                <p className="text-muted-foreground">{selectedProduct.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Specifications</h4>
                    <ul className="space-y-2">
                      {selectedProduct.specifications.map((spec, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Packaging Options</h4>
                    <ul className="space-y-2">
                      {selectedProduct.packaging.map((pack, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-golden mt-2 flex-shrink-0" />
                          {pack}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Available Grades</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.grades.map((grade, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductsSection;
