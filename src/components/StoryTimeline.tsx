import { content } from "../data/anniversaryContent";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";

export default function StoryTimeline() {
  return (
    <section id="timeline" className="section section--ivory" aria-labelledby="timeline-title">
      <header className="section__head">
        <Reveal as="h2" className="display" >
          <span id="timeline-title">{content.timeline.heading}</span>
        </Reveal>
        <Reveal as="p" className="lede" delay={0.1}>
          {content.timeline.subtitle}
        </Reveal>
      </header>
      <ol className="timeline">
        {content.timelineEvents.map((ev, i) => (
          <li key={i} className="timeline__item">
            <span className="timeline__marker" aria-hidden="true">
              {ev.detail}
            </span>
            <Reveal className="timeline__card">
              <p className="timeline__date script">{ev.date}</p>
              <h3>{ev.title}</h3>
              <p>{ev.description}</p>
              {ev.photo ? (
                <div className="timeline__photo">
                  <SafeImage file={ev.photo} alt={ev.title} />
                </div>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
