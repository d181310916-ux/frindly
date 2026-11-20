import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../../types';
import { ArrowUpDown, Sparkles, Box, Wand2, Building2, Heart } from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    language,
    t,
    setActiveView,
    setIsBulkModalOpen,
    setBulkModalTargetBox,
    wishlist,
  } = useApp();

  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'name'>('bestseller');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [maxPrice] = useState<number>(3000);

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.nav.shopAll },
    { id: 'mini-sandwiches', label: t.categories['mini-sandwiches'] },
    { id: 'finger-sandwiches', label: t.categories['finger-sandwiches'] },
    { id: 'mini-croissants', label: t.categories['mini-croissants'] },
    { id: 'mini-clubs', label: t.categories['mini-clubs'] },
    { id: 'premium-sandwiches', label: t.categories['premium-sandwiches'] },
    { id: 'ready-made-boxes', label: t.categories['ready-made-boxes'] },
    { id: 'group-boxes', label: t.categories['group-boxes'] },
    { id: 'bakery-croissants', label: t.categories['bakery-croissants'] },
    { id: 'cakes-desserts', label: t.categories['cakes-desserts'] },
    { id: 'chocolates-gifts', label: t.categories['chocolates-gifts'] },
    { id: 'catering-events', label: t.categories['catering-events'] },
  ];

  // Filtering
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'ready-made-boxes' || selectedCategory === 'individual-boxes') {
        if (p.category !== 'ready-made-boxes' && p.category !== 'individual-boxes') return false;
      } else if (selectedCategory === 'bakery-croissants' || selectedCategory === 'bakery-cakes') {
        if (p.category !== 'bakery-croissants' && p.category !== 'bakery-cakes') return false;
      } else if (p.category !== selectedCategory) {
        return false;
      }
    }
    if (onlyInStock && (!p.isAvailable || p.stock <= 0)) return false;
    if (onlyWishlist && !wishlist.includes(p.id)) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'bestseller') {
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    }
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') {
      const nameA = language === 'ar' ? a.name.ar : a.name.en;
      const nameB = language === 'ar' ? b.name.ar : b.name.en;
      return nameA.localeCompare(nameB);
    }
    return 0;
  });

  const isBoxCategory =
    selectedCategory === 'ready-made-boxes' ||
    selectedCategory === 'individual-boxes' ||
    selectedCategory === 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAD6BC] gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
            Friendly Table Gourmet Menu
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#542719] mt-0.5">
            {selectedCategory === 'all'
              ? t.nav.shopAll
              : t.categories[selectedCategory] || t.categories['ready-made-boxes']}
          </h1>
          <p className="text-xs sm:text-sm text-[#733926] mt-1">
            {language === 'ar'
              ? 'مأكولات مخبوزة طازجة وبوكسات ساندوتش محضرة بأجود المكونات'
              : 'Freshly baked sandwiches, celebration cakes, and catering boxes.'}
          </p>
        </div>

        {/* Dual Actions: Custom Box + Bulk Quotation */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setBulkModalTargetBox(selectedCategory === 'all' ? 'All Boxes' : t.categories[selectedCategory] || 'Individual Boxes');
              setIsBulkModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#D9A441] hover:bg-[#FFF7EA] text-[#542719] text-xs font-bold shadow-xs transition-transform hover:scale-105"
          >
            <Building2 className="w-4 h-4 text-[#D9A441]" />
            <span>{language === 'ar' ? 'طلب كميات وتوزيعات (50+)' : 'Bulk Order (50+)'}</span>
          </button>

          <button
            onClick={() => setActiveView('custom-box')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47AA6] hover:bg-[#E25B8D] text-white text-xs sm:text-sm font-bold shadow-xs transition-transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#FFF7EA]" />
            <span>{t.nav.customBox}</span>
          </button>
        </div>
      </div>

      {/* MANDATORY DUAL CHOICE BANNER (Ready-Made Boxes vs Build Your Own Box) */}
      {isBoxCategory && (
        <section className="bg-gradient-to-r from-[#FFF7EA] via-white to-[#FDEBF2] p-6 sm:p-8 rounded-3xl border-2 border-[#F47AA6]/30 shadow-xs">
          <div className="max-w-3xl mb-6 text-start">
            <span className="text-xs font-bold text-[#F47AA6] uppercase tracking-wider">
              {t.dualChoice.title}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#542719] mt-0.5">
              {t.dualChoice.subtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPTION 1: READY-MADE BOXES */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EAD6BC] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D9A441] transition-all">
              <div className="space-y-2 text-start">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D9A441]/15 text-[#542719] text-[11px] font-bold">
                  <Box className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{t.dualChoice.readyMadeBadge}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#542719]">
                  {t.dualChoice.readyMadeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#733926] leading-relaxed">
                  {t.dualChoice.readyMadeDesc}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedCategory('ready-made-boxes')}
                  className="w-full py-2.5 px-4 bg-[#542719] hover:bg-[#733926] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Box className="w-4 h-4 text-[#D9A441]" />
                  <span>{t.dualChoice.readyMadeBtn}</span>
                </button>
              </div>
            </div>

            {/* OPTION 2: BUILD YOUR OWN BOX */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#F47AA6] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-2 text-start">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F47AA6]/20 text-[#542719] text-[11px] font-bold">
                  <Wand2 className="w-3.5 h-3.5 text-[#F47AA6]" />
                  <span>{t.dualChoice.customBadge}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#542719]">
                  {t.dualChoice.customTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#733926] leading-relaxed">
                  {t.dualChoice.customDesc}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveView('custom-box')}
                  className="w-full py-2.5 px-4 bg-[#F47AA6] hover:bg-[#E25B8D] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{t.dualChoice.customBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#542719] text-[#FFF7EA] shadow-xs'
                  : 'bg-white border border-[#EAD6BC] text-[#542719] hover:bg-[#F5E8D5]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Sort, Stock Filter, Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#EAD6BC] text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#733926] font-semibold">
            {language === 'ar' ? `العدد: ${sortedProducts.length} منتج` : `Showing ${sortedProducts.length} items`}
          </span>

          <label className="flex items-center gap-2 text-[#542719] cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="rounded text-[#F47AA6] focus:ring-[#F47AA6]"
            />
            <span>{language === 'ar' ? 'المتوفر فقط' : 'In Stock Only'}</span>
          </label>

          <button
            type="button"
            onClick={() => setOnlyWishlist((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-colors ${
              onlyWishlist
                ? 'bg-[#FDEBF2] border-[#F47AA6] text-[#542719]'
                : 'bg-white border-[#EAD6BC] text-[#733926] hover:border-[#F47AA6]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 text-[#F47AA6] ${onlyWishlist ? 'fill-[#F47AA6]' : ''}`} />
            <span>{t.wishlist.wishlistOnly}</span>
            <span className="font-mono text-[10px] opacity-80 tabular-nums">({wishlist.length})</span>
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#D9A441]" />
          <span className="text-[#733926] font-semibold">
            {language === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 bg-[#FFF7EA] border border-[#EAD6BC] rounded-lg text-xs font-semibold text-[#542719] focus:outline-none focus:border-[#D9A441]"
          >
            <option value="bestseller">{language === 'ar' ? 'الأكثر طلباً' : 'Best Sellers'}</option>
            <option value="price-asc">{language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
            <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            <option value="name">{language === 'ar' ? 'الاسم الأبجدي' : 'Name (A-Z)'}</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EAD6BC] space-y-3">
          <p className="font-serif text-lg font-bold text-[#542719]">
            {language === 'ar' ? 'لا توجد منتجات مطابقة لهذا الفلتر' : 'No items match your filter criteria'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setOnlyInStock(false);
              setOnlyWishlist(false);
            }}
            className="px-4 py-2 bg-[#542719] text-white text-xs font-bold rounded-xl"
          >
            {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
