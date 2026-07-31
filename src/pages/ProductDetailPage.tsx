import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { productMap } from "@/data/store-products";
import { useCart } from "@/context/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SEOOptimizer from "@/components/SEOOptimizer";
import { buildProductMeta, buildProductSchemas } from "@shared/site-seo.mjs";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Leaf,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  Heart,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
const ff = "'Space Grotesk', 'Inter', sans-serif";

function truncateAtWord(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}

type TabKey = "description" | "nutrition" | "ingredients" | "benefits";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const storeProduct = id ? productMap[id] : undefined;
  const { addItem } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [slideshowPaused, setSlideshowPaused] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    if (!product || product.images.length <= 1 || slideshowPaused) return;
    const timer = setInterval(() => {
      setSelectedImage((i) => (i + 1) % product.images.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [product, slideshowPaused]);

  const prevImage = () => {
    if (!product) return;
    setSlideshowPaused(true);
    setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length);
  };

  const nextImage = () => {
    if (!product) return;
    setSlideshowPaused(true);
    setSelectedImage((i) => (i + 1) % product.images.length);
  };

  // Hide voice widgets
  useEffect(() => {
    const selectors = [
      "#anve-voice-btn", ".chatbot-voice-button", "#anve-ai-widget",
      "[id*='anve']", "[class*='anve']", "[id*='voxcraft']", "[class*='voxcraft']",
      "#voxcraft-btn", "#voxcraft-branding", ".voxcraft-widget-btn", ".voxcraft-mode-btn",
    ];
    const hide = () => {
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.setProperty("display", "none", "important");
        });
      });
    };
    hide();
    const observer = new MutationObserver(hide);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.removeProperty("display");
        });
      });
    };
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div style={{ fontFamily: ff, background: C.cream, minHeight: "100vh" }}>
        <Navbar />
        <div style={{ paddingTop: 140, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: C.dark }}>Product not found</h1>
          <button
            onClick={() => navigate("/products")}
            style={{
              marginTop: 24,
              padding: "12px 32px",
              background: C.dark,
              color: C.white,
              border: "none",
              borderRadius: 30,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: ff,
              cursor: "pointer",
            }}
          >
            Back to Store
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    toast({
      title: "Added to cart!",
      description: `${qty}× ${product.name}`,
    });
    setQty(1);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "nutrition", label: "Nutrition" },
    { key: "ingredients", label: "Ingredients" },
    { key: "benefits", label: "Benefits" },
  ];

  // Mirrors api/product.js exactly. seoConfig.ts's old Product builder
  // fabricated a "Verified Buyer" review whenever reviewCount was set but no
  // real topReview existed — fake-review markup Google's guidelines
  // explicitly prohibit. These builders only ever emit a review when
  // storeProduct.topReview is a real value.
  const seo = buildProductMeta(product, storeProduct);

  return (
    <div className="dg-store" style={{ fontFamily: ff, background: C.cream, minHeight: "100vh" }}>
      <SEOOptimizer
        exactTitle={seo.title}
        description={seo.description}
        keywords={storeProduct?.seoKeywords || `buy ${product.name} online India, ${product.name} price, healthy ${(product.tags || []).join(', ')} snacks, Dietary Guide ${product.name}`}
        url={`/products/${product.id}`}
        image={seo.image}
        additionalSchemas={buildProductSchemas(product, storeProduct)}
      />
      <style>{`
        .dg-store h1, .dg-store h2, .dg-store h3, .dg-store h4, .dg-store h5, .dg-store h6,
        .dg-store p, .dg-store span, .dg-store button, .dg-store input, .dg-store a {
          font-family: 'Space Grotesk', 'Inter', sans-serif !important;
        }
        @media (max-width: 768px) {
          .pdp-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .pdp-image-box { min-height: 280px !important; padding: 20px !important; border-radius: 16px !important; }
          .pdp-section { padding: 100px 16px 80px !important; }
          .pdp-sticky-bar { display: flex !important; }
          .pdp-tab-row { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .pdp-tab-row::-webkit-scrollbar { display: none; }
          .pdp-tab-row button { padding: 12px 18px !important; font-size: 13px !important; }
          .pdp-qty-cart-row { gap: 8px !important; }
          .pdp-qty-cart-row .pdp-add-btn { min-width: unset !important; padding: 12px 16px !important; font-size: 14px !important; }
          .pdp-trust-badges { gap: 12px !important; }
          .pdp-thumb-strip { gap: 6px !important; }
          .pdp-thumb-strip button { width: 52px !important; height: 52px !important; border-radius: 10px !important; }
          .pdp-short-desc { max-width: 100% !important; }
          .pdp-tab-content { max-width: 100% !important; }
        }
        @media (max-width: 480px) {
          .pdp-image-box { min-height: 220px !important; padding: 14px !important; }
          .pdp-section { padding: 90px 12px 80px !important; }
          .pdp-nav-arrow { width: 32px !important; height: 32px !important; }
          .pdp-nav-arrow svg { width: 16px !important; height: 16px !important; }
        }
      `}</style>

      <Navbar />

      <div className="pdp-section" style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 60px" }}>
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/products")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.textMuted,
            fontSize: 14,
            fontFamily: ff,
            fontWeight: 500,
            marginBottom: 32,
            padding: 0,
          }}
        >
          <ArrowLeft size={16} />
          Back to Store
        </button>

        {/* Main grid */}
        <div
          className="pdp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Left — Image */}
          <div>
            {/* Badge above image box */}
            {product.badge && (
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    display: "inline-block",
                    background: product.badge === "Bestseller" ? C.gold : C.brand,
                    color: C.white,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 16px",
                    borderRadius: 20,
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                  }}
                >
                  {product.badge}
                </span>
              </div>
            )}
            <div
              className="pdp-image-box"
              onMouseEnter={() => setSlideshowPaused(true)}
              onMouseLeave={() => setSlideshowPaused(false)}
              style={{
                background: C.brandUltraLight,
                borderRadius: 24,
                padding: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 420,
                position: "relative",
              }}
            >
              {/* Left arrow */}
              {product.images.length > 1 && (
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="pdp-nav-arrow"
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 4,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `1.5px solid ${C.brandLight}`,
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,.10)",
                    transition: "background .2s, transform .2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.white; (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.92)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1)"; }}
                >
                  <ChevronLeft size={20} color={C.dark} strokeWidth={2} />
                </button>
              )}

              <img
                src={product.images[selectedImage]}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: 380,
                  objectFit: "contain",
                  filter: "drop-shadow(0 16px 40px rgba(0,0,0,.1))",
                  transition: "opacity .3s ease",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />

              {/* Right arrow */}
              {product.images.length > 1 && (
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="pdp-nav-arrow"
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 4,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `1.5px solid ${C.brandLight}`,
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,.10)",
                    transition: "background .2s, transform .2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.white; (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.92)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1)"; }}
                >
                  <ChevronRight size={20} color={C.dark} strokeWidth={2} />
                </button>
              )}

              {/* Dot indicators */}
              {product.images.length > 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 6,
                    zIndex: 4,
                  }}
                >
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setSlideshowPaused(true); setSelectedImage(i); }}
                      aria-label={`Go to image ${i + 1}`}
                      style={{
                        width: i === selectedImage ? 20 : 8,
                        height: 8,
                        borderRadius: 4,
                        border: "none",
                        background: i === selectedImage ? C.brand : `${C.brand}50`,
                        cursor: "pointer",
                        padding: 0,
                        transition: "width .3s, background .3s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="pdp-thumb-strip" style={{ display: "flex", gap: 10, marginTop: 14, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      border: `2px solid ${i === selectedImage ? C.brand : C.brandLight}`,
                      background: C.brandUltraLight,
                      cursor: "pointer",
                      overflow: "hidden",
                      padding: 4,
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.brand, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 8px" }}>
              {product.category}
            </p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: C.dark, margin: "0 0 8px", lineHeight: 1.15 }}>
              {product.name}
            </h1>
            {product.subtitle && (
              <p style={{ fontSize: 16, color: C.textMuted, margin: "0 0 16px" }}>{product.subtitle}</p>
            )}

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={s <= Math.round(product.rating) ? C.gold : "none"}
                    color={C.gold}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{product.rating}</span>
              <span style={{ fontSize: 13, color: C.textMuted }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: C.dark }}>₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: 18, color: C.textMuted, textDecoration: "line-through" }}>
                    ₹{product.originalPrice}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.brand,
                      background: C.brandUltraLight,
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            <p className="pdp-short-desc" style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 500 }}>
              {truncateAtWord(product.description, 180)}
            </p>

            {/* Qty + Add to cart */}
            <div className="pdp-qty-cart-row" style={{ display: "flex", gap: 12, alignItems: "stretch", marginBottom: 16, flexWrap: "wrap" }}>
              {/* Qty selector */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1.5px solid ${C.brandLight}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  background: C.white,
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  style={{
                    width: 44,
                    height: 48,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Minus size={16} color={C.dark} />
                </button>
                <span style={{ width: 40, textAlign: "center", fontSize: 16, fontWeight: 600, color: C.dark }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                  style={{
                    width: 44,
                    height: 48,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plus size={16} color={C.dark} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                className="pdp-add-btn"
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  minWidth: 180,
                  padding: "14px 32px",
                  background: C.dark,
                  color: C.white,
                  border: "none",
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: ff,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "background .2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = C.brand;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = C.dark;
                }}
              >
                <ShoppingCart size={18} />
                Add to Cart — ₹{(product.price * qty).toLocaleString("en-IN")}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setLiked(!liked)}
                aria-label="Add to wishlist"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  border: `1.5px solid ${C.brandLight}`,
                  background: C.white,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Heart size={20} fill={liked ? "#e74c3c" : "none"} color={liked ? "#e74c3c" : C.dark} strokeWidth={1.8} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="pdp-trust-badges" style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 28, paddingTop: 24, borderTop: `1px solid ${C.brandLight}` }}>
              {[
                { icon: <Leaf size={16} />, label: "Clean Label" },
                { icon: <ShieldCheck size={16} />, label: "No Preservatives" },
                { icon: <Truck size={16} />, label: "Free Shipping ₹999+" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textMuted, fontWeight: 500 }}>
                  <span style={{ color: C.brand }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div style={{ marginTop: 64 }}>
          {/* Tab headers */}
          <div
            className="pdp-tab-row"
            style={{
              display: "flex",
              gap: 0,
              borderBottom: `2px solid ${C.brandLight}`,
              marginBottom: 32,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "14px 28px",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${activeTab === tab.key ? C.brand : "transparent"}`,
                  marginBottom: -2,
                  fontSize: 14,
                  fontWeight: activeTab === tab.key ? 700 : 500,
                  color: activeTab === tab.key ? C.dark : C.textMuted,
                  cursor: "pointer",
                  fontFamily: ff,
                  whiteSpace: "nowrap",
                  transition: "color .2s, border-color .2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="pdp-tab-content" style={{ maxWidth: 720 }}>
            {activeTab === "description" && (
              <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.8 }}>{product.description}</p>
            )}

            {activeTab === "nutrition" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {product.nutrition.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "14px 0",
                      borderBottom: `1px solid ${C.brandLight}`,
                    }}
                  >
                    <span style={{ fontSize: 14, color: C.textMuted }}>{n.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{n.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "ingredients" && (
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                {product.ingredients.map((ing, i) => (
                  <li key={i} style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
                    {ing}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "benefits" && (
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {product.benefits.map((b, i) => (
                  <li key={i} style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
                    <span style={{ color: C.brand, fontWeight: 600 }}>✓</span> {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky Add to Cart bar */}
      <div
        className="pdp-sticky-bar"
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: C.white,
          borderTop: `1px solid ${C.brandLight}`,
          padding: "12px 16px",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          boxShadow: "0 -4px 20px rgba(0,0,0,.08)",
        }}
      >
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: 0 }}>₹{product.price}</p>
          {product.originalPrice && (
            <p style={{ fontSize: 11, color: C.textMuted, textDecoration: "line-through", margin: 0 }}>
              ₹{product.originalPrice}
            </p>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            maxWidth: 240,
            padding: "12px 24px",
            background: C.dark,
            color: C.white,
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: ff,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
  );
};

export default ProductDetailPage;
