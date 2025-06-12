
import SEODashboard from "@/components/SEODashboard";
import SEOOptimizer from "@/components/SEOOptimizer";

const SEODashboardPage = () => {
  return (
    <>
      <SEOOptimizer 
        title="SEO Monitoring Dashboard"
        description="Backend SEO monitoring and keyword analysis for DietaryGuide.in - Track trending keywords, identify content gaps, and generate high-impact blog and social media suggestions."
        keywords="SEO monitoring, keyword analysis, content strategy, trending keywords, blog topics, Instagram ideas"
        schemaType="Tool"
        schemaData={{
          name: "SEO Monitoring Dashboard",
          description: "AI-powered SEO monitoring system for tracking keyword trends and generating content suggestions",
          url: "/seo-dashboard",
          about: "SEO Analysis Tool"
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "SEO Dashboard", url: "/seo-dashboard" }
        ]}
      />
      <SEODashboard />
    </>
  );
};

export default SEODashboardPage;
