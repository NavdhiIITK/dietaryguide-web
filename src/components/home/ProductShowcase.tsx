import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { showcaseProducts, type ShowcaseProduct } from "@/data/brand";
import { productMap } from "@/data/store-products";

type Range = "all" | ShowcaseProduct["range"];

const ranges: { id: Range; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "snacks", label: "Healthy Snacks" },
  { id: "protein", label: "Protein Products" },
  { id: "wellness", label: "Wellness Range" },
];

const ProductShowcase = () => {
  const location = useLocation();
  const [range, setRange] = useState<Range>("all");

  // The navigation links to #products-snacks, #products-protein and #products-wellness
  useEffect(() => {
    const m = location.hash.match(/^#products-(snacks|protein|wellness)$/);
    if (m) setRange(m[1] as Range);
    else if (location.hash === "#products") setRange("all");
  }, [location.hash]);

  const items = showcaseProducts.filter((p) => range === "all" || p.range === range);

  return (
    <section id="products" className="dg-grain relative scroll-mt-20 bg-brand-sand/60 py-20 md:py-32">
      <div className="dg-wrap">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <p className="dg-eyebrow text-brand-terra">Our healthy food products</p>
            <h2 className="mt-5 text-[clamp(2.7rem,6vw,5.2rem)] text-brand-teal">
              Advice is easier to follow <em className="text-brand-terra">when it tastes good.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-[1.02rem] leading-[1.75] text-brand-teal/70 lg:ml-auto">
              So we make the food too. Seven snacks and wellness foods from the same team that builds the app, each one made to fit the way we tell people to eat.
            </p>
          </Reveal>
        </div>

        <div role="tablist" aria-label="Product ranges" className="dg-scroll-x -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {ranges.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={range === r.id}
              onClick={() => setRange(r.id)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.86rem] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terra ${
                range === r.id ? "border-brand-teal bg-brand-teal text-brand-cream" : "border-brand-teal/25 text-brand-teal hover:border-brand-teal"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <ul className="dg-scroll-x -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {items.map((p, i) => {
            const wide = p.id === "wt-1" && range === "all";
            const price = productMap[p.id]?.price ?? p.price;
            return (
              <Reveal as="li" key={p.id} delay={(i % 4) * 70} className={`w-[78%] shrink-0 snap-start sm:w-auto ${wide ? "sm:col-span-2" : ""}`}>
                <Link
                  to={`/products/${p.id}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-shadow duration-500 hover:shadow-[0_40px_70px_-45px_rgba(13,38,40,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terra ${
                    wide ? "bg-brand-teal text-brand-cream" : "bg-brand-paper text-brand-teal"
                  }`}
                >
                  <div
                    className={`relative flex items-center justify-center ${
                      wide ? "h-[260px]" : p.blend ? "h-[260px] bg-white" : "h-[260px] bg-brand-cream"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={`Dietary Guide ${p.name}`}
                      loading="lazy"
                      className={`max-h-[80%] w-auto max-w-[82%] object-contain transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] ${
                        p.blend ? "" : "drop-shadow-[0_20px_18px_rgba(13,38,40,0.22)]"
                      }`}
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.14em] ${
                        wide ? "bg-brand-cream/10 text-brand-cream" : "bg-brand-paper/90 text-brand-teal/70"
                      }`}
                    >
                      {p.category}
                    </span>
                  </div>

                  <div className={`flex flex-1 flex-col p-6 ${wide ? "md:px-8" : ""}`}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={wide ? "text-[2.2rem] md:text-[2.5rem]" : "text-[1.75rem]"}>{p.name}</h3>
                      <span className={`mt-1 shrink-0 font-sans text-[0.95rem] font-bold ${wide ? "text-brand-cream" : "text-brand-teal"}`}>₹{price}</span>
                    </div>
                    <p className={`mt-2.5 text-[0.92rem] leading-[1.6] ${wide ? "max-w-sm text-brand-cream/70" : "text-brand-teal/65"}`}>{p.line}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.facts.map((f) => (
                        <li
                          key={f}
                          className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${
                            wide ? "bg-brand-cream/10 text-brand-cream/85" : "bg-brand-cream text-brand-teal/80"
                          }`}
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className={`mt-auto inline-flex items-center gap-2 pt-6 text-[0.86rem] font-bold ${wide ? "text-brand-terra" : "text-brand-terra"}`}>
                      Explore product
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-3 text-[0.75rem] font-semibold text-brand-teal/50 sm:hidden">Swipe to see the range</p>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-brand-teal/15 pt-8 md:flex-row md:items-center">
          <p className="max-w-xl font-editorial text-[1.5rem] leading-[1.2] text-brand-teal md:text-[1.8rem]">
            Made by the people who write the diet plans. That is the whole point.
          </p>
          <Link to="/products" className="dg-btn dg-btn-teal">
            Explore Our Products <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductShowcase;
