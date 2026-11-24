import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play, ShoppingBag } from "lucide-react";
import type { PrimaryLink, PrimaryLinkIcon } from "@/data/links";
import { GooglePlayIcon } from "./BrandIcons";

const ICONS: Record<PrimaryLinkIcon, ReactNode> = {
  googlePlay: <GooglePlayIcon width={19} height={19} />,
  shoppingBag: <ShoppingBag size={20} strokeWidth={1.9} />,
  play: <Play size={20} strokeWidth={1.9} />,
};

/** One large call-to-action on the link-in-bio page. All sizing lives in `.dg-links-btn`. */
const LinkButton = ({ link }: { link: PrimaryLink }) => {
  const Arrow = link.external ? ArrowUpRight : ArrowRight;
  const className = `dg-links-btn${link.emphasis === "primary" ? " dg-links-btn--primary" : ""}`;

  const content = (
    <>
      <span className="dg-links-btn__icon" aria-hidden="true">
        {ICONS[link.icon]}
      </span>
      <span className="dg-links-btn__label">
        {link.label}
        {(link.description || link.external) && (
          <span className="sr-only">
            {link.description ? ` ${link.description}` : ""}
            {link.external ? " (opens in a new tab)" : ""}
          </span>
        )}
      </span>
      <Arrow className="dg-links-btn__arrow" width={18} height={18} strokeWidth={2} aria-hidden="true" />
    </>
  );

  return (
    <>
      {link.external ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <Link to={link.href} className={className}>
          {content}
        </Link>
      )}
      {link.caption && <p className="dg-links-caption">{link.caption}</p>}
    </>
  );
};

export default LinkButton;
