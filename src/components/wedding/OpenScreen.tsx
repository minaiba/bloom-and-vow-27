import { motion } from "motion/react";

import { Locket } from "./Locket";

const easeSilk = [0.22, 1, 0.36, 1] as const;

/* ——— ТЕКСТЫ (меняйте прямо здесь) ——— */
const OVERLINE = "Свадьба";
const DATE_LINE = "18 МАЯ · 2025";
const HINT = "Нажмите на медальон, чтобы открыть приглашение";

/** Экран открытия: золотой медальон — единственная кнопка. */
export function OpenScreen({
  onOpen,
  leaving,
}: {
  onOpen: () => void;
  leaving: boolean;
}) {
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
        {OVERLINE}
      </motion.p>

      <Locket onOpen={onOpen} leaving={leaving} />

      <motion.p
        className="mt-10 text-center text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
      >
        {DATE_LINE}
      </motion.p>
      <motion.p
        className="mt-4 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
      >
        {HINT}
      </motion.p>
    </motion.section>
  );
}
