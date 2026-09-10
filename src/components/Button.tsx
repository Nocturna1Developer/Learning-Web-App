import { useRef, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  /** in-app route — rendered as a router Link */
  to?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
  arrow?: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Magnetic button — leans gently toward the cursor, snaps back on leave.
 */
export function Button({ children, href, to, variant = "primary", onClick, className = "", arrow = true }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const cls = `btn ${variant === "ghost" ? "btn--ghost" : ""} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && (
        <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {inner}
    </button>
  );
}
