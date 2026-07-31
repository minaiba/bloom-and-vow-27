import { weddingConfig } from "@/config/wedding";
import { Reveal, SectionTitle } from "./primitives";

function DressIcon({ variant }: { variant: "gown" | "suit" }) {
  return (
    <svg
      viewBox="0 0 100 140"
      className="h-28 w-20 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      {variant === "gown" ? (
        <>
          <path d="M38 12h24l-6 14h-12z" />
          <path d="M44 26 22 128h56L56 26" />
          <path d="M30 74h40" />
        </>
      ) : (
        <>
          <path d="M34 14 50 30l16-16" />
          <path d="M34 14 20 24l6 104h20l4-98" />
          <path d="M66 14l14 10-6 104H54l-4-98" />
          <path d="M50 30v98" />
        </>
      )}
    </svg>
  );
}

export function DressCode() {
  const { dressCode } = weddingConfig;

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="watercolor torn-top torn-bottom absolute inset-0 -z-10 opacity-70" />

      <SectionTitle
        overline="Dress code"
        title={dressCode.title}
        subtitle={dressCode.note}
      />

      <div className="mx-auto mt-16 flex max-w-2xl items-end justify-center gap-16">
        <Reveal>
          <div className="flex flex-col items-center gap-3">
            <DressIcon variant="gown" />
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
              Ladies
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-col items-center gap-3">
            <DressIcon variant="suit" />
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
              Gentlemen
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mx-auto mt-16 max-w-xl text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Colour guide
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {dressCode.palette.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full ring-1 ring-border"
                style={{ backgroundColor: c.hex }}
                aria-hidden="true"
              />
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3} className="mx-auto mt-14 max-w-xl text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Kindly avoid
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {dressCode.avoid.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-card/70 px-5 py-2 text-xs uppercase tracking-[0.2em] text-foreground/70 line-through"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
