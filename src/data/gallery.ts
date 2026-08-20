/**
 * Data for the homepage "Trusted by Leaders, Institutions & Industry" gallery
 * (src/components/PressGallery.tsx). Add more entries here to grow the
 * gallery — the component never needs to change.
 *
 * Host images somewhere you control — Cloudinary (as below), or the
 * GitHub-raw pattern used for blog and product images. Do NOT paste URLs
 * copied from LinkedIn, Instagram, Facebook or Google Drive: those are
 * signed links carrying an expiry, and they 403 once it passes. The first
 * three images here were exactly that and broke on 2026-08-20.
 */

export type GalleryItem =
  | { type: "image"; src: string; caption: string }
  | { type: "youtube"; url: string; caption: string };

export const galleryItems: GalleryItem[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=xhrewy9cVZA",
    caption: "Our AI Startup Impressed the Governor of Uttar Pradesh Smt. Anandiben Patel | Navdhi Innovations",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dahvodqog/image/upload/v1787204892/WhatsApp_Image_2026-08-20_at_11.16.24_AM_up5unq.jpg",
    caption: "Our AI Startup Impressed the Governor of Uttar Pradesh Smt. Anandiben Patel | Navdhi Innovations",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dahvodqog/image/upload/v1787204890/1783583449249_peuuy8.jpg",
    caption: "Our AI Startup Impressed the Governor of Uttar Pradesh Smt. Anandiben Patel | Navdhi Innovations",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dahvodqog/image/upload/v1787204890/1783583447307_dvkl8o.jpg",
    caption: "Our AI Startup Impressed the Governor of Uttar Pradesh Smt. Anandiben Patel | Navdhi Innovations",
  },
];
