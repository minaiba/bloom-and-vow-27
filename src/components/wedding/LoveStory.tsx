import { Play } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

import { Divider, Reveal, ScaleIn, SectionTitle } from "./primitives";

/* ——— ТЕКСТЫ, ФОТО И ВИДЕО (меняйте прямо здесь) ——— */
const OVERLINE = "Как всё начиналось";
const TITLE = "Наша история";
const HASHTAG = "#ОливияИРальфНавсегда";
/** Постер (фото), которое видно до запуска видео */
const POSTER = "/images/story.jpg";
/** Положите свой ролик в /public/video/story.mp4 */
const VIDEO_SRC = "/video/story.mp4";
const PLAY_LABEL = "Смотреть наше видео";
const PARAGRAPHS = [
  "В маленьком приморском городке Оливия, морской биолог, встретила Ральфа, рыбака, — в то утро, когда её лодка сломалась. Общая любовь к морю сразу связала их.",
  "Они исследовали бухты, изучали морскую жизнь и однажды на закате Ральф признался в своих чувствах. Оливия ответила ему тем же.",
  "Их история, рождённая из любви к морю, стала местной легендой — а сегодня начинается её новая глава.",
];

export function LoveStory() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    // даём React отрисовать <video>, затем запускаем
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => undefined);
    });
  };

  return (
    <section id="story" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="watercolor torn-top torn-bottom absolute inset-x-0 top-0 -z-10 h-full opacity-60" />

      <SectionTitle overline={OVERLINE} title={TITLE} />

      <div className="mx-auto mt-16 grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <ScaleIn className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
          {playing ? (
            <motion.video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={POSTER}
              controls
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full bg-black object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={start}
              aria-label={PLAY_LABEL}
              className="group relative block w-full"
            >
              <img
                src={POSTER}
                alt={PLAY_LABEL}
                width={1280}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-foreground/15 transition-colors duration-500 group-hover:bg-foreground/25" />
              <span className="glass absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-primary transition-transform duration-500 group-hover:scale-110">
                <Play className="ml-1 h-7 w-7" />
              </span>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.3em] text-background">
                {PLAY_LABEL}
              </span>
            </button>
          )}
        </ScaleIn>

        <div className="space-y-6">
          {PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className="text-sm leading-loose text-foreground/80 sm:text-base">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <p className="script text-2xl text-primary">{HASHTAG}</p>
          </Reveal>
        </div>
      </div>

      <Divider className="mt-20" />
    </section>
  );
}
