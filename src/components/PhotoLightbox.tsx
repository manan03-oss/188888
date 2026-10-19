import { useEffect, useRef } from "react";
import type { PhotoEntry } from "../data/anniversaryContent";
import SafeImage from "./SafeImage";

interface Props {
  photos: PhotoEntry[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}

/** Full, uncropped photo viewer. Esc closes, arrows navigate, swipe works on touch. */
export default function PhotoLightbox({ photos, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const photo = photos[index];

  const prev = () => onChange((index - 1 + photos.length) % photos.length);
  const next = () => onChange((index + 1) % photos.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const nodes = document.querySelectorAll<HTMLElement>(".lightbox button");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!photo) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || photos.length < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 60) (dx > 0 ? prev : next)();
      }}
    >
      <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close photo viewer">
        ✕
      </button>
      <figure className="lightbox__figure">
        <div className="lightbox__img">
          <SafeImage key={photo.file} file={photo.file} alt={photo.alt} fit="contain" lazy={false} />
        </div>
        <figcaption>{photo.caption}</figcaption>
      </figure>
      {photos.length > 1 && (
        <>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous photo">
            ‹
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next photo">
            ›
          </button>
        </>
      )}
    </div>
  );
}
