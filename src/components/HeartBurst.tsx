import { useMemo } from "react";
import type { CSSProperties } from "react";

interface Props {
  /** Change this number to fire a new burst. 0 = nothing. */
  burstKey: number;
  mode?: "rise" | "burst";
  count?: number;
}

/** A restrained handful of hearts. Hidden entirely with reduced motion (via CSS). */
export default function HeartBurst({ burstKey, mode = "rise", count = 16 }: Props) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const dist = 90 + Math.random() * 120;
        return {
          id: i,
          x: mode === "burst" ? Math.cos(angle) * dist : (Math.random() - 0.5) * 220,
          y: mode === "burst" ? Math.sin(angle) * dist - 40 : -(160 + Math.random() * 200),
          size: 10 + Math.random() * 14,
          delay: Math.random() * (mode === "burst" ? 0.25 : 0.9),
          dur: mode === "burst" ? 1.8 + Math.random() * 0.8 : 2.6 + Math.random() * 1.4,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }),
    [burstKey, mode, count],
  );
  if (!burstKey) return null;
  return (
    <div className={`hearts hearts--${mode}`} aria-hidden="true" key={burstKey}>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={
            {
              "--x": `${h.x}px`,
              "--y": `${h.y}px`,
              fontSize: h.size,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.dur}s`,
            } as CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </div>
  );
}
