import { useId, type ReactNode } from "react";
import "./enso.css";

export type EnsoVariant = "glow" | "lens" | "mark";

export interface EnsoProps {
  /** glow = animated hero centerpiece, lens = frame content inside the O, mark = small static glyph */
  variant?: EnsoVariant;
  /** rendered size in px (always square) */
  size?: number;
  /** opening of the brush stroke as a fraction of the circumference (0–0.3) */
  gap?: number;
  className?: string;
  /** lens variant only: the image / content framed inside the ring */
  children?: ReactNode;
  /** disable motion (also respected via prefers-reduced-motion) */
  animate?: boolean;
  /** accessible label */
  label?: string;
}

const R = 40;
const C = 2 * Math.PI * R;

export function Enso({
  variant = "mark",
  size = 120,
  gap = 0.12,
  className = "",
  children,
  animate = true,
  label,
}: EnsoProps) {
  const id = useId();
  const rough = `${id}-rough`;
  const chroma = `${id}-chroma`;
  const warm = `${id}-warm`;
  const cool = `${id}-cool`;
  const clip = `${id}-clip`;

  const gapLen = Math.min(Math.max(gap, 0), 0.3) * C;
  const dash = `${C - gapLen} ${gapLen}`;
  const strokeW = variant === "mark" ? 5 : 7;
  const move = animate && variant === "glow";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={label ?? "ensō"}
      className={className}
    >
      <defs>
        <filter id={rough}>
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={chroma} x="-25%" y="-25%" width="150%" height="150%">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
          <feOffset in="r" dx="0.9" result="ro" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
          <feOffset in="b" dx="-0.9" dy="0.3" result="bo" />
          <feBlend mode="screen" in="ro" in2="SourceGraphic" result="m" />
          <feBlend mode="screen" in="m" in2="bo" />
        </filter>
        <radialGradient id={warm} cx="46%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#ffdcc4" />
          <stop offset="45%" stopColor="#f4b3c8" />
          <stop offset="100%" stopColor="#e6a4c1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={cool} cx="46%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#dcebf7" />
          <stop offset="45%" stopColor="#cbd0f0" />
          <stop offset="100%" stopColor="#c1bdec" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <circle cx="50" cy="50" r="37" />
        </clipPath>
      </defs>

      {variant === "glow" && (
        <g filter={`url(#${chroma})`} className={animate ? "enso-breathe" : undefined}>
          <circle cx="50" cy="50" r="37" fill={`url(#${cool})`} className={animate ? "enso-cool" : undefined} />
          <circle cx="50" cy="50" r="37" fill={`url(#${warm})`} className={animate ? "enso-warm" : undefined} />
        </g>
      )}

      {variant === "lens" && children && (
        <g filter={`url(#${chroma})`}>
          <foreignObject x="13" y="13" width="74" height="74" clipPath={`url(#${clip})`}>
            <div className="enso-lens-content">{children}</div>
          </foreignObject>
        </g>
      )}

      <g filter={`url(#${rough})`} className={move ? "enso-sway" : undefined}>
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="#241f19"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={dash}
          strokeDashoffset={-C * 0.04}
        />
      </g>
    </svg>
  );
}
