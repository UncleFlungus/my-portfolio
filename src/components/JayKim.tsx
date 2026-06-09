import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import "./jaykim.css";

export interface JayKimProps {
  text?: string;
  className?: string;
  /** soft pastel fringe: [rose, periwinkle] */
  colors?: [string, string];
}

/** The four "water" knobs. Lower stiffness + higher mass = heavier, more syrupy drag. */
const WATER = { stiffness: 90, damping: 22, mass: 1.4 } as const;

function prefersLite() {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData) || (navigator.hardwareConcurrency ?? 8) <= 2;
}

export function JayKim({
  text = "Jay Kim",
  className = "",
  colors = ["#f2a6c0", "#a9c5ef"],
}: JayKimProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [lite, setLite] = useState(false);
  useLayoutEffect(() => setLite(prefersLite()), []);
  const still = reduce || lite;

  // raw target in element-local px; the springs trail behind it — that lag IS the water
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const intent = useMotionValue(0); // 0 at rest, 1 while hovered

  const mx = useSpring(px, WATER);
  const my = useSpring(py, WATER);
  const ti = useSpring(intent, { stiffness: 120, damping: 26, mass: 1 });

  // speed-driven wake: whip the cursor across and the split widens, then settles
  const vx = useVelocity(mx);
  const vy = useVelocity(my);
  const speed = useTransform([vx, vy], ([a, b]: number[]) => Math.min(Math.hypot(a, b) / 1100, 1));
  const speedS = useSpring(speed, { stiffness: 200, damping: 30 });

  // 0.42 baseline = the resting "balloon": the fringe never fully vanishes
  const opacity = useTransform(ti, [0, 1], [0.42, 0.92]);
  const split = useTransform([ti, speedS], ([t, s]: number[]) => 2.4 + t * 1.1 + s * 3.2);
  const splitNeg = useTransform(split, (v) => -v);

  // clean hole tracks the cursor; fringe radiates outward from it
  const mask = useMotionTemplate`radial-gradient(circle at ${mx}px ${my}px, transparent 0px, transparent 20px, #000 78px)`;

  const recenter = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(r.width / 2);
    py.set(r.height / 2);
  };

  // park the hole at center on mount + resize so the resting state is symmetric
  useLayoutEffect(() => {
    recenter();
    window.addEventListener("resize", recenter);
    return () => window.removeEventListener("resize", recenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };

  if (still) {
    // calm fallback for reduced-motion / weak devices: static pastel edge fringe, zero animation
    const edge = "linear-gradient(90deg,#000,transparent 36%,transparent 64%,#000)";
    return (
      <span ref={ref} className={`jk ${className}`} aria-label={text}>
        <span aria-hidden className="jk-ly" style={{ color: colors[0], transform: "translateX(-2.4px)", opacity: 0.4, WebkitMaskImage: edge, maskImage: edge }}>
          {text}
        </span>
        <span aria-hidden className="jk-ly" style={{ color: colors[1], transform: "translateX(2.4px)", opacity: 0.4, WebkitMaskImage: edge, maskImage: edge }}>
          {text}
        </span>
        {text}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={`jk ${className}`}
      aria-label={text}
      onPointerEnter={() => intent.set(1)}
      onPointerMove={onMove}
      onPointerLeave={() => {
        intent.set(0);
        recenter();
      }}
    >
      <motion.span aria-hidden className="jk-ly" style={{ color: colors[0], x: splitNeg, opacity, WebkitMaskImage: mask, maskImage: mask }}>
        {text}
      </motion.span>
      <motion.span aria-hidden className="jk-ly" style={{ color: colors[1], x: split, opacity, WebkitMaskImage: mask, maskImage: mask }}>
        {text}
      </motion.span>
      {text}
    </span>
  );
}
