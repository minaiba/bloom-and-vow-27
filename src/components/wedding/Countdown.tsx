import { useEffect, useState } from "react";

import { Reveal, SectionTitle } from "./primitives";

/* ——— ТЕКСТЫ И ДАТА (меняйте прямо здесь) ——— */
/** Дата и время свадьбы в формате ISO с часовым поясом. */
const WEDDING_DATE_ISO = "2025-05-18T14:00:00+06:00";
const OVERLINE = "Считаем дни";
const TITLE = "До нашей свадьбы";
const TODAY = "Сегодня наша свадьба ❤️";
const LABELS = { days: "Дней", hours: "Часов", minutes: "Минут", seconds: "Секунд" };

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
  const target = new Date(WEDDING_DATE_ISO).getTime();
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
        [LABELS.days, remaining.days],
        [LABELS.hours, remaining.hours],
        [LABELS.minutes, remaining.minutes],
        [LABELS.seconds, remaining.seconds],
      ]
    : [];

  return (
    <section id="countdown" className="relative px-6 py-24 sm:py-32">
      <SectionTitle overline={OVERLINE} title={TITLE} />

      <div className="mx-auto mt-14 max-w-3xl">
        {!ready ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.values(LABELS).map((label) => (
              <div key={label} className="glass flex flex-col items-center rounded-2xl px-4 py-7">
                <span className="script text-5xl text-primary sm:text-6xl tabular-nums">00</span>
                <span className="mt-3 text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
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
            <p className="script text-center text-4xl text-primary sm:text-5xl">{TODAY}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
