import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal, SectionTitle } from "./primitives";

/* ——— ТЕКСТЫ И ФОТО (меняйте прямо здесь) ——— */
const OVERLINE = "Моменты";
const TITLE = "Галерея";
const LABELS = {
  close: "Закрыть",
  prev: "Предыдущее фото",
  next: "Следующее фото",
  viewer: "Просмотр фотографий",
};
const PHOTOS = [
  { src: "/images/gallery-1.jpg", alt: "Оливия и Ральф смеются вместе" },
  { src: "/images/gallery-2.jpg", alt: "Свадебный букет в бело-синих тонах" },
  { src: "/images/gallery-3.jpg", alt: "Ральф в тёмно-синем костюме" },
  { src: "/images/gallery-4.jpg", alt: "Фата Оливии на ветру" },
  { src: "/images/story.jpg", alt: "Руки с обручальным кольцом" },
  { src: "/images/reception.jpg", alt: "Столы банкета на закате" },
];

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + PHOTOS.length) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-32">
      <SectionTitle overline={OVERLINE} title={TITLE} />

      <div className="mx-auto mt-16 max-w-5xl columns-2 gap-4 [column-fill:_balance] md:columns-3">
        {PHOTOS.map((photo, i) => (
          <Reveal key={photo.src} delay={(i % 3) * 0.1} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover transition-all duration-[900ms] group-hover:scale-105 group-hover:brightness-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
              touchStart.current = null;
            }}
            role="dialog"
            aria-modal="true"
            aria-label={LABELS.viewer}
          >
            <button
              type="button"
              onClick={close}
              aria-label={LABELS.close}
              className="absolute right-5 top-5 rounded-full bg-background/90 p-3 text-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={LABELS.prev}
              className="absolute left-3 rounded-full bg-background/90 p-3 text-primary sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.img
              key={openIndex}
              src={PHOTOS[openIndex].src}
              alt={PHOTOS[openIndex].alt}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[88vw] rounded-2xl object-contain shadow-[var(--shadow-lift)]"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={LABELS.next}
              className="absolute right-3 rounded-full bg-background/90 p-3 text-primary sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
