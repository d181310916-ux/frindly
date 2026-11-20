import {
  Product,
  StoreSettings,
  Coupon,
  CateringRequest,
  Order,
  UserProfile,
  BulkQuotationRequest,
  BoxTemplate,
  InventoryItem,
} from '../types';

export const FRIENDLY_TABLE_PHOTOS = {
  smokedSalmon: '/assets/aistudio/6fc5f137-6cff-4130-97bd-7a74cd5bf963_c40ede70.png',
  roastBeef: '/assets/aistudio/5be0ab71-5f6d-4cb3-be4b-733693e1d770_563b287c.png',
  chickenClub: '/assets/aistudio/75dbd131-c728-4270-9e86-b4a81528cd93_826b6716.png',
  assortedSandwiches: '/assets/aistudio/b8f64b6b-c4b8-4137-9e68-727764c2d281_2ba3d944.png',
  turkeyCheeseSandwich: '/assets/images/turkey_cheese_sandwich_1794559675383.jpg',
  tunaEggCucumberMini: '/assets/images/tuna_egg_cucumber_mini_1794559676461.jpg',
  halloumiMozzarellaVeggie: '/assets/images/halloumi_mozzarella_veggie_1794559676854.jpg',
  grilledChickenCaesar: '/assets/images/grilled_chicken_caesar_1794559676882.jpg',
  pastramiMustardRoll: '/assets/images/pastrami_mustard_roll_1794559677485.jpg',
  butterCroissantSavory: '/assets/images/butter_croissant_savory_1794559678453.jpg',
  chocolatePastryBrownies: '/assets/images/chocolate_pastry_brownies_1794559678529.jpg',
  readyMealSnackBox: '/assets/images/ready_meal_snack_box_1794559679358.jpg',
  celebrationCakeCupcakes: '/assets/images/celebration_cake_cupcakes_1794559679772.jpg',
  cateringBuffetDisplay: '/assets/images/catering_buffet_display_1794559680232.jpg',
  chocolatePralineGiftBox: '/assets/images/chocolate_praline_gift_box_1794559680523.jpg',
  freshJuicesFruitCup: '/assets/images/fresh_juices_fruit_cup_1794559681473.jpg',
  gourmetCupcakesDozen: '/assets/images/gourmet_cupcakes_dozen_1794560489330.jpg',
  frenchMacaronsBox: '/assets/images/french_macarons_box_1794560490399.jpg',
  luxuryCelebrationHamper: '/assets/images/luxury_celebration_hamper_1794560491305.jpg',
  kidsPartySnackBox: '/assets/images/kids_party_snack_box_1794560491424.jpg',
  frenchMiniEclairsBox: '/assets/images/french_mini_eclairs_box_1794560490869.jpg',
};

export const FRIENDLY_TABLE_GALLERY = [
  {
    labelEn: 'Assorted Mini Sandwiches',
    labelAr: 'تشكيلة ميني ساندوتش فرندلي تيبل',
    url: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  },
  {
    labelEn: 'Chicken Club Mini',
    labelAr: 'ميني تشيكن كلوب',
    url: FRIENDLY_TABLE_PHOTOS.chickenClub,
  },
  {
    labelEn: 'Roast Beef Mini',
    labelAr: 'ميني روست بيف',
    url: FRIENDLY_TABLE_PHOTOS.roastBeef,
  },
  {
    labelEn: 'Smoked Salmon Mini',
    labelAr: 'ميني سلمون مدخن',
    url: FRIENDLY_TABLE_PHOTOS.smokedSalmon,
  },
  {
    labelEn: 'Turkey & Emmental Mini',
    labelAr: 'ساندوتش تركي وجبنة إيمنتال',
    url: FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
  },
  {
    labelEn: 'Tuna, Egg & Cucumber Mini',
    labelAr: 'ميني تونة وسلطة البيض والخيار',
    url: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  },
  {
    labelEn: 'Halloumi, Mozzarella & Veggie',
    labelAr: 'حلوم مشوي وموزاريلا وخضار',
    url: FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
  },
  {
    labelEn: 'Grilled Chicken Caesar & Truffle',
    labelAr: 'دجاج مشوي سيزر وترفل',
    url: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  },
  {
    labelEn: 'Beef Pastrami Caraway Roll',
    labelAr: 'بسطرمة بقرية وجبنة سويسرية',
    url: FRIENDLY_TABLE_PHOTOS.pastramiMustardRoll,
  },
  {
    labelEn: 'French Croissants & Savory Quiche',
    labelAr: 'كرواسون فرنسي وميني كيش',
    url: FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  },
  {
    labelEn: 'Pain au Chocolat, Cinnamon & Brownies',
    labelAr: 'معجنات الشوكولاتة والسينامون والبراونيز',
    url: FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
  },
  {
    labelEn: 'Ready Individual Snack Box',
    labelAr: 'بوكس السناك الفردي المتكامل',
    url: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  },
  {
    labelEn: 'Kids Party Snack Box',
    labelAr: 'بوكس حفلات الأطفال المبهج',
    url: FRIENDLY_TABLE_PHOTOS.kidsPartySnackBox,
  },
  {
    labelEn: 'Celebration Cake (Torte)',
    labelAr: 'تورتة وكيكات الاحتفال الملكية',
    url: FRIENDLY_TABLE_PHOTOS.celebrationCakeCupcakes,
  },
  {
    labelEn: 'Gourmet Assorted Cupcakes Dozen',
    labelAr: 'بوكس كب كيك مشكل (١٢ قطعة)',
    url: FRIENDLY_TABLE_PHOTOS.gourmetCupcakesDozen,
  },
  {
    labelEn: 'Parisian French Macarons Box',
    labelAr: 'بوكس ماكرون فرنسي فاخر',
    url: FRIENDLY_TABLE_PHOTOS.frenchMacaronsBox,
  },
  {
    labelEn: 'Mini French Eclairs Box',
    labelAr: 'بوكس ميني إكلير فرنسي',
    url: FRIENDLY_TABLE_PHOTOS.frenchMiniEclairsBox,
  },
  {
    labelEn: 'Belgian Praline Chocolate Gift Box',
    labelAr: 'علبة هدايا شوكولاتة برالين بلجيكية',
    url: FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
  },
  {
    labelEn: 'Luxury Celebration Gift Hamper',
    labelAr: 'سلة الهدايا الفاخرة الكبرى',
    url: FRIENDLY_TABLE_PHOTOS.luxuryCelebrationHamper,
  },
  {
    labelEn: 'Event & Party Catering Buffet',
    labelAr: 'بوفيه وضيافة المناسبات والحفلات',
    url: FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
  },
  {
    labelEn: 'Fresh Cold-Pressed Juices & Fruit Cup',
    labelAr: 'عصائر طبيعية باردة وكوب فواكه',
    url: FRIENDLY_TABLE_PHOTOS.freshJuicesFruitCup,
  },
];

export const DEFAULT_ITEM_PHOTO_MAP: Record<string, string> = {
  'box-tpl-classic': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'box-tpl-double': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'box-tpl-premium': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'box-tpl-kids': FRIENDLY_TABLE_PHOTOS.kidsPartySnackBox,
  // Live Firestore legacy-ID catalog items (prod-*)
  'prod-bak-1': FRIENDLY_TABLE_PHOTOS.celebrationCakeCupcakes,
  'prod-bak-2': FRIENDLY_TABLE_PHOTOS.gourmetCupcakesDozen,
  'prod-bak-3': FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
  'prod-bak-4': FRIENDLY_TABLE_PHOTOS.frenchMacaronsBox,
  'prod-cat-1': FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
  'prod-cat-2': FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
  'prod-choc-1': FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
  'prod-choc-2': FRIENDLY_TABLE_PHOTOS.luxuryCelebrationHamper,
  'prod-choc-3': FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
  'prod-grp-1': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'prod-grp-2': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'prod-grp-3': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'prod-grp-4': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'prod-ind-1': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'prod-ind-2': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'prod-ind-3': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'prod-ind-4': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'prod-ind-5': FRIENDLY_TABLE_PHOTOS.kidsPartySnackBox,
  'prod-mini-1': FRIENDLY_TABLE_PHOTOS.chickenClub,
  'prod-mini-2': FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
  'prod-mini-3': FRIENDLY_TABLE_PHOTOS.roastBeef,
  'prod-mini-4': FRIENDLY_TABLE_PHOTOS.smokedSalmon,
  'prod-mini-5': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'prod-prem-1': FRIENDLY_TABLE_PHOTOS.smokedSalmon,
  'prod-prem-2': FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  'prod-prem-3': FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  // Extended catalog IDs (p-*)
  'p-ms-1': FRIENDLY_TABLE_PHOTOS.chickenClub,
  'p-ms-2': FRIENDLY_TABLE_PHOTOS.roastBeef,
  'p-ms-3': FRIENDLY_TABLE_PHOTOS.smokedSalmon,
  'p-ms-4': FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
  'p-ms-5': FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  'p-ms-6': FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  'p-ms-7': FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  'p-ms-8': FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  'p-ms-9': FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
  'p-ms-10': FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  'p-ms-11': FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
  'p-ms-12': FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
  'p-ms-13': FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
  'p-ms-14': FRIENDLY_TABLE_PHOTOS.pastramiMustardRoll,
  'p-ms-15': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'p-fs-1': FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  'p-fs-2': FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  'p-fs-3': FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
  'p-fs-4': FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  'p-cr-1': FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  'p-cr-2': FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  'p-cr-3': FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  'p-cr-4': FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  'p-cr-5': FRIENDLY_TABLE_PHOTOS.roastBeef,
  'p-mc-1': FRIENDLY_TABLE_PHOTOS.chickenClub,
  'p-mc-2': FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
  'p-mc-3': FRIENDLY_TABLE_PHOTOS.roastBeef,
  'p-mc-4': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'p-ps-1': FRIENDLY_TABLE_PHOTOS.smokedSalmon,
  'p-ps-2': FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  'p-ps-3': FRIENDLY_TABLE_PHOTOS.roastBeef,
  'p-ps-4': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'p-box-1': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-2': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-3': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-4': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-5': FRIENDLY_TABLE_PHOTOS.kidsPartySnackBox,
  'p-box-6': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-7': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-8': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-9': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-box-10': FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  'p-grp-1': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'p-grp-2': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'p-grp-3': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'p-grp-4': FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  'p-bak-1': FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  'p-bak-2': FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
  'p-bak-3': FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
  'p-bak-4': FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  'p-des-1': FRIENDLY_TABLE_PHOTOS.celebrationCakeCupcakes,
  'p-des-2': FRIENDLY_TABLE_PHOTOS.gourmetCupcakesDozen,
  'p-des-3': FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
  'p-des-4': FRIENDLY_TABLE_PHOTOS.frenchMiniEclairsBox,
  'p-choc-1': FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
  'p-choc-2': FRIENDLY_TABLE_PHOTOS.luxuryCelebrationHamper,
  'p-choc-3': FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
  'p-cat-1': FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
  'p-cat-2': FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
};

export function getFriendlyTablePhotoForItem(item: {
  id?: string;
  name?: { en?: string; ar?: string };
  category?: string;
}): string {
  const id = (item.id || '').toLowerCase();
  if (id && DEFAULT_ITEM_PHOTO_MAP[id]) {
    return DEFAULT_ITEM_PHOTO_MAP[id];
  }

  const nameEn = (item.name?.en || '').toLowerCase();
  const category = (item.category || '').toLowerCase();

  if (category === 'catering-events' || nameEn.includes('catering') || nameEn.includes('buffet')) {
    return FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay;
  }
  if (nameEn.includes('hamper')) {
    return FRIENDLY_TABLE_PHOTOS.luxuryCelebrationHamper;
  }
  if (category === 'chocolates-gifts' || nameEn.includes('praline') || nameEn.includes('sweet box')) {
    return FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox;
  }
  if (nameEn.includes('brownie') || nameEn.includes('cinnamon') || nameEn.includes('pain au chocolat')) {
    return FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies;
  }
  if (nameEn.includes('cupcake')) {
    return FRIENDLY_TABLE_PHOTOS.gourmetCupcakesDozen;
  }
  if (nameEn.includes('macaron')) {
    return FRIENDLY_TABLE_PHOTOS.frenchMacaronsBox;
  }
  if (nameEn.includes('eclair')) {
    return FRIENDLY_TABLE_PHOTOS.frenchMiniEclairsBox;
  }
  if (category === 'cakes-desserts' || nameEn.includes('cake')) {
    return FRIENDLY_TABLE_PHOTOS.celebrationCakeCupcakes;
  }
  if (nameEn.includes('croissant') || nameEn.includes('quiche')) {
    return FRIENDLY_TABLE_PHOTOS.butterCroissantSavory;
  }
  if (nameEn.includes('kids')) {
    return FRIENDLY_TABLE_PHOTOS.kidsPartySnackBox;
  }
  if (category === 'ready-made-boxes' || category === 'individual-boxes' || nameEn.includes('snack box') || nameEn.includes('lunch box') || nameEn.includes('meal box')) {
    return FRIENDLY_TABLE_PHOTOS.readyMealSnackBox;
  }
  if (nameEn.includes('juice') || nameEn.includes('fruit cup')) {
    return FRIENDLY_TABLE_PHOTOS.freshJuicesFruitCup;
  }
  if (nameEn.includes('pastrami')) {
    return FRIENDLY_TABLE_PHOTOS.pastramiMustardRoll;
  }
  if (nameEn.includes('roast beef') || nameEn.includes('beef')) {
    return FRIENDLY_TABLE_PHOTOS.roastBeef;
  }
  if (nameEn.includes('salmon')) {
    return FRIENDLY_TABLE_PHOTOS.smokedSalmon;
  }
  if (nameEn.includes('turkey')) {
    return FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich;
  }
  if (nameEn.includes('tuna') || nameEn.includes('egg') || nameEn.includes('cucumber') || nameEn.includes('triangle')) {
    return FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini;
  }
  if (nameEn.includes('halloumi') || nameEn.includes('mozzarella') || nameEn.includes('vegetarian')) {
    return FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie;
  }
  if (nameEn.includes('caesar') || nameEn.includes('grilled chicken') || nameEn.includes('truffle')) {
    return FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar;
  }
  if (nameEn.includes('chicken club') || nameEn.includes('club')) {
    return FRIENDLY_TABLE_PHOTOS.chickenClub;
  }

  return FRIENDLY_TABLE_PHOTOS.assortedSandwiches;
}

export const initialPackagingSupplies: InventoryItem[] = [
  { id: 'pkg-1', name: 'Friendly Signature Soft Pink Boxes', nameAr: 'علب فرندلي تيبل الوردية الفاخرة', stock: 180, minThreshold: 50 },
  { id: 'pkg-2', name: 'Luxury Gold Satin Ribbon Rolls', nameAr: 'بكر شرائط الساتان الذهبية الفاخرة', stock: 45, minThreshold: 20 },
  { id: 'pkg-3', name: 'Artisanal Wooden Gathering Trays', nameAr: 'صواني التقديم الخشبية للمناسبات', stock: 24, minThreshold: 15 },
  { id: 'pkg-4', name: 'Eco Minimalist Kraft Boxes', nameAr: 'علب كرافت صديقة للبيئة', stock: 120, minThreshold: 40 },
  { id: 'pkg-5', name: 'Gold Foil Greeting Gift Cards', nameAr: 'كروت إهداء مذهبة بشعار فرندلي تيبل', stock: 350, minThreshold: 100 },
];

export const initialStoreSettings: StoreSettings = {
  storeName: {
    en: 'Friendly Table',
    ar: 'فرندلي تيبل',
  },
  tagline: {
    en: 'Good Food, Happy Moments',
    ar: 'طعام شهي، لحظات سعيدة',
  },
  whatsappNumber: '+201012345678',
  supportPhone: '+20 10 1234 5678',
  supportEmail: 'orders@friendlytable.com',
  address: {
    en: 'Friendly Table Kitchen & Boutique, Cairo, Egypt',
    ar: 'مطبخ وبوتيك فرندلي تيبل، القاهرة، جمهورية مصر العربية',
  },
  deliveryFee: 35,
  freeDeliveryThreshold: 350,
  bankDetails: {
    bankName: 'Commercial International Bank (CIB) / البنك التجاري الدولي',
    accountName: 'Friendly Table Bakery & Catering Co.',
    iban: 'EG120010000100000123456789012',
  },
  announcementEn: '🎉 Free Delivery on all party and gathering boxes over 350 EGP! Use code WELCOME10 for 10% off.',
  announcementAr: '🎉 توصيل مجاني لجميع بوكسات الحفلات والطلبات فوق ٣٥٠ ج.م! استخدم كود WELCOME10 لخصم ١٠٪.',
  currency: 'EGP',
};

export const initialBoxTemplates: BoxTemplate[] = [
  {
    id: 'box-tpl-classic',
    name: { en: 'Mini Classic Box', ar: 'بوكس كلاسيك ميني' },
    description: {
      en: '1 Mini Sandwich of your choice, 1 freshly baked mini cake or cupcake, and 1 cold-pressed juice.',
      ar: 'ساندوتش ميني من اختيارك، قطعة كيك أو كب كيك طازجة، وعصير طبيعي بارد.',
    },
    category: 'ready-made',
    basePrice: 55,
    capacity: 3,
    defaultContents: {
      en: '1 Mini Sandwich, 1 Mini Cake, 1 Juice (250ml)',
      ar: '١ ميني ساندوتش، ١ كيك ميني، ١ عصير بارد',
    },
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    isAvailable: true,
    minOrderQuantity: 1,
    maxOrderQuantity: 500,
  },
  {
    id: 'box-tpl-double',
    name: { en: 'Double Sandwich Box', ar: 'بوكس الساندوتش الثنائي' },
    description: {
      en: '2 assorted savory mini sandwiches, 1 mini cake slice, and 1 cold fruit juice.',
      ar: 'ساندوتشين ميني مشكلين، شريحة كيك فاخرة، وعصير فواكه طازج.',
    },
    category: 'ready-made',
    basePrice: 85,
    capacity: 4,
    defaultContents: {
      en: '2 Mini Sandwiches, 1 Mini Cake, 1 Juice',
      ar: '٢ ميني ساندوتش، ١ كيك ميني، ١ عصير فواكه',
    },
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    isAvailable: true,
    minOrderQuantity: 1,
    maxOrderQuantity: 500,
  },
  {
    id: 'box-tpl-premium',
    name: { en: 'Premium Snack Box', ar: 'بوكس السناك التنفيذي الفاخر' },
    description: {
      en: '2 premium gourmet sandwiches, 1 artisanal dessert, 1 cold-pressed juice, and 1 Belgian chocolate piece.',
      ar: 'ساندوتشين ميني فاخرين، قطعة حلى مميزة، عصير فريش، وقطعة شوكولاتة بلجيكية.',
    },
    category: 'ready-made',
    basePrice: 110,
    capacity: 5,
    defaultContents: {
      en: '2 Premium Sandwiches, 1 Premium Cake, 1 Juice, 1 Chocolate Praline',
      ar: '٢ ساندوتش فاخر، ١ كيك فاخر، ١ عصير، ١ شوكولاتة برالين',
    },
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    isAvailable: true,
    minOrderQuantity: 1,
    maxOrderQuantity: 500,
  },
  {
    id: 'box-tpl-kids',
    name: { en: 'Kids Party Box', ar: 'بوكس حفلات الأطفال المبهج' },
    description: {
      en: '1 mini sandwich, 1 rainbow sprinkle cupcake, 1 juice, and a surprise cookie in child-friendly festive packaging.',
      ar: '١ ميني ساندوتش لطيف، ١ كب كيك مبهج بالحبيبات الملونة، ١ عصير، وكوكيز في علبة مرحة ومحببة للأطفال.',
    },
    category: 'ready-made',
    basePrice: 60,
    capacity: 4,
    defaultContents: {
      en: '1 Kids Sandwich, 1 Cupcake, 1 Juice, 1 Cookie',
      ar: '١ ساندوتش أطفال، ١ كب كيك، ١ عصير، ١ كوكيز',
    },
    image: FRIENDLY_TABLE_PHOTOS.kidsPartySnackBox,
    isAvailable: true,
    minOrderQuantity: 1,
    maxOrderQuantity: 500,
  },
];

export const initialProducts: Product[] = [
  // ==========================================
  // A. MINI SANDWICH COLLECTION (15 Items)
  // ==========================================
  {
    id: 'p-ms-1',
    name: { en: 'Mini Chicken Club', ar: 'ميني كلوب الدجاج' },
    description: {
      en: 'Poached herb chicken breast, garlic aioli, boiled farm egg, and fresh butter lettuce on soft brioche toast.',
      ar: 'صدور دجاج متبلة بالأعشاب، مايونيز بالثوم الخفيف، بيض مسلوق، وخس الزبدة المقرمش على توست البريوش.',
    },
    category: 'mini-sandwiches',
    price: 18,
    image: FRIENDLY_TABLE_PHOTOS.chickenClub,
    stock: 120,
    isAvailable: true,
    isBestseller: true,
    ingredients: { en: 'Herb chicken, light mayo, farm egg, lettuce, brioche', ar: 'دجاج بالأعشاب، مايونيز خفيف، بيض مزارع، خس، بريوش' },
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-2',
    name: { en: 'Mini Roast Beef', ar: 'ميني روست بيف' },
    description: {
      en: 'Tender slow-roasted beef tenderloin with caramelized onion jam and French Dijon mustard on mini brioche roll.',
      ar: 'شرائح لحم بقر روست بيف مشوية ببطء مع مربى البصل المكرمل وماسترد ديجون الفرنسي على رول بريوش طازج.',
    },
    category: 'mini-sandwiches',
    price: 24,
    image: FRIENDLY_TABLE_PHOTOS.roastBeef,
    stock: 90,
    isAvailable: true,
    isFeatured: true,
    ingredients: { en: 'Slow roasted beef, caramelized onion, Dijon mustard, arugula', ar: 'روست بيف مشوي، بصل مكرمل، ماسترد ديجون، جرجير' },
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-3',
    name: { en: 'Mini Smoked Salmon', ar: 'ميني سلمون مدخن' },
    description: {
      en: 'Norwegian cold-smoked salmon, whipped lemon dill labneh, and baby capers on rye brioche slice.',
      ar: 'سلمون نرويجي مدخن على البارد، لبنة مخفوقة بالشبت والليمون، وحبات الكبر على شريحة بريوش الجاودار.',
    },
    category: 'mini-sandwiches',
    price: 28,
    image: FRIENDLY_TABLE_PHOTOS.smokedSalmon,
    stock: 75,
    isAvailable: true,
    isBestseller: true,
    ingredients: { en: 'Norwegian smoked salmon, cream cheese, dill, capers', ar: 'سلمون نرويجي مدخن، جبنة كريمية، شبت، كبر' },
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-4',
    name: { en: 'Mini Turkey & Cheese', ar: 'ميني تركي وجبنة' },
    description: {
      en: 'Thinly sliced smoked turkey breast with melted Swiss Emmental cheese and honey grain mustard.',
      ar: 'شرائح رقيقة من صدور الرومي المدخن مع جبنة إيمنتال سويسرية وخردل العسل الحبيبي.',
    },
    category: 'mini-sandwiches',
    price: 20,
    image: FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
    stock: 110,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-5',
    name: { en: 'Mini Tuna', ar: 'ميني تونة' },
    description: {
      en: 'White albacore tuna tossed with celery crunch, lemon zest, sweet corn, and delicate dill mayonnaise.',
      ar: 'تونة بيضاء ممتازة متبلة بقطع الكرفس المقرمشة، بشر الليمون، ذرة حلوة، ومايونيز الشبت المنعش.',
    },
    category: 'mini-sandwiches',
    price: 18,
    image: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
    stock: 85,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-6',
    name: { en: 'Mini Egg Salad', ar: 'ميني سلطة البيض' },
    description: {
      en: 'Classic chopped farm eggs blended with chives, light Dijon cream, and micro watercress leaves.',
      ar: 'بيض مزارع مطهو ومقطع مع أعواد الثوم المعمر، كريمة الديجون الخفيفة، وأوراق الجرجير الصغيرة.',
    },
    category: 'mini-sandwiches',
    price: 16,
    image: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
    stock: 95,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-7',
    name: { en: 'Mini Chicken Caesar', ar: 'ميني تشيكن سيزر' },
    description: {
      en: 'Charred chicken breast strips, parmesan shavings, romaine lettuce, and signature homemade Caesar dressing.',
      ar: 'شرائح دجاج مشوية على اللهب، رقائق جبن بارميزان، خس روماني، وصوص السيزر البيتي الخاص.',
    },
    category: 'mini-sandwiches',
    price: 20,
    image: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
    stock: 80,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-8',
    name: { en: 'Mini Grilled Chicken', ar: 'ميني دجاج مشوي' },
    description: {
      en: 'Rosemary marinated grilled chicken breast, sun-dried tomatoes, and garlic herb spread on focaccia cube.',
      ar: 'صدر دجاج مشوي متبل بإكليل الجبل، طماطم مجففة تحت أشعة الشمس، ومفرود ثوم بالأعشاب على مكعب فوكاشيا.',
    },
    category: 'mini-sandwiches',
    price: 19,
    image: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
    stock: 90,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-9',
    name: { en: 'Mini Mozzarella & Pesto', ar: 'ميني موزاريلا وبيستو' },
    description: {
      en: 'Fresh Italian buffalo mozzarella, Genovese basil pesto, and ripe vine tomatoes on olive ciabatta.',
      ar: 'جبنة موزاريلا إيطالية طازجة، بيستو الريحان الإيطالي، وطماطم كرزية ناضجة على خبز التشاباتا بالزيتون.',
    },
    category: 'mini-sandwiches',
    price: 22,
    image: FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
    stock: 70,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-10',
    name: { en: 'Mini Cheese & Cucumber', ar: 'ميني جبنة وخيار' },
    description: {
      en: 'Whipped Philadelphia cream cheese, mint essence, and paper-thin crisp English cucumber ribbons.',
      ar: 'جبنة فيلادلفيا كريمية مخفوقة بنعناع طازج مع شرائط خيار إنجليزي مقرمشة ورفيعة.',
    },
    category: 'mini-sandwiches',
    price: 15,
    image: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
    stock: 100,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-11',
    name: { en: 'Mini Smoked Turkey', ar: 'ميني تركي مدخن بالجبن' },
    description: {
      en: 'Smoked farm turkey breast with aged yellow cheddar and crisp pickle slice in golden milk bun.',
      ar: 'ديك رومي مدخن فاخر مع جبنة شيدر صفراء معتقة وشريحة مخلل مقرمشة في خبز الحليب الذهبي.',
    },
    category: 'mini-sandwiches',
    price: 20,
    image: FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
    stock: 90,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-12',
    name: { en: 'Mini Vegetarian', ar: 'ميني خضار مشوي ونباتي' },
    description: {
      en: 'Char-grilled zucchini, sweet bell peppers, eggplant, and lemon garlic hummus spread on grain loaf.',
      ar: 'كوسا مشوية، فلفل حلو، باذنجان مشوي، ومفرود حمص بالليمون والثوم على خبز الحبوب الصحية.',
    },
    category: 'mini-sandwiches',
    price: 17,
    image: FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
    stock: 65,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-13',
    name: { en: 'Mini Halloumi', ar: 'ميني جبنة حلوم مشوية' },
    description: {
      en: 'Pan-seared Cypriot halloumi with black olive tapenade, fresh mint, and tomato confit on mini brioche.',
      ar: 'جبن حلوم قبرصي مشوي مع تتبيلة الزيتون الأسود (تابيناد)، نعناع بلدي، وطماطم مشوية على ميني بريوش.',
    },
    category: 'mini-sandwiches',
    price: 21,
    image: FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
    stock: 80,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-14',
    name: { en: 'Mini Pastrami', ar: 'ميني بسطرمة فاخرة' },
    description: {
      en: 'Artisan spiced beef pastrami, melted Swiss cheese, and mild grain mustard on toasted caraway roll.',
      ar: 'بسطرمة لحم بقري متبلة بالأعشاب، جبن سويسري ذائب، وخردل حبيبي على رول الكراوية المحمص.',
    },
    category: 'mini-sandwiches',
    price: 25,
    image: FRIENDLY_TABLE_PHOTOS.pastramiMustardRoll,
    stock: 60,
    isAvailable: true,
    piecesCountOptions: [12, 24, 48, 96],
  },
  {
    id: 'p-ms-15',
    name: { en: 'Friendly Table Signature Mini Sandwich', ar: 'ميني ساندوتش فرندلي تيبل التوقيع' },
    description: {
      en: 'Our Chef Masterpiece: Smoked turkey, creamy brie, fig-walnut jam, and wild rocket in gold-glazed brioche.',
      ar: 'تحفة الشيف الخاصة: ديك رومي مدخن، جبنة بري فرنسية كريمية، مربى التين وعين الجمل، وجرجير بري في بريوش ذهبي.',
    },
    category: 'mini-sandwiches',
    price: 30,
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 85,
    isAvailable: true,
    isBestseller: true,
    isFeatured: true,
    piecesCountOptions: [12, 24, 48, 96],
  },

  // ==========================================
  // B. FINGER SANDWICHES (8 Items & Platters)
  // ==========================================
  {
    id: 'p-fs-1',
    name: { en: 'Classic Triangle Sandwiches Platter', ar: 'بلاتر ساندوتشات المثلثات الكلاسيكية' },
    description: {
      en: 'Elegant English afternoon tea crustless triangle sandwiches with assorted fillings: egg salad, chicken herb, and smoked cheese.',
      ar: 'ساندوتشات شاي الظهيرة الإنجليزية الكلاسيكية بدون أطراف بتشكيلة حشوات فاخرة: سلطة البيض، دجاج بالأعشاب، وجبن مدخن.',
    },
    category: 'finger-sandwiches',
    price: 160,
    image: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
    stock: 35,
    isAvailable: true,
    servingSize: { en: '24 Pieces Platter', ar: 'بلاتر ٢٤ قطعة' },
  },
  {
    id: 'p-fs-2',
    name: { en: 'Chicken Finger Sandwiches Platter', ar: 'بلاتر فينجر ساندوتش دجاج بالأعشاب' },
    description: {
      en: 'Tender shredded chicken breast in fresh herb mayonnaise layered between delicate crustless milk bread ribbons.',
      ar: 'دجاج متبل مفتت بمايونيز الأعشاب الطازجة بين شرائح خبز الحليب الطري الفاخر بدون حواف.',
    },
    category: 'finger-sandwiches',
    price: 175,
    image: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
    stock: 40,
    isAvailable: true,
    servingSize: { en: '24 Pieces Platter', ar: 'بلاتر ٢٤ قطعة' },
  },
  {
    id: 'p-fs-3',
    name: { en: 'Turkey Finger Sandwiches Platter', ar: 'بلاتر فينجر ساندوتش تركي وجبنة شيدر' },
    description: {
      en: 'Smoked turkey ribbons, aged white cheddar, and honey grain dijonnaise in white and brown checkerboard finger cuts.',
      ar: 'شرائح تركي مدخن مع شيدر أبيض معتق وصلصة ديجون بالعسل مقطعة على شكل أصابع فينجر بتشكيلة توست أبيض وأسمر.',
    },
    category: 'finger-sandwiches',
    price: 180,
    image: FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
    stock: 30,
    isAvailable: true,
    servingSize: { en: '24 Pieces Platter', ar: 'بلاتر ٢٤ قطعة' },
  },
  {
    id: 'p-fs-4',
    name: { en: 'Cucumber & Cream Cheese Finger Sandwiches', ar: 'فينجر ساندوتش خيار وجبنة كريمية' },
    description: {
      en: 'The quintessence of royal high tea: Crisp salted cucumber ribbons and lemon dill cream cheese on thin crustless bread.',
      ar: 'رمز ضيافة الشاي الفاخرة: شرائح خيار مقرمشة متبلة وجبنة كريمية بالليمون والشبت على خبز أبيض ناعم.',
    },
    category: 'finger-sandwiches',
    price: 140,
    image: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
    stock: 45,
    isAvailable: true,
    servingSize: { en: '24 Pieces Platter', ar: 'بلاتر ٢٤ قطعة' },
  },

  // ==========================================
  // C. MINI CROISSANTS & BRIOCHE (10 Items)
  // ==========================================
  {
    id: 'p-cr-1',
    name: { en: 'Mini Chicken Croissant', ar: 'ميني كرواسون الدجاج بالأعشاب' },
    description: {
      en: 'Flaky French butter mini croissant stuffed with poached chicken mayo and micro butter lettuce.',
      ar: 'كرواسون زبدة فرنسي هش ومورق محشو بدجاج المايونيز بالأعشاب وخس الزبدة الناعم.',
    },
    category: 'mini-croissants',
    price: 24,
    image: FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
    stock: 50,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: 'p-cr-2',
    name: { en: 'Turkey & Cheese Croissant', ar: 'كرواسون التركي المدخن والجبن السويسري' },
    description: {
      en: 'All-butter golden croissant filled with smoked turkey breast and melted Emmental cheese.',
      ar: 'كرواسون زبدة فرنسية أصيلة محشو بشرائح الديك الرومي المدخن وجبنة إيمنتال سويسرية.',
    },
    category: 'mini-croissants',
    price: 26,
    image: FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
    stock: 45,
    isAvailable: true,
  },
  {
    id: 'p-cr-3',
    name: { en: 'Smoked Salmon Croissant', ar: 'كرواسون السلمون المدخن والشبت' },
    description: {
      en: 'Wild Norwegian salmon, dill whipped cheese, and capers in a flaky buttery croissant.',
      ar: 'سلمون نرويجي بري مدخن، جبنة مخفوقة بالشبت، وكبر في كرواسون فرنسي هش.',
    },
    category: 'mini-croissants',
    price: 32,
    image: FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
    stock: 35,
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 'p-cr-4',
    name: { en: 'Mini Brioche Chicken & Truffle', ar: 'ميني بريوش دجاج بصوص الترفل' },
    description: {
      en: 'Pillowy brioche slider stuffed with shredded chicken breast and black truffle aioli cream.',
      ar: 'ميني سلايدر بريوش طري للغاية محشو بدجاج مفتت وصوص مايونيز الترفل الأسود الفاخر.',
    },
    category: 'mini-croissants',
    price: 28,
    image: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
    stock: 40,
    isAvailable: true,
  },
  {
    id: 'p-cr-5',
    name: { en: 'Mini Brioche Beef Slider', ar: 'ميني بريوش لحم مشوي ديجون' },
    description: {
      en: 'Tender slow-cooked beef tenderloin, caramelized onion jam, and cheddar on golden brioche slider.',
      ar: 'شرائح لحم بقر مشوية ببطء، بصل مكرمل، وشيدر ذائب في خبز بريوش ميني مذهب.',
    },
    category: 'mini-croissants',
    price: 30,
    image: FRIENDLY_TABLE_PHOTOS.roastBeef,
    stock: 40,
    isAvailable: true,
  },

  // ==========================================
  // D. MINI CLUB SANDWICHES (7 Items)
  // ==========================================
  {
    id: 'p-mc-1',
    name: { en: 'Chicken Club Platter (18 Pcs)', ar: 'ميني كلوب الدجاج بالأعشاب والبيض (١٨ قطعة)' },
    description: {
      en: 'Triple-decker delicate mini club sandwiches with poached herb chicken breast, crisp lettuce, boiled egg, and garlic aioli.',
      ar: 'ساندوتشات ميني كلوب ثلاثية الطبقات بصدور الدجاج الطرية المتبلة، خس مقرمش، شرائح بيض، وصوص الثومية الخفيفة.',
    },
    category: 'mini-clubs',
    price: 135,
    image: FRIENDLY_TABLE_PHOTOS.chickenClub,
    stock: 40,
    isAvailable: true,
    isBestseller: true,
    servingSize: { en: '18 Pieces Box', ar: 'بوكس ١٨ قطعة' },
  },
  {
    id: 'p-mc-2',
    name: { en: 'Turkey & Emmental Club (18 Pcs)', ar: 'ميني كلوب الديك الرومي وإيمنتال (١٨ قطعة)' },
    description: {
      en: 'Layers of premium smoked turkey, melted Swiss emmental, honey grain mustard, and crunchy pickled cornichons.',
      ar: 'طبقات من شرائح التركي المدخن الممتاز، جبن إيمنتال سويسري، خردل العسل، ومخلل الخيار الفرنسي المقرمش.',
    },
    category: 'mini-clubs',
    price: 145,
    image: FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
    stock: 35,
    isAvailable: true,
    servingSize: { en: '18 Pieces Box', ar: 'بوكس ١٨ قطعة' },
  },
  {
    id: 'p-mc-3',
    name: { en: 'Roast Beef Club (18 Pcs)', ar: 'ميني كلوب روست بيف بالديجون (١٨ قطعة)' },
    description: {
      en: 'Tender slow-roasted beef tenderloin slices, caramelized red onion jam, French dijon sauce, and wild rocket.',
      ar: 'شرائح لحم بقر مشوية ببطء، مربى البصل المكرمل، صلصة الديجون الفرنسية، وأوراق الجرجير البري.',
    },
    category: 'mini-clubs',
    price: 165,
    image: FRIENDLY_TABLE_PHOTOS.roastBeef,
    stock: 30,
    isAvailable: true,
    servingSize: { en: '18 Pieces Box', ar: 'بوكس ١٨ قطعة' },
  },
  {
    id: 'p-mc-4',
    name: { en: 'Chef Selection Assorted Mini Club Box (32 Pcs)', ar: 'بوكس تشكيلة الشيف للميني كلوب (٣٢ قطعة)' },
    description: {
      en: 'A crowd favorite! 32 pieces including Chicken, Roast Beef, Turkey, Salmon, and Herb Cheese mini clubs in a gold tiered gift box.',
      ar: 'الأكثر طلباً للجمعات! ٣٢ قطعة مشكلة من ميني كلوب الدجاج، اللحم المشوي، التركي، السلمون، والجبن بالأعشاب في علبة فاخرة.',
    },
    category: 'mini-clubs',
    price: 245,
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 45,
    isAvailable: true,
    isBestseller: true,
    isFeatured: true,
    servingSize: { en: '32 Pieces Box (8-12 Guests)', ar: 'بوكس ٣٢ قطعة (٨ - ١٢ شخص)' },
  },

  // ==========================================
  // E. PREMIUM SANDWICHES (8 Items with Bread Selection)
  // ==========================================
  {
    id: 'p-ps-1',
    name: { en: 'Artisan Smoked Salmon Sandwich', ar: 'ساندوتش السلمون المدخن الفاخر' },
    description: {
      en: 'Wild Norwegian salmon, whipped lemon dill labneh, baby capers, and cucumber carpaccio. Served with your choice of artisan bread.',
      ar: 'سلمون نرويجي بري، لبنة بالليمون والشبت، حبات الكبر، وشرائح خيار رقيقة. يُقدم مع اختيارك من الخبز الفاخر.',
    },
    category: 'premium-sandwiches',
    price: 65,
    image: FRIENDLY_TABLE_PHOTOS.smokedSalmon,
    stock: 40,
    isAvailable: true,
    isBestseller: true,
    breadOptions: ['Brioche', 'Croissant', 'Multigrain Bread', 'French Baguette', 'White Bread', 'Brown Bread'],
  },
  {
    id: 'p-ps-2',
    name: { en: 'Truffle Grilled Chicken Sandwich', ar: 'ساندوتش الدجاج المشوي بصوص الترفل' },
    description: {
      en: 'Free-range chicken breast grilled with rosemary, black truffle cream, aged parmesan, and baby arugula on selected bread.',
      ar: 'صدر دجاج مشوي بإكليل الجبل، كريمة الكمأة السوداء، بارميزان معتق، وجرجير طازج على خبزك المفضل.',
    },
    category: 'premium-sandwiches',
    price: 58,
    image: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
    stock: 45,
    isAvailable: true,
    isFeatured: true,
    breadOptions: ['Brioche', 'Croissant', 'Multigrain Bread', 'French Baguette', 'White Bread', 'Brown Bread'],
  },
  {
    id: 'p-ps-3',
    name: { en: 'Roast Beef & Cheddar Sandwich', ar: 'ساندوتش روست بيف وشيدر معتق' },
    description: {
      en: 'Thin tender roast beef cuts, caramelized onion marmalade, aged cheddar, and Dijon cream.',
      ar: 'شرائح لحم بقر مشوي طري، مربى البصل المكرمل، جبن شيدر معتق، وصلصة ديجون الفرنسية.',
    },
    category: 'premium-sandwiches',
    price: 62,
    image: FRIENDLY_TABLE_PHOTOS.roastBeef,
    stock: 35,
    isAvailable: true,
    breadOptions: ['Brioche', 'Croissant', 'Multigrain Bread', 'French Baguette', 'White Bread', 'Brown Bread'],
  },
  {
    id: 'p-ps-4',
    name: { en: 'Friendly Table Signature Sandwich', ar: 'ساندوتش فرندلي تيبل الملكي' },
    description: {
      en: 'Smoked turkey, French brie, homemade fig compote, toasted walnuts, and honey mustard glaze.',
      ar: 'ديك رومي مدخن، جبنة بري فرنسية كريمية، مربى التين المنزلية، عين الجمل المحمص، وصوص العسل والخردل.',
    },
    category: 'premium-sandwiches',
    price: 68,
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 50,
    isAvailable: true,
    isBestseller: true,
    breadOptions: ['Brioche', 'Croissant', 'Multigrain Bread', 'French Baguette', 'White Bread', 'Brown Bread'],
  },

  // ==========================================
  // F. READY-MADE INDIVIDUAL SNACK & PARTY BOXES (10 Boxes)
  // ==========================================
  {
    id: 'p-box-1',
    name: { en: '1. Mini Classic Box', ar: '١. بوكس ميني كلاسيك' },
    description: {
      en: '1 Mini Sandwich of your choice, 1 delicious mini cake or cupcake, and 1 refreshing cold juice. Perfect for workshops and meetings.',
      ar: '١ ميني ساندوتش شهي من اختيارك، ١ ميني كيك طازج، و١ عصير بارد منعش. مثالي للورش واجتماعات العمل الخفيفة.',
    },
    category: 'ready-made-boxes',
    price: 55,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 80,
    isAvailable: true,
    isBestseller: true,
    boxContents: {
      en: '1 Mini Sandwich • 1 Mini Cake • 1 Cold Juice (250ml)',
      ar: '١ ميني ساندوتش • ١ ميني كيك • ١ عصير بارد (٢٥٠ مل)',
    },
  },
  {
    id: 'p-box-2',
    name: { en: '2. Double Sandwich Box', ar: '٢. بوكس الساندوتش الثنائي' },
    description: {
      en: '2 assorted savory mini sandwiches, 1 mini cake slice, and 1 cold fruit juice in our signature branded box.',
      ar: '٢ ميني ساندوتش مشكلين، شريحة كيك فاخرة، وعصير فواكه طازج في علبة فرندلي الوردي الأنيقة.',
    },
    category: 'ready-made-boxes',
    price: 85,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 70,
    isAvailable: true,
    isFeatured: true,
    boxContents: {
      en: '2 Mini Sandwiches • 1 Mini Cake • 1 Juice',
      ar: '٢ ميني ساندوتش • ١ ميني كيك • ١ عصير فواكه',
    },
  },
  {
    id: 'p-box-3',
    name: { en: '3. Premium Snack Box', ar: '٣. بوكس السناك الفاخر' },
    description: {
      en: '2 premium gourmet mini sandwiches, 1 premium artisan dessert slice, 1 cold-pressed juice, and 1 Belgian chocolate piece.',
      ar: '٢ ميني ساندوتش فاخر، شريحة حلى مميزة، عصير فريش بارد، وقطعة شوكولاتة بلجيكية فاخرة.',
    },
    category: 'ready-made-boxes',
    price: 110,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 55,
    isAvailable: true,
    isBestseller: true,
    boxContents: {
      en: '2 Premium Sandwiches • 1 Premium Cake • 1 Juice • 1 Chocolate Piece',
      ar: '٢ ساندوتش فاخر • ١ كيك فاخر • ١ عصير طبيعي • ١ قطعة شوكولاتة',
    },
  },
  {
    id: 'p-box-4',
    name: { en: '4. Sweet & Savory Box', ar: '٤. بوكس المالح والحالي' },
    description: {
      en: 'The balanced mix: 1 Mini Sandwich, 1 French butter mini croissant, 1 mini dessert bite, and 1 cold beverage.',
      ar: 'التوازن المثالي: ١ ميني ساندوتش، ١ ميني كرواسون زبدة فرنسي، ١ قطعة حلى ميني، وعصير بارد منعش.',
    },
    category: 'ready-made-boxes',
    price: 80,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 60,
    isAvailable: true,
    boxContents: {
      en: '1 Mini Sandwich • 1 Mini Croissant • 1 Mini Dessert • 1 Juice',
      ar: '١ ميني ساندوتش • ١ ميني كرواسون • ١ حلى ميني • ١ عصير',
    },
  },
  {
    id: 'p-box-5',
    name: { en: '5. Kids Party Box', ar: '٥. بوكس حفلات الأطفال' },
    description: {
      en: '1 gentle mini sandwich, 1 rainbow sprinkle cupcake, 1 juice box, and 1 chocolate cookie in festive child-friendly packaging.',
      ar: '١ ميني ساندوتش خفيف، ١ كب كيك بالحبيبات الملونة، ١ عصير، و١ كوكيز شوكولاتة في تغليف كرتوني بهيج للأطفال.',
    },
    category: 'ready-made-boxes',
    price: 60,
    image: FRIENDLY_TABLE_PHOTOS.kidsPartySnackBox,
    stock: 90,
    isAvailable: true,
    boxContents: {
      en: '1 Mini Sandwich • 1 Cupcake • 1 Juice • 1 Cookie (Kids Packaging)',
      ar: '١ ساندوتش أطفال • ١ كب كيك ملون • ١ عصير • ١ كوكيز (تغليف أطفال)',
    },
  },
  {
    id: 'p-box-6',
    name: { en: '6. School Snack Box', ar: '٦. بوكس المدرسة والرحلات' },
    description: {
      en: 'Nutritious & energetic: 2 mini sandwiches, 1 mini cake, 1 fruit juice, and 1 fruit portion or cookie.',
      ar: 'مغذي ومحبب للطلاب: ٢ ميني ساندوتش، ١ ميني كيك، ١ عصير فواكه طبيعي، وقطعة كوكيز أو فاكهة طازجة.',
    },
    category: 'ready-made-boxes',
    price: 75,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 85,
    isAvailable: true,
    boxContents: {
      en: '2 Mini Sandwiches • 1 Mini Cake • 1 Juice • 1 Cookie or Fruit Cup',
      ar: '٢ ميني ساندوتش • ١ ميني كيك • ١ عصير • ١ كوكيز أو فاكهة',
    },
  },
  {
    id: 'p-box-7',
    name: { en: '7. University & Workshop Box', ar: '٧. بوكس الجامعات والورش' },
    description: {
      en: 'Designed for lectures and training seminars: 2 mini sandwiches, 1 gourmet cake slice, 1 juice, and 1 chocolate bite.',
      ar: 'مخصص للمحاضرات وورش العمل التدريبية: ٢ ميني ساندوتش، شريحة كيك فاخرة، عصير فريش، وقطعة شوكولاتة.',
    },
    category: 'ready-made-boxes',
    price: 90,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 65,
    isAvailable: true,
    boxContents: {
      en: '2 Mini Sandwiches • 1 Cake Slice • 1 Juice • 1 Chocolate Piece',
      ar: '٢ ميني ساندوتش • ١ شريحة كيك • ١ عصير • ١ قطعة شوكولاتة',
    },
  },
  {
    id: 'p-box-8',
    name: { en: '8. Corporate Individual Box', ar: '٨. بوكس الشركات التنفيذي الفردي' },
    description: {
      en: '2 premium gourmet sandwiches, 1 luxury dessert, 1 premium juice or sparkling drink, in an executive black and gold gift box.',
      ar: '٢ ساندوتش فاخر راقٍ، ١ حلى فاخر، ١ عصير بريميوم، في علبة هدايا تنفيذية أنيقة باللون الذهبي والأسود.',
    },
    category: 'ready-made-boxes',
    price: 125,
    originalPrice: 155,
    offerEndsAt: '2026-11-20T23:59:59Z',
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 50,
    isAvailable: true,
    isFeatured: true,
    boxContents: {
      en: '2 Premium Sandwiches • 1 Luxury Dessert • 1 Selected Drink (Executive Box)',
      ar: '٢ ساندوتش فاخر • ١ حلى ملكي • ١ مشروب بريميوم (علبة تنفيذية)',
    },
  },
  {
    id: 'p-box-9',
    name: { en: '9. Mini Breakfast Box', ar: '٩. بوكس الإفطار الصباحي' },
    description: {
      en: 'Start the day right: 1 Mini Butter Croissant, 1 Mini Cheese Sandwich, 1 Mini Sweet Pastry (Danish), and fresh orange juice.',
      ar: 'بداية صباحية شهية: ١ ميني كرواسون زبدة، ١ ميني ساندوتش جبن، ١ دانِش حلوى، وعصير برتقال طبيعي.',
    },
    category: 'ready-made-boxes',
    price: 70,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 75,
    isAvailable: true,
    boxContents: {
      en: 'Mini Croissant • Mini Sandwich • Mini Danish Pastry • Fresh Orange Juice',
      ar: 'ميني كرواسون • ميني ساندوتش • ميني معجنات دانِش • عصير برتقال طازج',
    },
  },
  {
    id: 'p-box-10',
    name: { en: '10. Friendly Table Signature Box', ar: '١٠. بوكس فرندلي تيبل التوقيع الفاخر' },
    description: {
      en: 'Our flagship individual box: 2 Chef Signature sandwiches, 1 premium dessert cup, 1 gourmet juice, 2 Belgian pralines, and personalized greeting card.',
      ar: 'البوكس الفردي الأيقوني المتكامل: ٢ ساندوتش توقيع الشيف، ١ كاسة حلى بريميوم، ١ عصير فريش، حبتين برالين شوكولاتة، وبطاقة إهداء خاصة.',
    },
    category: 'ready-made-boxes',
    price: 145,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    stock: 45,
    isAvailable: true,
    isBestseller: true,
    boxContents: {
      en: '2 Signature Sandwiches • 1 Gourmet Dessert • 1 Cold Juice • 2 Chocolates • Greeting Card',
      ar: '٢ ساندوتش توقيع • ١ حلى فاخر • ١ عصير فريش • ٢ شوكولاتة • بطاقة إهداء',
    },
  },

  // ==========================================
  // G. GROUP & PARTY BOXES (8 Items with 5 to 500+ people selector)
  // ==========================================
  {
    id: 'p-grp-1',
    name: { en: 'Small Gathering Box (12 Sandwiches)', ar: 'بوكس الجمعات الصغير (١٢ ساندوتش)' },
    description: {
      en: 'Perfect for small family gatherings and meetings of 4 to 6 people. Includes 12 freshly prepared assorted mini sandwiches with dipping sauces.',
      ar: 'مثالي للجمعات العائلية واجتماعات العمل من ٤ إلى ٦ أشخاص. يحتوي على ١٢ ساندوتش شهي مع صلصات تغميس خاصة.',
    },
    category: 'group-boxes',
    price: 210,
    originalPrice: 250,
    offerEndsAt: '2026-11-20T23:59:59Z',
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 35,
    isAvailable: true,
    isBestseller: true,
    minPeople: 5,
    maxPeople: 6,
    servingSize: { en: '4 - 6 People (12 Sandwiches)', ar: '٤ - ٦ أشخاص (١٢ ساندوتش)' },
  },
  {
    id: 'p-grp-2',
    name: { en: 'Family Gathering Box (24 Sandwiches)', ar: 'بوكس الجمعات العائلية (٢٤ ساندوتش)' },
    description: {
      en: 'Ideal for weekend family feasts and team meetings for 8 to 12 guests. 24 assorted artisanal sandwiches in our signature Friendly gift box.',
      ar: 'مثالي للجمعات العائلية واجتماعات الفرق لـ ٨ إلى ١٢ ضيفاً. ٢٤ ساندوتش متنوعة في علبة فرندلي الوردي الأنيقة.',
    },
    category: 'group-boxes',
    price: 380,
    originalPrice: 440,
    offerEndsAt: '2026-11-20T23:59:59Z',
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 30,
    isAvailable: true,
    isFeatured: true,
    minPeople: 10,
    maxPeople: 12,
    servingSize: { en: '8 - 12 People (24 Sandwiches)', ar: '٨ - ١٢ شخص (٢٤ ساندوتش)' },
  },
  {
    id: 'p-grp-3',
    name: { en: 'Office Meeting Box (36 Sandwiches)', ar: 'بوكس اجتماعات العمل والمكاتب (٣٦ ساندوتش)' },
    description: {
      en: 'Specially crafted for office breakfasts and conference room lunches for 15 to 20 people. Assorted meats, chicken, and vegetarian options.',
      ar: 'مخصص لاجتماعات المكاتب وغرف المؤتمرات لـ ١٥ إلى ٢٠ شخصاً. تشكيلة متوازنة من الدجاج، اللحوم، والخيارات النباتية.',
    },
    category: 'group-boxes',
    price: 540,
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 25,
    isAvailable: true,
    minPeople: 20,
    maxPeople: 25,
    servingSize: { en: '15 - 20 People (36 Sandwiches)', ar: '١٥ - ٢٠ شخص (٣٦ ساندوتش)' },
  },
  {
    id: 'p-grp-4',
    name: { en: 'Grand Celebration Mega Platter (60 Sandwiches)', ar: 'بلاتر الاحتفالات الكبرى الفاخر (٦٠ ساندوتش)' },
    description: {
      en: 'Generous party feast for 30 to 40 guests. Premium selection with gourmet garnishes, homemade dips, and gold celebration ribbon.',
      ar: 'وليمة احتفالية تكفي من ٣٠ إلى ٤٠ ضيفاً. تشكيلة ملكية من ٦٠ ساندوتش ميني فاخر مع صوصات خاصة وشريط فرندلي الذهبي.',
    },
    category: 'group-boxes',
    price: 850,
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 20,
    isAvailable: true,
    isBestseller: true,
    minPeople: 30,
    maxPeople: 50,
    servingSize: { en: '30 - 40 People (60 Sandwiches)', ar: '٣٠ - ٤٠ شخص (٦٠ ساندوتش)' },
  },

  // ==========================================
  // H. BAKERY & CROISSANTS (10 Items)
  // ==========================================
  {
    id: 'p-bak-1',
    name: { en: 'French Butter Croissant (Box of 6)', ar: 'بوكس كرواسون الزبدة الفرنسي (٦ قطع)' },
    description: {
      en: 'Pure Normandy butter flaky croissants, baked golden every morning.',
      ar: 'كرواسون زبدة النورماندي الفرنسية الأصيلة، هش ومورق ومخبوز طازجاً كل صباح.',
    },
    category: 'bakery-croissants',
    price: 95,
    image: FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
    stock: 40,
    isAvailable: true,
  },
  {
    id: 'p-bak-2',
    name: { en: 'Belgian Chocolate Croissant / Pain au Chocolat (6 Pcs)', ar: 'بان أو شوكولا بلجيكي (٦ قطع)' },
    description: {
      en: 'Golden layered puff pastry rolled around double dark Belgian chocolate batons.',
      ar: 'معجنات فرنسية هشة محشوة بعمودين من الشوكولاتة البلجيكية الداكنة الفاخرة.',
    },
    category: 'bakery-croissants',
    price: 110,
    image: FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
    stock: 35,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: 'p-bak-3',
    name: { en: 'Cinnamon Brioche Rolls (Box of 6)', ar: 'بوكس سينامون رولز بالقرفة والفروستينج (٦ قطع)' },
    description: {
      en: 'Warm cinnamon spice swirled into soft brioche and glazed with sweet cream cheese drizzle.',
      ar: 'رولات القرفة السويسرية الغنية بعجين البريوش الطري مغطاة بكريمة الجبن اللذيذة.',
    },
    category: 'bakery-croissants',
    price: 105,
    image: FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
    stock: 30,
    isAvailable: true,
  },
  {
    id: 'p-bak-4',
    name: { en: 'Mini Savory Quiche Box (12 Pcs)', ar: 'بوكس ميني كيش مالح مشكل (١٢ قطعة)' },
    description: {
      en: '12 bite-sized quiches: Smoked turkey & leek, mushroom truffle, and spinach feta cheese.',
      ar: '١٢ قطعة كيش فرنسي مقرمش بحشوات التركي والكرات، المشروم والترفل، والسبانخ وجبنة الفيتا.',
    },
    category: 'bakery-croissants',
    price: 135,
    image: FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
    stock: 25,
    isAvailable: true,
  },

  // ==========================================
  // I. CAKES & DESSERTS (12 Items)
  // ==========================================
  {
    id: 'p-des-1',
    name: { en: 'Friendly Signature Celebration Cake (6-inch)', ar: 'كيكة احتفالات فرندلي الملكية (٦ إنش)' },
    description: {
      en: 'Vanilla bean sponge layered with fresh strawberry confit, velvety mascarpone cream, and edible gold sugar pearls.',
      ar: 'كيكة الفانيليا الإسفنجية بحشوة الفراولة الطازجة وطبقات كريمة الماسكاربوني المخملية ومزينة بلمسات ذهبية راقية.',
    },
    category: 'cakes-desserts',
    price: 280,
    image: FRIENDLY_TABLE_PHOTOS.celebrationCakeCupcakes,
    stock: 20,
    isAvailable: true,
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: 'p-des-2',
    name: { en: 'Gourmet Assorted Cupcake Dozen (12 Pcs)', ar: 'بوكس درزن كب كيك مشكل فاخر (١٢ قطعة)' },
    description: {
      en: '12 handcrafted cupcakes: 4 Pink Velvet, 4 Salted Caramel Ganache, and 4 Raspberry Pistachio with soft piped frostings.',
      ar: '١٢ قطعة كب كيك محضرة يدوياً: ٤ بينك فلفيت، ٤ كراميل مملح وجناش، و٤ فستق وتوت بكريمة ناعمة.',
    },
    category: 'cakes-desserts',
    price: 160,
    originalPrice: 195,
    offerEndsAt: '2026-11-20T23:59:59Z',
    image: FRIENDLY_TABLE_PHOTOS.gourmetCupcakesDozen,
    stock: 35,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: 'p-des-3',
    name: { en: 'Belgian Chocolate Fudge Brownies (Box of 8)', ar: 'بوكس براونيز الشوكولاتة البلجيكية (٨ قطع)' },
    description: {
      en: 'Ultra-fudgy 70% dark Belgian chocolate brownies sprinkled with sea salt flakes and roasted pecan nuts.',
      ar: 'براونيز غنية وطرية بـ ٧٠٪ شوكولاتة بلجيكية داكنة مرشوشة برقائق الملح البحري وحبات البيكان المحمصة.',
    },
    category: 'cakes-desserts',
    price: 110,
    image: FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
    stock: 30,
    isAvailable: true,
  },
  {
    id: 'p-des-4',
    name: { en: 'Mini French Eclairs Box (10 Pcs)', ar: 'بوكس ميني إكلير فرنسي (١٠ قطع)' },
    description: {
      en: 'Crisp choux pastry filled with Tahitian vanilla bean cream and glazed in dark chocolate & salted caramel.',
      ar: 'عجينة الشو الفرنسية المقرمشة محشوة بكريمة الفانيليا الفاخرة ومغطاة بالشوكولاتة والكراميل المملح.',
    },
    category: 'cakes-desserts',
    price: 130,
    image: FRIENDLY_TABLE_PHOTOS.frenchMiniEclairsBox,
    stock: 25,
    isAvailable: true,
  },

  // ==========================================
  // J. CHOCOLATES & GIFTS (9 Items)
  // ==========================================
  {
    id: 'p-choc-1',
    name: { en: 'Friendly Signature Praline Gift Box (24 Pcs)', ar: 'بوكس شوكولاتة برالين فرندلي الملكي (٢٤ قطعة)' },
    description: {
      en: 'Luxurious gift box with gold hot-stamped logo and satin ribbon. Filled with 24 artisanal Belgian chocolate pralines in hazelnut, saffron, and passionfruit.',
      ar: 'علبة هدايا ملكية فاخرة محفورة بالذهب ومزينة بشريط ساتان، تحوي ٢٤ قطعة شوكولاتة برالين بلجيكية بحشوات البندق والزعفران والباشن فروت.',
    },
    category: 'chocolates-gifts',
    price: 220,
    originalPrice: 265,
    offerEndsAt: '2026-11-20T23:59:59Z',
    image: FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
    stock: 40,
    isAvailable: true,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 'p-choc-2',
    name: { en: 'Luxury Celebration Gift Hamper', ar: 'سلة الهدايا الفاخرة الكبرى' },
    description: {
      en: 'A grand VIP gift basket containing our signature praline box, assorted mini cookies jar, pure wildflower honey, French gourmet tea tin, and custom greeting card.',
      ar: 'سلة هدايا فخمة تضم بوكس البرالين المميز، جار الكوكيز المشكل، عسل الزهور البرية النقي، علبة شاي فرنسي فاخر، وبطاقة تهنئة خاصة.',
    },
    category: 'chocolates-gifts',
    price: 490,
    image: FRIENDLY_TABLE_PHOTOS.luxuryCelebrationHamper,
    stock: 15,
    isAvailable: true,
  },
  {
    id: 'p-choc-3',
    name: { en: 'Thank You Gift Sweet Box', ar: 'بوكس هدية شكراً وتقدير' },
    description: {
      en: 'Thoughtful pink gift box with a thank-you sleeve, filled with assorted truffles and hand-piped chocolate mendiants.',
      ar: 'علبة وردية أنيقة بعبارة شكر وتقدير، تحتوي على ترافلز متنوعة وحبات شوكولاتة مزينة بالمكسرات المجففة.',
    },
    category: 'chocolates-gifts',
    price: 120,
    image: FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
    stock: 30,
    isAvailable: true,
  },

  // ==========================================
  // K. CATERING & EVENTS PACKAGES (4 Packages)
  // ==========================================
  {
    id: 'p-cat-1',
    name: { en: 'Corporate Conference Catering Package (50 Guests)', ar: 'باقة ضيافة المؤتمرات والشركات (٥٠ ضيفاً)' },
    description: {
      en: 'Complete coffee-break & lunch setup: 120 assorted mini club sandwiches, 60 dessert bites, fresh cold-pressed juices, and disposable bamboo table trays.',
      ar: 'بوفيه متكامل لاجتماعات العمل: ١٢٠ ساندوتش ميني كلوب مشكل، ٦٠ قطعة حلى صغيرة، عصائر طبيعية باردة، وأطباق تقديم خيزران راقية.',
    },
    category: 'catering-events',
    price: 2400,
    image: FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
    stock: 10,
    isAvailable: true,
    minPeople: 50,
    maxPeople: 75,
  },
  {
    id: 'p-cat-2',
    name: { en: 'Birthday & Family Celebration Buffet (25 Guests)', ar: 'بوفيه أعياد الميلاد والجمعات العائلية (٢٥ ضيفاً)' },
    description: {
      en: '60 mini club sandwiches, 30 cupcakes, 30 brownies, 1 signature celebration cake (8-inch), decorative stands, and floral accents.',
      ar: '٦٠ ساندوتش ميني كلوب، ٣٠ كب كيك، ٣٠ براونيز، كيكة احتفال خاصة (٨ إنش)، وحوامل تقديم أنيقة مع لمسات وردية جميلة.',
    },
    category: 'catering-events',
    price: 1550,
    image: FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
    stock: 12,
    isAvailable: true,
    minPeople: 25,
    maxPeople: 35,
  },
];

export const initialCoupons: Coupon[] = [
  {
    id: 'c-welcome',
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 100,
    expiresAt: '2027-12-31',
    isActive: true,
    usageCount: 42,
  },
  {
    id: 'c-sweet20',
    code: 'SWEET20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 250,
    expiresAt: '2027-12-31',
    isActive: true,
    usageCount: 19,
  },
  {
    id: 'c-party50',
    code: 'PARTY50',
    discountType: 'fixed',
    discountValue: 50,
    minOrderValue: 400,
    expiresAt: '2027-12-31',
    isActive: true,
    usageCount: 14,
  },
];

export const initialBulkQuotations: BulkQuotationRequest[] = [
  {
    id: 'bulk-q-101',
    createdAt: '2026-11-09T09:30:00Z',
    customerName: 'Eng. Karim Mansour',
    organizationName: 'El Alamein International University (AIU)',
    phone: '+201023456789',
    email: 'k.mansour@aiu.edu.eg',
    boxType: 'ready_made',
    targetBoxName: 'University & Workshop Box',
    boxQuantity: 150,
    eventDate: '2026-11-25',
    deliveryAddress: 'Main Campus, Conference Hall B, New Alamein',
    eventType: 'Academic Symposium & Workshop',
    specialInstructions: 'Need branded university stickers on packaging and split morning delivery.',
    status: 'quoted',
    quotedUnitPrice: 75,
    quotedTotal: 11250,
    adminNotes: 'Discount of 15 EGP per box applied for 150 volume. Confirmed with client.',
  },
  {
    id: 'bulk-q-102',
    createdAt: '2026-11-08T15:20:00Z',
    customerName: 'Nour El-Din Sherif',
    organizationName: 'Vodafone Egypt Technology Hub',
    phone: '+201145678901',
    email: 'nour.sherif@vodafone.com',
    boxType: 'custom_box',
    targetBoxName: 'Corporate Individual Box',
    boxQuantity: 300,
    eventDate: '2026-12-05',
    deliveryAddress: 'Smart Village, Building B4, 6th of October City, Giza',
    eventType: 'Annual Tech Hackathon',
    specialInstructions: 'All boxes must be individually sealed with allergen warnings.',
    status: 'under_review',
    adminNotes: 'Reviewing bakery production capacity for Dec 5.',
  },
];

export const initialCateringRequests: CateringRequest[] = [
  {
    id: 'cat-req-101',
    createdAt: '2026-11-08T14:30:00Z',
    customerName: 'Noura Al-Banna',
    phone: '+201098765432',
    email: 'noura.banna@example.com',
    eventType: 'corporate_event',
    guestCount: 65,
    eventDate: '2026-11-20',
    location: 'Four Seasons Nile Plaza, Cairo',
    estimatedBudget: '4000 - 6000 EGP',
    requestedCategories: ['mini-clubs', 'cakes-desserts', 'catering-events'],
    specialRequirements: 'Need wooden presentation trays and morning delivery by 8:30 AM before keynote session.',
    status: 'quoted',
    quoteAmount: 4850,
    adminNotes: 'Quote sent via WhatsApp and email on Nov 8. Noura confirmed interest.',
  },
  {
    id: 'cat-req-102',
    createdAt: '2026-11-07T18:15:00Z',
    customerName: 'Tarek El-Sayed',
    phone: '+201234567890',
    email: 'tarek.s@example.com',
    eventType: 'family_gathering',
    guestCount: 30,
    eventDate: '2026-11-15',
    location: 'Zamalek, Cairo',
    estimatedBudget: '2000 - 3000 EGP',
    requestedCategories: ['group-boxes', 'chocolates-gifts'],
    specialRequirements: 'Half vegetarian options requested. Custom pink ribbon for mother’s anniversary.',
    status: 'pending',
  },
];

export const initialOrders: Order[] = [
  {
    id: 'FT-2026-8941',
    createdAt: '2026-11-09T08:15:00Z',
    customer: {
      name: 'Salma Mostafa',
      phone: '+201011223344',
      email: 'salma.m@example.com',
      address: 'Villa 14, Degla Palms, Maadi',
      city: 'Cairo',
      notes: 'Please ring the front villa bell and deliver in shade.',
    },
    orderType: 'delivery',
    deliveryDate: '2026-11-09',
    deliveryTimeSlot: '12:00 PM - 02:00 PM',
    items: [
      {
        id: 'line-1',
        productId: 'p-grp-2',
        product: initialProducts[24], // Family Gathering Box
        quantity: 1,
        unitPrice: 380,
        totalPrice: 380,
      },
      {
        id: 'line-2',
        productId: 'p-des-2',
        product: initialProducts[28], // Cupcake Dozen
        quantity: 1,
        unitPrice: 160,
        totalPrice: 160,
      },
    ],
    subtotal: 540,
    deliveryFee: 0,
    discount: 54,
    couponCode: 'WELCOME10',
    total: 486,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending',
    status: 'preparing',
    statusNotes: 'Chef team is arranging fresh sandwiches.',
  },
  {
    id: 'FT-2026-8930',
    createdAt: '2026-11-08T16:45:00Z',
    customer: {
      name: 'Dr. Hazem Fekry',
      phone: '+201122334455',
      email: 'hazem.f@example.com',
      address: 'Floor 4, Clinic Center, Mohandessin',
      city: 'Giza',
    },
    orderType: 'delivery',
    deliveryDate: '2026-11-08',
    deliveryTimeSlot: '06:00 PM - 08:00 PM',
    items: [
      {
        id: 'line-3',
        productId: 'p-mc-4',
        product: initialProducts[17], // Chef Selection 32 pcs
        quantity: 1,
        unitPrice: 245,
        totalPrice: 245,
      },
    ],
    subtotal: 245,
    deliveryFee: 35,
    discount: 0,
    total: 280,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'verified',
    status: 'completed',
  },
];

export const initialReviews = [
  {
    id: 'rev-1',
    name: 'Maha Al-Hassan',
    rating: 5,
    date: '2026-11-05',
    commentEn: 'Friendly Table made our family Friday gathering unforgettable! The mini clubs were super soft and fresh, and the pink box presentation was so chic!',
    commentAr: 'جمعة الجمعة العائلية صارت أحلى وأفخم مع فرندلي تيبل! الميني كلوب كان طري جداً وطازج، والبوكس الوردي يواجه ويفتح النفس!',
    roleEn: 'Family Gathering Host',
    roleAr: 'مستضيفة جمعة عائلية',
  },
  {
    id: 'rev-2',
    name: 'Khaled Al-Suwailem',
    rating: 5,
    date: '2026-11-02',
    commentEn: 'Ordered the 60-sandwich corporate box for our board meeting. Every executive asked where we got the food from. Punctual delivery and top tier taste.',
    commentAr: 'طلبنا بوكس الشركات لـ ٦٠ ساندوتش لاجتماع مجلس الإدارة. الكل انبهر بالجودة وسألوا عن المحل. توصيل دقيق في الموعد وطعم راقٍ.',
    roleEn: 'Executive Director',
    roleAr: 'مدير تنفيذي',
  },
  {
    id: 'rev-3',
    name: 'Lina & Tariq',
    rating: 5,
    date: '2026-10-28',
    commentEn: 'The custom box builder is brilliant! We selected individual mini clubs and cupcakes for our daughter’s birthday party. Highly recommended!',
    commentAr: 'خاصية تصميم البوكس بنفسك فكرة عبقرية! اخترنا الميني كلوب والكب كيك لحفلة ميلاد بنتنا مع الشريط الوردي. ننصح به بشدة!',
    roleEn: 'Parents & Loyal Guests',
    roleAr: 'ضيوف دائمين',
  },
];

export const demoUser: UserProfile = {
  id: 'usr-demo-1',
  name: 'Salma Mostafa',
  email: 'salma.m@example.com',
  phone: '+201011223344',
  role: 'customer',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home Villa / المنزل',
      address: 'Villa 14, Degla Palms, Maadi',
      city: 'Cairo',
    },
    {
      id: 'addr-2',
      label: 'Work Office / المكتب',
      address: 'Floor 6, Business District, New Cairo',
      city: 'Cairo',
    },
  ],
};
