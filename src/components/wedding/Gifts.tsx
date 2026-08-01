import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import { weddingConfig } from "@/config/wedding";
import { Reveal, SectionTitle } from "./primitives";

const easeSilk = [0.22, 1, 0.36, 1] as const;

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.3 18.9 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.19c-.25.25-.46.46-.94.46l.34-4.79 8.72-7.88c.38-.34-.08-.53-.59-.19l-10.78 6.8-4.64-1.45c-1.01-.32-1.03-1.01.21-1.5l18.14-6.99c.84-.31 1.58.19 1.25 1.23Z" />
    </svg>
  );
}

export function Gifts() {
  const { gifts, ui } = weddingConfig;
  const [open, setOpen] = useState(false);

  return (
    <section id="gifts" className="relative px-6 py-24 sm:py-32">
      <SectionTitle overline={ui.gifts.overline} title={ui.gifts.title} />

      <div className="mx-auto mt-14 flex max-w-xl flex-col items-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              type="button"
              onClick={() => setOpen(true)}
              aria-label={gifts.envelopeHint}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: easeSilk }}
              whileHover={{ y: -6 }}
              className="group relative block w-full max-w-sm"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-lift)] ring-1 ring-border">
                {/* тело конверта */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-secondary" />
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-card/80" />
                {/* боковые складки */}
                <div className="absolute inset-0">
                  <div className="absolute left-0 top-0 h-full w-1/2 origin-left skew-y-[18deg] bg-primary/5" />
                  <div className="absolute right-0 top-0 h-full w-1/2 origin-right -skew-y-[18deg] bg-primary/5" />
                </div>
                {/* крышка */}
                <div className="absolute inset-x-0 top-0 h-1/2 origin-top overflow-hidden transition-transform duration-700 group-hover:[transform:rotateX(12deg)]">
                  <div className="h-full w-full [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-sky/40 to-primary/25" />
                </div>
                {/* печать-монограмма */}
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
                  <span className="script text-2xl">
                    {weddingConfig.couple.monogram.left}&amp;
                    {weddingConfig.couple.monogram.right}
                  </span>
                </div>
              </div>
              <p className="mt-6 text-center text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                {gifts.envelopeHint}
              </p>
            </motion.button>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: easeSilk }}
              className="glass w-full max-w-md rounded-3xl p-8 text-center sm:p-10"
            >
              <p className="script text-3xl text-primary">{gifts.title}</p>
              <div className="mt-6 space-y-4">
                {gifts.text.split("\n\n").map((p) => (
                  <p key={p} className="text-sm leading-loose text-foreground/75">
                    {p}
                  </p>
                ))}
              </div>
              <a
                href={gifts.telegramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-500 hover:scale-110"
                aria-label={gifts.telegramLabel}
              >
                <TelegramIcon className="h-7 w-7" />
              </a>
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                {gifts.telegramLabel}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Reveal delay={0.2} className="mt-16" />
    </section>
  );
}
