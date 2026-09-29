import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { PHONE_DISPLAY, PHONE_NUMBER } from "../data/products";

interface LegalModalProps {
  isOpen: boolean;
  activeTab: "privacy" | "terms";
  onClose: () => void;
  onTabChange: (tab: "privacy" | "terms") => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
}) => {
  const { language } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = (ka: string, en: string, ru: string) =>
    language === "ka" ? ka : language === "en" ? en : ru;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl border border-amber-200/80 z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Header with Switcher Tabs */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onTabChange("privacy")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "privacy"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-800"
              }`}
            >
              {t("კონფიდენციალურობა", "Privacy Policy", "Конфиденциальность")}
            </button>
            <button
              type="button"
              onClick={() => onTabChange("terms")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "terms"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-800"
              }`}
            >
              {t("წესები და პირობები", "Terms of Use", "Условия использования")}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Legal Entity Metadata Badge Strip */}
        <div className="pt-3 pb-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-sans">
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2 text-stone-700">
            <span className="block text-[10px] text-amber-800 font-bold uppercase tracking-wider">
              {t("ძალაშია", "Effective Date", "Дата вступления")}
            </span>
            <span className="font-semibold">{t("30 სექტემბერი, 2026", "Sept 30, 2026", "30 сент. 2026")}</span>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2 text-stone-700">
            <span className="block text-[10px] text-amber-800 font-bold uppercase tracking-wider">
              {t("სუბიექტი", "Legal Entity", "Субъект")}
            </span>
            <span className="font-semibold">{t("ინდ. მეწარმე (ი/მ)", "Indiv. Entrepreneur (IE)", "Индивидуальный предприниматель")}</span>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2 text-stone-700">
            <span className="block text-[10px] text-amber-800 font-bold uppercase tracking-wider">
              {t("ვებსაიტი", "Website", "Сайт")}
            </span>
            <a href="https://beenaturals.store" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-800 hover:underline">
              beenaturals.store
            </a>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2 text-stone-700">
            <span className="block text-[10px] text-amber-800 font-bold uppercase tracking-wider">
              {t("კონტაქტი", "Contact", "Контакт")}
            </span>
            <a href={`tel:${PHONE_NUMBER}`} className="font-semibold text-stone-800 hover:underline">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto py-3 pr-2 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
          {activeTab === "privacy" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-black text-stone-900 mb-1.5">
                  {t("კონფიდენციალურობის პოლიტიკა", "Privacy Policy", "Политика конфиденциальности")}
                </h2>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed bg-stone-50 border border-stone-200 rounded-xl p-3">
                  {t(
                    "ეს ვებგვერდი (https://beenaturals.store) იმართება საქართველოში რეგისტრირებული ინდივიდუალური მეწარმის მიერ. ჩვენ ვამუშავებთ პერსონალურ მონაცემებს მკაცრად საქართველოს კანონის „პერსონალურ მონაცემთა დაცვის შესახებ“ მოთხოვნათა შესაბამისად.",
                    "This website (https://beenaturals.store) is operated by a registered Individual Entrepreneur in Georgia. We process personal data strictly in compliance with the Law of Georgia on Personal Data Protection.",
                    "Этот веб-сайт (https://beenaturals.store) управляется зарегистрированным индивидуальным предпринимателем в Грузии. Мы обрабатываем персональные данные в строгом соответствии с Законом Грузии «О защите персональных данных»."
                  )}
                </p>
              </div>

              {/* Policy Sections */}
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">01.</span>
                    {t("მონაცემთა შეგროვება და შეკვეთის არხები", "Data Collection & Order Channels", "Сбор данных и каналы заказа")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "ჩვენ არ ვიღებთ ონლაინ გადახდებს და არ ვამუშავებთ გადახდის ტრანზაქციებს უშუალოდ საიტზე. შეკვეთების გაფორმება და დადასტურება ხდება პირდაპირი კომუნიკაციით WhatsApp-ის ან Facebook Messenger-ის მეშვეობით.",
                      "We do not collect payments or process checkout orders directly on our website. Orders are placed through direct communication on WhatsApp or Facebook Messenger.",
                      "Мы не принимаем онлайн-платежи и не обрабатываем транзакции непосредственно на сайте. Заказы оформляются через прямое общение в WhatsApp или Facebook Messenger."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">02.</span>
                    {t("შეგროვებული ინფორმაცია", "Information Collected", "Собираемая информация")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "მესენჯერებით შეკვეთისას ჩვენ ვითხოვთ მხოლოდ მიწოდებისა და ანგარიშსწორებისთვის აუცილებელ მონაცემებს: სრული სახელი და გვარი, საკონტაქტო ტელეფონის ნომერი, მიწოდების ზუსტი მისამართი, შეკვეთილი პროდუქციის რაოდენობა/შემადგენლობა და გადასახდელი თანხის ოდენობა.",
                      "When ordering via messaging apps, we request only the details necessary to process delivery and settle payment: full name, contact phone number, delivery address, ordered item quantity/products, and total payable amount.",
                      "При заказе через мессенджеры мы запрашиваем только данные, необходимые для доставки и расчёта: имя и фамилию, контактный номер телефона, точный адрес доставки, количество/состав заказа и сумму к оплате."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">03.</span>
                    {t("გადახდის დამუშავება & ტერმინალი", "Payment Processing & POS Terminal", "Способы оплаты и POS-терминал")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "გადახდა ხორციელდება საიტის გარეთ და მოიცავს სამ მოქნილ მეთოდს: 1) პირდაპირი საბანკო გადარიცხვა (საქართველოს ბანკი / Bank of Georgia), 2) ნაღდი ანგარიშსწორება კურიერთან ჩაბარებისას, ან 3) საბანკო ბარათით / POS ტერმინალით ანგარიშსწორება კურიერთან მიწოდებისას. ჩვენ არასდროს ვითხოვთ და არ ვინახავთ საბანკო ბარათების მონაცემებს საიტზე.",
                      "Payments are settled offsite via three convenient options: 1) direct bank transfer (e.g., Bank of Georgia), 2) cash on delivery, or 3) debit/credit card payment via mobile POS terminal upon courier delivery. We never request or store credit card details on the website.",
                      "Оплата производится вне сайта тремя удобными способами: 1) прямой банковский перевод (на счёт Bank of Georgia), 2) наличными курьеру при получении, либо 3) банковской картой через мобильный POS-терминал курьера при доставке. Мы никогда не запрашиваем и не храним данные банковских карт на сайте."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">04.</span>
                    {t("მონაცემთა გამოყენება და შენახვა (Notion CRM)", "Data Usage & Storage (Notion CRM)", "Использование и хранение данных (Notion CRM)")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "თქვენი ინფორმაცია გამოიყენება მკაცრად შეკვეთის შესასრულებლად, კლიენტებთან კომუნიკაციისთვის და მიწოდების ორგანიზებისთვის. შეკვეთის მონაცემები (სახელი, ტელეფონი, მისამართი, შეკვეთილი პროდუქცია, თანხა) უსაფრთხოდ ინახება ჩვენს შიდა საოპერაციო CRM სისტემაში (Notion-ის ბაზაში) ექსკლუზიურად შეკვეთების ისტორიის წარმოების, მომსახურების ხარისხის კონტროლისა და შემოსავალი/ხარჯების ბუღალტრული აღრიცხვის მიზნით. ჩვენ არ ვიყენებთ თქვენს მონაცემებს სპამ მარკეტინგისთვის და არ ვყიდით/გადავცემთ მათ გარე მესამე პირებს.",
                      "Your information is used strictly to fulfill orders, communicate about delivery status, and coordinate delivery across Georgia. Order data (name, phone, address, items ordered, total amount) is securely stored in our internal operational CRM database (Notion) solely for maintaining order history, customer support, and financial revenue/expense accounting. We do not use your information for email marketing or sell it to third parties.",
                      "Ваша информация используется исключительно для выполнения заказов, связи с вами и организации доставки. Данные заказа (имя, телефон, адрес, состав заказа, сумма) надёжно сохраняются в нашей внутренней операционной CRM-системе (на платформе Notion) строго для ведения истории заказов, клиентской поддержки и бухгалтерского учёта доходов/расходов. Мы не используем информацию для спама и никому её не продаём."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">05.</span>
                    {t("მონაცემთა გადაცემა საკურიერო სერვისისთვის", "Data Sharing with Couriers", "Передача данных курьерской службе")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "შეკვეთის ჩაბარებისა და ანგარიშსწორების მიზნით, ადგილობრივ ქართულ საკურიერო სერვისებს გადაეცემა მხოლოდ მიწოდებისთვის აუცილებელი მონაცემები: მიმღების სახელი, საკონტაქტო ტელეფონი, მისამართი, შეკვეთის რაოდენობა/შემადგენლობა და გადასახდელი თანხის ოდენობა (ნაღდი ან ტერმინალით ანგარიშსწორების შემთხვევაში).",
                      "Solely to complete delivery and collect payment, we share with local Georgian courier services only the necessary dispatch details: recipient full name, contact phone number, delivery address, order items/quantity, and payable amount (in case of cash or POS terminal payment on delivery).",
                      "Исключительно для доставки и проведения оплаты мы передаём локальным курьерским службам Грузии только необходимые данные: имя получателя, контактный телефон, адрес доставки, количество/состав заказа и сумму к оплате (при расчёте наличными или через POS-терминал)."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">06.</span>
                    {t("თქვენი უფლებები", "Your Rights", "Ваши права")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "თქვენ გაქვთ უფლება ნებისმიერ დროს მოითხოვოთ თქვენს პერსონალურ მონაცემებზე წვდომა, მათი შესწორება ან სრული წაშლა მოგვწერეთ ელ-ფოსტაზე: beenaturals100@gmail.com ან პირდაპირ მესენჯერში: +995 558 05 79 75.",
                      "You have the right to request access to, correction of, or deletion of your personal data at any time by contacting beenaturals100@gmail.com or messaging us directly.",
                      "Вы имеете право запросить доступ, исправление или удаление ваших персональных данных в любое время, написав на beenaturals100@gmail.com или напрямую в мессенджер: +995 558 05 79 75."
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-black text-stone-900 mb-1.5">
                  {t("წესები და პირობები", "Terms of Use", "Условия использования")}
                </h2>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed bg-stone-50 border border-stone-200 rounded-xl p-3">
                  {t(
                    "მოცემული წესები არეგულირებს ვებგვერდით (https://beenaturals.store) სარგებლობისა და პროდუქციის გაცნობის პირობებს.",
                    "These terms govern your use of the website (https://beenaturals.store) and the conditions of exploring our artisanal honey products.",
                    "Настоящие условия регулируют использование веб-сайта (https://beenaturals.store) и ознакомление с нашей продукцией."
                  )}
                </p>
              </div>

              {/* Terms Sections */}
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">01.</span>
                    {t("გამოყენების სფერო და შეკვეთა", "Scope & Ordering", "Сфера применения и заказ")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "ვებგვერდი https://beenaturals.store წარმოადგენს პროდუქციის კატალოგს თაფლის, ფიჭის, დინდგელისა (პროპოლისის) და მეფუტკრეობის პროდუქტებისთვის. პროდუქციის შეკვეთა და საბოლოო დადასტურება ხდება უშუალოდ WhatsApp-ის ან Facebook Messenger-ის მეშვეობით.",
                      "https://beenaturals.store serves as a product catalog for honey, propolis, beeswax, and related products. Product orders are finalized and confirmed directly through WhatsApp or Facebook Messenger.",
                      "Сайт https://beenaturals.store служит каталогом натурального мёда, сот, прополиса, воска и сопутствующих продуктов пчеловодства. Заказы оформляются и подтверждаются напрямую через WhatsApp или Facebook Messenger."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">02.</span>
                    {t("ფასები და გადახდის მეთოდები", "Pricing & Payment Methods", "Цены и способы оплаты")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "საიტზე მითითებული ყველა ფასი მოცემულია საქართველოს ეროვნულ ვალუტაში — ლარში (GEL). გადახდა შესაძლებელია სამი მეთოდით: 1) პირდაპირი საბანკო გადარიცხვით (საქართველოს ბანკი), 2) ნაღდი ანგარიშსწორებით კურიერთან ჩაბარებისას, ან 3) საბანკო ბარათით / POS ტერმინალით კურიერთან მიწოდებისას. გადახდის სასურველი ფორმა ზუსტდება და შეთანხმდება ჩატში შეკვეთის დადასტურების მომენტში.",
                      "All listed prices are in Georgian Lari (GEL). Payment can be settled via three methods: 1) direct bank transfer (Bank of Georgia), 2) cash on delivery, or 3) debit/credit card via mobile POS terminal upon courier delivery. Your preferred payment method is confirmed during chat communication.",
                      "Все указанные цены приведены в грузинских лари (GEL). Оплата возможна тремя способами: 1) прямой банковский перевод (на счёт Bank of Georgia), 2) наличными курьеру при получении, либо 3) банковской картой через мобильный POS-терминал курьера при доставке. Выбранный способ оплаты согласовывается в чате при оформлении заказа."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">03.</span>
                    {t("მიწოდება", "Delivery", "Доставка")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "მიწოდება ხორციელდება მთელი საქართველოს მასშტაბით. მიწოდების დეტალები, პირობები და ვადები მოგეწოდებათ ჩატში შეკვეთის დადასტურების მომენტში.",
                      "We deliver nationwide across Georgia. Delivery details and timelines are provided during chat order confirmation.",
                      "Доставка осуществляется по всей территории Грузии. Детали и сроки доставки уточняются при согласовании заказа в чате."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">04.</span>
                    {t("დაზიანებული პროდუქტი და შეტყობინება", "Damaged Goods & Issue Reporting", "Поврежденный товар и рекламации")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "ვინაიდან ჩვენი პროდუქცია მოიცავს საკვებსა და ნატურალურ საშუალებებს, ნებისმიერი ხარვეზის შესახებ შეტყობინება უნდა მოხდეს მიწოდების იმავე დღეს. თუ ამანათი მოვიდა დაზიანებული, გატეხილი ან არასწორი შემადგენლობით, დაუყოვნებლივ შეგვატყობინეთ მიღების დღესვე WhatsApp-ზე (+995 558 05 79 75), Facebook-ზე ან ელ-ფოსტაზე (beenaturals100@gmail.com) ფოტოსურათების თანხლებით.",
                      "Because our products include food and natural remedies, issues must be reported on the same day of delivery. If a package arrives broken, damaged, or incorrect, notify us immediately on the day of delivery via WhatsApp (+995 558 05 79 75), Facebook, or email (beenaturals100@gmail.com) with photo proof.",
                      "Поскольку наши товары являются пищевыми и натуральными продуктами, о любых проблемах необходимо сообщить в день получения заказа. Если посылка повреждена, разбита или состав не соответствует заказу, немедленно свяжитесь с нами в день доставки через WhatsApp (+995 558 05 79 75), Facebook или email (beenaturals100@gmail.com) с фотоподтверждением."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">05.</span>
                    {t("დაბრუნებისა და თანხის ანაზღაურების პოლიტიკა", "Return & Refund Policy", "Возврат и возмещение")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "დაბრუნების, შეცვლისა და თანხის დაბრუნების მოთხოვნები განიხილება ინდივიდუალურად ადმინისტრაციის მიერ მიწოდების დღესვე შეტყობინების საფუძველზე. გახსნილი ან მთლიანობადარღვეული პროდუქცია არ ექვემდებარება დაბრუნებას ჰიგიენისა და უსაფრთხოების ნორმებიდან გამომდინარე.",
                      "Returns, exchanges, and refunds are evaluated on a case-by-case basis by management once reported on the delivery day. Unsealed or opened products cannot be returned for hygiene and safety reasons.",
                      "Возврат, обмен и компенсация рассматриваются индивидуально администрацией при обращении в день доставки. Вскрытая продукция с нарушенной пломбой или упаковкой возврату не подлежит из соображений гигиены и безопасности."
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
                  <h4 className="font-bold text-stone-900 mb-1 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="text-amber-600">06.</span>
                    {t("ინტელექტუალური საკუთრება", "Intellectual Property", "Интеллектуальная собственность")}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {t(
                      "ამ ვებგვერდზე განთავსებული ყველა ფოტომასალა, ვიდეო, ბრენდინგი და ტექსტური შინაარსი ეკუთვნის ექსკლუზიურად საიტის ოპერატორს.",
                      "All images, branding, and content on this website belong exclusively to the site operator.",
                      "Все изображения, элементы брендинга и материалы на этом веб-сайте принадлежат исключительно владельцу сайта."
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Contact Action & Close */}
        <div className="pt-3.5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-stone-500 font-sans">
            <span>beenaturals100@gmail.com</span>
            <span className="mx-2">·</span>
            <span>+995 558 05 79 75</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-sans font-bold text-xs cursor-pointer transition-colors shadow-xs"
          >
            {t("დახურვა", "Close", "Закрыть")}
          </button>
        </div>

      </div>
    </div>
  );
};
