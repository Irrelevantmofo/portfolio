import type { ToolIcon } from "@/data/tools";
import { asset } from "@/lib/asset";
import { brand, symbolId } from "./icon-registry.mjs";

/** Lift near-black brand colors so they stay visible on the dark theme. */
function displayHex(hex: string): string {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 60 ? "#ffffff" : `#${hex}`;
}

export function iconColor(icon: ToolIcon): string | undefined {
  if (!icon.startsWith("si:")) return undefined;
  const b = brand[icon.slice(3) as keyof typeof brand];
  return b ? displayHex(b.hex) : undefined;
}

/** References a symbol in public/icons.svg (built by scripts/build-icon-sprite.mjs). */
export function ToolIconSvg({ icon, className = "size-4" }: { icon: ToolIcon; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`${asset("/icons.svg")}#${symbolId(icon)}`} />
    </svg>
  );
}
