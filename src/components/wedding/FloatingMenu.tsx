import { Camera, Gift, Heart, Home, Images, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Home", icon: Home },
  { id: "story", label: "Story", icon: Heart },
  { id: "timeline", label: "Timeline", icon: Camera },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "gifts", label: "Gifts", icon: Gift },
  { id: "venue", label: "Venue", icon: MapPin },
  { id: "rsvp", label: "RSVP", icon: Send },
];

export function FloatingMenu() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -40% 0px" },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop rail */}
      <motion.nav
        aria-label="Section navigation"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="glass fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-full p-2 md:flex"
      >
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            aria-label={label}
            className={cn(
              "group relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-400",
              activeId === id
                ? "bg-primary text-primary-foreground"
                : "text-primary hover:bg-secondary",
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {label}
            </span>
          </button>
        ))}
      </motion.nav>

      {/* Mobile bar */}
      <nav
        aria-label="Section navigation"
        className="glass fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full px-2 py-2 md:hidden"
      >
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            aria-label={label}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              activeId === id
                ? "bg-primary text-primary-foreground"
                : "text-primary",
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </nav>
    </>
  );
}
