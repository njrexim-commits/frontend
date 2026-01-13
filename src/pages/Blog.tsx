import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Global Demand for Indian Basmati Rice: Trends and Insights",
      excerpt: "Explore the growing international demand for premium Indian basmati rice and what makes it a favorite in global markets.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
      category: "Market Trends",
      date: "2024-12-15",
      readTime: "5 min read",
      author: "NJR Exim Team",
    },
    {
      id: "2",
      title: "Quality Control in Agricultural Exports: Our Process",
      excerpt: "Learn about our comprehensive quality control measures that ensure every shipment meets international standards.",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80",
      category: "Quality Assurance",
      date: "2024-12-10",
      readTime: "7 min read",
      author: "Quality Team",
    },
    {
      id: "3",
      title: "Understanding International Food Safety Certifications",
      excerpt: "A comprehensive guide to the various certifications required for exporting food products to different countries.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      category: "Compliance",
      date: "2024-12-05",
      readTime: "6 min read",
      author: "Compliance Team",
    },
    {
      id: "4",
      title: "The Journey of Alphonso Mangoes: From Farm to International Markets",
      excerpt: "Discover how we handle the delicate process of exporting the king of mangoes to customers worldwide.",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80",
      category: "Products",
      date: "2024-11-28",
      readTime: "4 min read",
      author: "NJR Exim Team",
    },
    {
      id: "5",
      title: "Sustainable Sourcing: Our Commitment to Ethical Trade",
      excerpt: "How we work with local farmers and suppliers to ensure sustainable and ethical sourcing practices.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
      category: "Sustainability",
      date: "2024-11-20",
      readTime: "5 min read",
      author: "Sourcing Team",
    },
    {
      id: "6",
      title: "Spices Export: Meeting Global Demand for Indian Flavors",
      excerpt: "The rising popularity of Indian spices in international cuisines and how we meet this growing demand.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
      category: "Products",
      date: "2024-11-15",
      readTime: "6 min read",
      author: "Product Team",
    },
    {
      id: "7",
      title: "Packaging Innovations in Agricultural Exports",
      excerpt: "Exploring modern packaging solutions that extend shelf life and maintain product quality during international shipping.",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
      category: "Logistics",
      date: "2024-11-08",
      readTime: "5 min read",
      author: "Operations Team",
    },
    {
      id: "8",
      title: "Navigating Export Documentation: A Complete Guide",
      excerpt: "Understanding the essential documents required for smooth international trade operations and customs clearance.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      category: "Compliance",
      date: "2024-11-01",
      readTime: "8 min read",
      author: "Documentation Team",
    },
    {
      id: "9",
      title: "The Rise of Fox Nuts (Makhana) in Health-Conscious Markets",
      excerpt: "How this traditional Indian superfood is gaining popularity in international health food markets.",
      image: "https://static.investindia.gov.in/s3fs-public/2025-02/makhana-banner-1200x400.jpg",
      category: "Market Trends",
      date: "2024-10-25",
      readTime: "4 min read",
      author: "Market Analysis",
    },
  ];

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground text-sm font-medium uppercase tracking-widest rounded-full mb-6 border border-primary/30">
              Blog & Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Industry <span className="text-golden">Insights</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed mb-8">
              Stay informed with the latest trends, insights, and news from the agricultural 
              export industry.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-background text-foreground rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Article</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="aspect-video lg:aspect-auto overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 w-fit">
                {featuredPost.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>
              <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
                Read Article
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted border-y border-border">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-background text-muted-foreground hover:bg-background/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <article
                  key={post.id}
                  className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-4 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Subscribe to receive the latest industry insights, market trends, and company updates directly to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 bg-white text-foreground rounded-full px-6"
            />
            <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
