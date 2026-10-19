import { useCallback, useEffect, useRef, useState } from "react";
import { content } from "./data/anniversaryContent";
import { wholeYearsBetween } from "./data/dates";
import { usePrefersReducedMotion } from "./hooks/hooks";
import WelcomeScreen from "./components/WelcomeScreen";
import LoveLetter from "./components/LoveLetter";
import StoryTimeline from "./components/StoryTimeline";
import MemoryGallery from "./components/MemoryGallery";
import ReasonsGrid from "./components/ReasonsGrid";
import PromisesSection from "./components/PromisesSection";
import AnniversaryCountdown from "./components/AnniversaryCountdown";
import HiddenMessages from "./components/HiddenMessages";
import FinalSurprise from "./components/FinalSurprise";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [stage, setStage] = useState<"welcome" | "story">("welcome");
  const [runKey, setRunKey] = useState(0);
  const reduced = usePrefersReducedMotion();
  const letterHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const yrs = wholeYearsBetween(content.relationshipStartDate, content.anniversaryDate);
      if (yrs !== 2) {
        console.warn(
          `[anniversary] relationshipStartDate and anniversaryDate are ${yrs === null ? "not a whole number of" : yrs} years apart. Check src/data/anniversaryContent.ts if that's not intended.`,
        );
      }
    }
  }, []);

  const enter = useCallback(() => {
    setStage("story");
    window.scrollTo({ top: 0, behavior: "auto" });
    window.setTimeout(() => letterHeading.current?.focus({ preventScroll: true }), 50);
  }, []);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    // Let the scroll start, then reset everything (all component state is rebuilt via runKey).
    window.setTimeout(
      () => {
        setStage("welcome");
        setRunKey((k) => k + 1);
        window.scrollTo({ top: 0, behavior: "auto" });
      },
      reduced ? 0 : 700,
    );
  }, [reduced]);

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to the story
      </a>
      <main id="main" key={runKey}>
        {stage === "welcome" ? (
          <WelcomeScreen onOpen={enter} />
        ) : (
          <div className="story">
            <LoveLetter ref={letterHeading} onContinue={() => goTo("timeline")} />
            <StoryTimeline />
            <MemoryGallery />
            <ReasonsGrid />
            <PromisesSection />
            <AnniversaryCountdown />
            <HiddenMessages />
            <FinalSurprise onReplay={replay} />
          </div>
        )}
      </main>
      {stage === "story" && <MusicPlayer key={`m-${runKey}`} />}
    </div>
  );
}
