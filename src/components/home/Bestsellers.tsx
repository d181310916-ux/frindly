import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../products/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../../types';

export const Bestsellers: React.FC = () => {
  const { products, language, t, setActiveView, setSelectedCategory } = useApp();
  const [filter, setFilter] = useState<'all' | 'boxes' | 'mini-clubs' | 'sweets'>('all');

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return p.isBestseller || p.isFeatured;
    if (filter === 'boxes') return p.category === 'group-boxes' || p.category === 'individual-boxes';
    if (filter === 'mini-clubs') return p.category === 'mini-clubs';
    if (filter === 'sweets') return p.category === 'bakery-cakes' || p.category === 'chocolates-gifts';
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FFF7EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D9A441]">
              <Sparkles className="w-4 h-4 text-[#F47AA6]" />
              <span>{t.sections.bestsellers}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#542719]">
              {t.sections.bestsellers}
            </h2>
            <p className="text-xs sm:text-sm text-[#733926] max-w-lg">
              {t.sections.bestsellersSub}
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#EAD6BC] shadow-xs text-xs font-semibold">
            {[
              { id: 'all', labelEn: 'All Favorites', labelAr: 'الكل' },
              { id: 'boxes', labelEn: 'Sandwich Boxes', labelAr: 'البوكسات' },
              { id: 'mini-clubs', labelEn: 'Mini Clubs', labelAr: 'ميني كلوب' },
              { id: 'sweets', labelEn: 'Bakery & Sweets', labelAr: 'حلويات وكيك' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  filter === tab.id
                    ? 'bg-[#542719] text-[#FFF7EA] shadow-xs'
                    : 'text-[#733926] hover:text-[#542719]'
                }`}
              >
                {language === 'ar' ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to shop all */}
        <div className="text-center pt-6">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F5E8D5] text-[#542719] border border-[#EAD6BC] text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <span>{language === 'ar' ? 'عرض جميع الأصناف والأسعار' : 'Browse Full Menu & Platters'}</span>
            <ArrowRight className="w-4 h-4 text-[#D9A441] rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};
