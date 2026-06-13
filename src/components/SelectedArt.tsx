import { motion, useReducedMotion } from "motion/react";
import { Enso } from "./Enso";

export interface Artwork {
  src: string;
  title: string;
  caption?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

// swap for your real pieces in /public/art
const artworks: Artwork[] = [
  { src: "/art/2026_03_02.jpg", title: "untitled — character study", caption: "ink & digital, 2026" },
  { src: "/art/2026_03_11.jpg", title: "oni", caption: "personal work, 2026" },
  { src: "/art/2026_05_18.jpg", title: "in motion", caption: "sakuga study, 2026" },
];

// where "view all" goes for now — your real archive lives on socials
const ALL_ART_URL = "https://www.instagram.com/uncleflungus/";

export function SelectedArt({ items = artworks }: { items?: Artwork[] }) {
  const reduce = useReducedMotion();

  return (
    <section id="art" className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
      <header className="mb-16 flex items-center gap-4">
        <Enso variant="mark" size={26} animate={false} />
        <h2 className="font-[Fraunces] text-[clamp(28px,4vw,40px)] font-light text-[#1c1812]">
          selected art
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-10">
        {items.map((art, i) => (
          <motion.figure
            key={art.src}
            className="group relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <img
              src={art.src}
              alt={art.title}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/55 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-[Fraunces] text-[15px] italic text-white">{art.title}</p>
              {art.caption && (
                <p className="mt-0.5 font-[IBM_Plex_Mono] text-[10px] tracking-[0.08em] text-white/75">
                  {art.caption}
                </p>
              )}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={ALL_ART_URL}
          target="_blank"
          rel="noreferrer"
          className="border-b border-[#1c1812]/30 pb-0.5 text-[14px] tracking-[0.01em] text-[#1c1812] transition-colors hover:border-[#1c1812]"
        >
          view all artworks
        </a>
      </div>
    </section>
  );
}
