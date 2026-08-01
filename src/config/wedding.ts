/**
 * Единый источник всех текстов и данных приглашения.
 * Меняйте только этот файл — компоненты трогать не нужно.
 * Изображения лежат в /public/images.
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
    title: "Оливия и Ральф — Приглашение на свадьбу · 18 мая 2025",
    description:
      "Приглашаем вас на свадьбу Оливии и Ральфа 18 мая 2025 года. Программа дня, локации, галерея и дресс-код.",
    siteUrl: "https://olivia-and-ralph.lovable.app",
    ogImage: "https://olivia-and-ralph.lovable.app/images/hero.jpg",
  },

  couple: {
    bride: "Оливия",
    groom: "Ральф",
    monogram: { left: "О", right: "Р" },
    hashtag: "#ОливияИРальфНавсегда",
    verse:
      "«Исаия 60:22 — Когда придёт время, Я, Господь, сделаю это».",
  },

  date: {
    /** ISO-дата для таймера */
    iso: "2025-05-18T14:00:00+08:00",
    display: "18 мая 2025",
    day: "18",
    month: "МАЯ",
    year: "2025",
  },

  images: {
    hero: "/images/hero.jpg",
    story: "/images/story.jpg",
    ceremony: "/images/ceremony.jpg",
    reception: "/images/reception.jpg",
  },

  music: {
    /** Положите свой файл в /public/music/theme.mp3 */
    src: "/music/theme.mp3",
    title: "Наша песня",
  },

  story: {
    title: "Наша история",
    paragraphs: [
      "В маленьком приморском городке Оливия, морской биолог, встретила Ральфа, рыбака, — в то утро, когда её лодка сломалась. Общая любовь к морю сразу связала их.",
      "Они исследовали бухты, изучали морскую жизнь и однажды на закате Ральф признался в своих чувствах. Оливия ответила ему тем же.",
      "Их история, рождённая из любви к морю, стала местной легендой — а сегодня начинается её новая глава.",
    ],
  },

  timeline: [
    { time: "14:00", title: "Церемония", description: "Приход Богоматери Лурдской", icon: "rings" },
    { time: "16:00", title: "Банкет", description: "Welcome-коктейль на «Ферме»", icon: "glass" },
    { time: "17:00", title: "Ужин", description: "Ужин и тёплые тосты", icon: "dinner" },
    { time: "18:00", title: "Фотосессия", description: "Портреты в золотой час", icon: "camera" },
    { time: "19:00", title: "Танцы", description: "Первый танец и вечеринка", icon: "music" },
  ] satisfies TimelineItem[],

  gallery: [
    { src: "/images/gallery-1.jpg", alt: "Оливия и Ральф смеются вместе" },
    { src: "/images/gallery-2.jpg", alt: "Свадебный букет в бело-синих тонах" },
    { src: "/images/gallery-3.jpg", alt: "Ральф в тёмно-синем костюме" },
    { src: "/images/gallery-4.jpg", alt: "Фата Оливии на ветру" },
    { src: "/images/story.jpg", alt: "Руки с обручальным кольцом" },
    { src: "/images/reception.jpg", alt: "Столы банкета на закате" },
  ] satisfies GalleryItem[],

  dressCode: {
    title: "Торжественный стиль",
    note: "Будем рады видеть вас в оттенках нашей палитры.",
    palette: [
      { name: "Тёмно-синий", hex: "#1B3A73" },
      { name: "Василёк", hex: "#4C7BD9" },
      { name: "Небесный", hex: "#A9C6EE" },
      { name: "Бежевый", hex: "#E8DFCF" },
      { name: "Светло-серый", hex: "#DCDEE2" },
      { name: "Белый", hex: "#FFFFFF" },
    ],
    avoid: ["Красный", "Неон", "Чёрный"],
  },

  gifts: {
    envelopeHint: "Нажмите на конверт",
    title: "Дорогие гости!",
    text: "Мы создали группу в Telegram, куда можно добавлять фотографии со свадьбы.\n\nДавайте поделимся друг с другом счастливыми моментами этого прекрасного дня!\n\nНажмите на кнопку ниже, чтобы перейти в группу.",
    telegramLabel: "Открыть Telegram",
    telegramUrl: "https://t.me/+-uRUIlVz1BszNDYy",
  },

  venues: {
    ceremony: {
      name: "Приход Богоматери Лурдской",
      address: "Карпентер Хилл, Марбель, Южный Котабато",
      time: "14:00",
      image: "/images/ceremony.jpg",
      mapsUrl: "https://maps.google.com/?q=Our+Lady+of+Lourdes+Parish+Marbel",
      embedUrl:
        "https://www.google.com/maps?q=Our+Lady+of+Lourdes+Parish+Marbel&output=embed",
    },
    reception: {
      name: "Ферма на Карпентер Хилл",
      address: "Карпентер Хилл, Марбель, Южный Котабато",
      time: "16:00",
      image: "/images/reception.jpg",
      mapsUrl: "https://maps.google.com/?q=The+Farm+Carpenter+Hill+Marbel",
      embedUrl:
        "https://www.google.com/maps?q=The+Farm+Carpenter+Hill+Marbel&output=embed",
    },
  },

  contact: {
    phone: "+7 700 000 00 00",
    email: "hello@oliviaandralph.com",
  },

  /** Все подписи интерфейса — меняйте свободно */
  ui: {
    openScreen: {
      overline: "Свадьба",
      hint: "Нажмите на монограмму, чтобы открыть приглашение",
    },
    hero: { overline: "Свадьба" },
    story: { overline: "Как всё начиналось" },
    countdown: {
      overline: "Считаем дни",
      title: "До нашей свадьбы",
      today: "Сегодня наша свадьба ❤️",
      days: "Дней",
      hours: "Часов",
      minutes: "Минут",
      seconds: "Секунд",
    },
    timeline: {
      overline: "Порядок дня",
      title: "Программа дня",
      subtitle: "От клятв до последнего танца.",
    },
    gallery: { overline: "Моменты", title: "Галерея", close: "Закрыть", prev: "Предыдущее фото", next: "Следующее фото", viewer: "Просмотр фотографий" },
    dressCode: {
      overline: "Дресс-код",
      ladies: "Дамы",
      gentlemen: "Господа",
      colours: "Палитра",
      avoid: "Просим избегать",
    },
    gifts: { overline: "Подарки", title: "Подарки" },
    venue: {
      overline: "Где нас найти",
      title: "Локации",
      subtitle: "Приезжайте разделить с нами этот день — мы очень ждём вас.",
      ceremony: "Церемония",
      reception: "Банкет",
      navigate: "Маршрут",
      openMaps: "Открыть карту",
      mapTitle: "Карта локации",
    },
    music: { on: "Музыка Вкл", off: "Музыка Выкл" },
    footer: { note: "Надеемся, что вы сможете приехать. Благослови вас Бог." },
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
