import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const callouts = [
  { label: "Dal", note: "protein", className: "left-[38%] top-[44%]" },
  { label: "Roti", note: "whole grain", className: "left-[4%] top-[58%]" },
  { label: "Sabzi", note: "fibre", className: "right-[2%] top-[27%]" },
];

const strip = [
  "AI-powered nutrition",
  "Personalised diet guidance",
  "Photo meal logging",
  "Health and BMI analytics",
  "Expert nutrition guidance",
  "Healthy food products",
];

const Hero = () => {
  return (
    <section className="dg-grain relative overflow-hidden bg-brand-paper pt-[104px] md:pt-[128px]">
      {/* soft terracotta sun behind the plate */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-brand-terra/[0.09] blur-3xl" />

      <div className="dg-wrap relative grid items-center gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24">
        {/* Copy */}
        <div className="relative z-10">
          <p className="dg-eyebrow dg-reveal is-in text-brand-terra">AI nutrition, real food. A Navdhi company</p>

          <h1 className="mt-6 text-[clamp(3.3rem,9.2vw,7.75rem)] text-brand-teal">
            Better nutrition.
            <br />
            <em className="text-brand-terra">Smarter living.</em>
          </h1>

          <p className="mt-7 max-w-[34rem] text-[1.06rem] leading-[1.7] text-brand-teal/75 md:text-[1.14rem]">
            Meet the next generation of personalised nutrition. Combining AI-powered insights, nutrition science and expert guidance to help you make healthier everyday choices.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#platform" className="dg-btn dg-btn-teal">
              Explore Dietary Guide <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#products" className="dg-btn dg-btn-line">
              Explore Our Products
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-brand-teal/15 border-t border-brand-teal/15 pt-6">
            {[
              { k: "IRA", v: "Your AI nutrition assistant" },
              { k: "ICMR 2024", v: "Guidelines inform our approach" },
              { k: "7 foods", v: "In our own healthy range" },
            ].map((s, i) => (
              <div key={s.k} className={i === 0 ? "pr-4" : "px-4"}>
                <dt className="font-editorial text-[1.3rem] leading-none text-brand-teal md:text-[1.65rem] whitespace-nowrap">{s.k}</dt>
                <dd className="mt-2 text-[0.78rem] leading-snug text-brand-teal/60 md:text-[0.84rem]">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Art-directed plate */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="relative mx-auto w-[84%] lg:w-[88%]">
            <div className="dg-arch relative aspect-[4/5] bg-brand-sand shadow-[0_50px_90px_-50px_rgba(13,38,40,0.7)]">
              <img
                src="/brand/food/thali.webp"
                alt="An Indian home meal with dal, rotis, sabzi and fresh fruit"
                width={1024}
                height={1024}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-deep/35 via-transparent to-transparent" />

              {/* analysis callouts */}
              {callouts.map((c, i) => (
                <div key={c.label} aria-hidden className={`absolute ${c.className} ${i % 2 ? "dg-float-slow" : "dg-float"}`}>
                  <div className="flex items-center gap-2 rounded-full bg-brand-paper/95 py-1.5 pl-2 pr-3.5 text-[0.72rem] font-bold text-brand-teal shadow-lg backdrop-blur">
                    <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-brand-terra/20">
                      <span className="dg-pulse-dot h-1.5 w-1.5 rounded-full bg-brand-terra" />
                    </span>
                    {c.label}
                    <span className="font-medium text-brand-teal/55">{c.note}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* IRA note */}
            <div className="absolute -left-[6%] bottom-[9%] md:-left-[10%] w-[62%] max-w-[270px] rounded-2xl rounded-bl-sm bg-brand-teal p-4 text-brand-cream shadow-[0_30px_60px_-30px_rgba(13,38,40,0.9)] md:p-5">
              <p className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-brand-terra">
                <Sparkles className="h-3.5 w-3.5" /> IRA
              </p>
              <p className="mt-2 font-editorial text-[1.08rem] leading-[1.2] md:text-[1.3rem]">
                A balanced plate. A bowl of curd would round out the protein.
              </p>
            </div>

            {/* our own food on the table */}
            <Link
              to="/products/sp-1"
              aria-label="High-Protein Millet Granola, view product"
              className="dg-float-slow absolute -right-[4%] -bottom-[5%] md:-right-[11%] block w-[36%] max-w-[190px] rotate-[7deg] drop-shadow-[0_26px_26px_rgba(13,38,40,0.35)] transition-transform duration-500 hover:rotate-[3deg]"
            >
              <img src="/brand/products/granola.webp" alt="Dietary Guide High-Protein Millet Granola pack" width={489} height={676} className="w-full" />
            </Link>
          </div>
          <p className="mt-10 text-center text-[0.7rem] text-brand-teal/45 lg:text-right">Illustration of how IRA reads a meal.</p>
        </div>
      </div>

      {/* running strip */}
      <div className="overflow-hidden border-y border-brand-teal/10 bg-brand-teal py-4 text-brand-cream" aria-hidden>
        <div className="dg-marquee">
          {[0, 1].map((n) => (
            <ul key={n} className="flex shrink-0 items-center">
              {strip.map((s) => (
                <li key={s} className="flex items-center whitespace-nowrap font-editorial text-[1.2rem] md:text-[1.4rem]">
                  <span className="px-7">{s}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-terra" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
