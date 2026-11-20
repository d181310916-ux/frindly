import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    language,
    formatPrice,
    t,
    setSelectedProductForModal,
    setActiveView,
    setSelectedCategory,
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.toLowerCase().includes(q) ||
          p.description.en.toLowerCase().includes(q) ||
          (p.ingredients?.en && p.ingredients.en.toLowerCase().includes(q)) ||
          (p.ingredients?.ar && p.ingredients.ar.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product: Product) => {
    setIsSearchModalOpen(false);
    setSelectedProductForModal(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FFF7EA] rounded-2xl shadow-2xl border border-[#EAD6BC] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EAD6BC] bg-white">
          <Search className="w-5 h-5 text-[#D9A441] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-[#542719] placeholder:text-[#733926]/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 text-slate-400 hover:text-[#542719] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="py-6 text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
                {language === 'ar' ? 'اقتراحات شائعة' : 'Popular Suggestions'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Mini Club', 'Celebration Cake', 'Truffle', 'Meeting Box', 'Croissant', 'Praline'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-white border border-[#EAD6BC] hover:border-[#F47AA6] text-xs font-medium text-[#542719] rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-[#733926] font-semibold px-2">
                {language === 'ar' ? `نتائج البحث (${filteredProducts.length})` : `Search Results (${filteredProducts.length})`}
              </p>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p)}
                  className="flex items-center gap-3 p-3 bg-white hover:bg-[#FDEBF2]/50 border border-[#EAD6BC] rounded-xl cursor-pointer transition-colors group"
                >
                  <img
                    src={p.image}
                    alt={language === 'ar' ? p.name.ar : p.name.en}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#542719] group-hover:text-[#F47AA6] truncate transition-colors">
                      {language === 'ar' ? p.name.ar : p.name.en}
                    </h4>
                    <p className="text-xs text-[#733926] line-clamp-1">
                      {language === 'ar' ? p.description.ar : p.description.en}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="font-bold text-[#D9A441] font-mono">{formatPrice(p.price)}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{t.categories[p.category]}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#F47AA6] shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#733926]">
              <p className="text-sm font-semibold mb-1">
                {language === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching delicacies found'}
              </p>
              <p>
                {language === 'ar'
                  ? 'جرب البحث بكلمات أخرى أو صمم بوكسك الخاص مباشرة'
                  : 'Try adjusting your search keywords or build your own custom box directly.'}
              </p>
              <button
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setActiveView('custom-box');
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#F47AA6] hover:bg-[#E25B8D] text-white font-bold rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.customBox.title}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
