import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { LOGO, LINKS, COMPANY } from "@/data/brand";

const columns = [
  {
    title: "Platform",
    links: [
      { name: "The Dietary Guide app", href: "/app" },
      { name: "Free health tools", href: "/tools" },
      { name: "Journal", href: "/blog" },
      { name: "Recipes", href: "/recipes" },
    ],
  },
  {
    title: "Features",
    links: [
      { name: "IRA, AI nutrition assistant", href: "/home#ira" },
      { name: "Photo meal logging", href: "/home#meal-logging" },
      { name: "Diet guidance", href: "/home#diet-guidance" },
      { name: "BMI and health analytics", href: "/home#analytics" },
    ],
  },
  {
    title: "Our Products",
    links: [
      { name: "Chana Jor", href: "/products/sp-2" },
      { name: "Rajma Jor Masala", href: "/products/sp-2b" },
      { name: "High-Protein Millet Granola", href: "/products/sp-1" },
      { name: "Almond Protein Bar", href: "/products/sp-6" },
      { name: "Mixed Seed Protein Bar", href: "/products/sp-5" },
      { name: "Digestion Tea", href: "/products/sp-4" },
      { name: "The Wellness Treat", href: "/products/wt-1" },
    ],
  },
  {
    title: "Navdhi",
    links: [
      { name: "About us", href: "/about" },
      { name: "Our technology", href: "/technology" },
      { name: "NAPA research", href: "/technology#napa" },
      { name: "NAHACE research", href: "/technology#nahace" },
      { name: "Contact", href: "/about#contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="dg-grain relative overflow-hidden bg-brand-deep text-left font-sans text-brand-cream">
      <div className="dg-wrap pb-8 pt-16 md:pt-24">
        {/* Closing statement */}
        <div className="flex flex-col gap-10 border-b border-brand-cream/15 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <img src={LOGO.onDark} alt="Dietary Guide" width={500} height={152} loading="lazy" className="h-12 w-auto md:h-14" />
            <p className="mt-7 font-editorial text-[2rem] leading-[1.08] text-brand-cream md:text-[2.75rem]">
              Nutrition that is smarter, closer to home, <em className="text-brand-terra">and good to eat.</em>
            </p>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-brand-cream/65">
              Dietary Guide is an AI-powered nutrition and wellness platform, with its own range of healthy foods. A Navdhi company.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={LINKS.playStore} target="_blank" rel="noopener noreferrer" className="dg-btn dg-btn-terra">
              Get the app <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link to="/products" className="dg-btn dg-btn-line-light">
              Explore Our Products
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-[1fr_1fr_1.15fr_1fr_1.25fr]">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-cream/45">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link to={l.href} className="text-[0.92rem] text-brand-cream/80 transition-colors hover:text-brand-terra">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-cream/45">Contact</h3>
            <ul className="mt-5 space-y-4 text-[0.92rem] text-brand-cream/80">
              <li>
                <a href={`mailto:${LINKS.email}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-terra">
                  <Mail className="h-4 w-4 shrink-0 text-brand-terra" /> {LINKS.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-terra" />
                <span className="leading-relaxed">{COMPANY.address}</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-2.5">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dietary Guide on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/25 transition-colors hover:border-brand-terra hover:bg-brand-terra"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dietary Guide on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/25 transition-colors hover:border-brand-terra hover:bg-brand-terra"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-brand-cream/15 pt-7 text-[0.82rem] text-brand-cream/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dietary Guide by Navdhi. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="transition-colors hover:text-brand-cream">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-brand-cream">Terms &amp; Conditions</Link>
            <a href={LINKS.capsule} target="_blank" rel="noopener" className="transition-colors hover:text-brand-cream">
              AI Knowledge Capsule
            </a>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-[0.74rem] leading-relaxed text-brand-cream/40">
          Dietary Guide offers general nutrition and wellness information. It is not a substitute for medical advice, diagnosis or treatment. Speak to a qualified professional about your own health.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
