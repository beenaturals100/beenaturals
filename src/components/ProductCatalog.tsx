import React from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS, getWhatsAppProductLink, FACEBOOK_LINK } from "../data/products";

export const ProductCatalog: React.FC = () => {
  const { language } = useCart();

  const t = {
    badge: language === "ka" ? "პოპულარული კოლექცია" : language === "en" ? "Popular Collection" : "Популярная коллекция",
    title: language === "ka" ? "ჩვენი პროდუქცია" : language === "en" ? "Artisanal Honey & Comb" : "Наша продукция",
    allProducts: language === "ka" ? "ჩვენი გზა & წარმოება →" : language === "en" ? "Our Journey & Apiary →" : "Наш путь и пасека →",
    orderVia: language === "ka" ? "შეკვეთა:" : language === "en" ? "Order:" : "Заказ:",
    gel: "GEL",
  };

  const getProductName = (p: typeof PRODUCTS[0]) =>
    language === "ka" ? p.nameKa : language === "en" ? p.nameEn : p.nameRu;

  const getProductDesc = (p: typeof PRODUCTS[0]) =>
    language === "ka" ? p.descriptionKa : language === "en" ? p.descriptionEn : p.descriptionRu;

  const getProductWeight = (p: typeof PRODUCTS[0]) =>
    language === "ka" ? p.weightKa : language === "en" ? p.weightEn : p.weightRu;

  const getProductBadge = (p: typeof PRODUCTS[0]) =>
    language === "ka" ? p.badgeKa : language === "en" ? p.badgeEn : p.badgeRu;

  return (
    <section id="catalog" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header aligned like the reference design */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-5 border-b border-stone-200/80 gap-4 sm:gap-6">
        <div>
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

        <a
          href="#journey"
          className="group inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-900 font-sans font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 no-underline"
        >
          <span>{t.allProducts}</span>
        </a>
      </div>

      {/* Product Grid — Higher price first (40 GEL then 35 GEL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 max-w-md mx-auto sm:max-w-none">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full bg-gradient-to-b from-[#faf8f5] to-[#f4eee3] p-4 flex items-center justify-center overflow-hidden">
              {/* Tag / Badge if any */}
              {getProductBadge(product) && (
                <div className="absolute top-3.5 right-3.5 z-10 bg-amber-600/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider shadow-xs">
                  {getProductBadge(product)}
                </div>
              )}

              <img
                src={product.image}
                alt={`${getProductName(product)} — Beenaturals`}
                className={`w-full h-full ${
                  product.id === "may" || product.id === "honeycomb-jar"
                    ? "object-contain p-2 drop-shadow-md group-hover:scale-108"
                    : "object-cover rounded-2xl group-hover:scale-105 shadow-xs"
                } transition-transform duration-500 ease-out`}
                loading="lazy"
              />
            </div>

            {/* Product Details */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-serif font-black text-stone-900 text-base sm:text-lg mb-1 leading-snug group-hover:text-amber-800 transition-colors">
                {getProductName(product)}
              </h3>

              <p className="text-[11px] sm:text-xs text-stone-500 font-sans leading-relaxed mb-4 flex-grow min-h-[38px]">
                {getProductDesc(product)}
              </p>

              {/* Price & Weight (kg) Lockup */}
              <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-[1.7rem] font-serif font-black text-stone-950 tracking-tight leading-none">
                    {product.price}
                  </span>
                  <span className="text-xs font-sans font-bold text-amber-800 leading-none">
                    {t.gel}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-950 font-sans text-xs font-bold tracking-wide">
                  <span className="text-amber-700/60 font-normal">/</span>
                  <span>{getProductWeight(product)}</span>
                </div>
              </div>

              {/* Direct Order Actions */}
              <div className="pt-3 border-t border-stone-100 mt-auto">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400 block mb-2 text-center">
                  {t.orderVia}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-2 w-full">
                  {/* WhatsApp Button */}
                  <a
                    href={getWhatsAppProductLink(product, language)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-amber-300 hover:text-amber-200 font-sans font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-500/35 hover:border-amber-400 shadow-sm transition-all no-underline cursor-pointer active:scale-95 group/btn"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0 text-amber-400 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span>WhatsApp</span>
                  </a>

                  {/* Messenger Button */}
                  <a
                    href={FACEBOOK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#faf7f2] hover:bg-[#f3ece0] border border-stone-200/90 hover:border-blue-400/60 text-stone-700 hover:text-blue-600 font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all no-underline cursor-pointer active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#0084FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z"/></svg>
                    <span>Messenger</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
