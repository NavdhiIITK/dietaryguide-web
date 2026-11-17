import Reveal from "@/components/Reveal";

const pillars = [
  {
    n: "01",
    title: "AI-Powered Nutrition",
    text: "IRA, our nutrition assistant, answers food questions in plain language and draws on a curated nutrition knowledge base.",
    where: "In the app",
    href: "#ira",
  },
  {
    n: "02",
    title: "Personalised Diet Guidance",
    text: "Plans shaped by your body, your goals and the food you already cook at home.",
    where: "In the app",
    href: "#diet-guidance",
  },
  {
    n: "03",
    title: "Intelligent Food Analysis",
    text: "Photograph a plate and the app recognises what is on it, then adds it to your food journal.",
    where: "In the app",
    href: "#meal-logging",
  },
  {
    n: "04",
    title: "Health & BMI Analytics",
    text: "BMI, daily intake and progress, shown as a picture you can read in a glance.",
    where: "App and web",
    href: "#analytics",
  },
  {
    n: "05",
    title: "Expert Nutrition Guidance",
    text: "Dietitian thinking behind the product, and guidance informed by the ICMR 2024 dietary guidelines.",
    where: "Behind it all",
    href: "#science",
  },
  {
    n: "06",
    title: "Healthy Food Products",
    text: "Seven snacks and wellness foods, made so that good advice has something good to point to.",
    where: "On your shelf",
    href: "#products",
  },
];

/** Three overlapping fields with Dietary Guide where they meet. */
const Venn = () => (
  <svg viewBox="0 0 420 400" role="img" aria-label="Dietary Guide sits where technology, nutrition science and real food overlap" className="w-full max-w-[420px]">
    <g fill="none" strokeWidth="1.2">
      <circle cx="210" cy="140" r="118" stroke="#16393C" fill="#16393C" fillOpacity=".06" />
      <circle cx="140" cy="255" r="118" stroke="#16393C" fill="#C06B3A" fillOpacity=".1" />
      <circle cx="280" cy="255" r="118" stroke="#16393C" fill="#E8E2CB" fillOpacity=".55" />
    </g>
    <g fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" letterSpacing="2" fill="#16393C" textAnchor="middle">
      <text x="210" y="78">TECHNOLOGY</text>
      <text x="92" y="300">NUTRITION</text>
      <text x="92" y="316">SCIENCE</text>
      <text x="328" y="308">REAL FOOD</text>
    </g>
    <circle cx="210" cy="218" r="44" fill="#16393C" />
    <text x="210" y="213" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="17" fill="#F5F2E2">Dietary</text>
    <text x="210" y="232" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="17" fill="#F5F2E2">Guide</text>
  </svg>
);

const Ecosystem = () => {
  return (
    <section id="ecosystem" className="scroll-mt-24 bg-brand-paper py-20 md:py-32">
      <div className="dg-wrap grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="dg-eyebrow text-brand-terra">The Dietary Guide ecosystem</p>
            <h2 className="mt-5 text-[clamp(2.5rem,5.4vw,4.4rem)] text-brand-teal">
              One idea, from the first question <em className="text-brand-terra">to the last bite.</em>
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-[1.75] text-brand-teal/70">
              Most nutrition advice stops at the screen. Ours carries on into the kitchen. The same thinking runs through the assistant that answers you, the plan you follow and the snack in your bag.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 hidden lg:block">
            <Venn />
          </Reveal>
        </div>

        <ol className="border-t border-brand-teal/15">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 60}>
              <a
                href={p.href}
                className="group grid grid-cols-[2.6rem_1fr] gap-x-4 border-b border-brand-teal/15 py-7 transition-colors hover:bg-brand-cream/70 md:grid-cols-[4.5rem_1fr_auto] md:items-baseline md:gap-x-6 md:px-4 md:py-9"
              >
                <span className="font-editorial text-[1.5rem] leading-none text-brand-terra md:text-[1.9rem]">{p.n}</span>
                <div>
                  <h3 className="text-[1.75rem] text-brand-teal transition-transform duration-300 group-hover:translate-x-1 md:text-[2.3rem]">{p.title}</h3>
                  <p className="mt-3 max-w-lg text-[0.97rem] leading-[1.7] text-brand-teal/70">{p.text}</p>
                </div>
                <span className="col-start-2 mt-4 inline-flex w-fit rounded-full border border-brand-teal/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-teal/70 md:col-start-3 md:mt-0">
                  {p.where}
                </span>
              </a>
            </Reveal>
          ))}
        </ol>

        <Reveal className="lg:hidden">
          <div className="mx-auto max-w-[340px]">
            <Venn />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Ecosystem;
