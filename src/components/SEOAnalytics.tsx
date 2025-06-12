
import { useEffect } from 'react';

interface SEOAnalyticsProps {
  pageName: string;
  keywords: string[];
  contentType: 'recipe' | 'article' | 'tool' | 'homepage';
}

const SEOAnalytics = ({ pageName, keywords, contentType }: SEOAnalyticsProps) => {
  useEffect(() => {
    // Track page view with SEO context
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: pageName,
          page_location: window.location.href,
          content_group1: contentType,
          custom_map: {
            'custom_parameter_1': 'target_keywords'
          }
        });

        // Track specific SEO events
        window.gtag('event', 'page_view_seo', {
          event_category: 'SEO',
          event_label: pageName,
          custom_parameter_1: keywords.join(','),
          content_type: contentType
        });
      }
    };

    trackPageView();
  }, [pageName, keywords, contentType]);

  // Track scroll depth for engagement metrics
  useEffect(() => {
    const trackScrollDepth = () => {
      const scrollDepths = [25, 50, 75, 90];
      let trackedDepths: number[] = [];

      const handleScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        scrollDepths.forEach(depth => {
          if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
            trackedDepths.push(depth);
            
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'scroll_depth', {
                event_category: 'Engagement',
                event_label: `${depth}%`,
                value: depth,
                page_title: pageName
              });
            }
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    };

    return trackScrollDepth();
  }, [pageName]);

  return null; // This is a tracking component, no UI
};

export default SEOAnalytics;
