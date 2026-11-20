import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, ShoppingBag, Check, Users, PackageCheck, AlertCircle, Heart } from 'lucide-react';

export const ProductDetailsModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    language,
    t,
    addToCart,
    formatPrice,
    isInWishlist,
    toggleWishlist,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedBread, setSelectedBread] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const isOutOfStock = !product.isAvailable || product.stock <= 0;
  const isWishlisted = isInWishlist(product.id);

  // Initialize selected bread if applicable
  const activeBread = selectedBread || (product.breadOptions ? product.breadOptions[0] : '');

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({
      productId: product.id,
      product,
      quantity,
      unitPrice: product.price,
      selectedBread: activeBread || undefined,
      specialInstructions: specialInstructions.trim() ? specialInstructions : undefined,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setSelectedProductForModal(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAD6BC] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white text-[#542719] rounded-full shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-[#FFF7EA]">
            <img
              src={product.image}
              alt={language === 'ar' ? product.name.ar : product.name.en}
              className="w-full h-full object-cover"
            />
            {product.isBestseller && (
              <span className="absolute bottom-4 left-4 bg-[#D9A441] text-[#542719] font-bold text-xs px-3 py-1 rounded-md shadow-xs">
                ★ {language === 'ar' ? 'الأكثر طلباً' : 'Bestseller'}
              </span>
            )}
          </div>

          {/* Right: Details & Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white overflow-y-auto max-h-[85vh]">
            <div className="space-y-3">
              {/* Category & Capacity */}
              <div className="flex items-center justify-between text-xs text-[#733926]">
                <span className="font-semibold uppercase tracking-wider text-[#D9A441]">
                  {t.categories[product.category] || product.category}
                </span>
                {product.servingSize && (
                  <span className="flex items-center gap-1 font-medium bg-[#FFF7EA] px-2 py-0.5 rounded-md border border-[#EAD6BC]">
                    <Users className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{language === 'ar' ? product.servingSize.ar : product.servingSize.en}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#542719] leading-snug">
                {language === 'ar' ? product.name.ar : product.name.en}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-[#542719]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#733926] leading-relaxed">
                {language === 'ar' ? product.description.ar : product.description.en}
              </p>

              {/* Box Contents (For Ready-Made Boxes) */}
              {product.boxContents && (
                <div className="bg-[#FFF7EA] p-3 rounded-xl border border-[#D9A441]/40 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#542719]">
                    <PackageCheck className="w-4 h-4 text-[#D9A441]" />
                    <span>{language === 'ar' ? 'محتويات البوكس المحددة مسبقاً:' : 'Included Predefined Contents:'}</span>
                  </div>
                  <p className="text-[#733926] font-medium leading-relaxed">
                    {language === 'ar' ? product.boxContents.ar : product.boxContents.en}
                  </p>
                </div>
              )}

              {/* Bread Selection (for Premium Sandwiches) */}
              {product.breadOptions && product.breadOptions.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-[#542719]">
                    {t.breads.title}
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {product.breadOptions.map((br) => (
                      <button
                        key={br}
                        type="button"
                        onClick={() => setSelectedBread(br)}
                        className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border text-start transition-all ${
                          activeBread === br
                            ? 'bg-[#F47AA6] text-white border-[#F47AA6]'
                            : 'bg-white border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA]'
                        }`}
                      >
                        {br}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients & Allergens Box */}
              {(product.ingredients || product.allergens) && (
                <div className="bg-[#FFF7EA] p-3 rounded-xl border border-[#F5E8D5] text-xs space-y-1.5">
                  {product.ingredients && (
                    <p>
                      <strong className="text-[#542719]">{language === 'ar' ? 'المكونات:' : 'Ingredients:'} </strong>
                      <span className="text-[#733926]">{language === 'ar' ? product.ingredients.ar : product.ingredients.en}</span>
                    </p>
                  )}
                  {product.allergens && (
                    <p className="text-amber-800 text-[11px] flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{language === 'ar' ? product.allergens.ar : product.allergens.en}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Special instructions */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#542719]">
                  {language === 'ar' ? 'ملاحظات خاصة للشيف (اختياري)' : 'Special Instructions for Chef (Optional)'}
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: بدون بصل، صوص إضافي...' : 'e.g. Extra sauce, no onions...'}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-lg text-xs text-[#542719] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
            </div>

            {/* Stepper & Add to Cart button */}
            <div className="pt-3 border-t border-[#F5E8D5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#542719]">
                  {language === 'ar' ? 'الكمية المطلوبة' : 'Quantity'}:
                </span>
                
                {/* Stepper */}
                <div className="flex items-center border border-[#EAD6BC] rounded-lg bg-[#FFF7EA]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-2 text-[#542719] hover:bg-[#F5E8D5] rounded-l-lg disabled:opacity-40"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold font-mono text-[#542719]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="p-2 text-[#542719] hover:bg-[#F5E8D5] rounded-r-lg disabled:opacity-40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[11px] text-[#733926] font-medium mr-1">
                  {language === 'ar' ? 'كميات سريعة:' : 'Quick Presets:'}
                </span>
                {[1, 5, 10, 20, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                      quantity === num
                        ? 'bg-[#542719] text-white'
                        : 'bg-[#FFF7EA] text-[#542719] border border-[#EAD6BC] hover:bg-[#F5E8D5]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isWishlisted ? t.wishlist.removeFromWishlist : t.wishlist.addToWishlist}
                  aria-pressed={isWishlisted}
                  title={isWishlisted ? t.wishlist.savedInWishlist : t.wishlist.addToWishlist}
                  className={`p-3.5 rounded-xl border transition-all shrink-0 ${
                    isWishlisted
                      ? 'bg-[#FDEBF2] border-[#F47AA6] text-[#F47AA6]'
                      : 'bg-white border-[#EAD6BC] text-[#542719] hover:border-[#F47AA6] hover:text-[#F47AA6]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#F47AA6]' : ''}`} />
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : isOutOfStock
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تمت الإضافة للسلة!' : 'Added to Cart!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D9A441]" />
                      <span>
                        {isOutOfStock
                          ? t.sections.soldOut
                          : `${t.sections.addToCart} · ${formatPrice(product.price * quantity)}`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
