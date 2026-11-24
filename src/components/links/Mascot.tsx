import { useState } from "react";
import { MASCOT } from "@/data/links";

type Stage = "local" | "remote" | "failed";

/**
 * The bunny, framed in a circle. The artwork sits on a pure black ground and its ear
 * tips reach past the inscribed circle, so it is inset on a matching black disc
 * instead of being cropped. The image itself is never stretched or recoloured.
 *
 * Loading order: self-hosted WebP, then the original artwork URL, then a text monogram.
 */
const Mascot = () => {
  const [stage, setStage] = useState<Stage>("local");

  return (
    <div className="dg-links-mascot dg-links-bloom">
      <div className="dg-links-mascot__disc">
        {stage === "failed" ? (
          <span role="img" aria-label={MASCOT.alt} className="dg-links-mascot__monogram">
            DG
          </span>
        ) : (
          <img
            key={stage}
            src={stage === "local" ? MASCOT.src : MASCOT.fallbackSrc}
            srcSet={stage === "local" ? MASCOT.srcSet : undefined}
            sizes={stage === "local" ? "(min-width: 420px) 168px, 40vw" : undefined}
            alt={MASCOT.alt}
            width={512}
            height={512}
            decoding="async"
            draggable={false}
            onError={() => setStage(stage === "local" ? "remote" : "failed")}
            // React 18 only passes this attribute through in lowercase.
            {...{ fetchpriority: "high" }}
          />
        )}
      </div>
    </div>
  );
};

export default Mascot;
