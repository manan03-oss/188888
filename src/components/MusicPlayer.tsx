import { useEffect, useRef, useState } from "react";
import { content } from "../data/anniversaryContent";
import { asset } from "../data/dates";

const VOLUME = 0.4;

/**
 * Optional music. Nothing loads or plays until the person presses play.
 * If the audio file is missing, a short note appears and the site carries on.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = VOLUME;
  }, []);

  useEffect(() => {
    if (!note) return;
    const t = window.setTimeout(() => setNote(null), 9000);
    return () => window.clearTimeout(t);
  }, [note]);

  const missing = () => {
    setPlaying(false);
    setNote("Music isn't set up yet. The story works perfectly without it.");
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    try {
      a.load();
      await a.play();
      setPlaying(true);
      setNote(null);
    } catch {
      missing();
    }
  };

  return (
    <div className="music" role="region" aria-label="Music">
      <audio ref={audioRef} src={asset(content.musicSrc)} preload="none" loop muted={muted} onError={missing} />
      {note && (
        <div className="music__note" role="status">
          <p>{note}</p>
          {content.musicListenUrl && (
            <a href={content.musicListenUrl} target="_blank" rel="noopener noreferrer">
              Listen to {content.musicTitle} ↗
            </a>
          )}
        </div>
      )}
      <div className="music__bar">
        <button type="button" className="music__btn" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"} title={content.musicTitle}>
          {playing ? "❚❚" : "▶"}
        </button>
        <span className={`eq ${playing && !muted ? "is-playing" : ""}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <button type="button" className="music__btn" onClick={() => setMuted((m) => !m)} aria-pressed={muted} aria-label={muted ? "Unmute music" : "Mute music"}>
          {muted ? "🔇" : "🔈"}
        </button>
      </div>
    </div>
  );
}
