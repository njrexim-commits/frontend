import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { ArrowLeft, Package, FileText, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  specifications: string[];
  packaging: string[];
  grades: string[];
  origin: string;
  harvestSeason?: string;
}

const categoryData: Record<string, { title: string; description: string; products: ProductDetail[] }> = {
  onion: {
    title: "Onion",
    description: "Premium quality onions sourced from the finest farms, known for their pungent flavor and extended shelf life.",
    products: [
      {
        id: "red-onion",
        name: "Red Onion",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80",
        description: "Premium quality red onions with dark red color and strong pungent flavor, perfect for international markets.",
        specifications: ["Size: 40-80mm", "Moisture: Max 85%", "Color: Dark Red", "Shelf Life: 3-4 months"],
        packaging: ["Mesh bags (5kg, 10kg, 25kg)", "Jute bags", "Carton boxes with ventilation"],
        grades: ["Grade A", "Grade B"],
        origin: "Maharashtra & Gujarat, India",
        harvestSeason: "November - March",
      },
      {
        id: "white-onion",
        name: "White Onion",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZBhMH7F0jDDfVW7pa9aa0O7i8dKhd3ZHyQ&s",
        description: "Mild-flavored white onions ideal for raw consumption and salads.",
        specifications: ["Size: 40-70mm", "Moisture: Max 85%", "Color: Pure White", "Shelf Life: 2-3 months"],
        packaging: ["Mesh bags (10kg, 25kg)", "Carton boxes"],
        grades: ["Premium", "Standard"],
        origin: "Karnataka & Maharashtra, India",
      },
    ],
  },
  fruits: {
    title: "Fruits",
    description: "Fresh tropical and seasonal fruits exported to international markets with optimal ripeness.",
    products: [
      {
        id: "alphonso-mango",
        name: "Alphonso Mango",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80",
        description: "The king of mangoes, known for its rich, creamy texture and unique sweet taste.",
        specifications: ["Size: 180-350g", "Brix: 16-18%", "Color: Golden Yellow", "Season: April-June"],
        packaging: ["Corrugated boxes (2kg, 5kg)", "Air-freight packaging", "Ripening controlled"],
        grades: ["Premium", "Standard"],
        origin: "Maharashtra & Gujarat, India",
        harvestSeason: "April - June",
      },
      {
        id: "banana",
        name: "Cavendish Banana",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80",
        description: "Export-quality bananas with excellent taste and extended shelf life.",
        specifications: ["Finger length: 15-22cm", "Grade: 1-2", "Ripeness: Green", "Brix: 18-20"],
        packaging: ["Cartons (13kg, 18kg)", "Modified atmosphere packaging"],
        grades: ["Premium", "Standard"],
        origin: "Tamil Nadu & Maharashtra, India",
      },
    ],
  },
  vegetables: {
    title: "Vegetables",
    description: "Farm-fresh vegetables meeting international quality standards for global markets.",
    products: [
      {
        id: "potato",
        name: "Fresh Potato",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVA0QSQmqNrCqzRia7jGiRApkCzPemTxb0w&s",
        description: "High-quality potatoes ideal for chips, fries, and various culinary preparations.",
        specifications: ["Size: 40-80mm", "Moisture: 78-80%", "Starch: 12-14%", "Clean & Disease-free"],
        packaging: ["PP bags (25kg, 50kg)", "Mesh bags", "Bulk containers"],
        grades: ["Grade A", "Processing Grade"],
        origin: "Punjab & Uttar Pradesh, India",
      },
      {
        id: "tomato",
        name: "Fresh Tomato",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Da6sduPCtZTFk0ZkO8LbL637SA0KKJSgNA&s",
        description: "Vine-ripened tomatoes with excellent flavor and firmness.",
        specifications: ["Size: 60-80mm", "Color: Deep Red", "Firmness: High", "Brix: 4-5%"],
        packaging: ["Plastic crates (10kg)", "Carton boxes (5kg)"],
        grades: ["Premium", "Standard"],
        origin: "Karnataka & Maharashtra, India",
      },
    ],
  },
  spices: {
    title: "Spices",
    description: "Aromatic spices with high curcumin content and essential oils, adding flavor to cuisines worldwide.",
    products: [
      {
        id: "turmeric",
        name: "Turmeric Powder",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80",
        description: "Premium turmeric powder with high curcumin content, sourced from the finest farms.",
        specifications: ["Curcumin: 3-5%", "Moisture: Max 10%", "Mesh Size: 60-80", "Color Value: 8-10"],
        packaging: ["PP bags (25kg)", "Paper bags", "Custom bulk packaging"],
        grades: ["Premium", "Standard", "Organic certified"],
        origin: "Telangana & Tamil Nadu, India",
      },
      {
        id: "red-chilli",
        name: "Red Chilli",
        image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&q=80",
        description: "Hot and vibrant red chillies known for their intense color and heat level.",
        specifications: ["Heat Units: 15,000-30,000 SHU", "Moisture: Max 11%", "Color: ASTA 120+", "Length: 8-12cm"],
        packaging: ["PP woven bags (25kg)", "Vacuum packs", "Cartons"],
        grades: ["Teja", "S17", "334"],
        origin: "Andhra Pradesh & Telangana, India",
      },
    ],
  },
  "frozen-items": {
    title: "Frozen Items",
    description: "IQF frozen vegetables and fruits maintaining freshness and nutritional value.",
    products: [
      {
        id: "frozen-peas",
        name: "Frozen Green Peas",
        image: "https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=800&q=80",
        description: "IQF frozen green peas, maintaining freshness and nutritional value.",
        specifications: ["Temperature: -18°C", "Size: 7-9mm", "Defect: Max 2%", "Blanched"],
        packaging: ["PE bags (1kg, 10kg)", "Cartons (10kg)", "Bulk IQF"],
        grades: ["Premium", "Standard"],
        origin: "Punjab & Haryana, India",
      },
    ],
  },
  confectionery: {
    title: "Confectionery",
    description: "Premium nuts and confectionery items perfect for snacking and culinary applications.",
    products: [
      {
        id: "cashew",
        name: "Cashew Nuts",
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=80",
        description: "Premium grade cashew nuts, perfect for snacking and confectionery applications.",
        specifications: ["Size: W240, W320", "Moisture: Max 5%", "Broken: Max 5%", "Light color"],
        packaging: ["Vacuum tins (10kg)", "Cartons (20kg)", "Custom retail packs"],
        grades: ["W180", "W240", "W320", "Splits"],
        origin: "Kerala & Karnataka, India",
      },
    ],
  },
  rice: {
    title: "Rice",
    description: "Aromatic basmati and non-basmati rice varieties for premium culinary applications.",
    products: [
      {
        id: "basmati-rice",
        name: "Basmati Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
        description: "Aromatic long-grain basmati rice with exceptional taste and aroma.",
        specifications: ["Grain Length: 7.5mm+", "Moisture: Max 12%", "Broken: Max 1%", "Aroma: Extra Long"],
        packaging: ["PP bags (5kg, 10kg, 25kg)", "Jute bags (50kg)", "Custom packaging available"],
        grades: ["1121 Sella", "Traditional Basmati", "Pusa Basmati"],
        origin: "Punjab & Haryana, India",
      },
    ],
  },
  flour: {
    title: "Flour",
    description: "Fine quality wheat and grain flours ideal for bread, pastries, and traditional recipes.",
    products: [
      {
        id: "wheat-flour",
        name: "Wheat Flour",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
        description: "Fine quality wheat flour ideal for bread, pastries, and traditional recipes.",
        specifications: ["Protein: 10-12%", "Moisture: Max 14%", "Ash: Max 0.6%", "Gluten: 28-32%"],
        packaging: ["PP bags (25kg, 50kg)", "Paper bags", "Bulk containers"],
        grades: ["Premium", "Standard", "Whole Wheat"],
        origin: "Punjab & Madhya Pradesh, India",
      },
    ],
  },
  salt: {
    title: "Salt",
    description: "Natural rock and sea salt for food and industrial applications.",
    products: [
      {
        id: "rock-salt",
        name: "Rock Salt",
        image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=800&q=80",
        description: "Natural rock salt with minerals, perfect for cooking and industrial applications.",
        specifications: ["NaCl: 98%+", "Moisture: Max 0.5%", "Mesh: Various sizes", "Iodized options"],
        packaging: ["PP bags (25kg, 50kg)", "Jumbo bags (1MT)", "Retail packs"],
        grades: ["Food Grade", "Industrial Grade"],
        origin: "Gujarat & Rajasthan, India",
      },
    ],
  },
  makhana: {
    title: "Makhana / Fox Nuts",
    description: "Premium quality superfood fox nuts rich in protein and antioxidants.",
    products: [
      {
        id: "fox-nuts",
        name: "Fox Nuts (Makhana)",
        image: "https://tiimg.tistatic.com/fp/1/009/018/fox-nuts-691.jpg",
        description: "Premium quality fox nuts, a healthy superfood snack rich in protein and antioxidants.",
        specifications: ["Size: 12-14mm+", "Moisture: Max 10%", "Color: White/Cream", "Handpicked"],
        packaging: ["PP bags (10kg, 25kg)", "Vacuum packs", "Retail pouches"],
        grades: ["Premium 4-Sutta", "Standard 3-Sutta", "Regular"],
        origin: "Bihar & Madhya Pradesh, India",
      },
    ],
  },
};

const ProductCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? categoryData[slug] : null;

  if (!category) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The product category you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`${category.title} - Quality Export Grade`}
        description={category.description}
        canonical={`/products/${slug}`}
      />
      {/* Breadcrumb & Header */}
      <section className="bg-secondary text-secondary-foreground pt-32 pb-12">
        <div className="container-custom">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-golden hover:text-golden/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Products
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
          <p className="text-lg text-secondary-foreground/80 max-w-3xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-16">
            {category.products.map((product) => (
              <div key={product.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Image */}
                <div className="sticky top-24">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-3">{product.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>

                  {/* Origin & Season */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{product.origin}</span>
                    </div>
                    {product.harvestSeason && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Season: {product.harvestSeason}</span>
                      </div>
                    )}
                  </div>

                  {/* Specifications */}
                  <div className="bg-card p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Specifications</h3>
                    </div>
                    <ul className="space-y-2">
                      {product.specifications.map((spec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Packaging */}
                  <div className="bg-card p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Packaging Options</h3>
                    </div>
                    <ul className="space-y-2">
                      {product.packaging.map((pack, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-golden mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{pack}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grades */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">Available Grades</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.grades.map((grade, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-full"
                        >
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Link to="/contact">
                      <Button size="lg" className="w-full sm:w-auto">
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Interested in Our {category.title}?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact us for detailed specifications, pricing, and minimum order quantities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">Get In Touch</Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductCategory;
