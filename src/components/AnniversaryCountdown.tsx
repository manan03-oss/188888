import { useEffect, useState } from "react";
import { content } from "../data/anniversaryContent";
import { formatLongDate, getMilestoneState, splitDuration } from "../data/dates";
import { useReveal } from "../hooks/hooks";
import HeartBurst from "./HeartBurst";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

export default function AnniversaryCountdown() {
  const c = content.countdown;
  const [now, setNow] = useState(() => new Date());
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const state = getMilestoneState(content.anniversaryDate, now);

  useEffect(() => {
    // Only tick while the countdown is actually counting.
    if (state.kind !== "future") return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [state.kind]);

  const dateLine = formatLongDate(content.anniversaryDate);
  const parts = state.kind === "future" ? splitDuration(state.msLeft) : null;

  return (
    <section id="countdown" className="section section--deep countdown" aria-labelledby="countdown-title">
      <div className="countdown__glow" aria-hidden="true" />
      <div ref={ref} className="countdown__inner">
        {state.kind === "future" && parts && (
          <>
            <Reveal as="h2" className="display">
              <span id="countdown-title">{c.heading}</span>
            </Reveal>
            <Reveal as="p" className="lede">
              {dateLine}
            </Reveal>
            <div className="clock" role="timer" aria-label={`${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes and ${parts.seconds} seconds until ${dateLine}`}>
              {[
                ["Days", String(parts.days)],
                ["Hours", pad(parts.hours)],
                ["Minutes", pad(parts.minutes)],
                ["Seconds", pad(parts.seconds)],
              ].map(([label, value]) => (
                <div className="clock__cell" key={label}>
                  <span className="clock__num" aria-hidden="true">
                    <span key={label === "Seconds" ? value : "static"} className={label === "Seconds" ? "tick" : ""}>
                      {value}
                    </span>
                  </span>
                  <span className="clock__label" aria-hidden="true">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {state.kind === "today" && (
          <>
            <h2 id="countdown-title" className="display">
              {c.todayTitle}
            </h2>
            <p className="lede">{dateLine}</p>
            <HeartBurst burstKey={visible ? 1 : 0} mode="burst" count={22} />
          </>
        )}

        {(state.kind === "past" || state.kind === "invalid") && (
          <>
            <h2 id="countdown-title" className="display">
              {c.pastTitle}
            </h2>
            {state.kind === "past" && <p className="lede">{dateLine}</p>}
          </>
        )}
      </div>
    </section>
  );
}
