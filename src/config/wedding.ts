/**
 * Single source of truth for the whole invitation.
 * Change anything here — no component edits required.
 * Images live in /public/images and are referenced by path.
 */

export type TimelineItem = {
  time: string;
  title: string;
  description: string;
  icon: "rings" | "glass" | "dinner" | "camera" | "music";
};

export type GalleryItem = { src: string; alt: string };

export const weddingConfig = {
  seo: {
    title: "Olivia & Ralph — Wedding Invitation · May 18, 2025",
    description:
      "You are warmly invited to the wedding of Olivia and Ralph on May 18, 2025 at Our Lady of Lourdes Parish. Ceremony, reception, gallery and RSVP.",
    siteUrl: "https://olivia-and-ralph.lovable.app",
    ogImage: "https://olivia-and-ralph.lovable.app/images/hero.jpg",
  },

  couple: {
    bride: "Olivia",
    groom: "Ralph",
    monogram: { left: "O", right: "R" },
    hashtag: "#RalphandOliviaForever",
    verse:
      "“Isaiah 60:22 — When the time is right, I, the Lord, will make it happen.”",
  },

  date: {
    /** ISO date used for the countdown */
    iso: "2025-05-18T14:00:00+08:00",
    display: "May 18, 2025",
    day: "18",
    month: "MAY",
    year: "2025",
  },

  images: {
    hero: "/images/hero.jpg",
    story: "/images/story.jpg",
    ceremony: "/images/ceremony.jpg",
    reception: "/images/reception.jpg",
  },

  music: {
    /** Drop your own file at /public/music/theme.mp3 */
    src: "/music/theme.mp3",
    title: "Our Song",
  },

  story: {
    title: "Our Love Story",
    paragraphs: [
      "In a coastal town, Olivia, a marine biologist, met Ralph, a fisherman, on the morning her boat broke down. Their shared love for the ocean quickly sparked a deeper connection.",
      "Exploring coves and studying marine life together, they fell in love. One sunset, Ralph confessed his feelings, and Olivia joyfully reciprocated.",
      "Their love story, rooted in a passion for the sea, became a cherished legend in their town — and today it begins a new chapter.",
    ],
  },

  timeline: [
    { time: "2:00 PM", title: "Ceremony", description: "Our Lady of Lourdes Parish", icon: "rings" },
    { time: "4:00 PM", title: "Reception", description: "Cocktails at The Farm", icon: "glass" },
    { time: "5:00 PM", title: "Dinner", description: "Seated dinner & toasts", icon: "dinner" },
    { time: "6:00 PM", title: "Photos", description: "Golden hour portraits", icon: "camera" },
    { time: "7:00 PM", title: "Dance", description: "First dance & party", icon: "music" },
  ] satisfies TimelineItem[],

  gallery: [
    { src: "/images/gallery-1.jpg", alt: "Olivia and Ralph laughing together" },
    { src: "/images/gallery-2.jpg", alt: "Blue and white wedding bouquet" },
    { src: "/images/gallery-3.jpg", alt: "Ralph in a navy suit" },
    { src: "/images/gallery-4.jpg", alt: "Olivia's veil in the wind" },
    { src: "/images/story.jpg", alt: "Holding hands with the ring" },
    { src: "/images/reception.jpg", alt: "Reception tables at dusk" },
  ] satisfies GalleryItem[],

  dressCode: {
    title: "Formal Attire",
    note: "We would love to see you dressed in our palette.",
    palette: [
      { name: "Deep Blue", hex: "#1B3A73" },
      { name: "Cornflower", hex: "#4C7BD9" },
      { name: "Sky", hex: "#A9C6EE" },
      { name: "Beige", hex: "#E8DFCF" },
      { name: "Light Gray", hex: "#DCDEE2" },
      { name: "White", hex: "#FFFFFF" },
    ],
    avoid: ["Red", "Neon", "Black"],
  },

  gifts: {
    text: "With all that we have, we've been truly blessed. Your presence and prayers are all that we request. But if you desire to give nonetheless — a monetary gift is one we request.",
    cardNumber: "4400 4302 1234 5678",
    cardHolder: "Olivia Harrington",
    payLabel: "Open Kaspi",
    payUrl: "https://kaspi.kz",
  },

  venues: {
    ceremony: {
      name: "Our Lady of Lourdes Parish",
      address: "Carpenter Hill, Marbel, South Cotabato",
      time: "2:00 PM",
      image: "/images/ceremony.jpg",
      mapsUrl: "https://maps.google.com/?q=Our+Lady+of+Lourdes+Parish+Marbel",
      embedUrl:
        "https://www.google.com/maps?q=Our+Lady+of+Lourdes+Parish+Marbel&output=embed",
    },
    reception: {
      name: "The Farm @ Carpenter Hill",
      address: "Carpenter Hill, Marbel, South Cotabato",
      time: "4:00 PM",
      image: "/images/reception.jpg",
      mapsUrl: "https://maps.google.com/?q=The+Farm+Carpenter+Hill+Marbel",
      embedUrl:
        "https://www.google.com/maps?q=The+Farm+Carpenter+Hill+Marbel&output=embed",
    },
  },

  rsvp: {
    deadline: "May 1, 2025",
    maxGuests: 6,
  },

  contact: {
    phone: "+7 700 000 00 00",
    email: "hello@oliviaandralph.com",
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
