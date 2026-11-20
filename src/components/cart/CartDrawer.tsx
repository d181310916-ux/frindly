import React, { useState } from 'react';
import { useApp, ORDER_TIME_SLOTS } from '../../context/AppContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Tag,
  Check,
  Sparkles,
  Calendar,
  Clock,
  Truck,
  Store,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    cartSchedule,
    setCartSchedule,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    storeSettings,
    language,
    t,
    setActiveView,
    formatPrice,
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const formatTime24To12 = (time24: string) => {
    const [hStr, mStr] = (time24 || '14:00').split(':');
    const h = parseInt(hStr, 10);
    if (Number.isNaN(h)) return time24;
    const suffix = h >= 12 ? (language === 'ar' ? 'م' : 'PM') : (language === 'ar' ? 'ص' : 'AM');
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(h12).padStart(2, '0')}:${mStr || '00'} ${suffix}`;
  };

  const scheduleSummaryText =
    cartSchedule.timingMode === 'asap'
      ? `${cartSchedule.orderType === 'pickup' ? t.cart.pickupFree : t.cart.deliveryHome} · ${t.cart.immediateOption}`
      : `${cartSchedule.orderType === 'pickup' ? t.cart.pickupFree : t.cart.deliveryHome} · ${cartSchedule.scheduledDate} · ${
          cartSchedule.scheduledTimeSlot === 'custom'
            ? formatTime24To12(cartSchedule.customTime || '14:00')
            : cartSchedule.scheduledTimeSlot
        }`;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyCoupon(promoCode);
    if (res.success) {
      setPromoFeedback({ type: 'success', text: res.message });
      setPromoCode('');
    } else {
      setPromoFeedback({ type: 'error', text: res.message });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const freeDeliveryDelta = Math.max(0, storeSettings.freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs no-print">
      <div className="relative w-full max-w-md bg-[#FFF7EA] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAD6BC] animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#EAD6BC] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D9A441]" />
            <h3 className="font-serif font-bold text-lg text-[#542719]">
              {t.cart.title}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFF7EA] text-[#542719] border border-[#EAD6BC]">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-[#542719] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar Banner */}
        {cart.length > 0 && cartSchedule.orderType === 'delivery' && (
          <div className="bg-[#FDEBF2] px-5 py-2.5 border-b border-[#F47AA6]/20 text-xs text-[#542719]">
            {freeDeliveryDelta === 0 ? (
              <p className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ar' ? 'مبروك! طلبك مؤهل للتوصيل المجاني' : 'Congratulations! Your order qualifies for FREE delivery'}</span>
              </p>
            ) : (
              <p>
                {t.cart.freeDeliveryNotice
                  .replace('{amount}', freeDeliveryDelta.toFixed(0))
                  .replace('{currency}', storeSettings.currency || 'EGP')}
              </p>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#EAD6BC] flex items-center justify-center text-[#D9A441]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#542719]">
                {t.cart.emptyTitle}
              </h4>
              <p className="text-xs text-[#733926] max-w-xs mx-auto">
                {t.cart.emptyDesc}
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActiveView('shop');
                }}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#542719] text-[#FFF7EA] text-xs font-bold rounded-xl shadow-xs hover:bg-[#733926]"
              >
                <span>{t.cart.startShopping}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#EAD6BC] shadow-xs"
              >
                {/* Image */}
                {item.product ? (
                  <img
                    src={item.product.image}
                    alt={language === 'ar' ? item.product.name.ar : item.product.name.en}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-[#FDEBF2] border border-[#F47AA6]/30 flex items-center justify-center text-[#F47AA6] shrink-0">
                    <Sparkles className="w-7 h-7" />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#542719] line-clamp-1">
                      {item.product
                        ? language === 'ar'
                          ? item.product.name.ar
                          : item.product.name.en
                        : item.customBox
                        ? language === 'ar'
                          ? item.customBox.boxSizeName.ar
                          : item.customBox.boxSizeName.en
                        : item.specialInstructions || 'Item'}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Selected Bread if applicable */}
                  {item.selectedBread && (
                    <span className="text-[11px] text-[#F47AA6] font-semibold block">
                      Bread: {item.selectedBread}
                    </span>
                  )}

                  {/* Custom box contents preview */}
                  {item.customBox && (
                    <div className="text-[10px] text-[#733926] mt-0.5 space-y-0.5">
                      <p className="font-semibold text-[#F47AA6]">
                        {language === 'ar' ? item.customBox.packagingName.ar : item.customBox.packagingName.en}
                        {' · '}{item.customBox.peopleCount} {language === 'ar' ? 'ضيوف' : 'guests'}
                      </p>
                      {item.customBox.specialMessage && (
                        <p className="italic text-slate-500 line-clamp-1">
                          "{item.customBox.specialMessage}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Standard product special instructions */}
                  {item.specialInstructions && !item.customBox && (
                    <p className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-1">
                      Note: {item.specialInstructions}
                    </p>
                  )}

                  {/* Price and Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F5E8D5]">
                    <div className="flex items-center border border-[#EAD6BC] rounded-md bg-[#FFF7EA]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#542719] hover:bg-[#F5E8D5]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold font-mono text-[#542719]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#542719] hover:bg-[#F5E8D5]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs sm:text-sm font-bold text-[#542719]">
                      {formatPrice(item.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Fulfillment Type & Date/Time Scheduler inside Cart */}
          {cart.length > 0 && (
            <div className="p-4 bg-white rounded-2xl border border-[#EAD6BC] space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-2">
                <span className="font-bold text-[#542719] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D9A441]" />
                  <span>{t.cart.schedulingTitle}</span>
                </span>
              </div>

              {/* Delivery vs Store Pickup Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FFF7EA] rounded-xl border border-[#EAD6BC]">
                <button
                  type="button"
                  onClick={() => setCartSchedule((prev) => ({ ...prev, orderType: 'delivery' }))}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition-colors whitespace-nowrap ${
                    cartSchedule.orderType === 'delivery'
                      ? 'bg-[#542719] text-[#FFF7EA] shadow-xs'
                      : 'text-[#733926] hover:text-[#542719]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                  <span>{t.cart.deliveryHome}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCartSchedule((prev) => ({ ...prev, orderType: 'pickup' }))}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition-colors whitespace-nowrap ${
                    cartSchedule.orderType === 'pickup'
                      ? 'bg-[#542719] text-[#FFF7EA] shadow-xs'
                      : 'text-[#733926] hover:text-[#542719]'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                  <span className="truncate">{t.cart.pickupFree}</span>
                </button>
              </div>

              {/* Immediate ASAP vs Specific Date & Time Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FFF7EA] rounded-xl border border-[#EAD6BC]">
                <button
                  type="button"
                  onClick={() => setCartSchedule((prev) => ({ ...prev, timingMode: 'asap' }))}
                  className={`py-2 px-2 rounded-lg font-bold transition-colors text-center ${
                    cartSchedule.timingMode === 'asap'
                      ? 'bg-[#F47AA6] text-white shadow-xs'
                      : 'text-[#733926] hover:text-[#542719]'
                  }`}
                >
                  {t.cart.immediateOption}
                </button>
                <button
                  type="button"
                  onClick={() => setCartSchedule((prev) => ({ ...prev, timingMode: 'scheduled' }))}
                  className={`py-2 px-2 rounded-lg font-bold transition-colors text-center ${
                    cartSchedule.timingMode === 'scheduled'
                      ? 'bg-[#F47AA6] text-white shadow-xs'
                      : 'text-[#733926] hover:text-[#542719]'
                  }`}
                >
                  {t.cart.scheduledOption}
                </button>
              </div>

              {/* Date & Time Inputs when Scheduled */}
              {cartSchedule.timingMode === 'scheduled' && (
                <div className="space-y-2.5 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#542719] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D9A441]" />
                        <span>{t.cart.selectDate}</span>
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={cartSchedule.scheduledDate}
                        onChange={(e) =>
                          setCartSchedule((prev) => ({
                            ...prev,
                            scheduledDate: e.target.value || todayStr,
                          }))
                        }
                        className="w-full px-2.5 py-2 bg-[#FFF7EA] border border-[#EAD6BC] rounded-lg text-xs font-mono text-[#542719] focus:outline-none focus:border-[#D9A441]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#542719] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D9A441]" />
                        <span>{t.cart.selectTime}</span>
                      </label>
                      <select
                        value={cartSchedule.scheduledTimeSlot}
                        onChange={(e) =>
                          setCartSchedule((prev) => ({
                            ...prev,
                            scheduledTimeSlot: e.target.value,
                          }))
                        }
                        className="w-full px-2.5 py-2 bg-[#FFF7EA] border border-[#EAD6BC] rounded-lg text-xs text-[#542719] focus:outline-none focus:border-[#D9A441]"
                      >
                        {ORDER_TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                        <option value="custom">{t.cart.customExactTime}</option>
                      </select>
                    </div>
                  </div>

                  {cartSchedule.scheduledTimeSlot === 'custom' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#542719] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#F47AA6]" />
                        <span>{t.cart.exactTimeLabel}</span>
                      </label>
                      <input
                        type="time"
                        value={cartSchedule.customTime || '14:00'}
                        onChange={(e) =>
                          setCartSchedule((prev) => ({
                            ...prev,
                            customTime: e.target.value || '14:00',
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FFF7EA] border border-[#EAD6BC] rounded-lg text-xs font-mono text-[#542719] focus:outline-none focus:border-[#D9A441]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Totals & Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EAD6BC] space-y-3">
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={t.cart.couponPlaceholder}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#FFF7EA] border border-[#EAD6BC] rounded-lg text-xs text-[#542719] focus:outline-none focus:border-[#D9A441]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#542719] text-[#FFF7EA] text-xs font-bold rounded-lg hover:bg-[#733926]"
                >
                  {t.cart.applyCoupon}
                </button>
              </div>

              {promoFeedback && (
                <p
                  className={`text-[11px] ${
                    promoFeedback.type === 'success' ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {promoFeedback.text}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <span>Code: <strong>{appliedCoupon.code}</strong></span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1 text-xs pt-2 border-t border-[#F5E8D5]">
              <div className="flex justify-between text-[#733926]">
                <span>{t.cart.subtotal}:</span>
                <span className="font-mono font-semibold">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#733926]">
                <span>{t.cart.deliveryFee}:</span>
                <span className="font-mono font-semibold">
                  {cartDeliveryFee === 0 ? t.cart.freeDelivery : formatPrice(cartDeliveryFee)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#733926] pt-1">
                <span>{t.cart.schedulingTitle}:</span>
                <span className="font-semibold text-[#542719] truncate max-w-[62%]" title={scheduleSummaryText}>
                  {scheduleSummaryText}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#F47AA6] font-semibold">
                  <span>{t.cart.discount}:</span>
                  <span className="font-mono">-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#542719] pt-1.5 border-t border-[#EAD6BC]">
                <span>{t.cart.total}:</span>
                <span className="font-mono text-[#D9A441]">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <span>{t.cart.checkoutBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#D9A441]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
