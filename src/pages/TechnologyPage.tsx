import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, CheckCircle2, Beaker } from "lucide-react";
import SEOOptimizer from "@/components/SEOOptimizer";
import Reveal from "@/components/Reveal";
import { PageShell, PageHero } from "@/components/PageShell";
import { researchProjects } from "@/components/home/Research";

const live = [
  { t: "IRA, AI nutrition assistant", d: "Conversational nutrition help backed by knowledge retrieval.", href: "/home#ira" },
  { t: "Photo meal logging", d: "Food recognition from a photograph, straight into your journal.", href: "/home#meal-logging" },
  { t: "Diet guidance", d: "Personalised plans built around Indian meals.", href: "/home#diet-guidance" },
  { t: "BMI and health analytics", d: "BMI, intake and progress tracking.", href: "/home#analytics" },
  { t: "Free web tools", d: "BMI calculator, diet planner, meal analyser and more.", href: "/tools" },
];

const projectDetail: Record<string, { question: string; approach: string[]; why: string }> = {
  napa: {
    question: "Can an ordinary photograph of pulses help estimate what they are, and what they offer nutritionally?",
    approach: [
      "Image-based analysis of pulses, using computer vision",
      "Exploring estimation of nutritional properties from what the image shows",
      "Designed around the pulses common in Indian kitchens",
    ],
    why: "Pulses are central to Indian diets and a major source of plant protein. Faster, simpler ways to understand them could make nutrition guidance more precise.",
  },
  nahace: {
    question: "Can image analysis help people and businesses assess the quality of turmeric and flag possible adulteration?",
    approach: [
      "Image-based analysis of turmeric samples",
      "A focus on food quality assessment",
      "Exploring accessible, low-cost screening rather than lab-only testing",
    ],
    why: "Turmeric is used daily across India and is a well-known target for adulteration. Quality checks that are easier to run could help build trust in everyday food.",
  },
};

const TechnologyPage = () => (
  <PageShell>
    <SEOOptimizer
      title="Our Technology | Navdhi Innovations behind Dietary Guide"
      description="Navdhi is the technology company behind Dietary Guide. Learn about our AI nutrition platform and our research into image-based food analysis: NAPA for pulses and NAHACE for turmeric quality."
      keywords="Navdhi, Navdhi technology, Dietary Guide technology, NAPA pulse analyser, NAHACE turmeric adulteration, food analysis AI India, nutrition AI research"
      url="/technology"
      breadcrumbs={[
        { name: "Home", url: "https://dietaryguide.in/" },
        { name: "Technology", url: "https://dietaryguide.in/technology" },
      ]}
    />

    <PageHero
      dark
      eyebrow="Our technology · Navdhi"
      title={
        <>
          The company that wants to <em className="text-brand-terra">understand food,</em> not just count it.
        </>
      }
      intro={
        <p>
          Navdhi builds the technology behind Dietary Guide. Some of it is in your hands today, through the app and our web tools. Some of it is still on the research bench. We keep the two clearly apart.
        </p>
      }
    />

    {/* Two tracks */}
    <section className="bg-brand-paper py-20 md:py-28">
      <div className="dg-wrap grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-[2rem] bg-brand-cream p-7 md:p-10">
          <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-terra">
            <CheckCircle2 className="h-4 w-4" /> Available now
          </p>
          <h2 className="mt-4 text-[2.4rem] text-brand-teal md:text-[3rem]">The Dietary Guide platform</h2>
          <ul className="mt-6 divide-y divide-brand-teal/10 border-t border-brand-teal/10">
            {live.map((l) => (
              <li key={l.t}>
                <Link to={l.href} className="group flex items-start justify-between gap-4 py-4">
                  <span>
                    <span className="block font-bold text-brand-teal">{l.t}</span>
                    <span className="mt-0.5 block text-[0.92rem] text-brand-teal/65">{l.d}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-terra transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100} className="rounded-[2rem] border border-dashed border-brand-teal/30 p-7 md:p-10">
          <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-terra">
            <Beaker className="h-4 w-4" /> In research
          </p>
          <h2 className="mt-4 text-[2.4rem] text-brand-teal md:text-[3rem]">Navdhi research initiatives</h2>
          <p className="mt-4 text-[0.98rem] leading-[1.7] text-brand-teal/70">
            Prototype projects exploring how images and AI could help assess food. They are not consumer products and are not part of the app.
          </p>
          <ul className="mt-6 divide-y divide-brand-teal/10 border-t border-brand-teal/10">
            {researchProjects.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="group flex items-start justify-between gap-4 py-4">
                  <span>
                    <span className="block font-editorial text-[1.7rem] leading-none text-brand-teal">{p.code}</span>
                    <span className="mt-1.5 block text-[0.92rem] text-brand-teal/65">{p.name}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-terra transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>

    {/* Projects */}
    {researchProjects.map((p, i) => {
      const d = projectDetail[p.id];
      return (
        <section key={p.id} id={p.id} className={`scroll-mt-24 py-20 md:py-28 ${i % 2 ? "bg-brand-paper" : "bg-brand-cream"}`}>
          <div className="dg-wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <div className={`overflow-hidden rounded-[2rem] ${p.bg}`}>
                <div className="aspect-[330/200]">
                  <p.Visual />
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/20 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-brand-teal/70">
                <FlaskConical className="h-3 w-3 text-brand-terra" /> Research prototype
              </span>
              <h2 className="mt-5 text-[clamp(3.4rem,8vw,6rem)] leading-none text-brand-teal">{p.code}</h2>
              <p className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-brand-terra">{p.name}</p>
              <p className="mt-6 font-editorial text-[1.6rem] leading-[1.25] text-brand-teal md:text-[1.9rem]">{d.question}</p>
              <ul className="mt-6 space-y-2.5">
                {d.approach.map((a) => (
                  <li key={a} className="flex gap-3 text-[0.97rem] text-brand-teal/80">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-terra" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-brand-teal/15 pt-5 text-[0.95rem] leading-[1.7] text-brand-teal/70">
                <strong className="text-brand-teal">Why it matters.</strong> {d.why}
              </p>
            </Reveal>
          </div>
        </section>
      );
    })}

    <section className="bg-brand-teal py-16 text-brand-cream">
      <div className="dg-wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-[0.9rem] leading-relaxed text-brand-cream/65">
          NAPA and NAHACE are early-stage research. We do not claim certifications, published results or commercial availability for either project, and neither should be relied on to judge the safety of food.
        </p>
        <Link to="/about#contact" className="dg-btn dg-btn-terra shrink-0">
          Talk to us about research <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </PageShell>
);

export default TechnologyPage;
