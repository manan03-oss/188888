import { useState } from "react";
import { content } from "../data/anniversaryContent";
import Envelope from "./Envelope";
import Reveal from "./Reveal";

export default function HiddenMessages() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  return (
    <section id="hidden" className="section section--ivory" aria-labelledby="hidden-title">
      <header className="section__head">
        <Reveal as="h2" className="display">
          <span id="hidden-title">{content.hidden.heading}</span>
        </Reveal>
      </header>
      <ul className="notes">
        {content.hiddenMessages.map((m, i) => {
          const isOpen = open.has(i);
          const panelId = `note-${i}`;
          return (
            <li key={i} className="note">
              <button type="button" className="note__btn" onClick={() => toggle(i)} aria-expanded={isOpen} aria-controls={panelId}>
                <Envelope open={isOpen} size="small" />
                <span className="note__label">{m.label}</span>
              </button>
              <div id={panelId} className={`note__panel ${isOpen ? "is-open" : ""}`} role="region" aria-label={m.label}>
                <div>
                  <p>{m.message}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
