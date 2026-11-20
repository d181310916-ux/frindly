import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';
import { ArrowRight } from 'lucide-react';
import { FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

interface CategoryCardInfo {
  category: ProductCategory;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  badgeEn?: string;
  badgeAr?: string;
}

const CATEGORY_CARDS: CategoryCardInfo[] = [
  {
    category: 'individual-boxes',
    titleEn: 'Individual Sandwich Boxes',
    titleAr: 'بوكسات الساندوتش الفردية',
    descEn: 'Personal meal boxes with artisan sandwiches, crisps, and drinks.',
    descAr: 'بوكسات وجبات شخصية متكاملة مع ساندوتش مقرمش ومشروب بارد.',
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    badgeEn: 'Lunch & Meetings',
    badgeAr: 'للغداء والعمل',
  },
  {
    category: 'group-boxes',
    titleEn: 'Group Sandwich Boxes',
    titleAr: 'بوكسات الجمعات واللقاءات',
    descEn: 'Abundant party boxes serving from 5 to 500+ guests in style.',
    descAr: 'بوكسات جمعات وفيرة تكفي من ٥ إلى ٥٠٠+ ضيف بتنسيق فاخر.',
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    badgeEn: 'Best for Events',
    badgeAr: 'الأفضل للمناسبات',
  },
  {
    category: 'mini-clubs',
    titleEn: 'Mini Club Sandwiches',
    titleAr: 'ميني كلوب ساندوتش',
    descEn: 'Delicate triple-decker bites in chicken, roast beef, and smoked salmon.',
    descAr: 'قطع ثلاثية الطبقات خفيفة ولذيذة بالدجاج، اللحم المشوي، والسلمون.',
    image: FRIENDLY_TABLE_PHOTOS.chickenClub,
    badgeEn: 'Signature Favs',
    badgeAr: 'الأكثر شعبية',
  },
  {
    category: 'premium-sandwiches',
    titleEn: 'Premium Sandwiches',
    titleAr: 'ساندوتشات فاخرة',
    descEn: 'Artisan brioche, ciabatta, and French sourdough recipes.',
    descAr: 'وصفات خاصة على خبز البريوش، والتشاباتا، والساوردو الفرنسي.',
    image: FRIENDLY_TABLE_PHOTOS.grilledChickenCaesar,
    badgeEn: 'Gourmet Ingredients',
    badgeAr: 'مكونات راقية',
  },
  {
    category: 'bakery-cakes',
    titleEn: 'Bakery & Cakes',
    titleAr: 'مخبوزات وكيكات',
    descEn: 'Freshly baked celebration cakes, cupcakes, cookies, and brownies.',
    descAr: 'كيكات احتفال طازجة، كب كيك، كوكيز بالزبدة، وبراونيز بلجيكي.',
    image: FRIENDLY_TABLE_PHOTOS.celebrationCakeCupcakes,
    badgeEn: 'Sweet Moments',
    badgeAr: 'لحظات حلوة',
  },
  {
    category: 'chocolates-gifts',
    titleEn: 'Chocolates & Gifts',
    titleAr: 'شوكولاتة وهدايا',
    descEn: 'Gold-stamped praline boxes and luxury celebration hampers.',
    descAr: 'علب برالين مذهبة وسلال هدايا فخمة بشرائط ساتان خاصة.',
    image: FRIENDLY_TABLE_PHOTOS.chocolatePralineGiftBox,
    badgeEn: 'Thoughtful Gifting',
    badgeAr: 'هدايا مميزة',
  },
  {
    category: 'catering-events',
    titleEn: 'Catering & Events',
    titleAr: 'ضيافة وبوفيهات المناسبات',
    descEn: 'Full setup for conferences, schools, weddings, and family parties.',
    descAr: 'تجهيز بوفيه وضيافة متكاملة للمؤتمرات، المدارس، والحفلات الكبرى.',
    image: FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay,
    badgeEn: 'Full Service',
    badgeAr: 'خدمة متكاملة',
  },
];

export const CategoryHighlights: React.FC = () => {
  const { language, t, setActiveView, setSelectedCategory } = useApp();

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#EAD6BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
              {language === 'ar' ? `قائمة ${t.brandName}` : `${t.brandName} Catalog`}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#542719]">
              {t.sections.categories}
            </h2>
            <p className="text-xs sm:text-sm text-[#733926] max-w-xl">
              {t.sections.categoriesSub}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('shop');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#542719] hover:text-[#F47AA6] transition-colors"
          >
            <span>{t.sections.viewAll}</span>
            <ArrowRight className="w-4 h-4 text-[#D9A441] rtl:rotate-180" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((cat, idx) => (
            <div
              key={cat.category}
              onClick={() => handleCategoryClick(cat.category)}
              className="group relative rounded-2xl overflow-hidden border border-[#EAD6BC] bg-[#FFF7EA] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={language === 'ar' ? cat.titleAr : cat.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 start-3">
                  <span className="px-2.5 py-1 bg-white/95 text-[#542719] text-[10px] font-bold rounded-md shadow-xs">
                    {language === 'ar' ? cat.badgeAr : cat.badgeEn}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#542719] group-hover:text-[#F47AA6] transition-colors">
                    {language === 'ar' ? cat.titleAr : cat.titleEn}
                  </h3>
                  <p className="text-xs text-[#733926] mt-1.5 leading-relaxed line-clamp-2">
                    {language === 'ar' ? cat.descAr : cat.descEn}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#542719] border-t border-[#F5E8D5]">
                  <span>{language === 'ar' ? 'استعرض الأصناف' : 'Explore Menu'}</span>
                  <ArrowRight className="w-4 h-4 text-[#D9A441] rtl:rotate-180 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
