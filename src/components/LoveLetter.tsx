import { forwardRef } from "react";
import { content } from "../data/anniversaryContent";
import Reveal from "./Reveal";

interface Props {
  onContinue: () => void;
}

const LoveLetter = forwardRef<HTMLHeadingElement, Props>(function LoveLetter({ onContinue }, headingRef) {
  return (
    <section id="letter" className="section section--dark letter" aria-labelledby="letter-title">
      <div className="paper">
        <h2 id="letter-title" ref={headingRef} tabIndex={-1} className="sr-only">
          A letter for {content.girlfriendName}
        </h2>
        {content.loveLetter.map((p, i) => {
          const isFirst = i === 0;
          return (
            <Reveal as="p" key={i} className={`paper__p ${isFirst ? "paper__p--first" : ""}`} delay={i < 2 ? i * 0.35 : 0}>
              {p}
            </Reveal>
          );
        })}
        <Reveal className="paper__sign">
          <p>{content.letterSignOff}</p>
          <p className="script paper__signature">{content.letterSignature}</p>
        </Reveal>
      </div>
      <Reveal className="center">
        <button type="button" className="btn btn--primary" onClick={onContinue}>
          {content.letterButton}
        </button>
      </Reveal>
    </section>
  );
});

export default LoveLetter;
