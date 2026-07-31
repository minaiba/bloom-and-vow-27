import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { weddingConfig } from "@/config/wedding";
import { Monogram } from "./primitives";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setDone(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center paper"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ visibility: done ? "hidden" : "visible" }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <Monogram
          left={weddingConfig.couple.monogram.left}
          right={weddingConfig.couple.monogram.right}
          className="text-6xl"
        />
        <span className="hairline w-32" />
      </motion.div>
    </motion.div>
  );
}
