import { useEffect, useRef, useState } from "react";

import { weddingConfig } from "@/config/wedding";

/** Простой HTML Audio: маленькая круглая кнопка 🎵, loop, играет постоянно. */
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

  const label = playing ? weddingConfig.ui.music.on : weddingConfig.ui.music.off;

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.music.src} loop preload="auto" />
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
