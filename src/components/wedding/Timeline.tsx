import { Camera, GlassWater, Music, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";

import { weddingConfig, type TimelineItem } from "@/config/wedding";
import { Reveal, SectionTitle } from "./primitives";

const icons = {
  rings: Camera,
  glass: GlassWater,
  dinner: UtensilsCrossed,
  camera: Camera,
  music: Music,
} as const;

function Row({ item, index }: { item: TimelineItem; index: number }) {
  const Icon = icons[item.icon];
  return (
    <Reveal delay={index * 0.1}>
      <div className="relative flex gap-6 pb-12 last:pb-0">
        <div className="relative flex flex-col items-center">
          <span className="glass flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-primary">
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div className="pt-2">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
            {item.time}
          </p>
          <h3 className="script mt-2 text-3xl text-primary">{item.title}</h3>
          <p className="mt-1 text-sm text-foreground/70">{item.description}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="relative px-6 py-24 sm:py-32">
      <SectionTitle
        overline="The order of the day"
        title="Wedding Timeline"
        subtitle="A gentle flow from vows to the very last dance."
      />

      <div className="relative mx-auto mt-16 max-w-xl">
        <motion.span
          className="absolute left-7 top-0 w-px origin-top bg-gradient-to-b from-primary/50 via-primary/25 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%" }}
          aria-hidden="true"
        />
        {weddingConfig.timeline.map((item, i) => (
          <Row key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
