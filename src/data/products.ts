export interface Product {
  id: string;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  badgeKa?: string;
  badgeEn?: string;
  badgeRu?: string;
  descriptionKa: string;
  descriptionEn: string;
  descriptionRu: string;
  weightKa: string;
  weightEn: string;
  weightRu: string;
  price: number;
  image: string;
}

// Higher priced products listed first (40 GEL then 35 GEL)
export const PRODUCTS: Product[] = [
  {
    id: "may_honey",
    nameKa: "მაისის რჩეული თაფლი",
    nameEn: "May Blossom Reserve Honey",
    nameRu: "Майский отборный мёд",
    badgeKa: "შეზღუდული მარაგი",
    badgeEn: "Limited Reserve",
    badgeRu: "Лимитированный сбор",
    descriptionKa: "გაზაფხულის პირველი, ნაზი ნექტარი — მსუბუქი ყვავილოვანი ბუკეტითა და ოქროსფერი გამჭვირვალობით.",
    descriptionEn: "First spring harvest — light floral bouquet with golden clarity.",
    descriptionRu: "Первый весенний сбор — светлый, нежный и с тонким цветочным ароматом.",
    weightKa: "1.5 კგ",
    weightEn: "1.5 kg",
    weightRu: "1.5 кг",
    price: 40,
    image: "/may-honey-premium-quality.png",
  },
  {
    id: "honey_jar_comb",
    nameKa: "ფიჭიანი თაფლი ქილით",
    nameEn: "Raw Honey Jar with Honeycomb",
    nameRu: "Мёд с сотами в банке",
    badgeKa: "პრემიუმ არჩევანი",
    badgeEn: "Artisanal Choice",
    badgeRu: "Премиум выбор",
    descriptionKa: "ნატურალური ქორფა ფიჭის მოზრდილი ნაჭრები გაჟღენთილი სუფთა მინდვრის თაფლში.",
    descriptionEn: "Fresh virgin honeycomb chunks submerged in golden liquid honey.",
    descriptionRu: "Кусочки свежих медовых сот в чистом золотистом цветочном мёде.",
    weightKa: "1.5 კგ",
    weightEn: "1.5 kg",
    weightRu: "1.5 кг",
    price: 40,
    image: "/natural-raw-honey-with-honeycomb.png",
  },
  {
    id: "honey",
    nameKa: "მინდვრის ყვავილების თაფლი",
    nameEn: "Wild Meadow & Linden Honey",
    nameRu: "Луговой цветочный и липовый мёд",
    badgeKa: "ბესტსელერი",
    badgeEn: "Bestseller",
    badgeRu: "Хит продаж",
    descriptionKa: "სოფელ კოდისწყაროს ველური მინდვრის ყვავილებისა და ცაცხვის 100% ნატურალური ნექტარი.",
    descriptionEn: "100% raw unheated wildflower & linden nectar from Kodistskharo.",
    descriptionRu: "100% сырой мёд диких луговых цветов и липы из села Кодисцкаро.",
    weightKa: "1.5 კგ",
    weightEn: "1.5 kg",
    weightRu: "1.5 кг",
    price: 35,
    image: "/honey.jpg",
  },
  {
    id: "crystallized",
    nameKa: "დაკრისტალებული თაფლი",
    nameEn: "Naturally Crystallized Raw Honey",
    nameRu: "Кристаллизованный мёд",
    badgeKa: "კრემისებრი",
    badgeEn: "Velvet Cream",
    badgeRu: "Кремовый",
    descriptionKa: "ხავერდოვანი, კრემისებრი ტექსტურა, რომელიც პირში დნება — ნაზი კარამელისებრი გემოთი.",
    descriptionEn: "Silky velvet cream texture that melts smoothly with subtle caramel notes.",
    descriptionRu: "Бархатная кремовая текстура, тающая во рту, с нежным карамельным вкусом.",
    weightKa: "1.5 კგ",
    weightEn: "1.5 kg",
    weightRu: "1.5 кг",
    price: 35,
    image: "/crystallized.jpg",
  },
  {
    id: "honeycomb",
    nameKa: "ნატურალური მინდვრის ფიჭა",
    nameEn: "Pure Wild Honeycomb",
    nameRu: "Натуральные медовые соты",
    badgeKa: "პირდაპირ სკიდან",
    badgeEn: "Fresh From Hive",
    badgeRu: "Прямо из улья",
    descriptionKa: "პირდაპირ სკიდან ამოღებული ქორფა ფიჭა — ცვილი, პროპოლისი და უმამესი თაფლი ერთად.",
    descriptionEn: "Fresh virgin honeycomb from the hive — pure beeswax, propolis and raw honey.",
    descriptionRu: "Свежие соты прямо из улья — природный воск, прополис и целебный мёд.",
    weightKa: "1 კგ",
    weightEn: "1 kg",
    weightRu: "1 кг",
    price: 35,
    image: "/new-honeycomb-image-1-1.png",
  },
];

export const WHATSAPP_LINK = "https://wa.me/995558057975?text=%E1%83%92%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0%E1%83%AF%E1%83%9D%E1%83%91%E1%83%90!%20Beenaturals-%E1%83%98%E1%83%A1%20%E1%83%A1%E1%83%90%E1%83%98%E1%83%A2%E1%83%98%E1%83%93%E1%83%90%E1%83%9C%20%E1%83%92%E1%83%AC%E1%83%94%E1%83%A0%E1%83%97%2C%20%E1%83%9B%E1%83%98%E1%83%9C%E1%83%93%E1%83%90%20%E1%83%97%E1%83%90%E1%83%A4%E1%83%9A%E1%83%98%E1%83%A1%20%E1%83%A8%E1%83%94%E1%83%99%E1%83%95%E1%83%94%E1%83%97%E1%83%90";
export const MESSENGER_LINK = "https://m.me/61580550659968";
export const PHONE_NUMBER = "+995558057975";
export const PHONE_DISPLAY = "558 05 79 75";
export const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=61580550659968";
export const INSTAGRAM_LINK = "https://www.instagram.com/beenaturals_ge";
export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/cmhMqw8WcULVZWL37";

export type Language = "ka" | "en" | "ru";

export const getWhatsAppProductLink = (product: Product, lang: Language) => {
  const name = lang === "ka" ? product.nameKa : lang === "en" ? product.nameEn : product.nameRu;
  const weight = lang === "ka" ? product.weightKa : lang === "en" ? product.weightEn : product.weightRu;
  const text = lang === "ka"
    ? `გამარჯობა! Beenaturals-ის საიტიდან გწერთ, მაინტერესებს და მინდა შევუკვეთო: ${name} (${weight}) — ${product.price}₾`
    : lang === "en"
    ? `Hello! I am contacting you from the Beenaturals website, I am interested in ordering: ${name} (${weight}) — ${product.price} GEL`
    : `Здравствуйте! Пишу с сайта Beenaturals, интересует и хочу заказать: ${name} (${weight}) — ${product.price}₾`;
  return `https://wa.me/995558057975?text=${encodeURIComponent(text)}`;
};
