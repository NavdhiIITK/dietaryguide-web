import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import SEOOptimizer from "@/components/SEOOptimizer";
import Reveal from "@/components/Reveal";
import { PageShell, PageHero } from "@/components/PageShell";
import { LOGO, LINKS, COMPANY } from "@/data/brand";

const parts = [
  { k: "Dietary Guide", v: "The consumer brand. An AI nutrition app, free web tools, a nutrition journal and a range of healthy foods." },
  { k: "IRA", v: "Our AI nutrition assistant, the friendly face of the app." },
  { k: "Navdhi", v: "The parent company. Technology, research and the team that builds all of it." },
];

const AboutPage = () => (
  <PageShell>
    <SEOOptimizer
      title="About Dietary Guide | A Navdhi Company"
      description="Dietary Guide is an AI-powered nutrition and wellness platform from Navdhi, combining nutrition science, technology and healthy food products. Learn who we are and how to reach us."
      keywords="about Dietary Guide, Navdhi, Dietary Guide contact, AI nutrition India company, healthy snacks India company"
      url="/about"
      breadcrumbs={[
        { name: "Home", url: "https://dietaryguide.in/" },
        { name: "About", url: "https://dietaryguide.in/about" },
      ]}
    />

    <PageHero
      eyebrow="About us"
      title={
        <>
          Making nutrition smarter, more accessible <em className="text-brand-terra">and more enjoyable.</em>
        </>
      }
      intro={
        <p>
          That is the whole brief. We do it with technology that removes effort, guidance grounded in nutrition science, and food we are happy to put our name on.
        </p>
      }
    />

    <section className="bg-brand-paper pb-20 md:pb-28">
      <div className="dg-wrap grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal className="dg-arch dg-zoom aspect-[4/5] max-w-[520px] bg-brand-sand">
          <img src="/brand/food/thali.webp" alt="A home-cooked Indian meal" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
        </Reveal>
        <div className="lg:pt-10">
          <Reveal>
            <h2 className="text-[clamp(2.3rem,4.4vw,3.6rem)] text-brand-teal">
              We started with a simple frustration.
            </h2>
            <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.8] text-brand-teal/75">
              <p>
                Healthy eating advice in India was either generic, imported, or locked behind expensive consultations. Meanwhile the healthiest food many of us know, dal, sabzi, millets, roasted chana, rarely showed up in the apps.
              </p>
              <p>
                Dietary Guide brings those worlds together: an AI assistant that speaks our food, guidance informed by the ICMR 2024 dietary guidelines, and a line of snacks and wellness foods made by the same team.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-12 border-t border-brand-teal/15">
            {parts.map((p) => (
              <div key={p.k} className="grid gap-2 border-b border-brand-teal/15 py-5 sm:grid-cols-[10rem_1fr]">
                <p className="font-editorial text-[1.7rem] leading-none text-brand-teal">{p.k}</p>
                <p className="text-[0.95rem] leading-[1.65] text-brand-teal/70">{p.v}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={150} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/technology" className="dg-btn dg-btn-teal">
              Our technology <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/products" className="dg-btn dg-btn-line">
              Explore Our Products
            </Link>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Contact */}
    <section id="contact" className="dg-grain scroll-mt-24 bg-brand-teal py-20 text-brand-cream md:py-28">
      <div className="dg-wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="dg-eyebrow text-brand-terra">Contact</p>
          <h2 className="mt-5 text-[clamp(2.7rem,6vw,5rem)]">
            Say hello. <em className="text-brand-terra">We read everything.</em>
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] leading-[1.75] text-brand-cream/70">
            Questions about the app, an order, a partnership or our research. Write to us and the right person will get back to you.
          </p>
          <img src={LOGO.onDark} alt="Dietary Guide" width={500} height={152} loading="lazy" className="mt-12 h-12 w-auto opacity-90" />
        </Reveal>
        <Reveal delay={100} className="space-y-4">
          <a href={`mailto:${LINKS.email}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-brand-cream/15 p-6 transition-colors hover:border-brand-cream/40 hover:bg-brand-cream/5">
            <span className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-brand-terra" />
              <span>
                <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-cream/50">Email</span>
                <span className="mt-1 block font-editorial text-[1.5rem] leading-tight md:text-[1.8rem]">{LINKS.email}</span>
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-brand-cream/15 p-6">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-terra" />
            <span>
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-cream/50">Address</span>
              <span className="mt-1 block text-[1rem] leading-relaxed text-brand-cream/85">{COMPANY.address}</span>
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { href: LINKS.instagram, label: "Instagram", Icon: Instagram },
              { href: LINKS.facebook, label: "Facebook", Icon: Facebook },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-brand-cream/15 p-5 font-bold transition-colors hover:border-brand-cream/40 hover:bg-brand-cream/5">
                <Icon className="h-5 w-5 text-brand-terra" /> {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  </PageShell>
);

export default AboutPage;
