import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { weddingConfig } from "@/config/wedding";
import { Monogram } from "./primitives";

const easeSilk = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { couple, date, images, ui } = weddingConfig;
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden paper"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: scrolled * 0.25 }}
        initial={{ scale: 1.15, filter: "blur(18px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.6, ease: easeSilk }}
      >
        <img
          src={images.hero}
          alt={`${couple.bride} и ${couple.groom}`}
          width={1280}
          height={1600}
          className="h-full w-full object-cover object-top"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/25 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        <motion.p
          className="text-[0.65rem] uppercase tracking-[0.55em] text-muted-foreground sm:text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: easeSilk }}
        >
          {ui.hero.overline}
        </motion.p>

        <motion.h1
          className="script mt-6 text-5xl leading-[0.95] text-primary sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.1, ease: easeSilk }}
        >
          {couple.bride}
          <span className="mx-3 block text-2xl italic opacity-70 sm:inline sm:text-3xl">
            и
          </span>
          {couple.groom}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.1, ease: easeSilk }}
          className="mt-10 flex justify-center"
        >
          <div className="glass flex h-32 w-32 items-center justify-center rounded-full sm:h-40 sm:w-40">
            <Monogram
              left={couple.monogram.left}
              right={couple.monogram.right}
              className="text-6xl sm:text-7xl"
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center justify-center gap-5 text-primary"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: easeSilk }}
        >
          <span className="hairline w-12" />
          <p className="text-sm uppercase tracking-[0.35em] sm:text-base">
            {date.day} {date.month} · {date.year}
          </p>
          <span className="hairline w-12" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mx-auto mt-12 max-w-md text-xs italic leading-relaxed text-muted-foreground sm:text-sm"
        >
          {couple.verse}
        </motion.p>
      </div>
    </section>
  );
}
