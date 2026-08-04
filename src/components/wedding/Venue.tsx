import { MapPin, Navigation } from "lucide-react";

import { Reveal, ScaleIn, SectionTitle } from "./primitives";

/* ——— ТЕКСТЫ И ЛОКАЦИИ (меняйте прямо здесь) ——— */
const OVERLINE = "Где нас найти";
const TITLE = "Локации";
const SUBTITLE = "Приезжайте разделить с нами этот день — мы очень ждём вас.";
const NAVIGATE = "Маршрут";
const OPEN_MAPS = "Открыть карту";
const MAP_TITLE = "Карта локации";

type Place = {
  label: string;
  name: string;
  address: string;
  time: string;
  image: string;
  mapsUrl: string;
  embedUrl: string;
};

const CEREMONY: Place = {
  label: "Церемония",
  name: "Приход Богоматери Лурдской",
  address: "Карпентер Хилл, Марбель, Южный Котабато",
  time: "14:00",
  image: "/images/ceremony.jpg",
  mapsUrl: "https://maps.google.com/?q=Our+Lady+of+Lourdes+Parish+Marbel",
  embedUrl: "https://www.google.com/maps?q=Our+Lady+of+Lourdes+Parish+Marbel&output=embed",
};

const RECEPTION: Place = {
  label: "Банкет",
  name: "Ферма на Карпентер Хилл",
  address: "Карпентер Хилл, Марбель, Южный Котабато",
  time: "16:00",
  image: "/images/reception.jpg",
  mapsUrl: "https://maps.google.com/?q=The+Farm+Carpenter+Hill+Marbel",
  embedUrl: "https://www.google.com/maps?q=The+Farm+Carpenter+Hill+Marbel&output=embed",
};

function VenueCard({ venue, index }: { venue: Place; index: number }) {
  return (
    <Reveal delay={index * 0.12}>
      <article className="glass overflow-hidden rounded-3xl">
        <div className="overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            width={1280}
            height={900}
            loading="lazy"
            className="h-56 w-full object-cover transition-transform duration-[1100ms] hover:scale-105 sm:h-64"
          />
        </div>
        <div className="p-8">
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
            {venue.label} · {venue.time}
          </p>
          <h3 className="script mt-3 text-3xl text-primary">{venue.name}</h3>
          <p className="mt-2 flex items-start gap-2 text-sm text-foreground/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {venue.address}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.25em] text-primary-foreground transition-transform duration-500 hover:scale-[1.03]"
            >
              <Navigation className="h-3.5 w-3.5" />
              {NAVIGATE}
            </a>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.25em] text-primary transition-colors hover:bg-secondary"
            >
              {OPEN_MAPS}
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Venue() {
  return (
    <section id="venue" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="watercolor torn-top torn-bottom absolute inset-0 -z-10 opacity-60" />

      <SectionTitle overline={OVERLINE} title={TITLE} subtitle={SUBTITLE} />

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
        <VenueCard venue={CEREMONY} index={0} />
        <VenueCard venue={RECEPTION} index={1} />
      </div>

      <ScaleIn className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
        <iframe
          title={MAP_TITLE}
          src={CEREMONY.embedUrl}
          className="h-[380px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </ScaleIn>
    </section>
  );
}
