import { useMemo } from "react";

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
};

/** Slow, sparse falling petals. Purely decorative. */
export function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: (i * 97) % 100,
        delay: (i * 1.7) % 18,
        duration: 16 + ((i * 3) % 12),
        size: 9 + ((i * 5) % 10),
        drift: ((i % 5) - 2) * 55,
        opacity: 0.18 + ((i % 4) * 0.09),
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block rounded-[100%_0_100%_0] bg-sky"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            opacity: p.opacity,
            ["--drift" as string]: `${p.drift}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
