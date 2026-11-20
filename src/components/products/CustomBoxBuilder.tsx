import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Check,
  ShoppingBag,
  Gift,
  Box,
  Heart,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { CustomBoxConfig, CustomBoxItem, LocalizedString } from '../../types';
import { FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

interface BoxSizeOption {
  id: CustomBoxConfig['boxSize'];
  name: LocalizedString;
  people: number;
  peopleLabel: LocalizedString;
  capacity: number; // total items allowance
  basePrice: number;
  image: string;
}

const BOX_SIZES: BoxSizeOption[] = [
  {
    id: 'individual',
    name: { en: 'Personal Duo Box', ar: 'بوكس لشخص أو شخصين' },
    people: 2,
    peopleLabel: { en: '1 - 2 Guests', ar: '١ - ٢ ضيوف' },
    capacity: 4,
    basePrice: 45,
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
  },
  {
    id: 'small',
    name: { en: 'Small Gathering Box', ar: 'بوكس الجمعات الصغير' },
    people: 6,
    peopleLabel: { en: '4 - 6 Guests', ar: '٤ - ٦ ضيوف' },
    capacity: 12,
    basePrice: 110,
    image: FRIENDLY_TABLE_PHOTOS.chickenClub,
  },
  {
    id: 'medium',
    name: { en: 'Family & Meeting Box', ar: 'بوكس العائلة والاجتماعات' },
    people: 12,
    peopleLabel: { en: '8 - 12 Guests', ar: '٨ - ١٢ شخص' },
    capacity: 24,
    basePrice: 195,
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
  },
  {
    id: 'large',
    name: { en: 'Grand Celebration Box', ar: 'بوكس الاحتفالات الكبير' },
    people: 25,
    peopleLabel: { en: '20 - 25 Guests', ar: '٢٠ - ٢٥ شخص' },
    capacity: 48,
    basePrice: 320,
    image: FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
  },
  {
    id: 'party',
    name: { en: 'Premium Mega Platter', ar: 'بلاتر المناسبات الضخم' },
    people: 50,
    peopleLabel: { en: '50+ Guests', ar: '٥٠+ ضيف' },
    capacity: 96,
    basePrice: 580,
    image: FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
  },
];

interface PackagingOption {
  id: CustomBoxConfig['packagingStyle'];
  name: LocalizedString;
  desc: LocalizedString;
  priceDelta: number;
}

const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'classic-pink',
    name: { en: 'Classic Friendly Table Soft Pink Box', ar: 'بوكس فرندلي الوردي الكلاسيكي' },
    desc: { en: 'Our signature baby pink box with embossed gold logo and satin trim.', ar: 'علبتنا الوردية الأيقونية بشعار ذهبي نافر وشريط ساتان فاخر.' },
    priceDelta: 0,
  },
  {
    id: 'gold-ribbon',
    name: { en: 'Premium Gift Box with Gold Ribbon', ar: 'تغليف الهدايا بالشريط الذهبي الفاخر' },
    desc: { en: 'Vanilla gift box tied with shimmering champagne gold hand-tied bow.', ar: 'علبة بلون الفانيليا مربوطة بفيونكة ذهبية أنيقة يدوية الصنع.' },
    priceDelta: 15,
  },
  {
    id: 'kids-party',
    name: { en: 'Kids Party Cheerful Box', ar: 'بوكس حفلات الأطفال المبهج' },
    desc: { en: 'Bright colorful illustrations with festive stickers.', ar: 'كرتون مرح وملون مع ستيكرات احتفالية للأطفال.' },
    priceDelta: 0,
  },
  {
    id: 'corporate',
    name: { en: 'Corporate Black & Gold Executive Box', ar: 'بوكس الشركات التنفيذي الأسود والذهبي' },
    desc: { en: 'Minimalist luxury executive packaging suitable for business meetings.', ar: 'تغليف تنفيذي فخم بالأسود والذهبي مناسب للاجتماعات والمؤتمرات.' },
    priceDelta: 20,
  },
  {
    id: 'wooden-hamper',
    name: { en: 'Artisanal Wooden Gathering Tray', ar: 'صينية التقديم الخشبية الريفية' },
    desc: { en: 'Reusable natural pine wood presentation tray with clear acrylic cover.', ar: 'صينية خشب صنوبر طبيعي راقية قابلة لإعادة الاستخدام مع غطاء أكريليك.' },
    priceDelta: 50,
  },
];

interface SelectableItem {
  id: string;
  name: LocalizedString;
  category: 'sandwiches' | 'desserts' | 'drinks' | 'extras';
  pricePerItem: number;
  image: string;
}

const SELECTABLE_ITEMS: SelectableItem[] = [
  // Step 2: Sandwiches
  {
    id: 'sb-chicken-club',
    name: { en: 'Chicken Club Mini', ar: 'ميني تشيكن كلوب' },
    category: 'sandwiches',
    pricePerItem: 18,
    image: FRIENDLY_TABLE_PHOTOS.chickenClub,
  },
  {
    id: 'sb-roast-beef',
    name: { en: 'Roast Beef & Dijon Mini', ar: 'ميني روست بيف بالديجون' },
    category: 'sandwiches',
    pricePerItem: 24,
    image: FRIENDLY_TABLE_PHOTOS.roastBeef,
  },
  {
    id: 'sb-salmon',
    name: { en: 'Smoked Salmon & Dill Mini', ar: 'ميني سلمون مدخن وشبت' },
    category: 'sandwiches',
    pricePerItem: 28,
    image: FRIENDLY_TABLE_PHOTOS.smokedSalmon,
  },
  {
    id: 'sb-turkey-cheese',
    name: { en: 'Turkey & Cheese Mini', ar: 'ميني تركي وجبنة' },
    category: 'sandwiches',
    pricePerItem: 20,
    image: FRIENDLY_TABLE_PHOTOS.turkeyCheeseSandwich,
  },
  {
    id: 'sb-tuna',
    name: { en: 'Mediterranean Tuna Mini', ar: 'ميني تونة بالليمون' },
    category: 'sandwiches',
    pricePerItem: 18,
    image: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  },
  {
    id: 'sb-egg-salad',
    name: { en: 'Egg Salad Chive Mini', ar: 'ميني سلطة البيض' },
    category: 'sandwiches',
    pricePerItem: 16,
    image: FRIENDLY_TABLE_PHOTOS.tunaEggCucumberMini,
  },
  {
    id: 'sb-chicken-caesar',
    name: { en: 'Chicken Caesar Mini', ar: 'ميني تشيكن سيزر' },
    category: 'sandwiches',
    pricePerItem: 20,
    image: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
  },
  {
    id: 'sb-mozzarella-pesto',
    name: { en: 'Mozzarella & Pesto Mini', ar: 'ميني موزاريلا وبيستو' },
    category: 'sandwiches',
    pricePerItem: 22,
    image: FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
  },
  {
    id: 'sb-vegetarian',
    name: { en: 'Grilled Vegetables & Hummus', ar: 'ميني خضار مشوي وحمص' },
    category: 'sandwiches',
    pricePerItem: 17,
    image: FRIENDLY_TABLE_PHOTOS.halloumiMozzarellaVeggie,
  },

  // Step 3: Cakes & Desserts
  {
    id: 'sb-cupcake',
    name: { en: 'Friendly Pink Velvet Cupcake', ar: 'كب كيك بينك فلفيت' },
    category: 'desserts',
    pricePerItem: 15,
    image: FRIENDLY_TABLE_PHOTOS.gourmetCupcakesDozen,
  },
  {
    id: 'sb-brownie',
    name: { en: 'Belgian Chocolate Fudge Brownie', ar: 'براوني الشوكولاتة البلجيكية' },
    category: 'desserts',
    pricePerItem: 18,
    image: FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
  },
  {
    id: 'sb-cake-slice',
    name: { en: 'Vanilla Strawberry Cake Slice', ar: 'شريحة كيك فانيليا وفراولة' },
    category: 'desserts',
    pricePerItem: 22,
    image: FRIENDLY_TABLE_PHOTOS.celebrationCakeCupcakes,
  },
  {
    id: 'sb-cookie',
    name: { en: 'Sea Salt Chocolate Cookie', ar: 'كوكيز الشوكولاتة والملح البحري' },
    category: 'desserts',
    pricePerItem: 12,
    image: FRIENDLY_TABLE_PHOTOS.chocolatePastryBrownies,
  },
  {
    id: 'sb-eclair',
    name: { en: 'Mini French Eclair', ar: 'ميني إكلير فرنسي' },
    category: 'desserts',
    pricePerItem: 16,
    image: FRIENDLY_TABLE_PHOTOS.frenchMiniEclairsBox,
  },

  // Step 4: Drinks
  {
    id: 'sb-drk-orange',
    name: { en: 'Valencia Fresh Orange Juice', ar: 'عصير برتقال طبيعي طازج' },
    category: 'drinks',
    pricePerItem: 15,
    image: FRIENDLY_TABLE_PHOTOS.freshJuicesFruitCup,
  },
  {
    id: 'sb-drk-apple',
    name: { en: 'Pure Crisp Apple Juice', ar: 'عصير تفاح طبيعي نقي' },
    category: 'drinks',
    pricePerItem: 15,
    image: FRIENDLY_TABLE_PHOTOS.freshJuicesFruitCup,
  },
  {
    id: 'sb-drk-mango',
    name: { en: 'Velvety Mango Nectar', ar: 'عصير مانجو طبيعي فاخر' },
    category: 'drinks',
    pricePerItem: 18,
    image: FRIENDLY_TABLE_PHOTOS.freshJuicesFruitCup,
  },

  // Step 5: Extras
  {
    id: 'sb-ext-croissant',
    name: { en: 'Mini French Butter Croissant', ar: 'ميني كرواسون زبدة فرنسي' },
    category: 'extras',
    pricePerItem: 14,
    image: FRIENDLY_TABLE_PHOTOS.butterCroissantSavory,
  },
  {
    id: 'sb-ext-praline',
    name: { en: 'Belgian Chocolate Praline Duo (2 Pcs)', ar: 'حبتين شوكولاتة برالين بلجيكية' },
    category: 'extras',
    pricePerItem: 20,
    image: FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
  },
  {
    id: 'sb-ext-fruits',
    name: { en: 'Seasonal Fresh Fruit Cup', ar: 'كوب فواكه موسمية طازجة' },
    category: 'extras',
    pricePerItem: 16,
    image: FRIENDLY_TABLE_PHOTOS.freshJuicesFruitCup,
  },
];

export const CustomBoxBuilder: React.FC = () => {
  const {
    language,
    t,
    addToCart,
    formatPrice,
    setIsBulkModalOpen,
    setBulkModalTargetBox,
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<BoxSizeOption>(BOX_SIZES[0]); // Default personal
  const [selectedPackaging, setSelectedPackaging] = useState<PackagingOption>(PACKAGING_OPTIONS[0]);
  const [selectedItems, setSelectedItems] = useState<{ [itemId: string]: number }>({
    'sb-chicken-club': 1,
    'sb-turkey-cheese': 1,
    'sb-cupcake': 1,
    'sb-drk-orange': 1,
  });
  const [eventName, setEventName] = useState('');
  const [specialMessage, setSpecialMessage] = useState('');
  const [boxQuantity, setBoxQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [boxWarning, setBoxWarning] = useState<string | null>(null);

  // Calculate items count
  const totalItemCount = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);

  // Calculate unit price per box
  const itemsPriceTotal = Object.entries(selectedItems).reduce((sum, [itemId, count]) => {
    const item = SELECTABLE_ITEMS.find((it) => it.id === itemId);
    return sum + (item ? item.pricePerItem * count : 0);
  }, 0);

  const unitBoxPrice = selectedSize.basePrice + itemsPriceTotal + selectedPackaging.priceDelta;
  const grandTotal = unitBoxPrice * boxQuantity;

  const handleItemCountChange = (itemId: string, delta: number) => {
    const current = selectedItems[itemId] || 0;
    const next = Math.max(0, current + delta);
    setBoxWarning(null);

    if (delta > 0 && totalItemCount >= selectedSize.capacity) {
      setBoxWarning(t.customBox.maxCapacityReached);
      return;
    }

    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (next === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = next;
      }
      return updated;
    });
  };

  const handleAddToCart = () => {
    setBoxWarning(null);
    if (totalItemCount === 0) {
      setBoxWarning(t.customBox.pleaseSelectItems);
      return;
    }

    const itemsSummary: CustomBoxItem[] = Object.entries(selectedItems).map(([id, qty]) => {
      const item = SELECTABLE_ITEMS.find((it) => it.id === id)!;
      return {
        productId: id,
        quantity: qty,
        name: item.name,
        price: item.pricePerItem,
        category: item.category,
      };
    });

    const customBoxConfig: CustomBoxConfig = {
      id: `custom-box-${Date.now()}`,
      boxSize: selectedSize.id,
      boxSizeName: selectedSize.name,
      peopleCount: selectedSize.people,
      packagingStyle: selectedPackaging.id,
      packagingName: selectedPackaging.name,
      eventName: eventName.trim() ? eventName : undefined,
      items: itemsSummary,
      specialMessage: specialMessage.trim() ? specialMessage : undefined,
      totalPrice: unitBoxPrice,
      boxQuantity,
    };

    addToCart({
      customBox: customBoxConfig,
      quantity: boxQuantity,
      unitPrice: unitBoxPrice,
      specialInstructions: specialMessage.trim() ? specialMessage : undefined,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47AA6]/15 text-[#542719] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#F47AA6]" />
          <span>{t.customBox.title}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#542719] tracking-tight">
          {t.customBox.title}
        </h1>
        <p className="text-sm sm:text-base text-[#733926] leading-relaxed">
          {t.customBox.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 7 Interactive Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* STEP 1: Choose Box Size */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#542719]">
                  {t.customBox.step1}
                </h2>
                <p className="text-xs text-[#733926]">
                  {language === 'ar' ? 'حدد الحجم وسعة الصندوق' : 'Select box dimension and capacity'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#D9A441] bg-[#FFF7EA] px-3 py-1 rounded-full border border-[#EAD6BC]">
                {language === 'ar' ? 'خطوة ١ من ٦' : 'Step 1 of 6'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {BOX_SIZES.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`flex flex-col text-start p-3 rounded-2xl border-2 transition-all relative ${
                      isSelected
                        ? 'border-[#F47AA6] bg-[#FDEBF2]/40 shadow-xs'
                        : 'border-[#EAD6BC] hover:border-[#D9A441] bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#F47AA6] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                    <img
                      src={size.image}
                      alt={language === 'ar' ? size.name.ar : size.name.en}
                      className="w-full h-14 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-bold text-xs text-[#542719] line-clamp-1">
                      {language === 'ar' ? size.name.ar : size.name.en}
                    </h4>
                    <span className="text-[11px] text-[#733926] font-medium mt-0.5">
                      {language === 'ar' ? size.peopleLabel.ar : size.peopleLabel.en}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1">
                      {size.capacity} {language === 'ar' ? 'قطع كحد أقصى' : 'items max'}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* STEP 2: Choose Sandwiches */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#542719]">
                  {t.customBox.step2}
                </h2>
                <p className="text-xs text-[#733926]">
                  {language === 'ar' ? 'اختر تشكيلة ميني ساندوتشات فاخرة بالكميات المرغوبة' : 'Select mixed mini sandwiches and specify quantities'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#D9A441] bg-[#FFF7EA] px-3 py-1 rounded-full border border-[#EAD6BC]">
                {language === 'ar' ? 'خطوة ٢ من ٦' : 'Step 2 of 6'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SELECTABLE_ITEMS.filter((it) => it.category === 'sandwiches').map((item) => {
                const count = selectedItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                      count > 0 ? 'border-[#F47AA6] bg-[#FDEBF2]/30' : 'border-[#EAD6BC] bg-white'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={language === 'ar' ? item.name.ar : item.name.en}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#542719] truncate">
                        {language === 'ar' ? item.name.ar : item.name.en}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-[#D9A441]">
                        +{formatPrice(item.pricePerItem)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, -1)}
                          disabled={count === 0}
                          className="w-5 h-5 rounded bg-[#FFF7EA] border border-[#EAD6BC] text-[#542719] flex items-center justify-center text-xs font-bold disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono text-[#542719] min-w-3 text-center">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, 1)}
                          disabled={totalItemCount >= selectedSize.capacity}
                          className="w-5 h-5 rounded bg-[#542719] text-white flex items-center justify-center text-xs font-bold disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 3: Choose Cake or Dessert */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#542719]">
                  {t.customBox.step3}
                </h2>
                <p className="text-xs text-[#733926]">
                  {language === 'ar' ? 'أضف حلويات وكب كيك وكوكيز طازجة' : 'Add freshly baked cupcakes, brownies, and desserts'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#D9A441] bg-[#FFF7EA] px-3 py-1 rounded-full border border-[#EAD6BC]">
                {language === 'ar' ? 'خطوة ٣ من ٦' : 'Step 3 of 6'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SELECTABLE_ITEMS.filter((it) => it.category === 'desserts').map((item) => {
                const count = selectedItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                      count > 0 ? 'border-[#F47AA6] bg-[#FDEBF2]/30' : 'border-[#EAD6BC] bg-white'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={language === 'ar' ? item.name.ar : item.name.en}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#542719] truncate">
                        {language === 'ar' ? item.name.ar : item.name.en}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-[#D9A441]">
                        +{formatPrice(item.pricePerItem)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, -1)}
                          disabled={count === 0}
                          className="w-5 h-5 rounded bg-[#FFF7EA] border border-[#EAD6BC] text-[#542719] flex items-center justify-center text-xs font-bold disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono text-[#542719] min-w-3 text-center">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, 1)}
                          disabled={totalItemCount >= selectedSize.capacity}
                          className="w-5 h-5 rounded bg-[#542719] text-white flex items-center justify-center text-xs font-bold disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 4 & 5: Choose Drinks & Extras */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#542719]">
                  {t.customBox.step4} & {t.customBox.step5}
                </h2>
                <p className="text-xs text-[#733926]">
                  {language === 'ar' ? 'اختر العصائر الطبيعية والإضافات المميزة' : 'Select cold-pressed juices and extra treats'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#D9A441] bg-[#FFF7EA] px-3 py-1 rounded-full border border-[#EAD6BC]">
                {language === 'ar' ? 'خطوة ٤ و ٥' : 'Steps 4 & 5'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SELECTABLE_ITEMS.filter((it) => it.category === 'drinks' || it.category === 'extras').map((item) => {
                const count = selectedItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                      count > 0 ? 'border-[#F47AA6] bg-[#FDEBF2]/30' : 'border-[#EAD6BC] bg-white'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={language === 'ar' ? item.name.ar : item.name.en}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#542719] truncate">
                        {language === 'ar' ? item.name.ar : item.name.en}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-[#D9A441]">
                        +{formatPrice(item.pricePerItem)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, -1)}
                          disabled={count === 0}
                          className="w-5 h-5 rounded bg-[#FFF7EA] border border-[#EAD6BC] text-[#542719] flex items-center justify-center text-xs font-bold disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono text-[#542719] min-w-3 text-center">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, 1)}
                          disabled={totalItemCount >= selectedSize.capacity}
                          className="w-5 h-5 rounded bg-[#542719] text-white flex items-center justify-center text-xs font-bold disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 6: Choose Packaging & Event Details */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-5">
            <div className="border-b border-[#F5E8D5] pb-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#542719]">
                {t.customBox.step6}
              </h2>
              <p className="text-xs text-[#733926]">
                {language === 'ar' ? 'حدد أسلوب التغليف واسم المناسبة وكرت الإهداء' : 'Select packaging style, event name, and ribbon card'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PACKAGING_OPTIONS.map((pkg) => {
                const isSelected = selectedPackaging.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackaging(pkg)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 text-start transition-all relative ${
                      isSelected
                        ? 'border-[#F47AA6] bg-[#FDEBF2]/30 shadow-xs'
                        : 'border-[#EAD6BC] bg-white hover:border-[#D9A441]'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-[#FFF7EA] text-[#F47AA6] border border-[#EAD6BC]">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-[#542719]">
                          {language === 'ar' ? pkg.name.ar : pkg.name.en}
                        </h4>
                        {pkg.priceDelta > 0 ? (
                          <span className="font-mono text-xs font-bold text-[#D9A441]">
                            +{formatPrice(pkg.priceDelta)}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-600">
                            {language === 'ar' ? 'مشمول' : 'Included'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#733926] mt-0.5 leading-relaxed">
                        {language === 'ar' ? pkg.desc.ar : pkg.desc.en}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Event Name & Ribbon Card Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{language === 'ar' ? 'اسم الفعالية أو المناسبة:' : 'Event / Occasion Name:'}</span>
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder={t.customBox.eventNamePlaceholder}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#F47AA6]" />
                  <span>{language === 'ar' ? 'رسالة الإهداء على كرت الشريط:' : 'Gift Card / Ribbon Message:'}</span>
                </label>
                <input
                  type="text"
                  value={specialMessage}
                  onChange={(e) => setSpecialMessage(e.target.value)}
                  placeholder={t.customBox.messagePlaceholder}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: STEP 7 - Preview & Live Price Calculation (4 cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-5">
          <div className="bg-[#FFF7EA] p-6 rounded-3xl border-2 border-[#EAD6BC] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAD6BC] pb-3">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-[#D9A441]" />
                <h3 className="font-serif font-bold text-base text-[#542719]">
                  {t.customBox.summary}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-[#EAD6BC] text-[#542719]">
                {totalItemCount} / {selectedSize.capacity}
              </span>
            </div>

            {/* Selected Box Config */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#733926]">{t.customBox.boxSize}:</span>
                <span className="font-bold text-[#542719]">
                  {language === 'ar' ? selectedSize.name.ar : selectedSize.name.en}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#733926]">{t.customBox.packaging}:</span>
                <span className="font-bold text-[#F47AA6] truncate max-w-[60%]">
                  {language === 'ar' ? selectedPackaging.name.ar : selectedPackaging.name.en}
                </span>
              </div>
            </div>

            {/* Progress Bar of Capacity */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-[#733926]">
                <span>{language === 'ar' ? 'نسبة تعبئة الصندوق' : 'Box Fill Level'}</span>
                <span>{Math.round((totalItemCount / selectedSize.capacity) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#EAD6BC]">
                <div
                  className="h-full bg-gradient-to-r from-[#F47AA6] to-[#D9A441] transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalItemCount / selectedSize.capacity) * 100)}%` }}
                />
              </div>
            </div>

            {/* Itemized List in Box */}
            <div className="border-t border-[#EAD6BC] pt-2.5 max-h-44 overflow-y-auto space-y-1.5 text-xs">
              <p className="font-bold text-[10px] uppercase tracking-wider text-[#D9A441]">
                {language === 'ar' ? 'المحتويات المختارة:' : 'Selected Items:'}
              </p>
              {Object.keys(selectedItems).length === 0 ? (
                <p className="text-slate-400 italic text-[11px]">{t.customBox.emptyItems}</p>
              ) : (
                Object.entries(selectedItems).map(([id, qty]) => {
                  const it = SELECTABLE_ITEMS.find((item) => item.id === id);
                  if (!it) return null;
                  return (
                    <div key={id} className="flex justify-between items-center py-0.5 text-[11px]">
                      <span className="text-[#542719] font-medium truncate max-w-[70%]">
                        {qty}x {language === 'ar' ? it.name.ar : it.name.en}
                      </span>
                      <span className="font-mono font-semibold text-[#733926]">
                        {formatPrice(it.pricePerItem * qty)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Number of identical boxes to order */}
            <div className="border-t border-[#EAD6BC] pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#542719]">
                  {t.customBox.boxQuantity}:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBoxQuantity(Math.max(1, boxQuantity - 1))}
                    className="w-6 h-6 rounded bg-white border border-[#EAD6BC] text-[#542719] flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-xs text-[#542719]">
                    {boxQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBoxQuantity(boxQuantity + 1)}
                    className="w-6 h-6 rounded bg-[#542719] text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1 justify-end flex-wrap">
                {[1, 5, 10, 20, 50, 100].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setBoxQuantity(q)}
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded transition-colors ${
                      boxQuantity === q ? 'bg-[#542719] text-white' : 'bg-white border border-[#EAD6BC] text-[#542719]'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Total */}
            <div className="pt-3 border-t border-[#EAD6BC] flex items-baseline justify-between">
              <div>
                <span className="font-serif font-bold text-base text-[#542719] block">
                  {t.customBox.priceTotal}:
                </span>
                {boxQuantity > 1 && (
                  <span className="text-[11px] text-[#733926]">
                    ({formatPrice(unitBoxPrice)} / box)
                  </span>
                )}
              </div>
              <span className="font-mono text-2xl font-bold text-[#542719]">
                {formatPrice(grandTotal)}
              </span>
            </div>

            {boxWarning && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{boxWarning}</span>
              </div>
            )}

            {/* CTA Buttons: Add to Cart OR Submit Bulk Quotation */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                  isSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] active:scale-98'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تمت إضافة البوكس للسلة!' : 'Box Added to Cart!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D9A441]" />
                    <span>{t.customBox.addToCart}</span>
                  </>
                )}
              </button>

              {/* Bulk Quotation Trigger for 50+ Boxes */}
              <button
                onClick={() => {
                  setBulkModalTargetBox(
                    `${boxQuantity}x Custom ${language === 'ar' ? selectedSize.name.ar : selectedSize.name.en}`
                  );
                  setIsBulkModalOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#D9A441] bg-white hover:bg-[#FFF7EA] text-[#542719] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{t.customBox.requestBulkQuotation}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
