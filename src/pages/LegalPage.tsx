import SEOOptimizer from "@/components/SEOOptimizer";
import { PageShell, PageHero } from "@/components/PageShell";
import { LINKS } from "@/data/brand";

type Kind = "privacy" | "terms";

const content: Record<Kind, { title: string; intro: string; sections: { h: string; p: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "This page explains, in plain language, what information Dietary Guide handles on this website and why.",
    sections: [
      {
        h: "What we collect",
        p: [
          "If you sign in to the store, we receive basic profile details from your Google account, such as your name, email address and profile photo.",
          "When you order, we store the delivery addresses you save, your order details and the contact number you provide, so we can deliver and support your order.",
          "If you use our free tools or subscribe to updates, we process the information you enter in order to give you a result or send you the updates you asked for.",
        ],
      },
      {
        h: "Analytics and third-party services",
        p: [
          "We use Google Analytics to understand how the website is used, in aggregate. We also use hosted services, including Google Firebase and Supabase, to run sign-in, the store, the blog and our tools, and a voice assistant widget on some pages.",
          "Payments, when available, are handled by a payment provider. We do not store your full card details.",
        ],
      },
      {
        h: "How we use information",
        p: [
          "To provide the website, app and store, to process and deliver orders, to answer your questions and to improve our products. We do not sell your personal information.",
        ],
      },
      {
        h: "Health information",
        p: [
          "Our tools and IRA give general nutrition information. Please avoid sharing sensitive medical details you are not comfortable sharing. Nothing on Dietary Guide is a substitute for advice from a qualified professional.",
        ],
      },
      {
        h: "Your choices",
        p: [
          "You can ask us to access, correct or delete your personal information by writing to us. You can sign out of the store at any time, and you can block analytics cookies in your browser settings.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "These terms describe how you may use the Dietary Guide website, tools and store.",
    sections: [
      {
        h: "Using the website",
        p: [
          "Dietary Guide is operated by Navdhi. By using the website you agree to use it lawfully and not to disrupt or misuse it.",
        ],
      },
      {
        h: "Not medical advice",
        p: [
          "Articles, recipes, the AI tools and IRA provide general nutrition and wellness information. They are not medical advice, diagnosis or treatment. Speak to a doctor or registered dietitian about your own health, particularly if you are pregnant, have a medical condition or take medication.",
        ],
      },
      {
        h: "AI features",
        p: [
          "AI-generated responses can be incomplete or wrong. Use your own judgement and check anything important with a qualified professional.",
        ],
      },
      {
        h: "Products and orders",
        p: [
          "Product descriptions, prices and availability are shown on each product page and may change. Please read ingredient and allergen information on the product page and packaging before you buy and eat.",
        ],
      },
      {
        h: "Research projects",
        p: [
          "NAPA and NAHACE are research prototypes. They are not offered as products or services and should not be relied on to assess the safety or quality of any food.",
        ],
      },
      {
        h: "Content",
        p: [
          "The Dietary Guide name, logo, IRA, text, images and product designs belong to Navdhi. Please do not reuse them without permission.",
        ],
      },
    ],
  },
};

const LegalPage = ({ kind }: { kind: Kind }) => {
  const c = content[kind];
  return (
    <PageShell>
      <SEOOptimizer title={`${c.title} | Dietary Guide`} description={c.intro} url={`/${kind}`} />
      <PageHero eyebrow="Legal" title={c.title} intro={<p>{c.intro}</p>} />
      <section className="bg-brand-paper pb-24">
        <div className="dg-wrap">
          <div className="max-w-3xl border-t border-brand-teal/15">
            {c.sections.map((s) => (
              <div key={s.h} className="grid gap-3 border-b border-brand-teal/15 py-8 md:grid-cols-[13rem_1fr] md:gap-8">
                <h2 className="text-[1.7rem] text-brand-teal">{s.h}</h2>
                <div className="space-y-3 text-[0.98rem] leading-[1.75] text-brand-teal/75">
                  {s.p.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
            <p className="mt-8 text-[0.95rem] text-brand-teal/70">
              Questions? Write to{" "}
              <a href={`mailto:${LINKS.email}`} className="font-bold text-brand-terra underline underline-offset-4">
                {LINKS.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default LegalPage;
