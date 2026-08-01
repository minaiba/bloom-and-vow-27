import { motion } from "motion/react";

import { weddingConfig } from "@/config/wedding";
import { Monogram } from "./primitives";

const easeSilk = [0.22, 1, 0.36, 1] as const;

/** Отдельный экран открытия: круглая монограмма — единственная кнопка. */
export function OpenScreen({
  onOpen,
  leaving,
}: {
  onOpen: () => void;
  leaving: boolean;
}) {
  const { couple, ui, date } = weddingConfig;

  return (
    <motion.section
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden px-6 paper"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1, filter: leaving ? "blur(14px)" : "blur(0px)" }}
      transition={{ duration: 0.9, ease: easeSilk }}
    >
      <motion.p
        className="text-[0.65rem] uppercase tracking-[0.55em] text-muted-foreground"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: leaving ? 0 : 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: easeSilk }}
      >
        {ui.openScreen.overline}
      </motion.p>

      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={ui.openScreen.hint}
        initial={{ opacity: 0, scale: 0.86, filter: "blur(12px)" }}
        animate={
          leaving
            ? { opacity: 0, scale: 2.1, filter: "blur(22px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: leaving ? 1 : 1.2, ease: easeSilk, delay: leaving ? 0 : 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="glass relative mt-10 flex h-48 w-48 items-center justify-center rounded-full shadow-[var(--shadow-lift)] sm:h-60 sm:w-60"
      >
        <span className="absolute inset-0 rounded-full ring-1 ring-primary/20" />
        <span className="absolute inset-4 rounded-full ring-1 ring-primary/10" />
        <span className="absolute inset-0 animate-pulse rounded-full bg-primary/5 blur-2xl" />
        <Monogram
          left={couple.monogram.left}
          right={couple.monogram.right}
          className="text-7xl sm:text-8xl"
        />
      </motion.button>

      <motion.p
        className="mt-10 text-center text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
      >
        {date.day} {date.month} · {date.year}
      </motion.p>
      <motion.p
        className="mt-4 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
      >
        {ui.openScreen.hint}
      </motion.p>
    </motion.section>
  );
}
