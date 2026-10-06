export interface Pt {
  x: number;
  y: number;
}

export interface EdgeGeometry {
  d: string;
  mid: Pt;
}

/**
 * Port-to-port path between two node boxes (centers a/b, size w×h).
 * Same row → straight horizontal; same column → straight vertical;
 * otherwise an elbow curve: leave a's top/bottom, enter b's side.
 * `offset` shifts the edge perpendicular to its direction (parallel edges).
 */
export function edgeGeometry(a: Pt, b: Pt, w: number, h: number, offset = 0): EdgeGeometry {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dy) < 1) {
    const s = Math.sign(dx);
    const y = a.y + offset * s;
    const sx = a.x + (s * w) / 2;
    const ex = b.x - (s * w) / 2;
    return { d: `M${sx} ${y}H${ex}`, mid: { x: (sx + ex) / 2, y } };
  }

  if (Math.abs(dx) < 1) {
    const s = Math.sign(dy);
    const x = a.x - offset * s;
    const sy = a.y + (s * h) / 2;
    const ey = b.y - (s * h) / 2;
    return { d: `M${x} ${sy}V${ey}`, mid: { x, y: (sy + ey) / 2 } };
  }

  const sy = a.y + (Math.sign(dy) * h) / 2;
  const ex = b.x - (Math.sign(dx) * w) / 2;
  const c = { x: a.x, y: b.y };
  return {
    d: `M${a.x} ${sy}Q${c.x} ${c.y} ${ex} ${b.y}`,
    mid: { x: 0.25 * a.x + 0.5 * c.x + 0.25 * ex, y: 0.25 * sy + 0.5 * c.y + 0.25 * b.y },
  };
}

/** viewBox units → CSS percentage of the container. */
export const pct = (v: number, total: number) => `${(v / total) * 100}%`;
