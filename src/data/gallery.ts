/**
 * Data for the homepage "Trusted by Leaders, Institutions & Industry" gallery
 * (src/components/PressGallery.tsx). Add more entries here to grow the
 * gallery — the component never needs to change.
 *
 * NOTE: the three LinkedIn "feedshare-image" URLs below are signed and
 * expire 2026-08-20 (~3 weeks from when these were added). After that date
 * they will 403 and the images will break. Download them and host them on a
 * permanent URL (e.g. the same GitHub-raw pattern already used for blog and
 * recipe images) before then.
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
    src: "https://media.licdn.com/dms/image/v2/D4D22AQEVe3XS1MqF5w/feedshare-image-high-res/B4DZ9F26lWI4AU-/0/1783583451968?e=1787184000&v=beta&t=kcs_s28Pxjgp-o8xtLhDOqfciFDAi_gUimiGPeNF3Po",
    caption: "Our AI Startup Impressed the Governor of Uttar Pradesh Smt. Anandiben Patel | Navdhi Innovations",
  },
  {
    type: "image",
    src: "https://media.licdn.com/dms/image/v2/D4D22AQGfY_2gfnIvtw/feedshare-image-high-res/B4DZ9F25eiJQAY-/0/1783583447307?e=1787184000&v=beta&t=BV3mLLrJYCania5qiJgH3BzxavGsjIlMwcWh8TXVoGc",
    caption: "Our AI Startup Impressed the Governor of Uttar Pradesh Smt. Anandiben Patel | Navdhi Innovations",
  },
  {
    type: "image",
    src: "https://media.licdn.com/dms/image/v2/D4D22AQGrJNnN7TJ1Pg/feedshare-image-high-res/B4DZ9F2587HEAU-/0/1783583449314?e=1787184000&v=beta&t=fto6r35OuNT1F2jjcxS-NAk8Lgf6RYVuI5KU-FZgv0o",
    caption: "Our AI Startup Impressed the Governor of Uttar Pradesh Smt. Anandiben Patel | Navdhi Innovations",
  },
];
