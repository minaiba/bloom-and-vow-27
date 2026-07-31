import { useEffect, useState } from "react";

import { weddingConfig } from "@/config/wedding";
import { Reveal, SectionTitle } from "./primitives";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Remaining | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(weddingConfig.date.iso).getTime();
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRemaining(diff(target));
    setReady(true);
    const id = window.setInterval(() => setRemaining(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: Array<[string, number]> = remaining
    ? [
        ["Days", remaining.days],
        ["Hours", remaining.hours],
        ["Minutes", remaining.minutes],
        ["Seconds", remaining.seconds],
      ]
    : [];

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <SectionTitle overline="Counting the days" title="Until We Say I Do" />

      <div className="mx-auto mt-14 max-w-3xl">
        {!ready ? (
          <div className="h-32" />
        ) : remaining ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {units.map(([label, value], i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div className="glass flex flex-col items-center rounded-2xl px-4 py-7">
                  <span className="script text-5xl text-primary sm:text-6xl tabular-nums">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="mt-3 text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="script text-center text-4xl text-primary sm:text-5xl">
              Today is our Wedding ❤️
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
