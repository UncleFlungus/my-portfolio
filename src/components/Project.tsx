import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Project } from "./projects";
import { DemoCarousel } from "./DemoCarousel";
const EASE = [0.22, 1, 0.36, 1] as const;

function MediaFrame({ project }: { project: Project }) {
  const { kind, media, title, links } = project;

  const inner =
    media.type === "video" ? (
      <video
        className="block w-full"
        src={media.src}
        poster={media.poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    ) : (
      <img
        className="block w-full"
        src={media.src}
        alt={title}
        loading="lazy"
      />
    );

  const shell =
    "overflow-hidden rounded-2xl border border-[#ddd2bb] bg-[#f9f3e6] shadow-[0_24px_60px_-34px_rgba(0,0,0,0.45)]";

  if (kind === "design") {
    return <div className={shell}>{inner}</div>;
  }

  const url = links.live?.replace(/^https?:\/\//, "") ?? title.toLowerCase();
  return (
    <div className={shell}>
      <div className="flex items-center gap-1.5 border-b border-[#ddd2bb] bg-[#efe6d2] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#cfc4a8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#cfc4a8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#cfc4a8]" />
        <span className="ml-3 font-[IBM_Plex_Mono] text-[11px] text-[#9a8e7a]">
          {url}
        </span>
      </div>
      {inner}
    </div>
  );
}

export function ProjectRow({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [30, -30],
  );

  const reveal = {
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-9 md:items-center md:gap-16 ${flip ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <motion.div
        className="md:w-[58%]"
        style={{ y: mediaY }}
        {...reveal}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {project.demos ? (
          <DemoCarousel demos={project.demos} />
        ) : (
          <MediaFrame project={project} />
        )}{" "}
      </motion.div>

      <motion.div
        className="md:w-[42%]"
        {...reveal}
        transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
      >
        <div className="mb-3 flex items-center gap-3 font-[IBM_Plex_Mono] text-[11px] tracking-[0.18em] text-[#9a9286]">
          <span>{project.index}</span>
          <span className="h-px w-6 bg-[#d8cdb5]" />
          <span>{project.category}</span>
        </div>

        <h3 className="font-[Fraunces] text-[34px] font-light leading-tight text-[#1c1812]">
          {project.title}
        </h3>
        <p className="mt-2 font-[Fraunces] text-[16px] italic text-[#6f685c]">
          {project.mantra}
        </p>
        <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-[#5f5747]">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded bg-[#ece2cc]/70 px-2.5 py-1 font-[IBM_Plex_Mono] text-[11px] tracking-wide text-[#6f685c]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-5 text-[13px] text-[#1c1812]">
          {project.links.live && (
            <a
              href={project.links.live}
              className="border-b border-[#1c1812]/30 pb-0.5 transition-colors hover:border-[#1c1812]"
            >
              live ↗
            </a>
          )}
          {project.links.source && (
            <a
              href={project.links.source}
              className="border-b border-[#1c1812]/30 pb-0.5 transition-colors hover:border-[#1c1812]"
            >
              source ↗
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
