import { Link } from "@tanstack/react-router";
import type { Locale } from "@/i18n";

/** Logo placeholder — replace the square mark with the real logo when available. */
export function Logo({ lang, inverted = false }: { lang: Locale; inverted?: boolean }) {
  return (
    <Link to="/$lang" params={{ lang }} className="flex items-center gap-3" aria-label="People for Ukraine — Home">
      <span
        className={`grid size-10 place-items-center rounded-lg border-2 border-dashed text-[10px] font-bold ${
          inverted ? "border-primary-foreground/50 text-primary-foreground/70" : "border-primary/40 text-primary/70"
        }`}
        title="Logo placeholder"
      >
        LOGO
      </span>
      <span className={`font-display text-sm font-semibold leading-tight ${inverted ? "text-primary-foreground" : "text-primary-deep"}`}>
        People for
        <br />
        Ukraine
      </span>
    </Link>
  );
}
