import type { ReactNode } from "react";

interface Props {
  open: boolean;
  /** Handwritten label on the front of the envelope. */
  label?: string;
  /** What slides out of the envelope. */
  children?: ReactNode;
  size?: "large" | "small";
  onClick?: () => void;
}

/** Pure CSS envelope. The flap rotates open, the paper slides up. */
export default function Envelope({ open, label, children, size = "large", onClick }: Props) {
  return (
    <div className={`envelope envelope--${size} ${open ? "is-open" : ""}`} onClick={onClick} aria-hidden={size === "large" ? "true" : undefined}>
      <div className="env-back" />
      <div className="env-paper">{children}</div>
      <div className="env-front" />
      {label && <div className="env-label script">{label}</div>}
      <div className="env-flap" />
      <div className="env-seal">
        <span>♥</span>
      </div>
    </div>
  );
}
