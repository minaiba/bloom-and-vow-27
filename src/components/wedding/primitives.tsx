import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const easeSilk = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeSilk },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: easeSilk, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  overline,
  title,
  subtitle,
  className,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("text-center", className)}>
      {overline ? (
        <p className="text-[0.7rem] uppercase tracking-[0.42em] text-muted-foreground">
          {overline}
        </p>
      ) : null}
      <h2 className="script mt-4 text-4xl leading-tight text-primary sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <div className="hairline mx-auto mt-6 w-40" />
      {subtitle ? (
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Monogram({
  left,
  right,
  className,
}: {
  left: string;
  right: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "script inline-flex items-baseline leading-none text-primary",
        className,
      )}
      aria-label={`${left} and ${right}`}
    >
      <span className="-mr-[0.12em]">{left}</span>
      <span className="mx-[0.02em] text-[0.42em] italic opacity-60">&amp;</span>
      <span className="-ml-[0.12em]">{right}</span>
    </span>
  );
}

/** Hand-drawn cornflower used as a decorative divider. */
export function Floral({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("text-sky", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M60 62V112" strokeLinecap="round" />
      <path d="M60 84c-10 0-18-6-22-14" strokeLinecap="round" />
      <path d="M60 96c9 0 16-5 20-12" strokeLinecap="round" />
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="60"
          cy="34"
          rx="6.5"
          ry="20"
          transform={`rotate(${i * 45} 60 56)`}
        />
      ))}
      <circle cx="60" cy="56" r="5" />
    </svg>
  );
}

export function Divider({ className }: { className?: string }) {
  return (
    <Reveal className={cn("flex items-center justify-center gap-4", className)}>
      <span className="hairline w-20" />
      <Floral className="h-9 w-9 animate-float-slow" />
      <span className="hairline w-20" />
    </Reveal>
  );
}
