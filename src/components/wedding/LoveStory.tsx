import { weddingConfig } from "@/config/wedding";
import { Divider, Reveal, ScaleIn, SectionTitle } from "./primitives";

export function LoveStory() {
  const { story, images, couple } = weddingConfig;

  return (
    <section id="story" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="watercolor torn-top torn-bottom absolute inset-x-0 top-0 -z-10 h-full opacity-60" />

      <SectionTitle overline="How it began" title={story.title} />

      <div className="mx-auto mt-16 grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <ScaleIn className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
          <img
            src={images.story}
            alt={`${couple.bride} and ${couple.groom} holding hands`}
            width={1280}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
          />
        </ScaleIn>

        <div className="space-y-6">
          {story.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className="text-sm leading-loose text-foreground/80 sm:text-base">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <p className="script text-2xl text-primary">{couple.hashtag}</p>
          </Reveal>
        </div>
      </div>

      <Divider className="mt-20" />
    </section>
  );
}
