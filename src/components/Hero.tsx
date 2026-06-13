import { useEffect, useState } from "react";
import { JayKim } from "./JayKim";
import quotes from "./quotes.json";

export function Hero() {
  // one shared "time of day" clock for the whole page, driven by scroll
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const tod = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      document.documentElement.style.setProperty("--tod", tod.toFixed(3));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // pick a fresh quote per page load, stable across re-renders
  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)],
  );

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background:
          "color-mix(in oklch, var(--paper-dusk) calc(var(--tod, 0) * 100%), var(--paper-dawn))",
      }}
    >
      {/* cool neutral grain — felt, not seen */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40 mix-blend-multiply"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#hero-grain)"
          opacity="0.32"
        />
      </svg>

      {/* chromatic edge fringe — thin, edge-anchored, saturated + low alpha (cool left, warm right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[14%] mix-blend-multiply"
        style={{
          background:
            "linear-gradient(to right, rgba(122,86,232,0.10), transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[20%] mix-blend-multiply"
        style={{
          background:
            "linear-gradient(to right, transparent 22%, rgba(46,166,235,0.06) 46%, transparent 82%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[14%] mix-blend-multiply"
        style={{
          background:
            "linear-gradient(to left, rgba(235,86,148,0.10), transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[20%] mix-blend-multiply"
        style={{
          background:
            "linear-gradient(to left, transparent 22%, rgba(46,166,235,0.05) 46%, transparent 82%)",
        }}
      />

      {/* reflective string — leading line. glints travel as you scroll (driven by --tod) */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 680 470"
        preserveAspectRatio="none"
      >
        <path
          d="M -20 360 C 160 150 430 120 710 175"
          fill="none"
          stroke="#bdb6aa"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
        />
        <path
          d="M -20 360 C 160 150 430 120 710 175"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="14 64 5 110 9 138"
          opacity="0.9"
          style={{ strokeDashoffset: "calc(var(--tod, 0) * -1200px)" }}
        />
      </svg>

      {/* nav */}
      <nav className="relative z-10 flex items-center justify-between px-7 py-5">
        <a
          href="#"
          className="font-[Fraunces] text-lg tracking-wide text-[#3a322a]"
        >
          ◯
        </a>
        <div className="flex items-center gap-6 text-[14px] text-[#1c1812]">
          <a
            href="#work"
            className="tracking-[0.01em] transition-opacity hover:opacity-60"
          >
            work
          </a>
          <a href="#art" className="tracking-[0.01em] transition-opacity hover:opacity-60">art</a>
          <a
            href="#contact"
            className="tracking-[0.01em] transition-opacity hover:opacity-60"
          >
            contact
          </a>
        </div>
      </nav>

      {/* side labels */}
      <span className="absolute left-4.5 top-1/2 z-2 -translate-y-1/2 font-[IBM_Plex_Mono] text-[10px] tracking-[0.24em] text-[#b3aca0] [writing-mode:vertical-rl]">
        VOL. 01 — DAWN
      </span>
      <span className="absolute right-4.5 top-1/2 z-2 -translate-y-1/2 font-[IBM_Plex_Mono] text-[10px] tracking-[0.24em] text-[#b3aca0] [writing-mode:vertical-rl]">
        SELECTED WORK
      </span>

      {/* focal block */}
      <div className="relative z-2 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <p className="mb-7 text-[12.5px] uppercase tracking-[0.13em] text-[#8c8478]">
          artist · software engineer · ui/ux · Game Dev · graphic design
        </p>
        <JayKim className="text-[68px]" />
        <p className="mt-3.5 text-[13px] tracking-wide text-[#9a9286]">
          legally Juhyun Kim
        </p>
      </div>

      {/* rotating quote */}
      <div className="absolute bottom-12 left-0 right-0 z-2 px-10 text-center">
        <p className="font-[Fraunces] text-[16px] font-light italic leading-snug text-[#4a443b]">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-2 font-[IBM_Plex_Mono] text-[11px] tracking-[0.08em] text-[#9a9286]">
          — {quote.by}
        </p>
      </div>
    </section>
  );
}
