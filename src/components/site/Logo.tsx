import { Link } from "@tanstack/react-router";
import type { Locale } from "@/i18n";
import logoAsset from "@/assets/logo.svg.asset.json";
import logoInvertedAsset from "@/assets/logo-inverted.svg.asset.json";

export function Logo({ lang, inverted = false }: { lang: Locale; inverted?: boolean }) {
  return (
    <Link to="/$lang" params={{ lang }} className="flex items-center" aria-label="People for Ukraine — Home">
      <img
        src={inverted ? logoInvertedAsset.url : logoAsset.url}
        alt="People for Ukraine"
        className="h-11 w-auto"
        width={211}
        height={150}
      />
    </Link>
  );
}
