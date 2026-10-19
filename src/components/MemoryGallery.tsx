import { useMemo, useState } from "react";
import { content } from "../data/anniversaryContent";
import type { PhotoCategory } from "../data/anniversaryContent";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import PhotoLightbox from "./PhotoLightbox";

type Filter = "all" | PhotoCategory;
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "shreya", label: "Shreya" },
  { id: "together", label: "Together" },
  { id: "memories", label: "Memories" },
];

export default function MemoryGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? content.photos : content.photos.filter((p) => p.category === filter)),
    [filter],
  );
  const available = FILTERS.filter((f) => f.id === "all" || content.photos.some((p) => p.category === f.id));

  return (
    <section id="gallery" className="section section--dark" aria-labelledby="gallery-title">
      <header className="section__head">
        <Reveal as="h2" className="display">
          <span id="gallery-title">{content.gallery.heading}</span>
        </Reveal>
        <Reveal as="p" className="lede" delay={0.1}>
          {content.gallery.subtitle}
        </Reveal>
      </header>

      {available.length > 2 && (
        <div className="filters" role="group" aria-label="Filter photos">
          {available.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`chip ${filter === f.id ? "is-active" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <ul className="scrapbook">
        {shown.map((p, i) => (
          <li key={`${filter}-${p.file}`} className={`scrapbook__item ${i % 5 === 0 ? "is-wide" : ""}`}>
            <Reveal>
              <button
                type="button"
                className="polaroid"
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${p.caption}`}
              >
                <span className="polaroid__img">
                  <SafeImage file={p.file} alt={p.alt} position={p.position} />
                </span>
                <span className="polaroid__caption script">{p.caption}</span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {open !== null && <PhotoLightbox photos={shown} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </section>
  );
}
