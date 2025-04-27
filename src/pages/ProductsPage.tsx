
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import { Toaster } from "@/components/ui/toaster";

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Products />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default ProductsPage;
