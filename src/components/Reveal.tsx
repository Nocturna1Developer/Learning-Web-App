import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, CSSProperties } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  /** Fraction of the element that must be visible before revealing */
  amount?: number;
  once?: boolean;
};

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  className,
  style,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealLinesProps = {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  id?: string;
};

/**
 * Headline reveal — each line slides up from behind a mask.
 */
export function RevealLines({ lines, className, delay = 0, stagger = 0.09, as: Tag = "h2", id }: RevealLinesProps) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            className="reveal-line__inner"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
