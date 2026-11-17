import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBrandSurface, useHashScroll } from "@/hooks/use-brand-surface";

/** Shared frame for brand pages: light surface, nav, footer and hash scrolling. */
export const PageShell = ({ children }: { children: ReactNode }) => {
  useBrandSurface();
  useHashScroll();
  return (
    <div className="dg-page flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}

export const PageHero = ({ eyebrow, title, intro, dark, children }: PageHeroProps) => (
  <section className={`dg-grain relative overflow-hidden pb-16 pt-[128px] md:pb-24 md:pt-[170px] ${dark ? "bg-brand-teal text-brand-cream" : "bg-brand-paper text-brand-teal"}`}>
    <div className="dg-wrap">
      <p className="dg-eyebrow text-brand-terra">{eyebrow}</p>
      <h1 className="mt-6 max-w-5xl text-[clamp(2.9rem,7.4vw,6.4rem)]">{title}</h1>
      {intro && <div className={`mt-7 max-w-2xl text-[1.06rem] leading-[1.75] ${dark ? "text-brand-cream/70" : "text-brand-teal/70"}`}>{intro}</div>}
      {children}
    </div>
  </section>
);
