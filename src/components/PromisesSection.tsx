import { content } from "../data/anniversaryContent";
import Reveal from "./Reveal";

export default function PromisesSection() {
  const s = content.promisesSection;
  return (
    <section id="promises" className="section section--dark" aria-labelledby="promises-title">
      <header className="section__head">
        <Reveal as="h2" className="display">
          <span id="promises-title">{s.heading}</span>
        </Reveal>
      </header>
      <ul className="promises">
        {content.promises.map((p, i) => (
          <li key={i}>
            <Reveal className="promise" delay={0.05}>
              <span className="promise__heart" aria-hidden="true">
                ♡
              </span>
              <p>{p}</p>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal as="p" className="promises__close">
        {s.closing}
      </Reveal>
    </section>
  );
}
