import { useState } from "react";
import type { CSSProperties } from "react";
import { asset } from "../data/dates";

interface Props {
  file: string;
  alt: string;
  /** CSS object-position. Layout only; the file itself is never modified. */
  position?: string;
  fit?: "cover" | "contain";
  lazy?: boolean;
  className?: string;
}

/** Shows the real photo, or a tasteful placeholder if the file is missing. */
export default function SafeImage({ file, alt, position = "center", fit = "cover", lazy = true, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  if (!file || failed) {
    return (
      <div className={`photo-placeholder ${className}`} role="img" aria-label="A photo will go here">
        <span aria-hidden="true">♡</span>
        <small>A photo will go here</small>
        {import.meta.env.DEV && file ? <code>public/images/{file}</code> : null}
      </div>
    );
  }
  const style: CSSProperties = { objectFit: fit, objectPosition: position };
  return (
    <img
      className={className}
      src={asset(`images/${file}`)}
      alt={alt}
      style={style}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
