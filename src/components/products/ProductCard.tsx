import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Eye, Users, PackageCheck, Layers, Heart } from 'lucide-react';
import { FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    t,
    addToCart,
    setSelectedProductForModal,
    formatPrice,
    isInWishlist,
    toggleWishlist,
  } = useApp();

  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.isAvailable || product.stock <= 0) return;
    addToCart({
      productId: product.id,
      product,
      quantity: 1,
      unitPrice: product.price,
      selectedBread: product.breadOptions ? product.breadOptions[0] : undefined,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isOutOfStock = !product.isAvailable || product.stock <= 0;

  return (
    <div
      onClick={() => setSelectedProductForModal(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#EAD6BC]/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Product Image with Subtle Badges */}
      <div className="relative aspect-4/3 w-full bg-[#F5E8D5]/40 overflow-hidden">
        <img
          src={product.image}
          alt={language === 'ar' ? product.name.ar : product.name.en}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FRIENDLY_TABLE_PHOTOS.assortedSandwiches;
          }}
        />

        {/* Subtle Top Row: Single status tag (start) + Wishlist Heart toggle (end) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          {isOutOfStock ? (
            <span className="bg-[#542719] text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-xs">
              {t.sections.soldOut}
            </span>
          ) : product.originalPrice && product.originalPrice > product.price ? (
            <span className="bg-[#542719] text-[#FFF7EA] font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-md shadow-xs tabular-nums">
              {language === 'ar'
                ? `خصم ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}٪`
                : `-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`}
            </span>
          ) : product.isBestseller ? (
            <span className="bg-[#D9A441] text-[#542719] font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
              ★ {language === 'ar' ? 'الأكثر طلباً' : 'Bestseller'}
            </span>
          ) : product.isFeatured ? (
            <span className="bg-[#F47AA6] text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
              {language === 'ar' ? 'مميز' : 'Featured'}
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? t.wishlist.removeFromWishlist : t.wishlist.addToWishlist}
            aria-pressed={isWishlisted}
            title={isWishlisted ? t.wishlist.savedInWishlist : t.wishlist.addToWishlist}
            className={`pointer-events-auto ms-auto w-10 h-10 rounded-full flex items-center justify-center shadow-md border transition-all duration-150 active:scale-90 ${
              isWishlisted
                ? 'bg-[#FDEBF2] border-[#F47AA6] text-[#F47AA6]'
                : 'bg-white/95 border-[#EAD6BC] text-[#542719] hover:border-[#F47AA6] hover:text-[#F47AA6]'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform duration-150 ${isWishlisted ? 'fill-[#F47AA6] scale-110' : ''}`} />
          </button>
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 text-[#542719] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{language === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category & Attributes */}
          <div className="flex items-center justify-between text-[11px] text-[#733926]/75">
            <span className="font-semibold uppercase tracking-wider text-[#D9A441] truncate max-w-[65%]">
              {t.categories[product.category] || product.category}
            </span>
            {product.servingSize ? (
              <span className="flex items-center gap-1 shrink-0">
                <Users className="w-3 h-3 text-slate-400" />
                <span>{language === 'ar' ? product.servingSize.ar : product.servingSize.en}</span>
              </span>
            ) : product.piecesCountOptions ? (
              <span className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                <Layers className="w-3 h-3 text-[#D9A441]" />
                <span>{product.piecesCountOptions[0]}+ {language === 'ar' ? 'قطعة' : 'pcs'}</span>
              </span>
            ) : null}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-sm sm:text-base text-[#542719] group-hover:text-[#F47AA6] transition-colors line-clamp-1">
            {language === 'ar' ? product.name.ar : product.name.en}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#733926]/80 line-clamp-2 leading-relaxed">
            {language === 'ar' ? product.description.ar : product.description.en}
          </p>

          {/* Box Contents Highlight (for Ready-Made Boxes) */}
          {product.boxContents && (
            <div className="pt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF7EA] border border-[#EAD6BC] text-[11px] text-[#542719] font-medium">
                <PackageCheck className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                <span className="truncate">
                  {language === 'ar' ? product.boxContents.ar : product.boxContents.en}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#F5E8D5] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-base sm:text-lg font-bold text-[#542719]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] active:scale-95 shadow-xs'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{isOutOfStock ? t.sections.soldOut : t.sections.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
