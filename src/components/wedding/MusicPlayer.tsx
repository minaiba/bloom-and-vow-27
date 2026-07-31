import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { weddingConfig } from "@/config/wedding";

export function MusicPlayer({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!active) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [active]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setAvailable(false));
    }
  };

  if (!active) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <audio
        ref={audioRef}
        src={weddingConfig.music.src}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Turn music off" : "Turn music on"}
        className="glass group flex items-center gap-3 rounded-full py-2 pl-2 pr-4 text-primary transition-transform duration-500 hover:scale-105"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </span>
        <span className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.25em]">
          {playing ? (
            <Volume2 className="h-3.5 w-3.5" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" />
          )}
          {available ? (playing ? "Music On" : "Music Off") : "No track"}
        </span>
      </button>
    </div>
  );
}
