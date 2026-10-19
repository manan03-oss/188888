import { useMemo } from "react";
import type { CSSProperties } from "react";

/** A small number of slow, soft floating specks. Decorative only. */
export default function Particles({ count = 18 }: { count?: number }) {
  const specks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        dur: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
        drift: (Math.random() - 0.5) * 60,
        o: 0.25 + Math.random() * 0.45,
      })),
    [count],
  );
  return (
    <div className="particles" aria-hidden="true">
      {specks.map((s) => (
        <span
          key={s.id}
          style={
            {
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              "--drift": `${s.drift}px`,
              "--o": s.o,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
