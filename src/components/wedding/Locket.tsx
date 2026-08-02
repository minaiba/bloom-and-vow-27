import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { weddingConfig } from "@/config/wedding";
import { Monogram } from "./primitives";

const easeSilk = [0.22, 1, 0.36, 1] as const;

/**
 * Реалистичный золотой медальон (locket).
 * Закрыт — покачивается; при клике створки раскрываются как настоящий шарнир,
 * внутри — две фотографии пары. Через 5 секунд вызывается onOpen().
 */
export function Locket({
  onOpen,
  leaving,
}: {
  onOpen: () => void;
  leaving: boolean;
}) {
  const { couple, images, ui } = weddingConfig;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(onOpen, 5000);
    return () => window.clearTimeout(id);
  }, [open, onOpen]);

  return (
    <motion.div
      className="relative mt-10 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.86, filter: "blur(12px)" }}
      animate={
        leaving
          ? { opacity: 0, scale: 2.1, filter: "blur(22px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: leaving ? 1 : 1.2, ease: easeSilk, delay: leaving ? 0 : 0.4 }}
    >
      {/* цепочка */}
      <svg
        className="pointer-events-none -mb-1 h-24 w-56 text-[hsl(42_62%_58%)] sm:h-28 sm:w-64"
        viewBox="0 0 240 110"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 2 C 60 40, 100 78, 120 104 C 140 78, 180 40, 236 2"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 4"
          opacity="0.9"
        />
        <path
          d="M4 2 C 60 40, 100 78, 120 104 C 140 78, 180 40, 236 2"
          stroke="hsl(48 90% 82%)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="2 8"
          opacity="0.8"
        />
      </svg>

      {/* петля */}
      <div
        className="relative z-10 -mb-3 h-7 w-7 rounded-full border-[3px] sm:h-8 sm:w-8"
        style={{
          borderColor: "hsl(42 62% 52%)",
          background:
            "linear-gradient(140deg, hsl(48 92% 86%), hsl(42 70% 56%) 45%, hsl(36 55% 38%))",
          boxShadow: "0 2px 6px hsl(30 40% 20% / 0.45)",
        }}
      />

      <motion.button
        type="button"
        onClick={() => !open && setOpen(true)}
        aria-label={ui.openScreen.hint}
        className="relative"
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        animate={
          open
            ? { rotate: [0, 2.5, -2, 1, 0], y: [0, -6, 0] }
            : { rotate: [-3, 3, -3], y: [0, -4, 0] }
        }
        transition={
          open
            ? { duration: 1.6, ease: easeSilk }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
        whileTap={open ? undefined : { scale: 0.97 }}
      >
        <div
          className="relative h-48 w-48 rounded-full sm:h-60 sm:w-60"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* тень под медальоном */}
          <span
            className="absolute -bottom-6 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] blur-md"
            style={{ background: "hsl(30 40% 15% / 0.35)" }}
          />

          {/* внутренняя часть — фотографии */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full p-2"
            style={{
              background:
                "linear-gradient(150deg, hsl(44 70% 62%), hsl(38 50% 40%))",
              boxShadow: "inset 0 0 24px hsl(30 45% 20% / 0.55)",
            }}
          >
            <div className="flex h-full w-full overflow-hidden rounded-full">
              <motion.img
                src={images.hero}
                alt={couple.bride}
                className="h-full w-1/2 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: open ? 1 : 0 }}
                transition={{ delay: open ? 0.6 : 0, duration: 0.8 }}
              />
              <motion.img
                src={images.story}
                alt={couple.groom}
                className="h-full w-1/2 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: open ? 1 : 0 }}
                transition={{ delay: open ? 0.75 : 0, duration: 0.8 }}
              />
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[hsl(48_90%_85%/0.5)]" />
          </div>

          {/* створки */}
          {(["left", "right"] as const).map((side) => (
            <motion.div
              key={side}
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: side === "left" ? "left center" : "right center",
                clipPath:
                  side === "left"
                    ? "inset(0 50% 0 0)"
                    : "inset(0 0 0 50%)",
                backfaceVisibility: "hidden",
              }}
              animate={{ rotateY: open ? (side === "left" ? -155 : 155) : 0 }}
              transition={{ duration: 1.4, ease: easeSilk, delay: open ? 0.15 : 0 }}
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background:
                    "conic-gradient(from 210deg, hsl(48 92% 88%), hsl(42 72% 58%) 20%, hsl(36 52% 36%) 40%, hsl(46 88% 80%) 58%, hsl(38 60% 44%) 78%, hsl(48 92% 88%))",
                  boxShadow:
                    "inset 0 2px 6px hsl(48 95% 92% / 0.7), inset 0 -6px 14px hsl(30 45% 20% / 0.5)",

                }}
              >
                <div
                  className="absolute inset-[6%] rounded-full"
                  style={{
                    border: "1px solid hsl(48 90% 86% / 0.65)",
                    boxShadow: "inset 0 0 18px hsl(30 45% 22% / 0.35)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Monogram
                    left={couple.monogram.left}
                    right={couple.monogram.right}
                    className="text-7xl text-[hsl(34_45%_26%)] drop-shadow-[0_1px_0_hsl(48_92%_88%)] sm:text-8xl"
                  />
                </div>
                {/* блик */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(120deg, hsl(0 0% 100% / 0.55) 0%, transparent 35%, transparent 65%, hsl(0 0% 100% / 0.25) 100%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.button>
    </motion.div>
  );
}
