import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Camera, MessageCircle, TrendingUp, ShieldCheck, Sparkles, Lock, Home, BarChart3, User, ScanLine } from "lucide-react";
import SEOOptimizer from "@/components/SEOOptimizer";
import Reveal from "@/components/Reveal";
import { PageShell } from "@/components/PageShell";
import { Phone } from "@/components/home/WhyAndApp";
import { LINKS } from "@/data/brand";

const GooglePlayMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
  </svg>
);

const steps = [
  {
    n: "01",
    t: "Tell us about you",
    d: "A few simple questions to begin: height and weight, age and lifestyle, your health goals, how you exercise, and what you like to eat.",
  },
  {
    n: "02",
    t: "Meet IRA at home",
    d: "Your home screen is IRA's home too. Log meals from there, check the day, and ask a question whenever one comes up.",
  },
  {
    n: "03",
    t: "Log, learn, adjust",
    d: "Photograph or type your meals, follow your guidance, and watch your stats move. Change your preferences any time.",
  },
];

const features = [
  { Icon: Camera, t: "Smart meal logging", d: "Take a photo or type what you ate. IRA recognises the food and keeps track for you." },
  { Icon: MessageCircle, t: "Chat with IRA", d: "Ask anything about nutrition and get a clear, friendly answer in seconds." },
  { Icon: TrendingUp, t: "Progress tracking", d: "Follow your BMI, your health improvements and the goals you reach." },
];

const tabs = [
  { Icon: Home, t: "Home", d: "Your day at a glance: streak, calories and today's meals" },
  { Icon: BarChart3, t: "Metrics", d: "BMI, daily energy needs and IRA's recommendations" },
  { Icon: ScanLine, t: "Scan", d: "Photograph a meal and get its nutrition and health score" },
  { Icon: MessageCircle, t: "IRA AI", d: "A full conversation with IRA" },
  { Icon: User, t: "Profile", d: "Update your preferences any time" },
];

/** Real screenshots from the Dietary Guide Android app (public/brand/app). */
const SCREENS = {
  home: { src: "/brand/app/home.webp", alt: "Dietary Guide app home screen showing a one-day streak, calorie goal, IRA's insight and today's nutrition" },
  chat: { src: "/brand/app/ira-chat.webp", alt: "IRA AI chat in the Dietary Guide app: asking IRA for vegetarian dinner suggestions" },
  scan: { src: "/brand/app/scan-soya.webp", alt: "Food scan result in the Dietary Guide app: soya chunks curry with rice, 82/100 health score, 538 kcal and 26 g protein" },
  metrics: { src: "/brand/app/metrics.webp", alt: "Metrics tab in the Dietary Guide app showing BMI, BMR, TDEE, a calorie target and IRA's recommendations" },
  profile: { src: "/brand/app/profile.webp", alt: "Profile tab in the Dietary Guide app showing the bunny avatar, goal, BMI, weight, height and age" },
  onboarding: { src: "/brand/app/onboarding.webp", alt: "Dietary Guide app onboarding step asking for your weight, with a live BMI reading" },
} as const;

type ScreenKey = keyof typeof SCREENS;

/** A real app screenshot inside the phone frame. */
const AppScreen = ({ screen, className = "", eager = false }: { screen: ScreenKey; className?: string; eager?: boolean }) => (
  <Phone className={`aspect-[9/19] ${className}`}>
    <img
      src={SCREENS[screen].src}
      alt={SCREENS[screen].alt}
      width={540}
      height={1152}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full bg-white object-cover object-top pt-[26px]"
    />
  </Phone>
);

const gallery: { screen: ScreenKey; t: string; d: string }[] = [
  { screen: "onboarding", t: "Set up in minutes", d: "Answer a few questions and see your BMI as you go." },
  { screen: "metrics", t: "Know your numbers", d: "BMI, daily energy needs and a calorie target made for you." },
  { screen: "profile", t: "Make it yours", d: "Your goal, body stats and preferences, all in one place." },
];

const AppPromotionPage = () => (
  <PageShell>
    <SEOOptimizer
      title="Dietary Guide App | Meet IRA, Your AI Nutrition Assistant"
      description="Download the Dietary Guide app for Android. Meet IRA, your AI nutrition assistant. Log meals with a photo, get personalised Indian diet guidance and track your progress."
      keywords="Dietary Guide app, IRA AI nutrition assistant, diet app India, AI meal logging app, food photo recognition app, Indian diet planner app, calorie tracker India, nutrition app Android"
      url="/app"
      schemaType="MobileApplication"
      breadcrumbs={[
        { name: "Home", url: "https://dietaryguide.in/" },
        { name: "App", url: "https://dietaryguide.in/app" },
      ]}
    />

    {/* Hero */}
    <section className="dg-grain relative overflow-hidden bg-brand-teal pb-0 pt-[128px] text-brand-cream md:pt-[160px]">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-24 h-[520px] w-[520px] rounded-full bg-brand-terra/15 blur-3xl" />
      <div className="dg-wrap relative grid items-end gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="pb-14 lg:pb-28">
          <p className="dg-eyebrow text-brand-terra">The Dietary Guide app</p>
          <h1 className="mt-6 text-[clamp(3rem,7.6vw,6.6rem)]">
            Your nutrition buddy is <em className="text-brand-terra">waiting for you.</em>
          </h1>
          <p className="mt-7 max-w-xl text-[1.08rem] leading-[1.75] text-brand-cream/70">
            Meet IRA, the AI nutrition assistant inside the Dietary Guide app. She learns your lifestyle, helps plan your meals, logs what you eat from a photo and keeps you moving towards your goals.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={LINKS.playStore} target="_blank" rel="noopener noreferrer" className="dg-btn dg-btn-terra">
              <GooglePlayMark /> Get it on Google Play
            </a>
            <a href="#how-it-works" className="dg-btn dg-btn-line-light">
              How it works <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 text-[0.8rem] text-brand-cream/50">Free to download on Android. One-tap Google sign-in.</p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] items-end justify-center">
          <AppScreen screen="chat" eager className="relative z-0 -mr-12 mb-12 w-[200px] -rotate-6 md:w-[230px]" />
          <AppScreen screen="home" eager className="relative z-10 -mb-16 w-[230px] md:w-[260px]" />
        </div>
      </div>
    </section>

    {/* Steps */}
    <section id="how-it-works" className="scroll-mt-24 bg-brand-paper pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="dg-wrap">
        <Reveal className="max-w-3xl">
          <p className="dg-eyebrow text-brand-terra">How it works</p>
          <h2 className="mt-5 text-[clamp(2.5rem,5.4vw,4.4rem)] text-brand-teal">
            Three steps, <em className="text-brand-terra">then it just fits in.</em>
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-10 border-t border-brand-teal/15 pt-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}>
              <p className="font-editorial text-[3.6rem] leading-none text-brand-terra">{s.n}</p>
              <h3 className="mt-4 text-[1.9rem] text-brand-teal">{s.t}</h3>
              <p className="mt-3 text-[0.97rem] leading-[1.7] text-brand-teal/70">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* Features */}
    <section className="bg-brand-cream py-20 md:py-28">
      <div className="dg-wrap grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-[300px]">
          <AppScreen screen="scan" className="w-full" />
        </Reveal>
        <div>
          <Reveal>
            <p className="dg-eyebrow text-brand-terra">Inside the app</p>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] text-brand-teal">
              Less typing. <em className="text-brand-terra">More eating well.</em>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {features.map(({ Icon, t, d }, i) => (
              <Reveal as="li" key={t} delay={i * 70}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-teal text-brand-cream">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[1.6rem] text-brand-teal">{t}</h3>
                <p className="mt-2 text-[0.95rem] leading-[1.65] text-brand-teal/70">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Real screens */}
    <section className="bg-brand-teal py-20 text-brand-cream md:py-28">
      <div className="dg-wrap">
        <Reveal className="max-w-3xl">
          <p className="dg-eyebrow text-brand-terra">A look inside</p>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)]">
            The real app, <em className="text-brand-terra">screen by screen.</em>
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-14 sm:grid-cols-3 sm:gap-8">
          {gallery.map(({ screen, t, d }, i) => (
            <Reveal as="li" key={screen} delay={i * 80} className="flex flex-col items-center text-center">
              <AppScreen screen={screen} className="w-full max-w-[250px]" />
              <h3 className="mt-8 text-[1.7rem]">{t}</h3>
              <p className="mt-2 max-w-[18rem] text-[0.95rem] leading-[1.65] text-brand-cream/70">{d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    {/* Tabs */}
    <section className="bg-brand-paper py-20 md:py-28">
      <div className="dg-wrap">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl text-[clamp(2.4rem,5vw,4rem)] text-brand-teal">
            Five tabs. <em className="text-brand-terra">Nothing to learn.</em>
          </h2>
          <p className="max-w-sm text-[0.98rem] leading-[1.7] text-brand-teal/70">The whole app fits in five places, so you always know where things are.</p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 border-l border-t border-brand-teal/15 md:grid-cols-3 lg:grid-cols-5">
          {tabs.map(({ Icon, t, d }, i) => (
            <Reveal as="li" key={t} delay={i * 60} className="border-b border-r border-brand-teal/15 p-6 md:p-8">
              <Icon className="h-6 w-6 text-brand-terra" />
              <h3 className="mt-6 text-[1.9rem] text-brand-teal md:text-[2.3rem]">{t}</h3>
              <p className="mt-2 text-[0.92rem] leading-[1.6] text-brand-teal/65">{d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    {/* Privacy */}
    <section className="bg-brand-paper pb-20 md:pb-28">
      <div className="dg-wrap">
        <Reveal className="grid gap-8 rounded-[2rem] bg-brand-cream p-7 md:grid-cols-3 md:p-12">
          {[
            { Icon: ShieldCheck, t: "Secure login", d: "One-tap Google sign-in. No new password to remember." },
            { Icon: Sparkles, t: "Gets to know you", d: "IRA uses your profile and history to make suggestions more relevant." },
            { Icon: Lock, t: "Privacy first", d: "Your data is never sold." },
          ].map(({ Icon, t, d }) => (
            <div key={t}>
              <Icon className="h-6 w-6 text-brand-terra" />
              <h3 className="mt-4 text-[1.7rem] text-brand-teal">{t}</h3>
              <p className="mt-2 text-[0.95rem] leading-[1.65] text-brand-teal/70">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>

    {/* CTA */}
    <section className="dg-grain bg-brand-terra py-20 text-brand-paper md:py-24">
      <div className="dg-wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="max-w-2xl text-[clamp(2.6rem,5.6vw,4.6rem)]">Ready to meet IRA?</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={LINKS.playStore} target="_blank" rel="noopener noreferrer" className="dg-btn bg-brand-paper text-brand-teal hover:bg-brand-cream">
            <GooglePlayMark /> Get it on Google Play
          </a>
          <Link to="/tools" className="dg-btn border border-brand-paper/50 text-brand-paper hover:bg-brand-paper/10">
            Try the free web tools <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </PageShell>
);

export default AppPromotionPage;
