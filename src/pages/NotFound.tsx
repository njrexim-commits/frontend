import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <p className="mb-4 text-2xl text-foreground font-semibold">Oops! Page not found</p>
          <p className="mb-8 text-muted-foreground">The page you are looking for might have been moved or doesn't exist.</p>
          <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all">
            Return to Home
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
