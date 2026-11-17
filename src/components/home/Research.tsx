import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical } from "lucide-react";
import Reveal from "@/components/Reveal";

/** A tray of pulses under a scan line. Decorative. */
export const PulseScan = () => {
  const tones = ["#D9B66B", "#C06B3A", "#8FA36B", "#E8D9A8", "#7A3E2A", "#C9A24A"];
  const dots = Array.from({ length: 60 }, (_, i) => {
    const col = i % 10;
    const row = Math.floor(i / 10);
    return { x: 22 + col * 31 + ((row * 7 + col * 3) % 9) - 4, y: 24 + row * 30 + ((col * 5 + row) % 7) - 3, r: 9 + ((i * 7) % 5), c: tones[(i * 5 + row) % tones.length] };
  });
  return (
    <svg viewBox="0 0 330 200" aria-hidden className="h-full w-full">
      {dots.map((d, i) => (
        <ellipse key={i} cx={d.x} cy={d.y} rx={d.r} ry={d.r * 0.78} fill={d.c} opacity={0.9} transform={`rotate(${(i * 37) % 180} ${d.x} ${d.y})`} />
      ))}
      <rect x="108" y="48" width="96" height="74" rx="8" fill="none" stroke="#F5F2E2" strokeWidth="1.5" strokeDasharray="5 5" />
      <line x1="0" y1="92" x2="330" y2="92" stroke="#F5F2E2" strokeWidth="1" opacity=".7" />
      <circle cx="156" cy="85" r="3.5" fill="#F5F2E2" />
    </svg>
  );
};

/** Turmeric swatches with sampling reticles. Decorative. */
export const TurmericSwatch = () => {
  const swatches = ["#E9A91B", "#D9931A", "#F0B92D", "#C9801A", "#E3A012", "#F2C046", "#D58A18", "#EDB024"];
  return (
    <svg viewBox="0 0 330 200" aria-hidden className="h-full w-full">
      {swatches.map((c, i) => (
        <rect key={i} x={(i % 4) * 82.5} y={Math.floor(i / 4) * 100} width="82.5" height="100" fill={c} />
      ))}
      {[
        [60, 58],
        [206, 44],
        [270, 142],
        [124, 150],
      ].map(([x, y], i) => (
        <g key={i} stroke="#16393C" strokeWidth="1.4" fill="none">
          <circle cx={x} cy={y} r="13" />
          <line x1={x - 20} y1={y} x2={x - 7} y2={y} />
          <line x1={x + 7} y1={y} x2={x + 20} y2={y} />
          <line x1={x} y1={y - 20} x2={x} y2={y - 7} />
          <line x1={x} y1={y + 7} x2={x} y2={y + 20} />
        </g>
      ))}
    </svg>
  );
};

export const researchProjects = [
  {
    id: "napa",
    code: "NAPA",
    name: "Navdhi Advanced Pulse Analyser",
    text: "Can a photograph of a handful of pulses tell you something useful about them? NAPA explores image-based analysis of pulses and the estimation of their nutritional properties.",
    Visual: PulseScan,
    bg: "bg-brand-deep",
  },
  {
    id: "nahace",
    code: "NAHACE",
    name: "Turmeric adulteration detection",
    text: "Turmeric is one of the most commonly adulterated spices. NAHACE studies image-based analysis as a route to assessing food quality and flagging possible adulteration.",
    Visual: TurmericSwatch,
    bg: "bg-[#E9A91B]",
  },
];

const Research = () => {
  return (
    <section id="navdhi" className="dg-grain relative scroll-mt-20 overflow-hidden bg-brand-teal py-20 text-brand-cream md:py-32">
      <div className="dg-wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="dg-eyebrow text-brand-terra">Our technology · Navdhi innovations</p>
            <h2 className="mt-5 text-[clamp(2.7rem,6vw,5.2rem)]">
              Built by Navdhi. <em className="text-brand-terra">Curious about food</em> at every scale.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:pt-14">
            <p className="max-w-lg text-[1.05rem] leading-[1.75] text-brand-cream/70">
              Navdhi is the technology and innovation company behind Dietary Guide. Alongside the platform, our team runs research into how images and AI can help people understand the food in front of them.
            </p>
            <Link to="/technology" className="dg-btn dg-btn-line-light mt-8">
              About our technology <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {researchProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <Link
                to={`/technology#${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-brand-cream/15 bg-brand-deep/50 transition-colors hover:border-brand-cream/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terra"
              >
                <div className={`dg-zoom relative aspect-[330/200] overflow-hidden ${p.bg}`}>
                  <div className="h-full w-full transition-transform duration-[1100ms] ease-out group-hover:scale-105">
                    <p.Visual />
                  </div>
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-paper px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-brand-teal">
                    <FlaskConical className="h-3 w-3 text-brand-terra" /> Research prototype
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <p className="font-editorial text-[3.2rem] leading-none md:text-[4rem]">{p.code}</p>
                  <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-terra">{p.name}</p>
                  <p className="mt-5 text-[0.98rem] leading-[1.7] text-brand-cream/70">{p.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.86rem] font-bold">
                    Read about the project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="max-w-2xl text-[0.78rem] leading-relaxed text-brand-cream/45">
            NAPA and NAHACE are research initiatives at prototype stage. They are not consumer products, are not available in the Dietary Guide app, and make no certified claims about any food.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Research;
