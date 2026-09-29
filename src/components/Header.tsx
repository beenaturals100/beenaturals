import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { WHATSAPP_LINK, MESSENGER_LINK } from "../data/products";

export const Header: React.FC = () => {
  const { language, setLanguage } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(top > 15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const t = {
    home: language === "ka" ? "მთავარი" : language === "en" ? "Home" : "Главная",
    products: language === "ka" ? "პროდუქცია" : language === "en" ? "Products" : "Продукция",
    journey: language === "ka" ? "ჩვენი გზა" : language === "en" ? "Our Journey" : "Наш путь",
    gallery: language === "ka" ? "გალერეა" : language === "en" ? "Gallery" : "Галерея",
    contact: language === "ka" ? "კონტაქტი" : language === "en" ? "Contact" : "Контакт",
    order: language === "ka" ? "შეკვეთა" : language === "en" ? "Order Now" : "Заказать",
  };

  const navLinks = [
    { href: "#", label: t.home, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { href: "#catalog", label: t.products },
    { href: "#journey", label: t.journey },
    { href: "#gallery", label: t.gallery },
    { href: "#contact", label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-[#fffdfa]/95 backdrop-blur-md border-b border-amber-200/60 ${
        scrolled ? "shadow-sm shadow-stone-900/5 py-2" : "py-2.5 sm:py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 no-underline group cursor-pointer"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-300/80 shadow-xs group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300 bg-white p-0.5">
            <img src="/logo.png" alt="Beenaturals" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-serif font-black tracking-tight leading-none text-stone-900 group-hover:text-amber-800 transition-colors">
              Beenaturals
            </span>
            <span className="hidden sm:block text-[9px] font-sans font-bold tracking-[0.18em] uppercase mt-0.5 text-amber-700/90">
              Pure Honey · Real Goodness
            </span>
          </div>
        </a>

        {/* Center Nav — desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick(); } : undefined}
              className="px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider text-stone-700 hover:text-amber-800 hover:bg-amber-100/40 transition-all no-underline cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* 3-Language Switcher — Luxury Flag-Pill Segmented Control */}
          <div className="inline-flex items-center p-0.5 sm:p-1 rounded-full bg-[#f4ece0] border border-amber-300/70 shadow-inner shrink-0">
            {(["ka", "en", "ru"] as const).map((lang) => {
              const items = {
                ka: { code: "GEO", short: "GE", flag: "🇬🇪" },
                en: { code: "ENG", short: "EN", flag: "🇬🇧" },
                ru: { code: "RUS", short: "RU", flag: "🇷🇺" },
              };
              const isActive = language === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  type="button"
                  aria-label={`Select language ${items[lang].code}`}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-stone-900 text-amber-300 font-black shadow-sm border border-amber-400/40 tracking-wider"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/60 font-semibold"
                  }`}
                >
                  <span className="text-[11px] sm:text-[13px] leading-none">{items[lang].flag}</span>
                  <span className="leading-none hidden sm:inline">{items[lang].code}</span>
                  <span className="leading-none sm:hidden inline font-bold">{items[lang].short}</span>
                </button>
              );
            })}
          </div>

          {/* Direct Order CTA Button */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full cursor-pointer bg-stone-900 hover:bg-black text-amber-300 hover:text-amber-200 border border-amber-400/40 font-sans font-bold text-xs shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 no-underline"
          >
            <span>{t.order}</span>
            <svg className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-amber-800 hover:bg-amber-100/60 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fffdfa] border-t border-amber-200/60 shadow-xl px-4 py-5">
          {/* Mobile Language Switcher Row */}
          <div className="mb-4 pb-4 border-b border-amber-100 flex items-center justify-between">
            <span className="text-xs font-sans font-bold text-stone-500 uppercase tracking-wider">
              {language === "ka" ? "ენა" : language === "en" ? "Language" : "Язык"}
            </span>
            <div className="inline-flex items-center p-1 rounded-full bg-[#f4ece0] border border-amber-300/70">
              {(["ka", "en", "ru"] as const).map((lang) => {
                const items = {
                  ka: { code: "GEO", flag: "🇬🇪" },
                  en: { code: "ENG", flag: "🇬🇧" },
                  ru: { code: "RUS", flag: "🇷🇺" },
                };
                const isActive = language === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                    }}
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans transition-all ${
                      isActive
                        ? "bg-stone-900 text-amber-300 font-bold shadow-xs border border-amber-400/40"
                        : "text-stone-600 hover:text-stone-900 font-medium"
                    }`}
                  >
                    <span>{items[lang].flag}</span>
                    <span>{items[lang].code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-sans font-bold text-stone-800 hover:bg-amber-50 hover:text-amber-800 transition-colors no-underline"
              >
                <span>{link.label}</span>
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-amber-100 space-y-2.5">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-stone-900 hover:bg-black text-amber-300 font-sans font-bold text-sm rounded-xl shadow-xs border border-amber-500/40 no-underline"
            >
              <span>{t.order}</span>
            </a>
            <a
              href={MESSENGER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white text-stone-800 hover:bg-stone-50 font-sans font-bold text-sm rounded-xl shadow-xs border border-stone-200 no-underline"
            >
              <span>Messenger</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
