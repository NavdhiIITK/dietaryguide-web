import { Link } from "react-router-dom";
import { ArrowRight, Camera, Check, MessageCircle, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";

const iraSkills = [
  { t: "Conversation, not forms", d: "Ask the way you would ask a friend who happens to know nutrition." },
  { t: "AI-powered dietary guidance", d: "Suggestions that take your goals and preferences into account." },
  { t: "Answers to nutrition questions", d: "From protein in dal to what to eat before a morning run." },
  { t: "Personalised food recommendations", d: "Ideas built around Indian meals, not imported menus." },
  { t: "Nutrition knowledge retrieval", d: "IRA looks things up in a nutrition knowledge base before it replies." },
];

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
    {items.map((b) => (
      <li key={b} className="flex items-start gap-3 text-[0.95rem] font-medium text-brand-teal/85">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-terra/15 text-brand-terra">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
        {b}
      </li>
    ))}
  </ul>
);

/** Weekly intake bars. Sample numbers, drawn to explain the feature. */
const weekly = [62, 78, 70, 88, 74, 92, 81];
const days = ["M", "T", "W", "T", "F", "S", "S"];

const Platform = () => {
  return (
    <div id="platform" className="scroll-mt-20">
      {/* ───────── IRA ───────── */}
      <section id="ira" className="dg-grain relative scroll-mt-20 overflow-hidden bg-brand-teal py-20 text-brand-cream md:py-32">
        <div aria-hidden className="pointer-events-none absolute -left-10 top-6 select-none font-editorial text-[38vw] leading-none text-brand-cream/[0.035] lg:text-[26rem]">
          IRA
        </div>

        <div className="dg-wrap relative">
          <Reveal className="max-w-4xl">
            <p className="dg-eyebrow text-brand-terra">The technology · AI nutrition assistant</p>
            <h2 className="mt-5 text-[clamp(2.7rem,6.4vw,5.6rem)]">
              Meet IRA. <em className="text-brand-terra">Ask her anything</em> about what is on your plate.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            {/* conversation */}
            <Reveal>
              <div className="rounded-[2rem] border border-brand-cream/15 bg-brand-deep/60 p-5 md:p-7">
                <div className="flex items-center gap-3 border-b border-brand-cream/10 pb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-terra font-editorial text-xl text-brand-paper">I</span>
                  <div>
                    <p className="font-sans text-[0.95rem] font-bold">IRA</p>
                    <p className="flex items-center gap-1.5 text-[0.74rem] text-brand-cream/55">
                      <span className="dg-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> Intelligent nutrition assistant
                    </p>
                  </div>
                </div>
                <div className="space-y-3.5 py-6 text-[0.95rem] leading-[1.55]">
                  <p className="ml-auto w-fit max-w-[82%] rounded-2xl rounded-br-sm bg-brand-cream px-4 py-3 text-brand-teal">
                    I'm vegetarian. How do I get enough protein without supplements?
                  </p>
                  <p className="w-fit max-w-[88%] rounded-2xl rounded-bl-sm bg-brand-cream/10 px-4 py-3">
                    Start with what you already eat. Pair dal with rice or roti, add curd or paneer once a day, and keep roasted chana or sprouts for the evening.
                  </p>
                  <p className="w-fit max-w-[88%] rounded-2xl rounded-bl-sm bg-brand-cream/10 px-4 py-3">
                    Want me to sketch a day of meals around that?
                  </p>
                  <p className="ml-auto w-fit max-w-[82%] rounded-2xl rounded-br-sm bg-brand-cream px-4 py-3 text-brand-teal">Yes, with a quick breakfast.</p>
                </div>
                <div className="flex items-center gap-3 rounded-full border border-brand-cream/15 py-2 pl-5 pr-2 text-[0.88rem] text-brand-cream/45">
                  <MessageCircle className="h-4 w-4" />
                  <span className="flex-1">Ask IRA about your food</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-terra text-brand-paper">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[0.72rem] text-brand-cream/40">An illustrative conversation. IRA shares general nutrition information, not medical advice.</p>
            </Reveal>

            {/* capabilities */}
            <div>
              <ul className="border-t border-brand-cream/15">
                {iraSkills.map((s, i) => (
                  <Reveal as="li" key={s.t} delay={i * 60} className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-brand-cream/15 py-5">
                    <Sparkles className="mt-1 h-4 w-4 text-brand-terra" />
                    <div>
                      <h3 className="text-[1.55rem] md:text-[1.8rem]">{s.t}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-[1.65] text-brand-cream/65">{s.d}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={200} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/app" className="dg-btn dg-btn-terra">
                  Meet IRA in the app <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Feature chapters ───────── */}
      <section className="bg-brand-paper py-20 md:py-32">
        <div className="dg-wrap space-y-24 md:space-y-40">
          {/* Meal logging */}
          <article id="meal-logging" className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <Reveal className="relative mx-auto w-full max-w-[520px]">
              <div className="dg-zoom relative aspect-[1/1.02] overflow-hidden rounded-[2rem] bg-brand-sand">
                <img src="/brand/food/sprout-salad.webp" alt="A bowl of sprouted moong salad with lemon" width={1200} height={1110} loading="lazy" className="h-full w-full object-cover" />
                {/* viewfinder */}
                <div aria-hidden className="absolute inset-[9%]">
                  {["left-0 top-0 border-l-2 border-t-2 rounded-tl-2xl", "right-0 top-0 border-r-2 border-t-2 rounded-tr-2xl", "left-0 bottom-0 border-l-2 border-b-2 rounded-bl-2xl", "right-0 bottom-0 border-r-2 border-b-2 rounded-br-2xl"].map((c) => (
                    <span key={c} className={`absolute h-10 w-10 border-brand-paper ${c}`} />
                  ))}
                </div>
                <span aria-hidden className="absolute bottom-5 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-brand-paper/90 bg-brand-terra text-brand-paper shadow-xl">
                  <Camera className="h-5 w-5" />
                </span>
              </div>
              <div className="absolute -right-2 top-8 w-[58%] max-w-[240px] rounded-2xl bg-brand-paper p-4 shadow-[0_30px_60px_-30px_rgba(13,38,40,0.6)] md:-right-8">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-brand-terra">Recognised</p>
                <p className="mt-1.5 font-editorial text-[1.35rem] leading-tight text-brand-teal">Sprouted moong salad</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Sprouts", "Tomato", "Cucumber", "Lemon"].map((t) => (
                    <span key={t} className="rounded-full bg-brand-cream px-2.5 py-1 text-[0.7rem] font-semibold text-brand-teal/80">{t}</span>
                  ))}
                </div>
                <p className="mt-3 border-t border-brand-teal/10 pt-2.5 text-[0.72rem] font-semibold text-brand-teal/60">Added to today's journal</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="dg-eyebrow text-brand-terra">AI meal logging</p>
              <h2 className="mt-5 text-[clamp(2.4rem,4.8vw,4rem)] text-brand-teal">
                Point, shoot, <em className="text-brand-terra">logged.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-[1.75] text-brand-teal/70">
                Typing every ingredient is why food diaries get abandoned by Thursday. Take a photograph of your meal instead, and let the app work out what is on the plate.
              </p>
              <Bullets items={["Photo-based meal logging", "Food recognition and analysis", "Nutrition tracking across the day", "A food journal that keeps itself"]} />
              <Link to="/app" className="dg-link mt-9 text-brand-teal">
                See it in the app <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </article>

          {/* Analytics */}
          <article id="analytics" className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <Reveal className="lg:order-2">
              <div className="rounded-[2rem] bg-brand-teal p-6 text-brand-cream md:p-9">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-brand-cream/50">Body mass index</p>
                    <p className="mt-2 font-editorial text-[4.2rem] leading-none md:text-[5.4rem]">22.4</p>
                  </div>
                  <span className="mb-2 rounded-full bg-brand-cream/10 px-3 py-1.5 text-[0.74rem] font-bold text-brand-cream">Healthy range</span>
                </div>
                {/* BMI scale */}
                <div className="relative mt-7">
                  <div className="flex h-2.5 overflow-hidden rounded-full">
                    <span className="w-[22%] bg-[#8FB7B0]" />
                    <span className="w-[30%] bg-[#F5F2E2]" />
                    <span className="w-[24%] bg-[#E0A479]" />
                    <span className="w-[24%] bg-[#C06B3A]" />
                  </div>
                  <span className="absolute -top-1.5 left-[37%] h-[22px] w-[3px] rounded-full bg-brand-paper shadow-[0_0_0_4px_rgba(22,57,60,1)]" />
                  <div className="mt-2.5 flex justify-between text-[0.66rem] font-semibold text-brand-cream/45">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>

                <div className="mt-9 grid grid-cols-[1.3fr_1fr] gap-5 border-t border-brand-cream/15 pt-7">
                  <div>
                    <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-brand-cream/50">Protein, this week</p>
                    <div className="mt-4 flex h-28 items-end gap-2">
                      {weekly.map((h, i) => (
                        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                          <span className={`w-full rounded-t-md ${i === 5 ? "bg-brand-terra" : "bg-brand-cream/25"}`} style={{ height: `${h}%` }} />
                          <span className="text-[0.62rem] font-semibold text-brand-cream/45">{days[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-full max-w-[124px]" role="img" aria-label="Daily goal ring, sample">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#F5F2E2" strokeOpacity=".14" strokeWidth="9" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#C06B3A" strokeWidth="9" strokeLinecap="round" strokeDasharray="314" strokeDashoffset="82" transform="rotate(-90 60 60)" />
                      <text x="60" y="58" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="30" fill="#F5F2E2">74%</text>
                      <text x="60" y="76" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.4" fill="#F5F2E2" fillOpacity=".5">OF TODAY</text>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[0.72rem] text-brand-teal/45">Sample figures, shown to illustrate the feature.</p>
            </Reveal>
            <Reveal delay={100} className="lg:order-1">
              <p className="dg-eyebrow text-brand-terra">BMI and health analytics</p>
              <h2 className="mt-5 text-[clamp(2.4rem,4.8vw,4rem)] text-brand-teal">
                Numbers you can <em className="text-brand-terra">read at a glance.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-[1.75] text-brand-teal/70">
                A number on its own means little. We put your BMI, your intake and your week side by side, so you can see which way things are heading and what to change next.
              </p>
              <Bullets items={["BMI calculation", "Health metrics in one place", "Nutrition analytics", "Progress monitoring over time"]} />
              <Link to="/tools" className="dg-link mt-9 text-brand-teal">
                Try the free BMI calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </article>

          {/* Diet guidance */}
          <article id="diet-guidance" className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div className="rounded-[2rem] border border-brand-teal/12 bg-brand-cream p-5 md:p-8">
                <div className="flex items-baseline justify-between border-b border-brand-teal/15 pb-4">
                  <p className="font-editorial text-[1.7rem] text-brand-teal">A day, planned</p>
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-brand-teal/50">Sample plan</p>
                </div>
                <ol>
                  {[
                    { time: "Breakfast", dish: "Ragi porridge with nuts", img: "/brand/food/ragi-porridge.webp" },
                    { time: "Lunch", dish: "Vegetable dalia", img: "/brand/food/millet-bowl.webp" },
                    { time: "Evening", dish: "Sprouted moong salad", img: "/brand/food/sprout-salad.webp" },
                    { time: "Dinner", dish: "Millet idli with chutney", img: "/brand/food/idli.webp" },
                  ].map((m) => (
                    <li key={m.time} className="group flex items-center gap-4 border-b border-brand-teal/10 py-3.5 last:border-0 last:pb-0">
                      <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-brand-sand md:h-[4.5rem] md:w-[4.5rem]">
                        <img src={m.img} alt="" loading="lazy" width={144} height={144} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-brand-terra">{m.time}</p>
                        <p className="mt-1 font-editorial text-[1.3rem] leading-tight text-brand-teal md:text-[1.5rem]">{m.dish}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="dg-eyebrow text-brand-terra">Personalised diet guidance</p>
              <h2 className="mt-5 text-[clamp(2.4rem,4.8vw,4rem)] text-brand-teal">
                A plan that knows <em className="text-brand-terra">your kitchen.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-[1.75] text-brand-teal/70">
                Good guidance has to survive a real week. So ours begins with Indian home food, your routine and your goal, then turns that into meals you can cook and stick with.
              </p>
              <Bullets items={["Built around your goals", "Indian meals and ingredients", "Clear, actionable daily plans", "Easy to adjust as you go"]} />
              <Link to="/tools" className="dg-link mt-9 text-brand-teal">
                Try the AI diet planner <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </article>
        </div>
      </section>

      {/* ───────── Nutrition science ───────── */}
      <section id="science" className="scroll-mt-20 bg-brand-cream py-20 md:py-28">
        <div className="dg-wrap grid gap-10 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
          <Reveal>
            <p className="dg-eyebrow text-brand-terra">Nutrition science</p>
            <p className="mt-6 font-editorial text-[5rem] leading-[0.85] text-brand-teal md:text-[7.5rem]">
              ICMR
              <br />
              <em className="text-brand-terra">2024</em>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-[clamp(2rem,3.9vw,3.3rem)] !leading-[1.1] text-brand-teal">
              Our nutrition approach incorporates the 2024 Dietary Guidelines for Indians, published by the Indian Council of Medical Research.
            </h2>
            <div className="mt-9 grid gap-8 border-t border-brand-teal/15 pt-8 sm:grid-cols-3">
              {[
                { t: "Grounded", d: "We begin with published dietary guidance, not with trends." },
                { t: "Indian by design", d: "Portions, food groups and meals that reflect how India eats." },
                { t: "Human in the loop", d: "Dietitian expertise shapes how the guidance is applied." },
              ].map((c) => (
                <div key={c.t}>
                  <h3 className="text-[1.6rem] text-brand-teal">{c.t}</h3>
                  <p className="mt-2 text-[0.93rem] leading-[1.65] text-brand-teal/70">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-9 text-[0.76rem] leading-relaxed text-brand-teal/50">
              Dietary Guide is an independent platform. It is not affiliated with, partnered with or endorsed by ICMR.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Platform;
