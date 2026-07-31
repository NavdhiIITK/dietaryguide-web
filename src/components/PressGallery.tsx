import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/data/gallery";

function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

/** Portfolio-style card heights vary naturally with each media's own aspect ratio. */
function GalleryCard({
  item,
  index,
  onOpenImage,
  onOpenVideo,
}: {
  item: GalleryItem;
  index: number;
  onOpenImage: () => void;
  onOpenVideo: (embedUrl: string) => void;
}) {
  const videoId = item.type === "youtube" ? getYouTubeId(item.url) : null;
  const [thumbSrc, setThumbSrc] = useState(
    videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: "easeOut" }}
      className="mb-6 break-inside-avoid"
    >
      <button
        type="button"
        onClick={() => (item.type === "image" ? onOpenImage() : videoId && onOpenVideo(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`))}
        className="group relative block w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10 text-left"
      >
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.caption}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={thumbSrc}
              alt={item.caption}
              loading="lazy"
              onError={() => setThumbSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="h-7 w-7 translate-x-0.5 fill-gray-900 text-gray-900" />
              </span>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-12">
          <p className="text-sm font-medium leading-snug text-white line-clamp-2">{item.caption}</p>
        </div>
      </button>
    </motion.div>
  );
}

function ImageLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: Extract<GalleryItem, { type: "image" }>[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const total = images.length;
  const current = images[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, total, onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + total) % total);
            }}
            className="absolute left-2 sm:left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % total);
            }}
            className="absolute right-2 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] max-w-5xl flex-col items-center"
      >
        <img src={current.src} alt={current.caption} className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl" />
        <p className="mt-4 max-w-2xl text-center text-sm text-white/80">{current.caption}</p>
      </motion.div>
    </motion.div>
  );
}

function VideoModal({ embedUrl, onClose }: { embedUrl: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
      >
        <iframe
          src={embedUrl}
          title="Video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

export default function PressGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const images = useMemo(
    () => galleryItems.filter((item): item is Extract<GalleryItem, { type: "image" }> => item.type === "image"),
    []
  );

  return (
    <section className="py-24 bg-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">Trusted by Leaders, Institutions & Industry</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real collaborations, meetings, media appearances and recognition that reflect our journey.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {galleryItems.map((item, index) => (
            <GalleryCard
              key={item.type === "image" ? item.src : item.url}
              item={item}
              index={index}
              onOpenImage={() => setLightboxIndex(images.findIndex((img) => img.src === (item as Extract<GalleryItem, { type: "image" }>).src))}
              onOpenVideo={setActiveVideoUrl}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
        {activeVideoUrl && <VideoModal embedUrl={activeVideoUrl} onClose={() => setActiveVideoUrl(null)} />}
      </AnimatePresence>
    </section>
  );
}
