import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { Countdown } from "@/components/wedding/Countdown";
import { DressCode } from "@/components/wedding/DressCode";
import { FloatingMenu } from "@/components/wedding/FloatingMenu";
import { Gallery } from "@/components/wedding/Gallery";
import { Gifts } from "@/components/wedding/Gifts";
import { Hero } from "@/components/wedding/Hero";
import { LoadingScreen } from "@/components/wedding/LoadingScreen";
import { LoveStory } from "@/components/wedding/LoveStory";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { Petals } from "@/components/wedding/Petals";
import { Rsvp } from "@/components/wedding/Rsvp";
import { Timeline } from "@/components/wedding/Timeline";
import { Venue } from "@/components/wedding/Venue";
import { Divider, Monogram } from "@/components/wedding/primitives";
import { weddingConfig } from "@/config/wedding";

const { seo, couple, date } = weddingConfig;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: seo.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: seo.ogImage },
    ],
    links: [{ rel: "canonical", href: seo.siteUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: `${couple.bride} & ${couple.groom} Wedding`,
          startDate: date.iso,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: [seo.ogImage],
          description: seo.description,
          location: {
            "@type": "Place",
            name: weddingConfig.venues.ceremony.name,
            address: weddingConfig.venues.ceremony.address,
          },
        }),
      },
    ],
  }),
  component: InvitationPage,
});

function InvitationPage() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <main className="relative paper">
      <LoadingScreen />
      <Petals />
      <Hero opened={opened} onOpen={() => setOpened(true)} />

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingMenu />
            <MusicPlayer active={opened} />
            <LoveStory />
            <Countdown />
            <Timeline />
            <Gallery />
            <DressCode />
            <Gifts />
            <Venue />
            <Rsvp />

            <footer className="relative px-6 pb-32 pt-16 text-center sm:pb-24">
              <Divider />
              <Monogram
                left={couple.monogram.left}
                right={couple.monogram.right}
                className="mt-10 text-5xl"
              />
              <p className="script mt-6 text-2xl text-primary">
                {couple.bride} &amp; {couple.groom}
              </p>
              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
                {date.display}
              </p>
              <p className="mt-8 text-xs text-muted-foreground">
                Hope you can make it and God bless you.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
