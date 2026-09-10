import "./Logo.css";

type LogoProps = {
  /** Show only the mark (no wordmark) */
  markOnly?: boolean;
  size?: number;
  className?: string;
};

/**
 * ROOTS wordmark + mark.
 * The mark is a single seed that branches downward — one origin, many lines,
 * every ending a new beginning. Reads as roots, a family tree, and connection.
 */
export function Logo({ markOnly = false, size = 22, className = "" }: LogoProps) {
  return (
    <span className={`logo ${className}`} style={{ "--logo-size": `${size}px` } as React.CSSProperties}>
      <svg className="logo__mark" viewBox="0 0 24 28" aria-hidden="true">
        <circle cx="12" cy="3.2" r="2.4" fill="currentColor" />
        <path
          d="M12 6.2V10M12 10C12 14 6 13.5 6 18M12 10c0 4 6 3.5 6 8M6 18c0 3-3 3-3 6M6 18c0 3 3 3 3 6M18 18c0 3-3 3-3 6M18 18c0 3 3 3 3 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      {!markOnly && <span className="logo__word">ROOTS</span>}
    </span>
  );
}
