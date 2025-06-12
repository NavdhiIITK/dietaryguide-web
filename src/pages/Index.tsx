
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHomepage from "@/components/SEOHomepage";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <SEOHomepage />
      <Footer />
    </div>
  );
};

export default Home;
