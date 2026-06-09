import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface Demo {
  src: string; // path to an HTML file, e.g. "/demos/layered-wave-hero.html"
  title: string;
  poster?: string; // static image shown for cards behind the front one
}

const OX = 24; // horizontal offset per card behind
const OY = 16; // vertical offset per card behind
const MAX_BEHIND = 3; // how many cards peek behind the front

function Card({
  demo,
  p,
  shift,
  active,
  reduce,
  onSelect,
}: {
  demo: Demo;
  p: number; // stack position: 0 = front, 1 = next behind, ...
  shift: number;
  active: boolean;
  reduce: boolean | null;
  onSelect: () => void;
}) {
  const [hover, setHover] = useState(false);
  const visible = p <= MAX_BEHIND;

  const x = (p - shift / 2) * OX;
  const y = (p - shift / 2) * OY;
  const scale = (1 - p * 0.05) * (active && hover && !reduce ? 1.02 : 1);
  const opacity = p === 0 ? 1 : Math.max(0.95 - p * 0.22, 0);

  return (
    <motion.div
      className="absolute inset-0 m-auto"
      style={{
        width: "100%",
        height: "100%",
        zIndex: 100 - p,
        pointerEvents: visible ? "auto" : "none",
      }}
      animate={{ x, y, scale, opacity }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 110, damping: 20, mass: 1.1 }
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={active ? undefined : onSelect}
    >
      <div
        className={`relative h-full overflow-hidden rounded-2xl border border-[#ddd2bb] bg-[#f9f3e6] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] ${
          active ? "" : "cursor-pointer"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#ddd2bb] bg-[#efe6d2] px-4 py-2.5">
          <span className="font-[IBM_Plex_Mono] text-[11px] text-[#9a8e7a]">
            {demo.title}
          </span>
          <a
            href={demo.src}
            target="_blank"
            rel="noreferrer"
            className="font-[IBM_Plex_Mono] text-[10px] text-[#9a8e7a] transition-colors hover:text-[#1c1812]"
          >
            open ↗
          </a>
        </div>

        <div className="relative h-[calc(100%-41px)] bg-[#f4ede0]">
          {active ? (
            <iframe
              src={demo.src}
              title={demo.title}
              loading="lazy"
              className="h-full w-full border-0"
            />
          ) : demo.poster ? (
            <img
              src={demo.poster}
              alt={demo.title}
              className="h-full w-full object-cover"
            />
          ) : null}

          {!active && (
            <div className="absolute inset-0 flex items-end justify-end p-3">
              <span className="rounded-full border border-[#d8cdb5] bg-white/85 px-3 py-1 font-[IBM_Plex_Mono] text-[10px] text-[#6f685c]">
                click to view
              </span>
            </div>
          )}

          {active && hover && !reduce && (
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-[#1c1812]/80 px-3 py-1 font-[IBM_Plex_Mono] text-[10px] text-[#f1e9d9]">
              interactive ↗
            </span>
          )}
        </div>

        {/* chromatic edge fringe — on the frame, since we can't reach inside the iframe */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow:
              "inset 3px 0 12px rgba(122,86,232,.10), inset -3px 0 12px rgba(235,86,148,.10), inset 0 3px 12px rgba(46,166,235,.06), inset 0 -3px 12px rgba(46,166,235,.06)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function DemoCarousel({ demos }: { demos: Demo[] }) {
  const [index, setIndex] = useState(0);
  const [w, setW] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const n = demos.length;
  const shift = Math.min(n - 1, MAX_BEHIND);
  const cardW = Math.min(Math.max(w * 0.82, 260), 860);
  const cardH = cardW * 0.64;
  const deckH = cardH + shift * OY + 40;
  const go = (i: number) => setIndex(((i % n) + n) % n);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative mx-auto" style={{ width: cardW, height: deckH }}>
        {demos.map((d, i) => {
          const p = (i - index + n) % n;
          return (
            <Card
              key={d.src}
              demo={d}
              p={p}
              shift={shift}
              active={p === 0}
              reduce={reduce}
              onSelect={() => go(i)}
            />
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {demos.map((_, i) => (
          <button
            key={i}
            aria-label={`go to demo ${i + 1}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === index ? "w-6 bg-[#1c1812]" : "w-1.5 bg-[#c9bfa9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
