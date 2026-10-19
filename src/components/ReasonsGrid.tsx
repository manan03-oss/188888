import { useState } from "react";
import { content } from "../data/anniversaryContent";
import Reveal from "./Reveal";

export default function ReasonsGrid() {
  const { reasons, reasonsSection: rs } = content;
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const allDone = revealed.size >= reasons.length;

  const reveal = (i: number) => setRevealed((s) => (s.has(i) ? s : new Set(s).add(i)));

  const another = () => {
    if (allDone) {
      setRevealed(new Set());
      return;
    }
    const left = reasons.map((_, i) => i).filter((i) => !revealed.has(i));
    reveal(left[Math.floor(Math.random() * left.length)]);
  };

  return (
    <section id="reasons" className="section section--ivory" aria-labelledby="reasons-title">
      <header className="section__head">
        <Reveal as="h2" className="display">
          <span id="reasons-title">{rs.heading}</span>
        </Reveal>
        <Reveal as="p" className="lede" delay={0.1}>
          Tap a card to open it.
        </Reveal>
      </header>

      <ul className="reasons">
        {reasons.map((r, i) => {
          const isOpen = revealed.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                className={`reason ${isOpen ? "is-flipped" : ""}`}
                aria-pressed={isOpen}
                aria-label={isOpen ? r : `Reveal reason ${i + 1} of ${reasons.length}`}
                onClick={() => reveal(i)}
              >
                <span className="reason__face reason__front" aria-hidden={isOpen}>
                  <span className="reason__heart">♥</span>
                </span>
                <span className="reason__face reason__back" aria-hidden={!isOpen}>
                  {r}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="center stack">
        <button type="button" className="btn btn--primary" onClick={another}>
          {allDone ? rs.buttonAgain : rs.button}
        </button>
        <p className="muted" aria-live="polite">
          {revealed.size} of {reasons.length} opened
        </p>
      </div>
    </section>
  );
}
