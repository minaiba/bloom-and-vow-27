import { Camera, GlassWater, Heart, Music, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";

import { Reveal, SectionTitle } from "./primitives";

/* ——— ТЕКСТЫ (меняйте прямо здесь) ——— */
const OVERLINE = "Порядок дня";
const TITLE = "Программа дня";
const SUBTITLE = "От клятв до последнего танца.";

const icons = {
  rings: Heart,
  glass: GlassWater,
  dinner: UtensilsCrossed,
  camera: Camera,
  music: Music,
} as const;

type Item = {
  time: string;
  title: string;
  description: string;
  icon: keyof typeof icons;
};

const ITEMS: Item[] = [
  { time: "14:00", title: "Церемония", description: "Приход Богоматери Лурдской", icon: "rings" },
  { time: "16:00", title: "Банкет", description: "Welcome-коктейль на «Ферме»", icon: "glass" },
  { time: "17:00", title: "Ужин", description: "Ужин и тёплые тосты", icon: "dinner" },
  { time: "18:00", title: "Фотосессия", description: "Портреты в золотой час", icon: "camera" },
  { time: "19:00", title: "Танцы", description: "Первый танец и вечеринка", icon: "music" },
];

function Row({ item, index }: { item: Item; index: number }) {
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
      <SectionTitle overline={OVERLINE} title={TITLE} subtitle={SUBTITLE} />

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
        {ITEMS.map((item, i) => (
          <Row key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
