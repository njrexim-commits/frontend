import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";
import Certificates from "./pages/Certificates";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import BlogManager from "./pages/admin/BlogManager";
import ProductManager from "./pages/admin/ProductManager";
import CertificateManager from "./pages/admin/CertificateManager";
import GalleryManager from "./pages/admin/GalleryManager";
import InquiryManager from "./pages/admin/InquiryManager";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import Setup from "./pages/admin/Setup";
import PageManager from "./pages/admin/PageManager";

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductCategory />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/setup" element={<Setup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="certificates" element={<CertificateManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="inquiries" element={<InquiryManager />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="pages" element={<PageManager />} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
