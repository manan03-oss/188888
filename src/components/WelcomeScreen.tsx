import { useEffect, useRef, useState } from "react";
import { content } from "../data/anniversaryContent";
import Envelope from "./Envelope";
import Particles from "./Particles";
import HeartBurst from "./HeartBurst";
import { usePrefersReducedMotion } from "../hooks/hooks";

export default function WelcomeScreen({ onOpen }: { onOpen: () => void }) {
  const w = content.welcome;
  const reduced = usePrefersReducedMotion();
  const [opening, setOpening] = useState(false);
  const [burst, setBurst] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    return () => window.clearTimeout(timer.current);
  }, []);

  const start = () => {
    if (opening) return;
    setOpening(true);
    setBurst((b) => b + 1);
    timer.current = window.setTimeout(onOpen, reduced ? 350 : 2300);
  };

  return (
    <section className={`welcome ${opening ? "is-opening" : ""}`} aria-labelledby="welcome-title">
      <div className="welcome__light" aria-hidden="true" />
      <Particles count={20} />
      <div className="welcome__inner">
        <p className="welcome__dedication fade" style={{ ["--d" as string]: "0.4s" }}>
          {w.dedication}
        </p>
        <h1 id="welcome-title" ref={headingRef} tabIndex={-1} className="welcome__title fade" style={{ ["--d" as string]: "1.4s" }}>
          {w.title}
        </h1>
        <p className="welcome__quote fade" style={{ ["--d" as string]: "2.6s" }}>
          {w.quote[0]}
          <br />
          {w.quote[1]}
        </p>
        <p className="welcome__greeting script fade" style={{ ["--d" as string]: "3.6s" }}>
          {w.greeting}
        </p>

        <div className="welcome__stage fade" style={{ ["--d" as string]: "4.4s" }}>
          <div className="welcome__envelope">
            <Envelope open={opening} label={w.envelopeLabel} onClick={start}>
              <div className="env-lines">
                <i /> <i /> <i /> <i />
              </div>
            </Envelope>
            <HeartBurst burstKey={burst} mode="rise" count={14} />
          </div>
          <button type="button" className="btn btn--primary" onClick={start} disabled={opening}>
            {w.button}
          </button>
        </div>
      </div>
    </section>
  );
}
