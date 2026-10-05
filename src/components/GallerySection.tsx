import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { WHATSAPP_LINK } from "../data/products";

interface MediaItem {
  id: string;
  type: "photo" | "video";
  src: string;
  thumb?: string;
  category: "apiary" | "honeycomb" | "video";
  titleKa: string;
  titleEn: string;
  titleRu: string;
  descKa: string;
  descEn: string;
  descRu: string;
}

const GALLERY_ITEMS: MediaItem[] = [
  {
    id: "farm",
    type: "photo",
    src: "/beekipingfarm-and-hives.png",
    category: "apiary",
    titleKa: "ჩვენი საფუტკრე კოდისწყაროში",
    titleEn: "Our Apiary in Kodistskharo",
    titleRu: "Наша пасека в селе Кодисцкаро",
    descKa: "ტრადიციული ხის სკები შიდა ქართლის მზიან ველებზე, კასპის რაიონში (740 მ)",
    descEn: "Traditional wooden hives in sunny Shida Kartli plains, Kaspi district (740m)",
    descRu: "Традиционные деревянные ульи на солнечных равнинах Шида Картли, село Кодисцкаро",
  },
  {
    id: "comb-frame",
    type: "photo",
    src: "/1-best-honeycomb-in-georgia.jpg",
    category: "honeycomb",
    titleKa: "ქორფა ფიჭა სკიდან",
    titleEn: "Fresh Virgin Comb From The Hive",
    titleRu: "Свежие соты прямо из улья",
    descKa: "სრულად დაბეჭდილი, უმამესი თაფლით სავსე ფიჭის ჩარჩო",
    descEn: "Fully capped wooden frame dripping with raw virgin honey",
    descRu: "Полностью запечатанная рамка, наполненная целебным мёдом",
  },
  {
    id: "beekeeper",
    type: "photo",
    src: "/beekeeper.jpg",
    category: "apiary",
    titleKa: "ტრადიციული მეფუტკრეობა",
    titleEn: "Authentic Family Beekeeping",
    titleRu: "Традиционное пчеловодство",
    descKa: "სათუთი ზრუნვა თითოეულ ოჯახზე და ხელით მოპოვებული მოსავალი",
    descEn: "Dedicated personal care for every hive, harvested entirely by hand",
    descRu: "Бережная забота о каждой пчелосемье и ручной сбор урожая",
  },
  {
    id: "jars-apiary",
    type: "photo",
    src: "/1-organic-raw-honey-and-honeycomb-premium-quality.jpg",
    category: "apiary",
    titleKa: "Beenaturals ნატურალური თაფლი",
    titleEn: "Beenaturals Raw Honey & Comb",
    titleRu: "Сырой мёд Beenaturals на пасеке",
    descKa: "სუფთა თაფლი და ფიჭა მზის სხივებზე უშუალოდ საფუტკრეში",
    descEn: "Pure honey and comb illuminated by natural sunlight in the apiary",
    descRu: "Чистый мёд и соты в лучах солнца прямо на пасеке",
  },
  {
    id: "bees-close",
    type: "photo",
    src: "/1bees-and-hive.jpg",
    category: "honeycomb",
    titleKa: "მუშა ფუტკრები ფიჭაზე",
    titleEn: "Worker Bees On Fresh Comb",
    titleRu: "Рабочие пчёлы на свежих сотах",
    descKa: "ქართული მთის რუხი ფუტკარი — მსოფლიოში ერთ-ერთი ყველაზე შრომისმოყვარე ჯიში",
    descEn: "Georgian grey mountain bee — renowned worldwide for its gentle nature and long proboscis",
    descRu: "Грузинская серая горная пчела за работой над свежим воском",
  },
];

export const GallerySection: React.FC = () => {
  const { language } = useCart();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fullscreen video modal state
  const [activeVideoModal, setActiveVideoModal] = useState<"bee" | "music" | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalPlaying, setIsModalPlaying] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(false);

  // Video 2 (with music) state
  const musicVideoRef = useRef<HTMLVideoElement>(null);
  const [isMusicVideoPlaying, setIsMusicVideoPlaying] = useState(true);
  const [isMusicVideoMuted, setIsMusicVideoMuted] = useState(true);

  // Video 1 (ambient bees) state
  const beeVideoRef = useRef<HTMLVideoElement>(null);
  const [isBeeVideoPlaying, setIsBeeVideoPlaying] = useState(true);

  const t = {
    badge: language === "ka" ? "ვიზუალური გალერეა" : language === "en" ? "Visual Gallery" : "Визуальная галерея",
    title: language === "ka" ? "რეალური კადრები ჩვენი საფუტკრიდან" : language === "en" ? "Raw Moments From Our Apiary" : "Реальные кадры с нашей пасеки",
    all: language === "ka" ? "ყველა" : language === "en" ? "All" : "Все",
    videos: language === "ka" ? "ვიდეო კადრები (9:16)" : language === "en" ? "Videos (9:16)" : "Видео (9:16)",
    apiary: language === "ka" ? "საფუტკრე" : language === "en" ? "Apiary" : "Пасека",
    honeycomb: language === "ka" ? "ფიჭა & თაფლი" : language === "en" ? "Comb & Honey" : "Соты и мёд",
    openFull: language === "ka" ? "სრულად გახსნა ⛶" : language === "en" ? "Open Fullscreen ⛶" : "Во весь экран ⛶",
    soundOn: language === "ka" ? "ხმის ჩართვა 🔊" : language === "en" ? "Sound On 🔊" : "Включить звук 🔊",
    soundOff: language === "ka" ? "ხმის გამორთვა 🔇" : language === "en" ? "Mute 🔇" : "Выключить звук 🔇",
    play: language === "ka" ? "ჩართვა" : language === "en" ? "Play" : "Пуск",
    pause: language === "ka" ? "პაუზა" : language === "en" ? "Pause" : "Пауза",
    geoBadge: language === "ka" ? "📍 კოდისწყარო (740 მ)" : language === "en" ? "📍 Kodistskharo (740m)" : "📍 Кодисцкаро (740м)",
    video1Title: language === "ka" ? "ცოცხალი ფუტკრები ოქროსფერ ფიჭაზე" : language === "en" ? "Active Bees On Raw Virgin Honeycomb" : "Живые пчёлы на свежих медовых сотах",
    video1Desc: language === "ka"
      ? "ქართული მთის რუხი ფუტკარი აშენებს და ავსებს ქორფა ფიჭას მინდვრისა და ცაცხვის ნექტარით"
      : language === "en"
      ? "Authentic Georgian bees building virgin comb cells and ripening wild meadow & linden nectar"
      : "Грузинские пчёлы запечатывают соты чистейшим зрелым мёдом диких трав и липы",
    video2Title: language === "ka" ? "Beenaturals თაფლის პრეზენტაცია" : language === "en" ? "Beenaturals Honey Showcase & Texture" : "Презентация мёда Beenaturals",
    video2Desc: language === "ka"
      ? "ოქროსფერი ნექტარის ჩამოსხმა, არომატი და საოჯახო მეფუტკრეობის ტრადიციები"
      : language === "en"
      ? "Liquid gold extraction, silky consistency and authentic Georgian traditions"
      : "Розлив золотого нектара, густая бархатная текстура и традиции",
    orderWhatsApp: language === "ka" ? "შეკვეთა WhatsApp-ით" : language === "en" ? "Order via WhatsApp" : "Заказать через WhatsApp",
  };

  const toggleMusicVideoPlay = () => {
    if (!musicVideoRef.current) return;
    if (musicVideoRef.current.paused) {
      musicVideoRef.current.play();
      setIsMusicVideoPlaying(true);
    } else {
      musicVideoRef.current.pause();
      setIsMusicVideoPlaying(false);
    }
  };

  const toggleMusicVideoMute = () => {
    if (!musicVideoRef.current) return;
    musicVideoRef.current.muted = !musicVideoRef.current.muted;
    setIsMusicVideoMuted(musicVideoRef.current.muted);
  };

  const toggleBeeVideoPlay = () => {
    if (!beeVideoRef.current) return;
    if (beeVideoRef.current.paused) {
      beeVideoRef.current.play();
      setIsBeeVideoPlaying(true);
    } else {
      beeVideoRef.current.pause();
      setIsBeeVideoPlaying(false);
    }
  };

  const openVideoModal = (videoType: "bee" | "music") => {
    // Pause background card video to prevent dual sound
    if (musicVideoRef.current) {
      musicVideoRef.current.pause();
      setIsMusicVideoPlaying(false);
    }
    setActiveVideoModal(videoType);
    setIsModalPlaying(true);
    setIsModalMuted(videoType === "bee");
  };

  const closeVideoModal = () => {
    setActiveVideoModal(null);
  };

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setIsModalPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setIsModalPlaying(false);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsModalMuted(modalVideoRef.current.muted);
  };

  const filteredPhotos = GALLERY_ITEMS;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setActiveVideoModal(null);
      } else if (lightboxIndex !== null && filteredPhotos.length > 0) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : null));
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const getItemTitle = (item: MediaItem) =>
    language === "ka" ? item.titleKa : language === "en" ? item.titleEn : item.titleRu;

  const getItemDesc = (item: MediaItem) =>
    language === "ka" ? item.descKa : language === "en" ? item.descEn : item.descRu;

  return (
    <section id="gallery" className="pt-12 sm:pt-24 pb-8 sm:pb-14 bg-[#faf7ef] border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 pb-5 border-b border-stone-200/70">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
            <span className="text-amber-800 font-sans text-xs font-bold uppercase tracking-widest">
              {t.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight">
            {t.title}
          </h2>
        </div>

        {/* ===================================================================
            AUTHENTIC PHOTO MOSAIC (Curated, High-Resolution Real Imagery)
        ==================================================================== */}
        {filteredPhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-14 sm:mb-20">
            {filteredPhotos.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-stone-900 border border-stone-200/80 hover:border-amber-400 ${
                  index === 0 ? "col-span-2 sm:col-span-2 sm:row-span-2 aspect-[16/9] sm:aspect-auto" : "col-span-1 aspect-square sm:aspect-[4/3]"
                }`}
              >
                <img
                  src={item.src}
                  alt={getItemTitle(item)}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                {/* Top Location Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white font-sans text-[10px] font-bold border border-white/10">
                    {t.geoBadge}
                  </span>
                </div>

                {/* View Zoom Icon */}
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  🔍
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <h3 className={`font-serif font-black leading-tight text-white group-hover:text-amber-300 transition-colors ${
                    index === 0 ? "text-lg sm:text-2xl mb-1.5" : "text-sm sm:text-base mb-0.5"
                  }`}>
                    {getItemTitle(item)}
                  </h3>
                  <p className={`text-stone-300 font-sans leading-relaxed line-clamp-2 ${
                    index === 0 ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
                  }`}>
                    {getItemDesc(item)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================================================================
            CINEMATIC DUAL 9:16 VERTICAL REEL SHOWCASE
        ==================================================================== */}
        <div className="pt-10 sm:pt-14 border-t border-stone-200/70">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-sans font-bold border border-amber-300/60 mb-2">
                <span>📱</span>
                <span>{language === "ka" ? "ცოცხალი ვიდეო კადრები (9:16)" : language === "en" ? "Live Video Reels (9:16)" : "Живые видео кадры (9:16)"}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 mb-1.5 mt-2">
                {language === "ka" ? "ვიდეო რეპორტაჟი საფუტკრიდან" : language === "en" ? "Video Report From The Apiary" : "Видеорепортаж с пасеки"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-sans">
                {language === "ka"
                  ? "დააჭირეთ ნებისმიერ ვიდეოს სრულ ეკრანზე გასახსნელად და ხმის მოსასმენად"
                  : language === "en"
                  ? "Click any video card to open in full screen player with sound controls"
                  : "Нажмите на любое видео, чтобы открыть во весь экран и включить звук"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto items-stretch">
              
              {/* VIDEO 1: Bees on Honeycomb (9:16 Reel) */}
              <div
                onClick={() => openVideoModal("bee")}
                className="relative aspect-[9/16] max-w-[340px] sm:max-w-[360px] w-full mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black border-2 border-stone-800 hover:border-amber-400 group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <video
                  ref={beeVideoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  poster="/honeycomb.jpg"
                >
                  <source src="/bees-hive-honeycomb-vidoe-thsi-honeycomb-issooo-beautiful-nosound.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none"></div>

                {/* Top Badges */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 font-sans text-[11px] font-bold uppercase tracking-wider border border-white/10">
                    9:16 Reel · Macro
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBeeVideoPlay();
                    }}
                    className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-amber-300 font-sans text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                  >
                    {isBeeVideoPlaying ? "⏸ " + t.pause : "▶ " + t.play}
                  </button>
                </div>

                {/* Center "Open Fullscreen" hover button */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-stone-900/80 group-hover:bg-amber-500 text-white group-hover:text-stone-950 font-sans font-bold text-xs border border-white/20 group-hover:border-amber-400 shadow-xl backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 flex items-center gap-2">
                    <span>⛶</span>
                    <span>{t.openFull}</span>
                  </div>
                </div>

                {/* Bottom Video Meta */}
                <div className="relative z-10 p-5 text-white">
                  <div className="text-xs text-amber-400 font-sans font-bold tracking-wider uppercase mb-1">
                    {t.geoBadge} · Video 01
                  </div>
                  <h3 className="text-lg font-serif font-black leading-tight text-white group-hover:text-amber-300 transition-colors">
                    {t.video1Title}
                  </h3>
                  <p className="text-xs text-stone-300 font-sans mt-1.5 line-clamp-2 leading-relaxed">
                    {t.video1Desc}
                  </p>
                </div>
              </div>

              {/* VIDEO 2: Honey Showcase (9:16 Reel with Music) */}
              <div
                onClick={() => openVideoModal("music")}
                className="relative aspect-[9/16] max-w-[340px] sm:max-w-[360px] w-full mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black border-2 border-stone-800 hover:border-amber-400 group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <video
                  ref={musicVideoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  poster="/meadow.jpg"
                >
                  <source src="/video-honey-showcase-with-music.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none"></div>

                {/* Top Badges & Controls */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 font-sans text-[11px] font-bold uppercase tracking-wider border border-white/10">
                    9:16 Reel · Sound 🎵
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMusicVideoMute();
                      }}
                      className={`px-2.5 py-1 rounded-full backdrop-blur-md font-sans text-[11px] font-bold border transition-all cursor-pointer ${
                        isMusicVideoMuted
                          ? "bg-black/60 text-stone-300 border-white/10 hover:text-white"
                          : "bg-amber-500 text-stone-950 border-amber-400 font-black shadow-md"
                      }`}
                    >
                      {isMusicVideoMuted ? t.soundOn : t.soundOff}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMusicVideoPlay();
                      }}
                      className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-amber-300 font-sans text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                    >
                      {isMusicVideoPlaying ? "⏸" : "▶"}
                    </button>
                  </div>
                </div>

                {/* Center "Open Fullscreen" hover button */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-stone-900/80 group-hover:bg-amber-500 text-white group-hover:text-stone-950 font-sans font-bold text-xs border border-white/20 group-hover:border-amber-400 shadow-xl backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 flex items-center gap-2">
                    <span>⛶</span>
                    <span>{t.openFull}</span>
                  </div>
                </div>

                {/* Bottom Video Meta */}
                <div className="relative z-10 p-5 text-white">
                  <div className="text-xs text-amber-400 font-sans font-bold tracking-wider uppercase mb-1">
                    {t.geoBadge} · Video 02
                  </div>
                  <h3 className="text-lg font-serif font-black leading-tight text-white group-hover:text-amber-300 transition-colors">
                    {t.video2Title}
                  </h3>
                  <p className="text-xs text-stone-300 font-sans mt-1.5 line-clamp-2 leading-relaxed">
                    {t.video2Desc}
                  </p>
                </div>
              </div>

            </div>
          </div>

</div>

      {/* =====================================================================
          CINEMATIC FULLSCREEN 9:16 VIDEO MODAL PLAYER
      ====================================================================== */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-[420px] aspect-[9/16] max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 bg-black flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Background */}
            <video
              key={activeVideoModal}
              ref={modalVideoRef}
              autoPlay
              playsInline
              loop
              muted={isModalMuted}
              className="absolute inset-0 w-full h-full object-cover"
              src={
                activeVideoModal === "bee"
                  ? "/bees-hive-honeycomb-vidoe-thsi-honeycomb-issooo-beautiful-nosound.mp4"
                  : "/video-honey-showcase-with-music.mp4"
              }
            />

            {/* Gradient Scrims */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/95 pointer-events-none"></div>

            {/* Top Bar Controls */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              {/* Tab Switcher */}
              <div className="flex items-center gap-1 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-sans">
                <button
                  onClick={() => {
                    setActiveVideoModal("bee");
                    setIsModalMuted(true);
                  }}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    activeVideoModal === "bee"
                      ? "bg-amber-500 text-stone-950 shadow-sm"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  🐝 {language === "ka" ? "ფიჭა & ფუტკარი" : language === "en" ? "Bees" : "Пчёлы"}
                </button>
                <button
                  onClick={() => {
                    setActiveVideoModal("music");
                    setIsModalMuted(false);
                  }}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    activeVideoModal === "music"
                      ? "bg-amber-500 text-stone-950 shadow-sm"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  🍯 {language === "ka" ? "თაფლი 🎵" : language === "en" ? "Honey 🎵" : "Мёд 🎵"}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center text-sm font-bold backdrop-blur-md transition-all cursor-pointer border border-white/20 ml-2"
                aria-label="Close fullscreen video"
              >
                ✕
              </button>
            </div>

            {/* Center Tap Area (Tap to Play/Pause) */}
            <div
              className="relative z-10 flex-1 flex items-center justify-center cursor-pointer select-none"
              onClick={toggleModalPlay}
            >
              {!isModalPlaying && (
                <div className="w-16 h-16 rounded-full bg-black/70 border border-amber-400 text-amber-300 flex items-center justify-center text-2xl shadow-xl backdrop-blur-md">
                  ▶
                </div>
              )}
            </div>

            {/* Bottom Meta & Interactive Controls */}
            <div className="relative z-10 p-5 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold text-amber-400 uppercase tracking-widest">
                  {t.geoBadge}
                </span>

                <div className="flex items-center gap-2">
                  {activeVideoModal === "music" && (
                    <button
                      onClick={toggleModalMute}
                      className={`px-2.5 py-1 rounded-full text-xs font-sans font-bold border transition-colors cursor-pointer ${
                        isModalMuted
                          ? "bg-black/60 text-stone-300 border-white/20 hover:text-white"
                          : "bg-amber-500 text-stone-950 border-amber-400"
                      }`}
                    >
                      {isModalMuted ? t.soundOn : t.soundOff}
                    </button>
                  )}
                  <button
                    onClick={toggleModalPlay}
                    className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black text-white text-xs font-sans font-bold border border-white/20 transition-colors cursor-pointer"
                  >
                    {isModalPlaying ? "⏸ " + t.pause : "▶ " + t.play}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif font-black leading-tight text-white">
                  {activeVideoModal === "bee" ? t.video1Title : t.video2Title}
                </h3>
                <p className="text-xs text-stone-300 font-sans mt-1 leading-relaxed">
                  {activeVideoModal === "bee" ? t.video1Desc : t.video2Desc}
                </p>
              </div>

              {/* Direct Quick WhatsApp Order Button */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-sans font-bold text-xs shadow-lg transition-all no-underline cursor-pointer"
              >
                <span>💬</span>
                <span>{t.orderWhatsApp}</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* =====================================================================
          LUXURY FULLSCREEN LIGHTBOX MODAL (FOR PHOTOS)
      ====================================================================== */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black max-h-[75vh] flex items-center justify-center">
              <img
                src={filteredPhotos[lightboxIndex].src}
                alt={getItemTitle(filteredPhotos[lightboxIndex])}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-xl transition-all cursor-pointer border border-white/20 hover:scale-110"
                aria-label="Previous image"
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-xl transition-all cursor-pointer border border-white/20 hover:scale-110"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 sm:top-2 sm:right-2 w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center text-sm font-bold transition-all cursor-pointer z-20"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center max-w-xl text-white">
              <div className="text-[11px] font-sans font-bold text-amber-400 uppercase tracking-widest mb-1">
                {lightboxIndex + 1} / {filteredPhotos.length} · {t.geoBadge}
              </div>
              <h4 className="text-lg sm:text-xl font-serif font-black">
                {getItemTitle(filteredPhotos[lightboxIndex])}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-sans mt-1">
                {getItemDesc(filteredPhotos[lightboxIndex])}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
