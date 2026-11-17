import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Camera, Home, MessageCircle, BarChart3, User } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LINKS } from "@/data/brand";

const reasons = [
  {
    n: "i",
    t: "Science first",
    d: "Guidance starts from published dietary research, including the ICMR 2024 guidelines, then gets made practical.",
  },
  {
    n: "ii",
    t: "Technology that saves time",
    d: "A photo instead of a food diary. A question instead of a search. The tech exists to remove effort, not add screens.",
  },
  {
    n: "iii",
    t: "Personal, not generic",
    d: "Your body, your routine and your kitchen decide the plan. Nobody eats an average diet.",
  },
  {
    n: "iv",
    t: "Accessible wellness",
    d: "Free tools on the web, a free app, and snacks priced like everyday food rather than luxury goods.",
  },
  {
    n: "v",
    t: "Advice and food, together",
    d: "When we say eat a protein-rich snack, we can hand you one. The app and the products come from one team.",
  },
];

export const Why = () => (
  <section id="why" className="scroll-mt-20 bg-brand-paper py-20 md:py-32">
    <div className="dg-wrap">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="dg-eyebrow text-brand-terra">Why Dietary Guide</p>
          <h2 className="mt-5 text-[clamp(2.6rem,5.6vw,4.8rem)] text-brand-teal">
            India knows food. <em className="text-brand-terra">Nutrition advice</em> rarely knows India.
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] leading-[1.75] text-brand-teal/70">
            Most diet apps were built for somebody else's plate. Calorie tables without poha, plans without dal, advice that ignores a joint family kitchen. We started Dietary Guide to close that gap.
          </p>
          <div className="dg-arch dg-zoom mt-10 hidden aspect-[4/3] max-w-[440px] bg-brand-sand lg:block">
            <img src="/brand/food/buddha-bowl.webp" alt="A nourishing bowl of chickpeas, egg, greens and vegetables" loading="lazy" width={1400} height={933} className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <ol>
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.t} delay={i * 60} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-brand-teal/15 py-8 last:border-b md:grid-cols-[4.5rem_1fr] md:py-10">
              <span className="font-editorial text-[1.7rem] italic leading-none text-brand-terra md:text-[2.1rem]">{r.n}.</span>
              <div>
                <h3 className="text-[1.9rem] text-brand-teal md:text-[2.5rem]">{r.t}</h3>
                <p className="mt-3 max-w-lg text-[0.98rem] leading-[1.7] text-brand-teal/70">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/* ─────────── Phone mockups ─────────── */

export const Phone = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative rounded-[2.6rem] bg-[#0B1C1D] p-[9px] shadow-[0_60px_90px_-50px_rgba(0,0,0,0.8)] ${className}`}>
    <div className="relative h-full overflow-hidden rounded-[2.1rem] bg-brand-paper">
      <span aria-hidden className="absolute left-1/2 top-2 z-10 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-[#0B1C1D]" />
      {children}
    </div>
  </div>
);

const TabBar = ({ active }: { active: number }) => (
  <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-brand-teal/10 bg-brand-paper px-3 pb-4 pt-2.5">
    {[Home, MessageCircle, BarChart3, User].map((Icon, i) => (
      <span key={i} className={`flex h-8 w-8 items-center justify-center rounded-full ${i === active ? "bg-brand-teal text-brand-cream" : "text-brand-teal/45"}`}>
        <Icon className="h-4 w-4" />
      </span>
    ))}
  </div>
);

export const HomeScreen = () => (
  <div className="h-full px-4 pb-20 pt-10 text-brand-teal">
    <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-brand-teal/50">Good morning</p>
    <p className="mt-1 font-editorial text-[1.45rem] leading-tight">Today's plate</p>
    <div className="mt-3 rounded-2xl bg-brand-teal p-3.5 text-brand-cream">
      <div className="flex items-center justify-between text-[0.6rem] font-bold uppercase tracking-[0.12em] text-brand-cream/60">
        <span>Daily goal</span>
        <span>1,240 / 1,800</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-cream/15">
        <span className="block h-full w-[69%] rounded-full bg-brand-terra" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1 text-center">
        {[
          ["52g", "Protein"],
          ["148g", "Carbs"],
          ["38g", "Fat"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-editorial text-[1.05rem]">{v}</p>
            <p className="text-[0.52rem] uppercase tracking-wider text-brand-cream/55">{l}</p>
          </div>
        ))}
      </div>
    </div>
    {[
      { t: "Breakfast", d: "Ragi porridge", img: "/brand/food/ragi-porridge.webp" },
      { t: "Lunch", d: "Vegetable dalia", img: "/brand/food/millet-bowl.webp" },
    ].map((m) => (
      <div key={m.t} className="mt-2.5 flex items-center gap-2.5 rounded-xl bg-brand-cream p-2">
        <img src={m.img} alt="" loading="lazy" className="h-10 w-10 rounded-lg object-cover" />
        <div>
          <p className="text-[0.55rem] font-bold uppercase tracking-wider text-brand-terra">{m.t}</p>
          <p className="text-[0.78rem] font-bold">{m.d}</p>
        </div>
      </div>
    ))}
    <TabBar active={0} />
  </div>
);

export const ChatScreen = () => (
  <div className="h-full px-3.5 pb-20 pt-10 text-[0.72rem] leading-snug">
    <div className="flex items-center gap-2 border-b border-brand-teal/10 pb-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-terra font-editorial text-sm text-brand-paper">I</span>
      <p className="font-bold text-brand-teal">IRA</p>
    </div>
    <div className="mt-3 space-y-2">
      <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-brand-teal px-3 py-2 text-brand-cream">Is poha a good breakfast?</p>
      <p className="w-fit max-w-[90%] rounded-xl rounded-bl-sm bg-brand-cream px-3 py-2 text-brand-teal">
        It's light and easy to digest. Add peanuts and peas for protein, and plenty of vegetables.
      </p>
      <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-brand-teal px-3 py-2 text-brand-cream">Something for the evening?</p>
      <p className="w-fit max-w-[90%] rounded-xl rounded-bl-sm bg-brand-cream px-3 py-2 text-brand-teal">Roasted chana or a sprout chaat would do nicely.</p>
    </div>
    <TabBar active={1} />
  </div>
);

export const LogScreen = () => (
  <div className="relative h-full">
    <img src="/brand/food/idli.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
    <div className="absolute inset-x-3.5 bottom-20 rounded-xl bg-brand-paper/95 p-3 text-brand-teal">
      <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-brand-terra">Recognised</p>
      <p className="mt-0.5 font-editorial text-[1.15rem] leading-tight">Millet idli with chutney</p>
      <p className="mt-1 text-[0.62rem] font-semibold text-brand-teal/60">Tap to add to lunch</p>
    </div>
    <span className="absolute bottom-6 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-brand-paper bg-brand-terra text-brand-paper">
      <Camera className="h-4 w-4" />
    </span>
  </div>
);

export const AppExperience = () => (
  <section id="app" className="dg-grain relative scroll-mt-20 overflow-hidden bg-brand-cream py-20 md:py-32">
    <div className="dg-wrap">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="dg-eyebrow justify-center text-brand-terra">The app experience</p>
          <h2 className="mt-5 text-[clamp(2.7rem,6vw,5.2rem)] text-brand-teal">
            Everything above, <em className="text-brand-terra">in your pocket.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-[1.75] text-brand-teal/70">
            Meal logging, IRA, guidance and progress, organised into four simple tabs. Free to download on Android.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100} className="relative mx-auto mt-16 flex max-w-[980px] items-end justify-center">
        <div aria-hidden className="absolute bottom-0 left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-t-full bg-brand-teal" />
        <Phone className="relative z-0 -mr-10 mb-10 hidden aspect-[9/19] w-[230px] -rotate-6 sm:block">
          <ChatScreen />
        </Phone>
        <Phone className="relative z-10 aspect-[9/19] w-[250px] md:w-[270px]">
          <HomeScreen />
        </Phone>
        <Phone className="relative z-0 -ml-10 mb-10 hidden aspect-[9/19] w-[230px] rotate-6 sm:block">
          <LogScreen />
        </Phone>
      </Reveal>
      <p className="mt-4 text-center text-[0.72rem] text-brand-teal/45">Interface illustrations. The live app may differ.</p>

      <Reveal className="mt-14 grid gap-8 border-t border-brand-teal/15 pt-10 md:grid-cols-[1fr_auto] md:items-center">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem] font-semibold text-brand-teal sm:grid-cols-4">
          {["Home", "Chat with IRA", "Stats", "Profile"].map((t, i) => (
            <li key={t} className="flex items-baseline gap-2">
              <span className="font-editorial text-[1.2rem] text-brand-terra">0{i + 1}</span>
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={LINKS.playStore} target="_blank" rel="noopener noreferrer" className="dg-btn dg-btn-teal">
            Get it on Google Play <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link to="/app" className="dg-btn dg-btn-line">
            Explore the app <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);
