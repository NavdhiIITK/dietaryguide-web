import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOOptimizer from "@/components/SEOOptimizer";
import Hero from "@/components/home/Hero";
import Ecosystem from "@/components/home/Ecosystem";
import Platform from "@/components/home/Platform";
import ProductShowcase from "@/components/home/ProductShowcase";
import Research from "@/components/home/Research";
import { Why, AppExperience } from "@/components/home/WhyAndApp";
import Journal from "@/components/home/Journal";
import PressGallery from "@/components/PressGallery";
import { useBrandSurface, useHashScroll } from "@/hooks/use-brand-surface";

const Index = () => {
  useBrandSurface();
  useHashScroll();

  return (
    <div className="dg-page flex min-h-screen flex-col overflow-x-hidden">
      <SEOOptimizer
        title="Dietary Guide by Navdhi | AI-Powered Nutrition, Wellness & Healthy Food"
        description="Dietary Guide is an AI-powered nutrition and wellness platform by Navdhi. Meet IRA, our AI nutrition assistant, log meals with a photo, track BMI and progress, and shop healthy snacks made by the same team."
        keywords="Dietary Guide, dietaryguide.in, Dietary Guide by Navdhi, AI nutrition assistant, IRA nutrition assistant, AI meal logging, Indian diet plan, BMI calculator, personalised nutrition India, ICMR 2024 dietary guidelines, healthy snacks India, chana jor, millet granola, protein bar India, Navdhi"
        url="/"
        breadcrumbs={[{ name: "Home", url: "https://dietaryguide.in/" }]}
      />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Ecosystem />
        <Platform />
        <ProductShowcase />
        <Research />
        <Why />
        <PressGallery />
        <AppExperience />
        <Journal />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
