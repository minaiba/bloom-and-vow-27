import { useEffect, useRef, useState } from "react";

/* ——— НАСТРОЙКИ (меняйте прямо здесь) ——— */
/** Положите свой файл в /public/music/theme.mp3 */
const MUSIC_SRC = "/music/theme.mp3";
const LABEL_ON = "Музыка Вкл";
const LABEL_OFF = "Музыка Выкл";

/** Простой HTML Audio: маленькая круглая кнопка 🎵, loop. */
export function MusicPlayer({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!active) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;

    const start = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };
    start();

    // Автозапуск после первого взаимодействия, если браузер заблокировал звук
    const onFirstInteraction = () => {
      if (audio.paused) start();
    };
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [active]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  if (!active) return null;

  const label = playing ? LABEL_ON : LABEL_OFF;

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className="glass fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-lg text-primary shadow-[var(--shadow-soft)] transition-transform duration-500 hover:scale-110"
      >
        <span className={playing ? "animate-pulse" : "opacity-50"}>🎵</span>
      </button>
    </>
  );
}
