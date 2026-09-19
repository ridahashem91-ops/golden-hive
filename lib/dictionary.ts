export type Language = 'en' | 'ar';
import { Product } from '@/data/products';

export const productTranslations: Record<string, { name: string; category: string; description: string; features: string[] }> = {
  "prod-1": {
    name: "عسل الزهور البرية الخام المحفوظ ذهبياً",
    category: "زهور برية خام",
    description: "مستخرج من المروج الجبلية البكر المزهرة بالنفل البري وزهور الجبال. غير مصفى، غير مسخن، وخام للحفاظ على الأنزيمات الطبيعية وحبوب اللقاح والنكهات الزهرية الرقيقة.",
    features: [
      "عسل نقي 100% خام وغير مصفى وغير مسخن",
      "مستدام من مروج الزهور البرية عالية الجودة",
      "غني بمضادات الأكسدة والأنزيمات الطبيعية وحبوب اللقاح الخام",
      "رائحة زهرية رائعة مع لمسة نهائية مخملية ناعمة",
      "يأتي في وعاء زجاجي كهرماني قابل لإعادة الاستخدام ومحمي من الأشعة فوق البنفسجية"
    ]
  },
  "prod-2": {
    name: "عسل مانوكا العضوي المعتمد MGO 550+",
    category: "مانوكا وعلاج طبي",
    description: "مستخرج من الغابات الأصلية النائية وغير الملوثة في نيوزيلندا. معتمد MGO 550+ مما يضمن مستوى استثنائياً من الميثيل جليكوكساال لصحة فائقة ودعم المناعة.",
    features: [
      "عسل مانوكا عالي الفعالية معتمد MGO 550+",
      "محصود ومعبأ في نيوزيلندا تحت إرشادات صارمة",
      "خصائص طبيعية قوية مضادة للبكتيريا ومقوية للمناعة",
      "نكهة كراميل غنية وترابية مع لمسة نهائية قوية",
      "ختم مقاوم للعبث ووعاء حرفي خالي من مادة BPA"
    ]
  },
  "prod-3": {
    name: "عسل الخزامى الحرفي المشبع",
    category: "مشبع وحرفي",
    description: "مشبع ببطء مع براعم الخزامى الفرنسية العضوية الطهي. يخلق مزيجاً سماوياً يرقي الشاي الحرفي وصفات الخبز الدافئة وألواح الأجبان الفاخرة.",
    features: [
      "مشبع بالخزامى الفرنسي العضوية المخصصة للطهي",
      "عملية تشبع باردة لطيفة تحافظ على خصائص العسل الخام",
      "رائحة زهرية مهدئة مثالية لشاي المساء واللاتيه",
      "ممتاز عند رشه على جبن الماعز أو الزبن اليوناني"
    ]
  },
  "prod-4": {
    name: "قرص عسل نقي خام مقطع في إطار خشبي",
    category: "الخلية والهدايا",
    description: "أصفى طريقة لتجربة العسل تماماً كما صنعته النحل. شمع عسل خام صالح للأكل مملوء بعسل الأكاسيا الذهبي السائل. قطعة مركزية مذهلة لأي لوحة شاركوتيري.",
    features: [
      "قرص عسل صالح للأكل طبيعي 100% مباشرة من الخلية",
      "لم تلمسه الآلات أو مرشحات المعالجة",
      "غني بالبروبوليس الطبيعي وشمع العسل النقي",
      "يتضمن سكين تقديم خشبي حرفي"
    ]
  },
  "prod-5": {
    name: "رحيق زهور الأكاسيا العضوية الذهبي",
    category: "زهور برية خام",
    description: "مشهور بلونه الذهبي الصافي كريستالياً وتبلوره البطيء. حلاوة ناعمة، رقيقة وخفيفة لا تطغى أبداً على قهوة الصباح أو المشروبات العشبية.",
    features: [
      "عسل زهور الأكاسيا أحادي المنشأ",
      "يبقى سائلًا لفترة أطول طبيعياً بسبب محتواه العالي من الفركتوز",
      "حلاوة زهرية رقيقة وخفيفة مناسبة للخبز",
      "مؤشر جلايسيمي منخفض مقارنة بالسكريات المكررة"
    ]
  },
  "prod-6": {
    name: "عسل خام مشبع بالقرفة والتوابل",
    category: "مشبع وحرفي",
    description: "مزيج دافئ من عسل الزهور البرية الصيفي الخام المشبع بقرفة سيلان العضوية الحقيقية. مثالي للشوفان، الخبز المحمص، عصير التفاح الساخن، أو تخفيف التهاب الحلق الطبيعي.",
    features: [
      "مشبع بقرفة سيلان العضوية الفاخرة",
      "نكهات توابل عطرية دافئة متوازنة مع حلاوة العسل الغنية",
      "تآزر طبيعي لمضادات الأكسدة المركبات المضادة للالتهابات",
      "مصبوب يدوياً على دفعات حرفية صغيرة"
    ]
  },
  "prod-7": {
    name: "إكسير العافية بغذاء ملكات النحل وحبوب اللقاح",
    category: "مانوكا وعلاج طبي",
    description: "صيغة الحيوية القصوى لدينا التي تجمع بين غذاء ملكات النحل الطازج النقي، وحبوب اللقاح الكثيفة المغذيات، والبروبوليس في العسل العضوي الخام. مصمم لدعم الطاقة والتركيز وطول العمر.",
    features: [
      "يحتوي على غذاء ملكات النحل الطازج النقي 100% وحبوب اللقاح متعددة الزهور",
      "مليء بفيتامينات B والأحماض الأمينية والمغذيات الحيوية",
      "يعزز الطاقة اليومية الطبيعية ومقاومة المناعة",
      "مخلوط على البارد لحماية المركبات الحيوية الحساسة"
    ]
  },
  "prod-8": {
    name: "صندوق هدايا الخلية الذهبية الفاخر",
    category: "الخلية والهدايا",
    description: "مجموعة رائعة من ثلاثة أنواع من العسل الحرفي، ومغرفة عسل خشبية مصنوعة يدوياً، وشمعة عمودية من شمع العسل النقي، معبأة في صندوق هدايا مغناطيسي فاخر.",
    features: [
      "يتضمن 3 جِرار من أكثر أنواع العسل الخام الحائز على جوائز شعبية (250 جرام لكل منها)",
      "مغرفة عسل من خشب الزيتون المصنوع يدوياً متضمنة",
      "شمعة شمع عسل نقية 100% مصنوعة يدوياً برائحة العسل الطبيعي",
      "صندوق هدايا تذكاري فاخر مع ختم احباط ذهبي مخصص"
    ]
  }
};

export function translateProduct(product: Product, language: Language): Product {
  if (language !== 'ar') return product;
  const translation = productTranslations[product.id];
  if (!translation) return product;
  return {
    ...product,
    name: translation.name,
    category: translation.category,
    description: translation.description,
    features: translation.features
  };
}

export const categoryTranslations: Record<string, string> = {
  "All Honeys": "جميع أنواع العسل",
  "Raw Wildflower": "زهور برية خام",
  "Manuka & Medicinal": "مانوكا وعلاج طبي",
  "Infused & Artisanal": "مشبع وحرفي",
  "Hive & Gifts": "الخلية والهدايا"
};

export function translateCategory(category: string, language: Language): string {
  if (language !== 'ar') return category;
  return categoryTranslations[category] || category;
}

export const dictionary = {
  en: {
    // Nav & Common
    home: "Home",
    products: "Products",
    customerOrder: "Customer Order",
    contactUs: "Contact Us",
    feedbackRates: "Feedback & Rates",
    cart: "Shopping Cart",
    freeDeliveryBanner: "🍯 Free delivery on all orders over $50 • Use code",
    for10Off: "for 10% off",
    searchProducts: "Search products...",
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    subtotal: "Subtotal",
    checkout: "Checkout",
    emptyCart: "Your cart is empty",
    total: "Total",
    remove: "Remove",
    close: "Close",
    loading: "Loading...",
    success: "Success!",
    submit: "Submit",
    cancel: "Cancel",
    
    // Home Page
    heroTitle: "Nature's Purest Liquid Gold",
    heroSubtitle: "Sustainably sourced from pristine wildflower meadows and remote organic apiaries. Experience 100% raw, unfiltered honey delivered to your doorstep.",
    exploreCollection: "Explore Collection",
    shopNow: "Shop Now",
    whyChooseUs: "Why Choose Golden Hive",
    rawAndUnfiltered: "100% Raw & Unfiltered",
    rawDesc: "Never heated or processed, preserving all natural enzymes, pollen, and vital nutrients.",
    sustainableSourcing: "Sustainable Sourcing",
    sustainDesc: "Ethically harvested supporting local beekeepers and protecting bee populations.",
    certifiedOrganic: "Certified Organic",
    organicDesc: "Tested for purity and guaranteed free from additives, antibiotics, and pesticides.",
    featuredHoney: "Featured Artisanal Honey",
    viewAllProducts: "View All Products",

    // Products Page
    ourHoneyCollection: "Our Honey Collection",
    productsSubtitle: "Discover our range of single-origin and infused raw honeys, harvested with care.",
    artisanalHoneyCollection: "Artisanal Honey Collection",
    exploreAllPureHoney: "Explore All Pure Honey Products",
    productsDesc: "Browse our complete selection of raw, unheated, and unfiltered honeys, artisanal combs, and gift sets harvested sustainably from pristine apiaries.",
    allCategories: "All Categories",
    wildflower: "Wildflower",
    acacia: "Acacia",
    eucalyptus: "Eucalyptus",
    sidr: "Sidr",
    infused: "Infused",
    price: "Price",
    rating: "Rating",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    quantity: "Quantity",
    addToCartSuccess: "Added to cart successfully!",

    // Order Page
    customerOrderTitle: "Place Your Customer Order",
    customerOrderSubtitle: "Fill out the form below to order your favorite artisanal honey directly.",
    customerProfileOrder: "Customer Profile & Order",
    completeYourOrderProfile: "Complete Your Order Profile",
    orderProfileDesc: "Verify your customer details, review ordered items, and specify your delivery location.",
    fullName: "Full Name *",
    phone: "Phone Number *",
    deliveryAddress: "Delivery Address",
    city: "City / Region",
    notes: "Order Notes (Optional)",
    selectProduct: "Select Product *",
    selectQuantity: "Quantity",
    placeOrder: "Place Order",
    orderSuccessTitle: "Order Placed Successfully!",
    orderSuccessMessage: "Thank you for your order. Our team will contact you shortly to confirm delivery.",
    viewMyOrders: "View My Orders",
    numberOfItems: "Number of Items in Order",
    deliveryAddressLocation: "Delivery Address / Location *",
    submitProfileOrder: "Submit Profile & Order",
    orderSummary: "Order Summary",
    standardDelivery: "Standard Delivery",
    grandTotal: "Grand Total",
    returnToHome: "Return to Home",
    placeAnotherOrder: "Place Another Order",

    // Contact Page
    contactTitle: "Get in Touch with Us",
    contactSubtitle: "Have questions about our honey or need assistance with an order? We'd love to hear from you.",
    emailAddress: "Email Address",
    message: "Your Message",
    sendMessage: "Send Message",
    contactSuccess: "Thank you! Your message has been sent successfully.",
    wereHereForYou: "We're Here For You",
    contactGoldenHive: "Contact Golden Hive",
    contactPageDesc: "Reach out to us directly through WhatsApp or Instagram. Our team is ready to assist you!",
    whatsappChat: "WhatsApp Chat",
    whatsappDesc: "Chat with our beekeepers instantly on WhatsApp for inquiries, recommendations, and support.",
    chatOnWhatsapp: "Chat on WhatsApp",
    instagramDm: "Instagram DM",
    instagramDesc: "Follow our journey and send us a direct message on Instagram for daily updates and gift ideas.",
    messageOnInstagram: "Message on Instagram",

    // Feedback Page
    feedbackTitle: "Customer Feedback & Ratings",
    feedbackSubtitle: "Read what honey lovers say about Golden Hive or share your own experience.",
    leaveReview: "Leave a Review",
    yourRating: "Your Rating",
    reviewText: "Your Review",
    submitReview: "Submit Review",
    thankYouFeedback: "Thank you for your valuable feedback!",
    customerReviewsFeedback: "Customer Reviews & Feedback",
    rateReviewTitle: "Rate & Review Golden Hive Products",
    feedbackPageDesc: "Share your experience with our artisanal honeys. Submitted feedbacks enter our 10-second delay processing queue before appearing live in the feedback observer at the bottom of the home and feedback pages.",
    submitProductFeedback: "Submit Product Feedback & Rating",
    selectedProductForReview: "Selected Product for Review",
    ratingStars: "Rating (1 to 5 Stars) *",
    yourName: "Your Name *",
    feedbackComments: "Feedback & Comments *",
    submitFeedbackQueue: "Submit Feedback (10s Delay Queue)",
    customerFeedbackObserver: "Customer Feedback Observer",
    liveObserverFeed: "Live Observer Feed",
    whatOurCustomersSay: "What Our Customers Say",

    // Footer
    brandName: "Golden Hive",
    brandSubtitle: "Artisanal Honey Co.",
    footerDesc: "Pure, raw, and sustainably harvested honey brought straight from pristine nature to your home.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    allRightsReserved: "All rights reserved.",
    catalog: "Catalog",
    productsNavigation: "Products & Navigation",
    apiariesLocation: "Pristine Valleys & Apiaries",
    sendAMessageLink: "Send a Message →",
    pureGuarantee: "Our Pure Guarantee",
    unprocessedAndRaw: "100% Unprocessed & Raw",
    pureGuaranteeDesc: "Never heated or filtered. Preserving natural pollen, enzymes, and antioxidants.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    footerBrandDesc: "Purity in every drop. Hand-harvested raw honey and organic propolis solutions crafted for your vitality and natural well-being.",
    feedbackObserverDesc: "Read real reviews and feedback from honey lovers with product pictures.",
    verifiedReviews: "Verified Reviews",
    reviewedProduct: "Reviewed Product",
    verifiedReview: "Verified Review",
    totalFeedbacksRecorded: "Total Feedbacks Recorded",
    browseProducts: "Browse Products",
    cartExploreDesc: "Explore our collection of raw wildflower honey, manuka elixirs, and artisanal gift sets.",
    items: "items",
  },
  ar: {
    // Nav & Common
    home: "الرئيسية",
    products: "المنتجات",
    customerOrder: "طلب العميل",
    contactUs: "اتصل بنا",
    feedbackRates: "الآراء والتقييمات",
    cart: "سلة التسوق",
    freeDeliveryBanner: "🍯 توصيل مجاني لجميع الطلبات التي تزيد عن 50 دولاراً • استخدم الرمز",
    for10Off: "خصم 10%",
    searchProducts: "البحث عن المنتجات...",
    addToCart: "إضافة إلى السلة",
    viewDetails: "عرض التفاصيل",
    subtotal: "المجموع الفرعي",
    checkout: "إتمام الشراء",
    emptyCart: "سلة التسوق فارغة",
    total: "المجموع",
    remove: "إزالة",
    close: "إغلاق",
    loading: "جاري التحميل...",
    success: "نجاح!",
    submit: "إرسال",
    cancel: "إلغاء",
    
    // Home Page
    heroTitle: "أصفى ذهب سائل من الطبيعة",
    heroSubtitle: "مستدام من مروج الزهور البرية البكر والمناحل العضوية النائية. جرب العسل الخام بنسبة 100% غير المفلتر والموصل إلى باب منزلك.",
    exploreCollection: "استكشف المجموعة",
    shopNow: "تسوق الآن",
    whyChooseUs: "لماذا تختار الخلية الذهبية",
    rawAndUnfiltered: "100% خام وغير مصفى",
    rawDesc: "لم يتم تسخينه أو معالجته قط، مع الحفاظ على جميع الإنزيمات الطبيعية وحبوب اللقاح والمغذيات الحيوية.",
    sustainableSourcing: "مصادر مستدامة",
    sustainDesc: "تم حصاده بشكل أخلاقي لدعم النخالين المحليين وحماية تجمعات النحل.",
    certifiedOrganic: "عضوي معتمد",
    organicDesc: "تم اختبار نقائه ومضمون خلوه من الإضافات والمضادات الحيوية والمبيدات الحشرية.",
    featuredHoney: "عسل حرفي مميز",
    viewAllProducts: "عرض جميع المنتجات",

    // Products Page
    ourHoneyCollection: "مجموعة العسل الخاصة بنا",
    productsSubtitle: "اكتشف تشكيلة العسل الخام أحادي المنشأ والمشبع، والذي تم حصاده بعناية فائقة.",
    artisanalHoneyCollection: "مجموعة العسل الحرفي",
    exploreAllPureHoney: "استكشف جميع منتجات العسل النقي",
    productsDesc: "تصفح تشكيلتنا الكاملة من العسل الخام غير المعالج وغير المصفى، والأقراص العسلية الحرفية، ومجموعات الهدايا المستخرجة بشكل مستدام من المناحل البكر.",
    allCategories: "جميع الفئات",
    wildflower: "زهور برية",
    acacia: "أكاسيا",
    eucalyptus: "يوكالبتوس",
    sidr: "سدر",
    infused: "مشبع",
    price: "السعر",
    rating: "التقييم",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    quantity: "الكمية",
    addToCartSuccess: "تمت الإضافة إلى السلة بنجاح!",

    // Order Page
    customerOrderTitle: "قدم طلب العميل الخاص بك",
    customerOrderSubtitle: "املأ النموذج أدناه لطلب عسلك الحرفي المفضل مباشرة.",
    customerProfileOrder: "ملف العميل والطلب",
    completeYourOrderProfile: "أكمل ملف طلبك",
    orderProfileDesc: "تحقق من بيانات العملاء الخاصة بك، وراجع العناصر المطلوبة، وحدد موقع التوصيل الخاص بك.",
    fullName: "الاسم الكامل *",
    phone: "رقم الهاتف *",
    deliveryAddress: "عنوان التوصيل",
    city: "المدينة / المنطقة",
    notes: "ملاحظات الطلب (اختياري)",
    selectProduct: "اختر المنتج *",
    selectQuantity: "الكمية",
    placeOrder: "إتمام الطلب",
    orderSuccessTitle: "تم تقديم الطلب بنجاح!",
    orderSuccessMessage: "شكراً لطلبك. سيتصل بك فريقنا قريباً لتأكيد التوصيل.",
    viewMyOrders: "عرض طلباتي",
    numberOfItems: "عدد العناصر في الطلب",
    deliveryAddressLocation: "عنوان التوصيل / الموقع *",
    submitProfileOrder: "إرسال الملف والطلب",
    orderSummary: "ملخص الطلب",
    standardDelivery: "التوصيل القياسي",
    grandTotal: "المجموع الكلي",
    returnToHome: "العودة إلى الرئيسية",
    placeAnotherOrder: "تقديم طلب آخر",

    // Contact Page
    contactTitle: "تواصل معنا",
    contactSubtitle: "هل لديك أسئلة حول العسل أو تحتاج إلى مساعدة في الطلب? يسعدنا سماع صوتك.",
    emailAddress: "عنوان البريد الإلكتروني",
    message: "رسالتك",
    sendMessage: "إرسال الرسالة",
    contactSuccess: "شكراً لك! تم إرسال رسالتك بنجاح.",
    wereHereForYou: "نحن هنا من أجلك",
    contactGoldenHive: "اتصل بالخلية الذهبية",
    contactPageDesc: "تواصل معنا مباشرة عبر واتساب أو إنستغرام. فريقنا مستعد لمساعدتك!",
    whatsappChat: "محادثة واتساب",
    whatsappDesc: "تحدث مع النحالين لدينا فوراً عبر واتساب للاستفسارات والتوصيات والدعم.",
    chatOnWhatsapp: "التحدث عبر واتساب",
    instagramDm: "رسالة إنستغرام",
    instagramDesc: "تابع رحلتنا وأرسل لنا رسالة مباشرة على إنستغرام للحصول على التحديثات اليومية وأفكار الهدايا.",
    messageOnInstagram: "مراسلة عبر إنستغرام",

    // Feedback Page
    feedbackTitle: "آراء وتقييمات العملاء",
    feedbackSubtitle: "اقرأ ما يقوله عشاق العسل عن الخلية الذهبية أو شارك تجربتك الخاصة.",
    leaveReview: "اترك تقييماً",
    yourRating: "تقييمك",
    reviewText: "رأيك",
    submitReview: "إرسال التقييم",
    thankYouFeedback: "شكراً لك على تقييمك القيم!",
    customerReviewsFeedback: "آراء وتقييمات العملاء",
    rateReviewTitle: "قيم وراجع منتجات الخلية الذهبية",
    feedbackPageDesc: "شارك تجربتك مع عسلنا الحرفي. تدخل التعليقات المقدمة في طابور معالجة متأخر لمدة 10 ثوانٍ قبل أن تظهر مباشرة في مراقب التعليقات في أسفل الصفحة الرئيسية وصفحات التعليقات.",
    submitProductFeedback: "إرسال تقييم وتعليق المنتج",
    selectedProductForReview: "المنتج المختار للتقييم",
    ratingStars: "التقييم (من 1 إلى 5 نجوم) *",
    yourName: "اسمك *",
    feedbackComments: "التعليقات والملاحظات *",
    submitFeedbackQueue: "إرسال التعليق (قائمة الانتظار 10 ثوانٍ)",
    customerFeedbackObserver: "مراقب آراء العملاء",
    liveObserverFeed: "موجز المراقبة المباشرة",
    whatOurCustomersSay: "ماذا يقول عملاؤنا",

    // Footer
    brandName: "الخلية الذهبية",
    brandSubtitle: "شركة العسل الحرفي",
    footerDesc: "عسل نقي، خام، ومحصود بطرق مستدامة يتم نقله مباشرة من الطبيعة البكر إلى منزلك.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    allRightsReserved: "جميع الحقوق محفوظة.",
    catalog: "الكتالوج",
    productsNavigation: "المنتجات والتنقل",
    apiariesLocation: "الوديان والمناحل البكر",
    sendAMessageLink: "إرسال رسالة ←",
    pureGuarantee: "ضمان النقاء الخاص بنا",
    unprocessedAndRaw: "100% غير معالج وخام",
    pureGuaranteeDesc: "لم يتم تسخينه أو تصفيته قط. الحفاظ على حبوب اللقاح الطبيعية والإنزيمات ومضادات الأكسدة.",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    footerBrandDesc: "النقاء في كل قطرة. عسل خام مستحصَد يدوياً وحلول العكبر العضوي المصنوعة لحيويتك ورفاهيتك الطبيعية.",
    feedbackObserverDesc: "اقرأ التقييمات والآراء الحقيقية لعشاق العسل مع صور المنتجات.",
    verifiedReviews: "تقييمات موثقة",
    reviewedProduct: "المنتج المقيم",
    verifiedReview: "تقييم موثق",
    totalFeedbacksRecorded: "إجمالي الآراء المسجلة",
    browseProducts: "تصفح المنتجات",
    cartExploreDesc: "استكشف تشكيلتنا من عسل الزهور البرية الخام، إكسيرات مانوكا، ومجموعات الهدايا الحرفية.",
    items: "عناصر",
  }
};

export type TranslationKey = keyof typeof dictionary.en;
