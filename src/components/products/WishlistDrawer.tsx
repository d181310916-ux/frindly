import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Eye } from 'lucide-react';
import { FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';
import { Product } from '../../types';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    wishlist,
    products,
    removeFromWishlist,
    clearWishlist,
    addToCart,
    setSelectedProductForModal,
    setActiveView,
    language,
    t,
    formatPrice,
  } = useApp();

  if (!isWishlistDrawerOpen) return null;

  const savedProducts: Product[] = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const availableSavedProducts = savedProducts.filter((p) => p.isAvailable && p.stock > 0);

  const handleAddSingle = (product: Product) => {
    if (!product.isAvailable || product.stock <= 0) return;
    setIsWishlistDrawerOpen(false);
    addToCart({
      productId: product.id,
      product,
      quantity: 1,
      unitPrice: product.price,
      selectedBread: product.breadOptions ? product.breadOptions[0] : undefined,
    });
  };

  const handleAddAllToCart = () => {
    if (availableSavedProducts.length === 0) return;
    setIsWishlistDrawerOpen(false);
    availableSavedProducts.forEach((product) => {
      addToCart({
        productId: product.id,
        product,
        quantity: 1,
        unitPrice: product.price,
        selectedBread: product.breadOptions ? product.breadOptions[0] : undefined,
      });
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs no-print"
      onClick={() => setIsWishlistDrawerOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#FFF7EA] h-full shadow-2xl flex flex-col justify-between border-s border-[#EAD6BC] animate-in slide-in-from-right duration-200"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#EAD6BC] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#F47AA6] fill-[#F47AA6]" />
            <h3 className="font-serif font-bold text-lg text-[#542719]">
              {t.wishlist.title}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FDEBF2] text-[#542719] border border-[#F47AA6]/30 tabular-nums">
              {savedProducts.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsWishlistDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-[#542719] rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {savedProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#EAD6BC] flex items-center justify-center text-[#F47AA6]">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#542719]">
                {t.wishlist.emptyTitle}
              </h4>
              <p className="text-xs text-[#733926] max-w-xs mx-auto leading-relaxed">
                {t.wishlist.emptyDesc}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsWishlistDrawerOpen(false);
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#542719] text-[#FFF7EA] text-xs font-bold rounded-xl shadow-xs hover:bg-[#733926] transition-colors"
              >
                <span>{t.wishlist.browseMenu}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          ) : (
            savedProducts.map((product) => {
              const isOutOfStock = !product.isAvailable || product.stock <= 0;
              return (
                <div
                  key={product.id}
                  className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-[#EAD6BC] shadow-xs hover:border-[#D9A441] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsWishlistDrawerOpen(false);
                      setSelectedProductForModal(product);
                    }}
                    className="shrink-0 rounded-xl overflow-hidden border border-[#F5E8D5]"
                  >
                    <img
                      src={product.image}
                      alt={language === 'ar' ? product.name.ar : product.name.en}
                      className="w-20 h-20 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FRIENDLY_TABLE_PHOTOS.assortedSandwiches;
                      }}
                    />
                  </button>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsWishlistDrawerOpen(false);
                          setSelectedProductForModal(product);
                        }}
                        className="text-start font-bold text-xs sm:text-sm text-[#542719] hover:text-[#F47AA6] transition-colors line-clamp-1"
                      >
                        {language === 'ar' ? product.name.ar : product.name.en}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors shrink-0"
                        title={t.wishlist.removeFromWishlist}
                        aria-label={t.wishlist.removeFromWishlist}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] font-semibold text-[#D9A441]">
                      {t.categories[product.category] || product.category}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[#F5E8D5]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#542719] tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[10px] text-slate-400 line-through font-mono tabular-nums">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setIsWishlistDrawerOpen(false);
                            setSelectedProductForModal(product);
                          }}
                          className="p-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA] transition-colors"
                          title={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSingle(product)}
                          disabled={isOutOfStock}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                            isOutOfStock
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-[#542719] hover:bg-[#733926] text-[#FFF7EA]'
                          }`}
                        >
                          <ShoppingBag className="w-3 h-3 text-[#D9A441]" />
                          <span>{isOutOfStock ? t.sections.soldOut : t.sections.addToCart}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {savedProducts.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EAD6BC] space-y-2.5">
            <button
              type="button"
              onClick={handleAddAllToCart}
              disabled={availableSavedProducts.length === 0}
              className="w-full py-3 px-4 rounded-xl bg-[#542719] hover:bg-[#733926] disabled:opacity-45 text-[#FFF7EA] text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#D9A441]" />
              <span>{t.wishlist.addAllToCart}</span>
            </button>

            <button
              type="button"
              onClick={clearWishlist}
              className="w-full py-2 px-4 rounded-xl border border-[#EAD6BC] text-[#733926] hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-bold transition-colors"
            >
              {t.wishlist.clearWishlist}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
