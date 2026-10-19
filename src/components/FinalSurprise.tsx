import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { content } from "../data/anniversaryContent";
import HeartBurst from "./HeartBurst";
import Particles from "./Particles";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/hooks";

export default function FinalSurprise({ onReplay }: { onReplay: () => void }) {
  const f = content.final;
  const reduced = usePrefersReducedMotion();
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(0);
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return;
    heartRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    const t = window.setTimeout(() => setBurst((b) => b + 1), reduced ? 0 : 900);
    return () => window.clearTimeout(t);
  }, [opened, reduced]);

  const lastDelay = 1.4 + content.finalMessage.length * 0.9;

  return (
    <section id="final" className={`section section--final ${opened ? "is-opened" : ""}`} aria-labelledby="final-title">
      <div className="final__light" aria-hidden="true" />
      <Particles count={14} />

      {!opened && (
        <div className="final__intro">
          <Reveal as="p" className="final__before">
            {f.before}
          </Reveal>
          <Reveal as="p" className="final__lede" delay={0.7}>
            {f.oneLast}
          </Reveal>
          <Reveal delay={1.2}>
            <button type="button" className="btn btn--primary" onClick={() => setOpened(true)}>
              {f.button}
            </button>
          </Reveal>
        </div>
      )}

      {opened && (
        <div className="final__reveal">
          <div className="glow-heart" ref={heartRef} aria-hidden="true">
            <svg viewBox="0 0 32 29" width="64" height="58">
              <path
                d="M23.6 0c-3.4 0-5.7 1.9-7.6 4.2C14.1 1.9 11.8 0 8.4 0 3.6 0 0 3.8 0 8.6c0 7.6 8.8 12.2 14.6 19.4.6.7 1.2 1 1.4 1s.8-.3 1.4-1C23.2 20.8 32 16.2 32 8.6 32 3.8 28.4 0 23.6 0z"
                fill="currentColor"
              />
            </svg>
            <HeartBurst burstKey={burst} mode="burst" count={20} />
          </div>

          <div className="final__message">
            {content.finalMessage.map((p, i) => (
              <p
                key={i}
                className={`final__p ${i === 0 || i === content.finalMessage.length - 1 ? "final__p--strong" : ""}`}
                style={{ "--i": i } as CSSProperties}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="final__end" style={{ "--end": `${lastDelay}s` } as CSSProperties}>
            <h2 id="final-title" className="final__title">
              {f.title}
            </h2>
            <p className="final__subtitle script">{f.subtitle}</p>
            <button type="button" className="btn btn--ghost" onClick={onReplay}>
              {f.replay}
            </button>
          </div>
        </div>
      )}
      {!opened && <h2 id="final-title" className="sr-only">{f.title}</h2>}
    </section>
  );
}
