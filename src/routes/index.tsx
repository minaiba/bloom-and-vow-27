import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { Countdown } from "@/components/wedding/Countdown";
import { DressCode } from "@/components/wedding/DressCode";
import { Gallery } from "@/components/wedding/Gallery";
import { Gifts } from "@/components/wedding/Gifts";
import { Hero } from "@/components/wedding/Hero";
import { LoveStory } from "@/components/wedding/LoveStory";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { OpenScreen } from "@/components/wedding/OpenScreen";
import { Petals } from "@/components/wedding/Petals";
import { Timeline } from "@/components/wedding/Timeline";
import { Venue } from "@/components/wedding/Venue";
import { Divider, Monogram } from "@/components/wedding/primitives";

/* ——— ТЕКСТЫ СТРАНИЦЫ (меняйте прямо здесь) ——— */
const SEO = {
  title: "Оливия и Ральф — Приглашение на свадьбу · 18 мая 2025",
  description:
    "Приглашаем вас на свадьбу Оливии и Ральфа 18 мая 2025 года. Программа дня, локации, галерея и дресс-код.",
  siteUrl: "https://bloom-and-vow-27.lovable.app",
  ogImage: "https://bloom-and-vow-27.lovable.app/images/hero.jpg",
};
const BRIDE = "Оливия";
const GROOM = "Ральф";
const MONOGRAM = { left: "О", right: "Р" };
const DATE_DISPLAY = "18 МАЯ 2025";
const FOOTER_NOTE = "Надеемся, что вы сможете приехать. Благослови вас Бог.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO.title },
      { name: "description", content: SEO.description },
      { property: "og:title", content: SEO.title },
      { property: "og:description", content: SEO.description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SEO.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO.title },
      { name: "twitter:description", content: SEO.description },
      { name: "twitter:image", content: SEO.ogImage },
    ],
    links: [{ rel: "canonical", href: SEO.siteUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: `Свадьба ${BRIDE} и ${GROOM}`,
          startDate: "2025-05-18T14:00:00+06:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: [SEO.ogImage],
          description: SEO.description,
          location: {
            "@type": "Place",
            name: "Приход Богоматери Лурдской",
            address: "Карпентер Хилл, Марбель, Южный Котабато",
          },
        }),
      },
    ],
  }),
  component: InvitationPage,
});

function InvitationPage() {
  /** "cover" — экран открытия, "invitation" — само приглашение */
  const [stage, setStage] = useState<"cover" | "leaving" | "invitation">("cover");
  const opened = stage === "invitation";

  useEffect(() => {
    if (opened) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    if (stage !== "leaving") return;
    const id = window.setTimeout(() => setStage("invitation"), 1000);
    return () => window.clearTimeout(id);
  }, [stage]);

  return (
    <main className="relative paper">
      <AnimatePresence>
        {!opened && (
          <OpenScreen
            key="cover"
            leaving={stage === "leaving"}
            onOpen={() => setStage("leaving")}
          />
        )}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(16px)", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Petals />
          <Hero />
          <MusicPlayer active />
          <LoveStory />
          <Countdown />
          <Timeline />
          <Gallery />
          <DressCode />
          <Gifts />
          <Venue />

          <footer className="relative px-6 pb-24 pt-16 text-center">
            <Divider />
            <Monogram
              left={MONOGRAM.left}
              right={MONOGRAM.right}
              className="mt-10 text-5xl"
            />
            <p className="script mt-6 text-2xl text-primary">
              {BRIDE} &amp; {GROOM}
            </p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
              {DATE_DISPLAY}
            </p>
            <p className="mt-8 text-xs text-muted-foreground">{FOOTER_NOTE}</p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
