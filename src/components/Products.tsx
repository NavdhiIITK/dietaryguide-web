
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ArrowRight, Star, Leaf, ShieldCheck, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

/* ─── Color Tokens (used inline so changes stay scoped to /products) ─── */
const C = {
  brand: "#55b685",
  brandDark: "#3d8a63",
  brandLight: "#d6f0e3",
  brandUltraLight: "#eef8f2",
  cream: "#faf9f6",
  dark: "#1e1e1e",
  gold: "#c9a96e",
  goldLight: "#f5eedd",
  textMuted: "#6b7c72",
  white: "#ffffff",
};

/* ─── Font import (Space Grotesk – closest free match to Sharp Grotesk) ─── */
const fontLink = document.querySelector('link[data-store-font]');
if (!fontLink) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
  link.setAttribute("data-store-font", "true");
  link.setAttribute("media", "print");
  link.onload = () => { link.media = "all"; };
  document.head.appendChild(link);
}
const ff = "'Space Grotesk', 'Inter', sans-serif";

/* ─── Product Data ─── */
interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  image: string;
  tags: string[];
  badge?: string;
}

const HERO_PRODUCT_IMG =
  "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/refs/heads/main/324t32t4erwt-removebg-preview.png";

const storeProducts: Product[] = [
  {
    id: "wt-1",
    name: "The Wellness Treat",
    subtitle: "Premium Diet Snack Gift Box",
    price: 1499,
    originalPrice: 1999,
    image: HERO_PRODUCT_IMG,
    tags: ["bestseller", "gift-box", "no-sugar"],
    badge: "Bestseller",
  },
  {
    id: "sp-1",
    name: "High-Protein Millet Granola",
    subtitle: "21g protein / serving",
    price: 449,
    originalPrice: 549,
    image:
      "https://github.com/amishardev/DGWEBSITEIMG/blob/main/WhatsApp%20Image%202026-03-01%20at%2012.14.15%20AM-Photoroom.png?raw=true",
    tags: ["protein", "millet"],
    badge: "New",
  },
  {
    id: "sp-2",
    name: "Roasted Chana Jor Masala",
    subtitle: "Crunchy & guilt-free",
    price: 199,
    image:
      "https://github.com/amishardev/DGWEBSITEIMG/blob/main/ChatGPT%20Image%20Mar%206,%202026,%2012_15_18%20AM-Photoroom.png?raw=true",
    tags: ["snack", "roasted"],
  },
  {
    id: "sp-2b",
    name: "Rajma Jor Masala",
    subtitle: "Spicy & protein-rich snack",
    price: 199,
    image:
      "https://github.com/amishardev/DGWEBSITEIMG/blob/main/RAJMAJOR.png?raw=true",
    tags: ["snack", "roasted"],
  },
  {
    id: "sp-3",
    name: "Plant-Protein Bars",
    subtitle: "Clean-label energy on the go",
    price: 349,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=600&q=80",
    tags: ["protein", "plant-based"],
  },
  {
    id: "sp-4",
    name: "Digestion Tea",
    subtitle: "Soothing herbal blend",
    price: 299,
    image:
      "https://github.com/amishardev/DGWEBSITEIMG/blob/main/diegetiontea.png?raw=true",
    tags: ["tea", "digestion"],
  },
];

/* ─── Reusable small components ─── */
const ProductCard = ({ product, featured = false }: { product: Product; featured?: boolean }) => {
  const [liked, setLiked] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast({ title: "Added to cart!", description: product.name });
  };

  return (
    <div
      className="group relative flex flex-col"
      style={{
        background: C.white,
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${C.brandLight}`,
        transition: "box-shadow .3s, transform .3s",
        fontFamily: ff,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(85,182,133,.15)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Badge */}
      {product.badge && (
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 2,
            background: product.badge === "Bestseller" ? C.gold : C.brand,
            color: C.white,
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 20,
            letterSpacing: ".5px",
            textTransform: "uppercase",
          }}
        >
          {product.badge}
        </span>
      )}

      {/* Heart */}
      <button
        onClick={() => setLiked(!liked)}
        aria-label="Add to wishlist"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 2,
          background: "rgba(255,255,255,.85)",
          border: "none",
          borderRadius: "50%",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform .2s",
        }}
      >
        <Heart
          size={18}
          fill={liked ? "#e74c3c" : "none"}
          color={liked ? "#e74c3c" : C.dark}
          strokeWidth={1.8}
        />
      </button>

      {/* Image */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        style={{
          aspectRatio: featured ? "4/3" : "1/1",
          background: C.brandUltraLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: featured ? 24 : 16,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            transition: "transform .4s",
          }}
          className="group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "20px 20px 24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <h3
          onClick={() => navigate(`/products/${product.id}`)}
          style={{
            fontSize: featured ? 20 : 16,
            fontWeight: 600,
            color: C.dark,
            margin: 0,
            lineHeight: 1.3,
            cursor: "pointer",
          }}
        >
          {product.name}
        </h3>
        {product.subtitle && (
          <p style={{ fontSize: 13, color: C.textMuted, margin: "4px 0 0" }}>
            {product.subtitle}
          </p>
        )}

        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: C.dark }}>
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: 14,
                  color: C.textMuted,
                  textDecoration: "line-through",
                }}
              >
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              marginTop: 14,
              width: "100%",
              padding: "12px 0",
              background: C.dark,
              color: C.white,
              border: "none",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: ff,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background .2s",
              letterSpacing: ".3px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = C.brand;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = C.dark;
            }}
          >
            <ShoppingCart size={15} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Marquee Component ─── */
const Marquee = ({ text, speed = 30 }: { text: string; speed?: number }) => (
  <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%" }}>
    <div
      className="store-marquee-text"
      style={{
        display: "inline-block",
        animation: `store-marquee ${speed}s linear infinite`,
        fontFamily: ff,
        fontSize: "clamp(28px, 4vw, 56px)",
        fontWeight: 700,
        color: C.brand,
        textTransform: "uppercase",
        letterSpacing: 2,
      }}
    >
      {Array(6)
        .fill(text)
        .map((t, i) => (
          <span key={i} style={{ marginRight: 60 }}>
            {t} <span style={{ color: C.gold, margin: "0 12px" }}>·</span>
          </span>
        ))}
    </div>
  </div>
);

/* ─── Main Products Component ─── */
const Products = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => { if (el) el.removeEventListener("scroll", checkScroll); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const wellnessTreat = storeProducts[0];
  const otherProducts = storeProducts.slice(1);

  return (
    <div className="dg-store" style={{ fontFamily: ff, background: C.cream, overflowX: "hidden" }}>
      {/* ─── Inject keyframes ─── */}
      <style>{`
        @keyframes store-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes store-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes store-fade-up { 0% { opacity:0; transform: translateY(30px); } 100% { opacity:1; transform: translateY(0); } }
        .store-fade-up { animation: store-fade-up .7s ease-out both; }
        .store-float { animation: store-float 5s ease-in-out infinite; }
        .store-scroll::-webkit-scrollbar { display: none; }
        .dg-store h1, .dg-store h2, .dg-store h3, .dg-store h4, .dg-store h5, .dg-store h6,
        .dg-store p, .dg-store span, .dg-store button, .dg-store input, .dg-store a {
          font-family: 'Space Grotesk', 'Inter', sans-serif !important;
        }

        /* ─── MOBILE RESPONSIVE ─── */
        @media (max-width: 768px) {
          .store-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .store-hero-grid > div {
            text-align: center !important;
            justify-self: center !important;
            max-width: 100% !important;
          }
          .store-hero-section {
            padding-top: 104px !important;
            padding-bottom: 48px !important;
            min-height: 100svh !important;
            min-height: 100vh !important;
          }
          .store-hero-headline {
            white-space: normal !important;
            font-size: clamp(32px, 9vw, 52px) !important;
            letter-spacing: -1px !important;
          }
          .store-hero-img-wrapper {
            max-width: 520px !important;
          }
          .store-badge-bl {
            bottom: -10px !important;
            left: 4px !important;
            padding: 8px 14px !important;
            font-size: 11px !important;
          }
          .store-badge-tr {
            top: -10px !important;
            right: 4px !important;
            padding: 8px 14px !important;
            font-size: 11px !important;
          }
          .store-section {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }
          .store-section-title {
            font-size: clamp(24px, 6vw, 36px) !important;
          }
          .store-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .store-carousel-item {
            min-width: 240px !important;
            max-width: 260px !important;
          }
          .store-bundle-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
          .store-bundle-left {
            display: contents !important;
          }
          .bundle-header {
            order: 1;
            padding-bottom: 20px;
            text-align: center !important;
          }
          .store-bundle-img-col {
            order: 2;
            padding-bottom: 20px;
          }
          .store-bundle-cta {
            order: 3;
            padding-bottom: 24px;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .bundle-desc {
            order: 4;
            text-align: center !important;
          }
          .bundle-desc p {
            max-width: 100% !important;
          }
          .store-bundle-img-box {
            padding: 24px !important;
            min-height: 280px !important;
          }
          .store-why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .store-why-card {
            padding: 24px 16px !important;
          }
          .store-newsletter-section {
            padding: 48px 16px !important;
          }
          .store-newsletter-form {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .store-newsletter-form input {
            width: 100% !important;
            min-width: unset !important;
          }
          .store-newsletter-form button {
            width: 100% !important;
          }
          .store-marquee-text {
            font-size: clamp(32px, 8vw, 48px) !important;
          }
          .store-hero-left-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .store-hero-right {
            display: none !important;
          }
          .store-hero-left-actions {
            display: none !important;
          }
          .store-hero-mobile-cta {
            display: block !important;
            width: 100% !important;
            justify-self: stretch !important;
          }
        }

        @media (max-width: 480px) {
          .store-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .store-carousel-item {
            min-width: 200px !important;
            max-width: 220px !important;
          }
          .store-why-grid {
            grid-template-columns: 1fr !important;
          }
          .store-hero-headline {
            font-size: clamp(28px, 7vw, 40px) !important;
          }
          .store-hero-img-wrapper {
            max-width: 400px !important;
          }
          .store-badge-bl, .store-badge-tr {
            padding: 6px 10px !important;
            font-size: 10px !important;
            gap: 4px !important;
          }
          .store-badge-bl svg, .store-badge-tr svg {
            width: 12px !important;
            height: 12px !important;
          }
          /* Compact product cards on small screens */
          .dg-store .store-product-grid .group > div:last-child {
            padding: 12px 10px 14px !important;
          }
          .dg-store .store-product-grid .group h3 {
            font-size: 13px !important;
          }
          .dg-store .store-product-grid .group span {
            font-size: 16px !important;
          }
          .dg-store .store-product-grid .group button {
            padding: 10px 0 !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section
        className="store-hero-section"
        style={{
          background: `linear-gradient(135deg, ${C.brandUltraLight} 0%, ${C.brandLight} 50%, ${C.cream} 100%)`,
          paddingTop: 120,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `${C.brand}12`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: `${C.gold}15`,
          }}
        />

        <div
          className="store-fade-up"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
            alignItems: "center",
          }}
        >
          {/* Top badge */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: C.white,
                border: `1px solid ${C.brandLight}`,
                borderRadius: 24,
                padding: "6px 18px",
                fontSize: 13,
                fontWeight: 500,
                color: C.brand,
                letterSpacing: ".4px",
              }}
            >
              <Leaf size={14} /> Dietary Guide Store
            </span>
          </div>

          {/* Headline */}
          <h1
            className="store-hero-headline"
            style={{
              fontSize: "clamp(48px, 8vw, 100px)",
              fontWeight: 700,
              textAlign: "center",
              color: C.dark,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              margin: 0,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            THE <span style={{ color: C.brand }}>WELLNESS</span> TREAT
          </h1>

          {/* Hero grid: text – image – text */}
          <div
            className="store-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gap: 32,
              alignItems: "center",
            }}
          >
            {/* Left text */}
            <div style={{ maxWidth: 360 }}>
              <p
                style={{
                  fontSize: 15,
                  color: C.textMuted,
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                Take the step towards a healthier, more vibrant life — shop now and fuel your body
                with the best!
              </p>
              <div className="store-hero-left-actions">
                <button
                  className="store-hero-left-btn"
                  style={{
                    marginTop: 24,
                    padding: "14px 32px",
                    width: "100%",
                    background: C.dark,
                    color: C.white,
                    border: "none",
                    borderRadius: 30,
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: ff,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "background .2s, transform .2s",
                    letterSpacing: ".3px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = C.brand;
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = C.dark;
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  Shop now <ArrowRight size={16} />
                </button>
                <p style={{ marginTop: 16, fontSize: 13, color: C.textMuted, cursor: "pointer" }}>
                  <span style={{ textDecoration: "underline" }}>Learn more</span>
                </p>
              </div>
            </div>

            {/* Center – Hero product image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                className="store-hero-img-wrapper"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 1032,
                  margin: "0 auto",
                  overflow: "visible",
                }}
              >
                <img
                  src={HERO_PRODUCT_IMG}
                  alt="The Wellness Treat Gift Box"
                  loading="eager"
                  decoding="async"
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: 20,
                    filter: "drop-shadow(0 32px 64px rgba(0,0,0,.18))",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />

                {/* Badge — bottom-left corner */}
                <div
                  className="store-badge-bl"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1.08) translateY(-2px)";
                    el.style.boxShadow = "0 12px 40px rgba(85,182,133,.38), 0 2px 8px rgba(0,0,0,.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1) translateY(0)";
                    el.style.boxShadow = "0 8px 32px rgba(85,182,133,.22), 0 2px 8px rgba(0,0,0,.06)";
                  }}
                  style={{
                    position: "absolute",
                    bottom: -18,
                    left: -18,
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1.5px solid ${C.brandLight}`,
                    borderRadius: 50,
                    padding: "11px 22px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.brand,
                    boxShadow: "0 8px 32px rgba(85,182,133,.22), 0 2px 8px rgba(0,0,0,.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    letterSpacing: ".4px",
                    textTransform: "uppercase" as const,
                    cursor: "default",
                    transition: "transform .2s ease, box-shadow .2s ease",
                    zIndex: 3,
                  }}
                >
                  <ShieldCheck size={15} strokeWidth={2.2} /> No Preservatives
                </div>

                {/* Badge — top-right corner */}
                <div
                  className="store-badge-tr"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1.08) translateY(2px)";
                    el.style.boxShadow = "0 12px 40px rgba(201,169,110,.38), 0 2px 8px rgba(0,0,0,.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1) translateY(0)";
                    el.style.boxShadow = "0 8px 32px rgba(201,169,110,.22), 0 2px 8px rgba(0,0,0,.06)";
                  }}
                  style={{
                    position: "absolute",
                    top: -18,
                    right: -18,
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1.5px solid ${C.goldLight}`,
                    borderRadius: 50,
                    padding: "11px 22px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.gold,
                    boxShadow: "0 8px 32px rgba(201,169,110,.22), 0 2px 8px rgba(0,0,0,.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    letterSpacing: ".4px",
                    textTransform: "uppercase" as const,
                    cursor: "default",
                    transition: "transform .2s ease, box-shadow .2s ease",
                    zIndex: 3,
                  }}
                >
                  <Leaf size={15} strokeWidth={2.2} /> High Protein
                </div>
              </div>
            </div>

            {/* Mobile-only CTA — shown below image on mobile, hidden on desktop */}
            <div className="store-hero-mobile-cta" style={{ display: "none" }}>
              <button
                style={{
                  width: "100%",
                  padding: "15px 32px",
                  background: C.dark,
                  color: C.white,
                  border: "none",
                  borderRadius: 30,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: ff,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  letterSpacing: ".3px",
                }}
              >
                Shop now <ArrowRight size={16} />
              </button>
              <p style={{ marginTop: 14, fontSize: 14, color: C.textMuted, cursor: "pointer", textAlign: "center" }}>
                <span style={{ textDecoration: "underline" }}>Learn more</span>
              </p>
            </div>

            {/* Right text */}
            <div className="store-hero-right" style={{ maxWidth: 340, justifySelf: "end" }}>
              <p
                style={{
                  fontSize: 15,
                  color: C.textMuted,
                  lineHeight: 1.7,
                }}
              >
                Our products are carefully curated with science-backed, clean-label ingredients,
                free from artificial additives, and made to the highest standards.
              </p>
              <div
                style={{
                  marginTop: 20,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: C.white,
                  border: `1px solid ${C.brandLight}`,
                  borderRadius: 20,
                  padding: "6px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.brand,
                }}
              >
                <Leaf size={14} /> No Added Sugar
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NEW ARRIVALS ═══════════════════════ */}
      <section
        className="store-section"
        style={{ background: C.cream, padding: "80px 24px" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 48,
            }}
          >
            <div>
              <h2
                className="store-fade-up store-section-title"
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 700,
                  color: C.dark,
                  textTransform: "uppercase",
                  letterSpacing: "-1px",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                NEW ARRIVALS
              </h2>
              <p style={{ fontSize: 15, color: C.textMuted, marginTop: 8 }}>
                Shop now and fuel your body with the best!
              </p>
            </div>

            {/* Category pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", "Snacks", "Protein", "Tea"].map((cat, i) => (
                <button
                  key={cat}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 20,
                    border: `1px solid ${i === 0 ? C.brand : C.brandLight}`,
                    background: i === 0 ? C.brand : "transparent",
                    color: i === 0 ? C.white : C.dark,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: ff,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div
            className="store-product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {storeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              style={{
                padding: "14px 36px",
                background: "transparent",
                color: C.dark,
                border: `2px solid ${C.dark}`,
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: ff,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.dark;
                (e.currentTarget as HTMLElement).style.color = C.white;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = C.dark;
              }}
            >
              View all products <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURED CAROUSEL ═══════════════════════ */}
      <section className="store-section" style={{ background: C.brandUltraLight, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: C.dark,
                textTransform: "uppercase",
                letterSpacing: "-0.5px",
                margin: 0,
              }}
            >
              Featured Products
            </h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: `1px solid ${canScrollLeft ? C.dark : C.brandLight}`,
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canScrollLeft ? "pointer" : "default",
                  opacity: canScrollLeft ? 1 : 0.4,
                  transition: "all .2s",
                }}
              >
                <ChevronLeft size={20} color={C.dark} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: `1px solid ${canScrollRight ? C.dark : C.brandLight}`,
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canScrollRight ? "pointer" : "default",
                  opacity: canScrollRight ? 1 : 0.4,
                  transition: "all .2s",
                }}
              >
                <ChevronRight size={20} color={C.dark} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="store-scroll"
            style={{
              display: "flex",
              gap: 24,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: 8,
            }}
          >
            {storeProducts.map((p) => (
              <div
                key={p.id}
                className="store-carousel-item"
                style={{
                  minWidth: 300,
                  maxWidth: 320,
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MARQUEE BANNER ═══════════════════════ */}
      <section
        style={{
          background: C.cream,
          padding: "32px 0",
          borderTop: `1px solid ${C.brandLight}`,
          borderBottom: `1px solid ${C.brandLight}`,
          overflow: "hidden",
        }}
      >
        <Marquee text="GREAT OFFER" />
      </section>

      {/* ═══════════════════════ SPECIAL BUNDLE OFFER ═══════════════════════ */}
      <section className="store-section" style={{ background: C.cream, padding: "80px 24px" }}>
        <div
          className="store-bundle-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left – Offer info */}
          <div className="store-bundle-left">
            {/* Header: label + title */}
            <div className="bundle-header">
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.gold,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Limited Edition
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 700,
                  color: C.dark,
                  margin: "12px 0 0",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                }}
              >
                The Wellness
                <br />
                Treat Gift Box
              </h2>
            </div>

            {/* Description */}
            <div className="bundle-desc">
              <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, maxWidth: 420, marginTop: 16 }}>
                
              </p>
              <p style={{ fontSize: 13, color: C.textMuted, marginTop: 12, lineHeight: 1.7 }}>
                A premium wellness gift box curated by Dietary Guide. Includes High-Protein Millet
                Granola, roasted Chana Jor, ready-to-eat roasted mixes, plant-protein bars, and a
                soothing Digestion Tea — all clean-label, no added sugar and no preservatives.
                Comes in a keepsake branded box (includes a Dietary Guide branded pouch/tee) — ideal
                for gifting fitness fans, busy professionals, and anyone who prefers healthy,
                nutrient-dense snacks.
              </p>
            </div>

            {/* CTA: price + button + wishlist */}
            <div className="store-bundle-cta">
              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 24 }}>
                <span style={{ textDecoration: "line-through", fontSize: 18, color: C.textMuted }}>
                  ₹1,999
                </span>
                <span style={{ fontSize: 36, fontWeight: 700, color: C.dark }}>₹1,499</span>
              </div>

              <button
                onClick={() => {
                  addItem({ id: wellnessTreat.id, name: wellnessTreat.name, price: wellnessTreat.price, image: wellnessTreat.image });
                  toast({ title: "Added to cart!", description: wellnessTreat.name });
                }}
                style={{
                  marginTop: 28,
                  padding: "16px 40px",
                  background: C.brand,
                  color: C.white,
                  border: "none",
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: ff,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "transform .2s, box-shadow .2s",
                  boxShadow: `0 8px 24px ${C.brand}40`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <ShoppingCart size={18} /> Add to cart
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16 }}>
                <Heart size={16} color={C.textMuted} />
                <span style={{ fontSize: 13, color: C.textMuted }}>Add to wishlist</span>
              </div>
            </div>
          </div>

          {/* Right – Product image with card */}
          <div className="store-bundle-img-col">
            <div
              className="store-bundle-img-box"
              style={{
                background: C.brandUltraLight,
                borderRadius: 28,
                padding: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                minHeight: 400,
              }}
            >
            <img
              src={HERO_PRODUCT_IMG}
              alt="The Wellness Treat Gift Box"
              loading="lazy"
              decoding="async"
              style={{
                maxWidth: "85%",
                maxHeight: 380,
                objectFit: "contain",
                filter: "drop-shadow(0 16px 32px rgba(85,182,133,.2))",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            {/* Review stars */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                background: C.white,
                borderRadius: 12,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 16px rgba(0,0,0,.06)",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill={C.gold} color={C.gold} />
              ))}
              <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 4 }}>4.9</span>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHY CHOOSE US ═══════════════════════ */}
      <section className="store-section" style={{ background: C.dark, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: C.white,
              textTransform: "uppercase",
              margin: "0 0 16px",
              letterSpacing: "-1px",
            }}
          >
            Why Choose <span style={{ color: C.brand }}>Dietary Guide</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", maxWidth: 520, margin: "0 auto 56px" }}>
            Nutri-dense, convenient, and made for everyday energy.
          </p>

          <div
            className="store-why-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 32,
            }}
          >
            {[
              { icon: <Leaf size={28} />, title: "Clean Label", desc: "No artificial additives, no preservatives, no added sugar" },
              { icon: <ShieldCheck size={28} />, title: "Science-Backed", desc: "Formulated with research-backed, nutrient-dense ingredients" },
              { icon: <Truck size={28} />, title: "Fast Delivery", desc: "Free shipping on orders above ₹999 across India" },
              { icon: <Star size={28} />, title: "Premium Quality", desc: "Handpicked ingredients sourced from trusted suppliers" },
            ].map((item, i) => (
              <div
                key={i}
                className="store-why-card"
                style={{
                  background: "rgba(255,255,255,.05)",
                  borderRadius: 20,
                  padding: "40px 28px",
                  border: "1px solid rgba(255,255,255,.08)",
                  transition: "border-color .3s, transform .3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.brand;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ color: C.brand, marginBottom: 20, display: "flex", justifyContent: "center" }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: C.white, margin: "0 0 10px", textAlign: "center" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6, margin: 0, textAlign: "center" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PICK OF THE MONTH ═══════════════════════ */}
      <section className="store-section" style={{ background: C.cream, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            <h2
              className="store-section-title"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                color: C.dark,
                textTransform: "uppercase",
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              PICK OF THE MONTH
            </h2>
            <p style={{ fontSize: 15, color: C.textMuted, marginTop: 8 }}>
              Every month we show you the best-selling products in our store so you can stay up to
              date with trends.
            </p>
          </div>

          <div
            className="store-product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {[storeProducts[0], storeProducts[4], storeProducts[1]].map((p) => (
              <ProductCard key={p.id + "-potm"} product={p} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NEWSLETTER CTA ═══════════════════════ */}
      <section
        className="store-newsletter-section"
        style={{
          background: `linear-gradient(135deg, ${C.brand} 0%, ${C.brandDark} 100%)`,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, color: C.white, margin: "0 0 16px" }}>
            Stay in the loop
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.8)", margin: "0 0 32px", lineHeight: 1.6 }}>
            Subscribe to get notified about new product launches, exclusive offers, and wellness
            tips from Dietary Guide.
          </p>
          <div
            className="store-newsletter-form"
            style={{
              display: "flex",
              gap: 12,
              maxWidth: 440,
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              style={{
                flex: 1,
                minWidth: 200,
                padding: "14px 20px",
                borderRadius: 12,
                border: "none",
                fontSize: 14,
                fontFamily: ff,
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "14px 28px",
                background: C.dark,
                color: C.white,
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: ff,
                cursor: "pointer",
                transition: "transform .2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
