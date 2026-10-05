import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import {
  WHATSAPP_LINK,
  PHONE_NUMBER,
  PHONE_DISPLAY,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
} from "./data/products";
import { Header } from "./components/Header";
import { ProductCatalog } from "./components/ProductCatalog";
import { GallerySection } from "./components/GallerySection";
import { LegalModal } from "./components/LegalModal";

const AppContent: React.FC = () => {
  const { language } = useCart();
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalActiveTab, setLegalActiveTab] = useState<"privacy" | "terms">("privacy");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect when customer scrolls UP to reveal scroll-to-top button
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 300 && currentY < lastY - 5) {
        setShowScrollTop(true);
      } else if (currentY <= 200 || currentY > lastY + 10) {
        setShowScrollTop(false);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openLegalModal = (tab: "privacy" | "terms") => {
    setLegalActiveTab(tab);
    setIsLegalModalOpen(true);
  };

  // Trilingual string helper: GEO / ENG / RUS
  const t = (ka: string, en: string, ru: string): string =>
    language === "ka" ? ka : language === "en" ? en : ru;

  // Trilingual ReactNode helper: GEO / ENG / RUS
  const tNode = (ka: React.ReactNode, en: React.ReactNode, ru: React.ReactNode): React.ReactNode =>
    language === "ka" ? ka : language === "en" ? en : ru;

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] w-full overflow-x-clip pt-[54px] sm:pt-[58px]">
      <Header />

      {/* =====================================================================
          1. HERO SECTION — Modern, Sexy Editorial Luxury Presence
      ====================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf6ee] via-[#fffdfa] to-[#f7eedf] border-b border-amber-200/50 pt-5 sm:pt-7 lg:pt-9 pb-12 sm:pb-16 lg:pb-20" id="hero">
        {/* Subtle ambient warm aura */}
        <div className="absolute top-10 left-1/4 w-[32rem] h-[32rem] bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute bottom-5 right-10 w-[28rem] h-[28rem] bg-honey-200/25 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column — Seductive, Authentic Copywriting */}
            <div className="lg:col-span-6 flex flex-col items-start">
              {/* Refined Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] mb-4 sm:mb-5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>
                  {t(
                    "100% ნატურალური თაფლი · საოჯახო საფუტკრე",
                    "100% Raw Artisanal Honey · Family Apiary",
                    "100% Сырой мёд · Семейная пасека"
                  )}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[1.85rem] sm:text-5xl lg:text-[3.4rem] font-serif font-black text-stone-900 leading-[1.15] mb-4 sm:mb-6 tracking-tight">
                {tNode(
                  <>
                    ნატურალური{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-honey-600 to-amber-700 bg-clip-text text-transparent">
                      თაფლი
                    </span>
                  </>,
                  <>
                    Pure{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-honey-600 to-amber-700 bg-clip-text text-transparent">
                      Honey
                    </span>
                  </>,
                  <>
                    Натуральный{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-honey-600 to-amber-700 bg-clip-text text-transparent">
                      мёд
                    </span>
                  </>
                )}
              </h1>

              {/* Selling Subtitle */}
              <p className="text-sm sm:text-lg text-stone-700 font-sans leading-relaxed max-w-xl mb-6 sm:mb-8">
                {t(
                  "Beenaturals - 100% ნატურალური ფუტკრის პროდუქტები.",
                  "Beenaturals - 100% Natural Bee Products.",
                  "Beenaturals — 100% натуральные продукты пчеловодства."
                )}
              </p>

              {/* High-End Order Buttons — WhatsApp + Messenger */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 sm:mb-8 w-full sm:w-auto">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-stone-900 hover:bg-black text-amber-300 hover:text-amber-200 font-sans font-bold text-sm sm:text-base rounded-2xl border border-amber-500/40 shadow-xl shadow-stone-950/20 hover:shadow-2xl hover:border-amber-400 hover:-translate-y-0.5 transition-all duration-300 no-underline cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </span>
                  <span>{t("შეკვეთა WhatsApp-ით", "Order on WhatsApp", "Заказать в WhatsApp")}</span>
                  <svg className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <a
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 bg-white hover:bg-stone-50 text-stone-800 font-sans font-bold text-sm sm:text-base rounded-2xl border border-stone-300/80 shadow-sm hover:shadow-md transition-all duration-200 no-underline cursor-pointer"
                >
                  <svg className="w-5 h-5 shrink-0 text-[#0084FF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z" />
                  </svg>
                  <span>Messenger</span>
                </a>
              </div>

              {/* Trust statement */}
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-sans text-stone-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{t("0% შაქარი & დანამატები", "0% Sugar & Additives", "0% Сахара и добавок")}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{t("ხელით მოპოვებული", "100% Hand Harvested", "Собрано вручную")}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{t("სწრაფი მიწოდება", "Fast Delivery Across Georgia", "Быстрая доставка")}</span>
                </span>
              </div>
            </div>

            {/* Right Column — Product Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -inset-3 bg-gradient-to-tr from-amber-400/20 via-honey-300/25 to-amber-200/10 rounded-3xl blur-2xl -z-10"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/15 border-4 border-white/90 group">
                  <img
                    src="/hero-product.jpg"
                    alt={t("Beenaturals — ნატურალური ქართული თაფლი", "Beenaturals — Pure Georgian Honey", "Beenaturals — натуральный мёд")}
                    className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-700"
                    loading="eager"
                  />

                  {/* Top Cursive Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl border border-amber-200/80 flex items-center gap-1.5 sm:gap-2">
                    <span className="text-base sm:text-lg">🐝</span>
                    <span className="font-serif italic font-bold text-xs sm:text-base text-amber-950 leading-tight">
                      {t("ბუნების საჩუქარი ♡", "Nature's Gift ♡", "Дар природы ♡")}
                    </span>
                  </div>

                  {/* Bottom Origin Pill */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-stone-900/90 backdrop-blur-sm text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-sans font-bold flex items-center gap-1.5 shadow-lg">
                    <span className="text-amber-400">🌿</span>
                    <span>{t("კოდისწყარო · შიდა ქართლი", "Kodistskharo · Shida Kartli", "Кодисцкаро · Шида Картли")}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          2. PRODUCT CATALOG — Higher priced first, pre-filled WhatsApp link
      ====================================================================== */}
      <ProductCatalog />

      {/* =====================================================================
          4. STORY BANNER — Editorial Banner
      ====================================================================== */}
      {/* =====================================================================
          4. STORY BANNER — Editorial Banner
      ====================================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-24 bg-gradient-to-r from-[#211710] via-[#2d1e13] to-[#1c120a] text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <span className="w-8 h-0.5 bg-amber-400 inline-block"></span>
                <span className="text-amber-300 font-sans text-xs font-bold uppercase tracking-widest">
                  {t("ჩვენი ამბავი", "Our Heritage", "Наша история")}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight mb-4 sm:mb-5">
                {t("სუფთა ბუნება თქვენს ოჯახში", "Pure Nature In Your Family", "Чистая природа в вашем доме")}
              </h2>
              <p className="text-stone-300 font-sans text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                {t(
                  "Beenaturals-ის თაფლი არის ბუნების საუკეთესო საჩუქარი — სუფთა, ნატურალური და არა მხოლოდ უგემრიელესი, არამედ სასარგებლო თქვენი და თქვენი საყვარელი ადამიანების ჯანმრთელობისთვის. ყოველი წვეთი გაჯერებულია შიდა ქართლის მზისა და მინდვრის ყვავილების ენერგიით.",
                  "Beenaturals honey is nature's finest gift — pure, raw, and deeply nourishing for you and your loved ones. Every drop captures the warm sunlight and wild floral diversity of Shida Kartli's open terraces.",
                  "Мёд Beenaturals — истинный дар природы: чистый, сырой и невероятно полезный для здоровья вас и ваших близких. Каждая капля хранит тепло солнца Шида Картли и живительную силу луговых трав и липы."
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href="#journey"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-honey-600 hover:from-amber-400 hover:to-honey-500 text-stone-950 font-sans font-black text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-xl no-underline cursor-pointer"
                >
                  <span>{t("ჩვენი გზა & საფუტკრე", "Discover Our Apiary", "Наша пасека и путь")}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans font-bold text-sm transition-all no-underline cursor-pointer"
                >
                  <span>{t("მოგვწერეთ WhatsApp-ზე", "Chat On WhatsApp", "Написать в WhatsApp")}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/30 group">
                <img
                  src="/1-organic-raw-honey-and-honeycomb-premium-quality.jpg"
                  alt={t("ნატურალური თაფლი ქილებში", "Raw Honey Jars", "Натуральный мёд в банках")}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-xs font-sans font-bold">
                  <span>🐝 {t("კოდისწყაროს საფუტკრე", "Kodistskharo Apiary", "Пасека Кодисцкаро")}</span>
                  <span className="text-amber-300">100% Raw & Pure</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          5. "ჩვენი გზა & წარმოება" — Parallax BG with Headings ASIDE the icon
      ====================================================================== */}
      <section id="journey" className="process-section relative py-12 sm:py-24 overflow-hidden text-white">
        <div className="process-bg"></div>
        <div className="process-overlay"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="inline-block text-amber-300 font-sans font-bold tracking-widest text-xs uppercase bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/25 mb-3 backdrop-blur-sm">
              {t("ჩვენი გზა & წარმოება", "Our Journey & Craft", "Наш путь и производство")}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black leading-tight text-white mb-3 sm:mb-5">
              {t(
                "შიდა ქართლის მინდვრებიდან თქვენს მაგიდამდე",
                "From Wildflower Meadows To Your Table",
                "С цветущих лугов Шида Картли к вашему столу"
              )}
            </h2>
            <p className="text-stone-300 font-sans text-sm sm:text-lg leading-relaxed">
              {t(
                "ჩვენი საფუტკრე მდებარეობს კასპის რაიონში, სოფელ კოდისწყაროში (ზღვის დონიდან 740 მ). ფუტკრები ნექტარს აგროვებენ ღია სასოფლო-სამეურნეო ტერასებზე, სტეპურ მზიან გარემოში გაშლილი მინდვრის ველური ყვავილებიდან და ცაცხვიდან. ყოველი ქილა იწურება ტრადიციული ხელით მეთოდებით — ნატურალური, გაუცხელებელი, სავსე ბუნებრივი ენერგიით.",
                "Our family apiary is located in Kodistskharo village, Kaspi district (740m elevation), amidst open sun-drenched terraces on the Shida Kartli plains. Bees forage wild meadow blossoms and fragrant linden with zero heating or processing.",
                "Наша пасека расположена в селе Кодисцкаро, Каспский район (740 м над уровнем моря). Пчёлы собирают нектар с дикорастущих луговых трав и липы на открытых солнечных террасах Шида Картли. Традиционный ручной отжим без нагрева."
              )}
            </p>
          </div>

          {/* 4 Craft Process Steps — HEADINGS ASIDE THE ICON (User explicit request!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
            {[
              {
                step: "01",
                icon: "🌿",
                title: t("სოფელი კოდისწყარო", "Kodistskharo Apiary", "Село Кодисцкаро"),
                desc: t(
                  "კასპის რაიონი (740 მ) — ფუტკრები ნექტარს აგროვებენ მინდვრის ველური ყვავილებიდან და ცაცხვიდან.",
                  "Kaspi district (740m elevation) — bees forage wild meadow blossoms and fragrant linden.",
                  "Каспский район (740 м) — сбор нектара с дикорастущих луговых трав и липы."
                ),
              },
              {
                step: "02",
                icon: "🐝",
                title: t("ბუნებრივი მომწიფება", "Natural Maturation", "Естественное созревание"),
                desc: t("თაფლი სკაში ბუნებრივად მწიფდება ფუტკრების მიერ დაცულ ფიჭაში.", "Honey ripens naturally inside virgin comb cells protected by bees.", "Мёд созревает в улье в идеальных природных условиях."),
              },
              {
                step: "03",
                icon: "🍯",
                title: t("ხელით მოპოვება", "Hand Harvesting", "Ручной отжим"),
                desc: t("0% შაქარი — ვინარჩუნებთ ყველა ცოცხალ სამკურნალო თვისებას.", "Zero added sugar — preserving pure raw medicinal qualities.", "0% сахара — сохраняются все живые целебные свойства."),
              },
              {
                step: "04",
                icon: "🏡",
                title: t("თქვენს ოჯახში", "Direct To You", "В ваш дом"),
                desc: t("ჩამოისხმება სუფთა მინის ქილებში და მოდის პირდაპირ თქვენს კართან.", "Poured into clean glass jars and delivered straight to your door.", "Разливается в стекло и доставляется к вашей двери."),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Heading placed ASIDE the icon */}
                <div className="flex items-center gap-3 sm:gap-3.5 mb-2.5 sm:mb-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-amber-400 uppercase tracking-widest block leading-none mb-1">
                      {item.step}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-serif font-black text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="bg-stone-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-black text-amber-400 mb-0.5 sm:mb-1">100%</div>
                <div className="text-[11px] sm:text-xs text-stone-300 font-sans font-medium uppercase tracking-wider">
                  {t("სუფთა & ნატურალური", "Pure & Raw", "Натуральный и сырой")}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-black text-amber-400 mb-0.5 sm:mb-1">0%</div>
                <div className="text-[11px] sm:text-xs text-stone-300 font-sans font-medium uppercase tracking-wider">
                  {t("შაქარი ან დანამატი", "Sugar or Additives", "Сахара и добавок")}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-black text-amber-400 mb-0.5 sm:mb-1">740 მ</div>
                <div className="text-[11px] sm:text-xs text-stone-300 font-sans font-medium uppercase tracking-wider">
                  {t("ზღვის დონიდან · კოდისწყარო", "740m Elevation · Kodistskharo", "740 м над у.м. · Кодисцкаро")}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-black text-amber-400 mb-0.5 sm:mb-1">24/7</div>
                <div className="text-[11px] sm:text-xs text-stone-300 font-sans font-medium uppercase tracking-wider">
                  {t("WhatsApp მხარდაჭერა", "WhatsApp Support", "Поддержка в WhatsApp")}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          6. DEDICATED MODERN GALLERY SECTION (Both Videos + Authentic Photos)
      ====================================================================== */}
      <GallerySection />



      {/* =====================================================================
          8. CONTACT SECTION
      ====================================================================== */}
      <section id="contact" className="pt-10 sm:pt-16 pb-12 sm:pb-24 bg-[#faf7ef] border-t-2 border-amber-400/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-2.5 sm:mb-3">
              <span className="w-8 sm:w-14 h-0.5 bg-amber-500 rounded-full inline-block"></span>
              <span className="inline-block text-amber-900 font-sans font-bold tracking-widest text-xs uppercase bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300 shadow-xs">
                {t("კონტაქტი", "Contact", "Контакты")}
              </span>
              <span className="w-8 sm:w-14 h-0.5 bg-amber-500 rounded-full inline-block"></span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 leading-tight">
              {t("დაგვიკავშირდით და შეუკვეთეთ", "Get In Touch & Order", "Свяжитесь с нами и сделайте заказ")}
            </h2>
            <p className="text-stone-600 font-sans text-xs sm:text-base mt-1.5 max-w-xl mx-auto">
              {t(
                "შეკვეთების მიღება და კონსულტაცია WhatsApp-სა და Messenger-ში. სწრაფი მიწოდება მთელ საქართველოში.",
                "Orders and inquiries via WhatsApp and Messenger. Fast delivery across Georgia.",
                "Приём заказов и консультации через WhatsApp и Messenger. Быстрая доставка по всей Грузии."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            
            {/* Direct channels card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-black text-xl text-stone-900 mb-5">
                  {t("სწრაფი კავშირი", "Direct Order Channels", "Прямая связь")}
                </h3>

                <div className="space-y-3.5">
                  {/* WhatsApp */}
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#faf7f2] hover:bg-[#f5ede0] border border-amber-200/80 hover:border-amber-400 text-stone-800 transition-all no-underline group shadow-xs"
                  >
                    <div className="w-11 h-11 rounded-xl bg-stone-900 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                      <span className="text-[11px] text-amber-800 font-sans font-bold uppercase tracking-wider block">WhatsApp Direct</span>
                      <span className="text-sm font-sans font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {t("მოგვწერეთ WhatsApp-ზე", "Chat on WhatsApp", "Написать в WhatsApp")}
                      </span>
                    </div>
                  </a>

                  {/* Messenger */}
                  <a
                    href={FACEBOOK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 text-stone-800 transition-colors no-underline group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0084FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z"/></svg>
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-500 font-sans block">Facebook Messenger</span>
                      <span className="text-sm font-sans font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
                        {t("მოგვწერეთ Messenger-ში", "Chat on Messenger", "Написать в Messenger")}
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-stone-800 transition-colors no-underline group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 text-lg">
                      📞
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-500 font-sans block">{t("დაგვირეკეთ", "Call Directly", "Позвонить")}</span>
                      <span className="text-sm font-sans font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {PHONE_DISPLAY}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Socials card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-md flex flex-col justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base mb-2">
                  {t("ლოკაცია & მიწოდება", "Location & Delivery", "Локация и доставка")}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  📍 {t("თბილისი, საქართველო", "Tbilisi, Georgia", "Тбилиси, Грузия")}
                  <br />
                  🚚 {t("სწრაფი მიწოდება მთელ თბილისში (საბურთალო, ვაკე, დიღომი, გლდანი, ისანი და სხვ.)", "Fast delivery across all Tbilisi districts & Georgia", "Быстрая доставка по всем районам Тбилиси и Грузии")}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-sans font-bold uppercase tracking-wider">
                  {t("გამოგვყევით", "Follow Us", "Соцсети")}
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={FACEBOOK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-colors no-underline"
                    aria-label="Facebook"
                  >
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  </a>
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10 hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-[#DD2A7B] hover:text-white flex items-center justify-center transition-colors no-underline"
                    aria-label="Instagram"
                  >
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-black text-amber-300 border border-amber-500/40 flex items-center justify-center transition-colors no-underline shadow-xs"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          9. FOOTER
      ====================================================================== */}
      <footer className="bg-[#121110] text-stone-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-2 border-amber-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-14">
            
            {/* Col 1: Brand Info */}
            <div className="col-span-2 md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/50 bg-white p-0.5">
                  <img src="/logo.png" alt="Beenaturals" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <span className="text-white font-serif font-black text-xl block leading-tight">Beenaturals</span>
                  <span className="text-amber-400 text-[10px] font-sans font-bold uppercase tracking-widest">
                    Pure Honey · Real Goodness
                  </span>
                </div>
              </div>

              
              <div className="flex items-center gap-3">
                <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-[#1877F2] text-stone-400 hover:text-white flex items-center justify-center transition-colors no-underline" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-[#DD2A7B] text-stone-400 hover:text-white flex items-center justify-center transition-colors no-underline" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-black text-stone-400 hover:text-amber-300 border border-stone-800 hover:border-amber-400/40 flex items-center justify-center transition-colors no-underline" aria-label="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            {/* Col 2: Categories (aside Navigation on mobile) */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider mb-4">
                {t("კატეგორიები", "Categories", "Категории")}
              </h4>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm">
                <li><a href="#catalog" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("მაისის თაფლი", "May Honey", "Майский мёд")}</a></li>
                <li><a href="#catalog" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("ფიჭიანი თაფლი", "Honey with Comb", "Мёд с сотами")}</a></li>
                <li><a href="#catalog" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("ყვავილების თაფლი", "Meadow Honey", "Цветочный мёд")}</a></li>
                <li><a href="#catalog" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("ნატურალური ფიჭა", "Raw Honeycomb", "Натуральные соты")}</a></li>
              </ul>
            </div>

            {/* Col 3: Navigation (aside Categories on mobile) */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider mb-4">
                {t("ნავიგაცია", "Navigation", "Навигация")}
              </h4>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm">
                <li><a href="#" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("მთავარი", "Home", "Главная")}</a></li>
                <li><a href="#catalog" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("პროდუქცია", "Products", "Продукция")}</a></li>
                <li><a href="#journey" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("ჩვენი გზა", "Our Journey", "Наш путь")}</a></li>
                <li><a href="#gallery" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("გალერეა", "Gallery", "Галерея")}</a></li>
                <li><a href="#contact" className="text-stone-400 hover:text-amber-400 transition-colors no-underline block">{t("კონტაქტი", "Contact", "Контакт")}</a></li>
              </ul>
            </div>

            {/* Col 4: Quick Order */}
            <div className="col-span-2 md:col-span-4">
              <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider mb-4">
                {t("შეკვეთა მესენჯერებით", "Order Direct", "Заказ в мессенджерах")}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                {t(
                  "მოგვწერეთ WhatsApp-ზე ან Messenger-ზე სასურველი პროდუქტი — მიწოდება ხორციელდება მთელი საქართველოს მასშტაბით.",
                  "Message us on WhatsApp or Messenger with the products you desire — prompt door-to-door delivery across Georgia.",
                  "Напишите нам в WhatsApp или Messenger нужный продукт — мы оперативно доставим заказ в любой уголок Грузии."
                )}
              </p>
              <div className="flex gap-2.5">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-stone-900 hover:bg-black text-amber-300 border border-amber-500/40 hover:border-amber-400 text-xs font-bold font-sans rounded-xl text-center no-underline transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs font-bold font-sans rounded-xl text-center no-underline transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <svg className="w-4 h-4 text-[#0084FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z"/></svg>
                  Messenger
                </a>
              </div>

              {/* Privacy Policy & Terms of Use below messengers */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center gap-3 text-xs font-sans">
                <button
                  type="button"
                  onClick={() => openLegalModal("privacy")}
                  className="hover:text-amber-400 cursor-pointer transition-colors bg-transparent border-0 p-0 text-xs text-stone-400 underline underline-offset-4 decoration-stone-700 hover:decoration-amber-400"
                >
                  {t("კონფიდენციალურობა", "Privacy Policy", "Конфиденциальность")}
                </button>
                <span className="text-stone-600">·</span>
                <button
                  type="button"
                  onClick={() => openLegalModal("terms")}
                  className="hover:text-amber-400 cursor-pointer transition-colors bg-transparent border-0 p-0 text-xs text-stone-400 underline underline-offset-4 decoration-stone-700 hover:decoration-amber-400"
                >
                  {t("პირობები", "Terms of Use", "Условия")}
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-stone-800 pt-8 flex justify-center items-center text-xs text-stone-500 font-sans">
            <div>
              © 2026 Beenaturals. {t("ყველა უფლება დაცულია.", "All Rights Reserved.", "Все права защищены.")}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Up Button — Appears at bottom right corner when customer scrolls UP */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-[74px] sm:bottom-20 right-4 sm:right-5 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900/95 hover:bg-black text-amber-300 border border-amber-400/50 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Floating Instant WhatsApp Button — Luxury Round FAB on mobile, Full Pill on Desktop */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-40 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 rounded-full bg-stone-900 hover:bg-black text-amber-300 border border-amber-400/50 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center sm:gap-2.5 no-underline group backdrop-blur-md"
      >
        <span className="w-7 h-7 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform shrink-0">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </span>
        <span className="hidden sm:inline text-xs font-sans font-bold tracking-wide">
          {t("შეკვეთა WhatsApp", "Order on WhatsApp", "Заказ в WhatsApp")}
        </span>
      </a>

      {/* Legal Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        activeTab={legalActiveTab}
        onClose={() => setIsLegalModalOpen(false)}
        onTabChange={setLegalActiveTab}
      />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
