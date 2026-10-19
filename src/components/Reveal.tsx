import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/hooks";

interface Props {
  as?: ElementType;
  className?: string;
  delay?: number; // seconds
  children: ReactNode;
}

/** Fades content in once, the first time it scrolls into view. */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children }: Props) {
  const { ref, visible } = useReveal<HTMLElement>();
  const style = { "--delay": `${delay}s` } as CSSProperties;
  return (
    <Tag ref={ref} style={style} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
