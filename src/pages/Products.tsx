import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const productCategories = [
  {
    name: "Onion",
    slug: "onion",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80",
    description: "Premium quality red and white onions with extended shelf life",
    products: ["Red Onion", "White Onion", "Shallots"],
  },
  {
    name: "Fruits",
    slug: "fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80",
    description: "Fresh tropical and seasonal fruits for international markets",
    products: ["Alphonso Mango", "Banana", "Pomegranate", "Grapes"],
  },
  {
    name: "Vegetables",
    slug: "vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    description: "Farm-fresh vegetables meeting international quality standards",
    products: ["Potato", "Tomato", "Cucumber", "Cauliflower"],
  },
  {
    name: "Spices",
    slug: "spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    description: "Aromatic spices with high curcumin and essential oil content",
    products: ["Turmeric", "Red Chilli", "Cumin", "Coriander"],
  },
  {
    name: "Frozen Items",
    slug: "frozen-items",
    image: "https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=600&q=80",
    description: "IQF frozen vegetables and fruits maintaining nutritional value",
    products: ["Frozen Peas", "Frozen Corn", "Frozen Mixed Vegetables"],
  },
  {
    name: "Confectionery",
    slug: "confectionery",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&q=80",
    description: "Premium nuts and confectionery items for global markets",
    products: ["Cashew Nuts", "Almonds", "Pistachios", "Raisins"],
  },
  {
    name: "Rice",
    slug: "rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    description: "Aromatic basmati and non-basmati rice varieties",
    products: ["1121 Basmati", "Traditional Basmati", "Sona Masoori"],
  },
  {
    name: "Flour",
    slug: "flour",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    description: "Fine quality wheat and grain flours for various applications",
    products: ["Wheat Flour", "Rice Flour", "Gram Flour"],
  },
  {
    name: "Salt",
    slug: "salt",
    image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&q=80",
    description: "Natural rock and sea salt for food and industrial use",
    products: ["Rock Salt", "Sea Salt", "Iodized Salt"],
  },
  {
    name: "Makhana / Fox Nuts",
    slug: "makhana",
    image: "https://images.unsplash.com/photo-1627735483792-67d21edb3b4e?w=600&q=80",
    description: "Premium quality superfood fox nuts rich in nutrients",
    products: ["Premium Grade", "Standard Grade", "Flavored Makhana"],
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = productCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.products.some((product) =>
        product.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Layout>
      <SEO
        title="Our Premium Export Products"
        description="Browse our extensive range of high-quality export products: Basmati rice, exotic spices, fresh fruits, vegetables, and processed food items."
        canonical="/products"
      />
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground text-sm font-medium uppercase tracking-widest rounded-full mb-6 border border-primary/30">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premium Quality <span className="text-golden">Export Products</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed mb-8">
              Explore our comprehensive range of agricultural and food products, carefully sourced
              and prepared to meet international quality standards.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-background text-foreground rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No products found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/products/${category.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Available Products:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.products.slice(0, 3).map((product) => (
                          <span
                            key={product}
                            className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                        {category.products.length > 3 && (
                          <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                            +{category.products.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      View Products
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Products */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Products?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We ensure every product meets the highest standards of quality and safety.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quality Certified",
                description: "All products undergo rigorous quality testing and certification",
              },
              {
                title: "Fresh & Natural",
                description: "Sourced directly from verified farms and suppliers",
              },
              {
                title: "International Standards",
                description: "Compliant with global food safety and quality regulations",
              },
              {
                title: "Custom Packaging",
                description: "Flexible packaging options to meet your market requirements",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Quote?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Contact us for pricing, minimum order quantities, and custom packaging options.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
