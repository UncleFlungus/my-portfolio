import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

export interface ArtFeatureProps {
  src: string;
  title: string;
  caption?: string;
  href?: string;
}

/**
 * One flat illustration shown full-bleed with parallax — the "movie" vibe from
 * MekaVerse, no 3D required. Later you can split the image into background /
 * subject layers and give each its own `y` range for real depth.
 */
export function ArtFeature({
  src,
  title,
  caption,
  href = "#art",
}: ArtFeatureProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-12%", "12%"],
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0px", "0px"] : ["40px", "-40px"],
  );
  const overlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.34, 0.5]);

  return (
    <section
      ref={ref}
      id="art-feature"
      className="relative h-svh w-full overflow-hidden"
    >
      <motion.img
        src={src}
        alt={title}
        style={{ y: imgY }}
        className="absolute inset-0 h-[124%] w-full object-cover"
      />
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 bg-black"
      />

      <motion.div
        style={{ y: titleY }}
        className="absolute bottom-[12%] left-0 w-full px-8 text-white md:px-16"
      >
        <p className="font-[IBM_Plex_Mono] text-[11px] tracking-[0.2em] opacity-80">
          SELECTED ART
        </p>
        <h2 className="mt-3 font-[Fraunces] text-[clamp(36px,7vw,84px)] font-light leading-none">
          {title}
        </h2>
        {caption && (
          <p className="mt-3 max-w-md text-[14px] leading-relaxed opacity-85">
            {caption}
          </p>
        )}
        <a
          href={href}
          className="mt-6 inline-block border-b border-white/40 pb-0.5 text-[13px] transition-colors hover:border-white"
        >
          view all art ↗
        </a>
      </motion.div>
    </section>
  );
}
