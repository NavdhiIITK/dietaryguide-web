import type { ComponentType, CSSProperties } from "react";
import { SOCIAL_LINKS, type SocialIcon } from "@/data/links";
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from "./BrandIcons";

const ICONS: Record<SocialIcon, ComponentType> = {
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

/** Row of round social buttons. `delay` offsets the entrance animation, in milliseconds. */
const SocialLinks = ({ delay = 0 }: { delay?: number }) => (
  <nav aria-label="Dietary Guide on social media" className="dg-links-socials">
    <ul className="flex items-center justify-center gap-3.5">
      {SOCIAL_LINKS.map((social, index) => {
        const Icon = ICONS[social.id];
        return (
          <li key={social.id} className="dg-links-rise" style={{ "--d": `${delay + index * 70}ms` } as CSSProperties}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Dietary Guide on ${social.name} (opens in a new tab)`}
              className="dg-links-social"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default SocialLinks;
