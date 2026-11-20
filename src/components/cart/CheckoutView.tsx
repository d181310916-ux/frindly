import React, { useState } from 'react';
import { useApp, ORDER_TIME_SLOTS } from '../../context/AppContext';
import {
  ShieldCheck,
  Truck,
  Store,
  Clock,
  Calendar,
  CreditCard,
  Banknote,
  Building,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { CustomerInfo } from '../../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartSchedule,
    setCartSchedule,
    appliedCoupon,
    storeSettings,
    language,
    t,
    user,
    formatPrice,
    createOrder,
    setActiveView,
  } = useApp();

  const orderType = cartSchedule.orderType;
  const setOrderType = (nextType: 'delivery' | 'pickup') => {
    setCartSchedule((prev) => ({ ...prev, orderType: nextType }));
  };

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    email: user ? user.email : '',
    address: user && user.savedAddresses.length > 0 ? user.savedAddresses[0].address : '',
    city: user && user.savedAddresses.length > 0 ? user.savedAddresses[0].city : 'Cairo',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'bank_transfer' | 'card_online'>('cash_on_delivery');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#542719]">
          {t.cart.emptyTitle}
        </h2>
        <p className="text-sm text-[#733926]">{t.cart.emptyDesc}</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 bg-[#542719] text-[#FFF7EA] text-sm font-bold rounded-xl"
        >
          {t.cart.startShopping}
        </button>
      </div>
    );
  }

  const effectiveDeliveryFee = orderType === 'pickup' ? 0 : cartDeliveryFee;
  const effectiveTotal = Math.max(0, cartSubtotal - cartDiscount + effectiveDeliveryFee);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const formatCustomTime = (time24: string) => {
    const [hStr, mStr] = (time24 || '14:00').split(':');
    const h = parseInt(hStr, 10);
    if (Number.isNaN(h)) return time24;
    const suffix = h >= 12 ? (language === 'ar' ? 'م' : 'PM') : (language === 'ar' ? 'ص' : 'AM');
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(h12).padStart(2, '0')}:${mStr || '00'} ${suffix}`;
  };

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!customer.name.trim() || !customer.phone.trim()) {
      setValidationError(t.checkout.fillRequired);
      return;
    }

    if (orderType === 'delivery' && (!customer.address.trim() || !customer.city.trim())) {
      setValidationError(t.checkout.fillRequired);
      return;
    }

    const effectiveDeliveryDate =
      cartSchedule.timingMode === 'asap' ? todayStr : cartSchedule.scheduledDate;

    const effectiveTimeSlot =
      cartSchedule.timingMode === 'asap'
        ? language === 'ar'
          ? orderType === 'pickup'
            ? 'استلام فوري (أقرب وقت متاح)'
            : 'توصيل فوري (أقرب وقت متاح)'
          : orderType === 'pickup'
          ? 'Immediate Pickup (ASAP)'
          : 'Immediate Delivery (ASAP)'
        : cartSchedule.scheduledTimeSlot === 'custom'
        ? formatCustomTime(cartSchedule.customTime || '14:00')
        : cartSchedule.scheduledTimeSlot;

    setIsPlacingOrder(true);
    try {
      await createOrder({
        customer,
        orderType,
        deliveryDate: effectiveDeliveryDate,
        deliveryTimeSlot: effectiveTimeSlot,
        items: cart,
        subtotal: cartSubtotal,
        deliveryFee: effectiveDeliveryFee,
        discount: cartDiscount,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        total: effectiveTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'bank_transfer' ? 'pending' : 'pending',
      });

      setActiveView('order-confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setValidationError(
        language === 'ar'
          ? 'تعذر إرسال الطلب لقاعدة البيانات. يرجى المحاولة مرة أخرى.'
          : 'Failed to submit order. Please try again.'
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="font-serif text-3xl font-bold text-[#542719]">
          {t.checkout.title}
        </h1>
        <p className="text-xs text-[#733926] mt-1">
          {language === 'ar'
            ? 'يرجى مراجعة تفاصيل التوصيل واختيار طريقة الدفع المناسبة'
            : 'Please review your delivery details and choose your preferred payment method.'}
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Customer Details, Schedule, Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Order Type & Customer Details */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-6">
              <h2 className="font-serif text-lg font-bold text-[#542719] border-b border-[#F5E8D5] pb-3">
                {t.checkout.customerDetails}
              </h2>

              {/* Delivery vs Pickup Segment */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-[#FFF7EA] rounded-2xl border border-[#EAD6BC]">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#542719] text-white shadow-xs'
                      : 'text-[#733926] hover:bg-white/80'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#D9A441]" />
                  <span>{t.checkout.delivery}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[#542719] text-white shadow-xs'
                      : 'text-[#733926] hover:bg-white/80'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#D9A441]" />
                  <span>{t.checkout.pickup}</span>
                </button>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#542719]">
                    {t.checkout.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#542719]">
                    {t.checkout.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] font-mono focus:outline-none focus:border-[#D9A441]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#542719]">
                  {t.checkout.email}
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                />
              </div>

              {/* Address & City if Delivery */}
              {orderType === 'delivery' && (
                <div className="space-y-4 pt-2 border-t border-[#F5E8D5]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#542719]">
                        {t.checkout.city}
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        placeholder={language === 'ar' ? 'مثال: القاهرة، المعادي' : 'e.g. Cairo, Maadi'}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#542719]">
                        {t.checkout.address}
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        placeholder="Street, Villa/Building No., Landmark"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#542719]">
                  {t.checkout.notes}
                </label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder={language === 'ar' ? 'ملاحظات للبوابة أو الشيف...' : 'Gate code, delivery landmark, etc.'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
            </div>

            {/* 2. Scheduling & Date Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-5">
              <h2 className="font-serif text-lg font-bold text-[#542719] border-b border-[#F5E8D5] pb-3">
                {t.checkout.scheduling}
              </h2>

              <div className="grid grid-cols-2 gap-3 p-1 bg-[#FFF7EA] rounded-2xl border border-[#EAD6BC]">
                <button
                  type="button"
                  onClick={() => setCartSchedule((prev) => ({ ...prev, timingMode: 'asap' }))}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    cartSchedule.timingMode === 'asap'
                      ? 'bg-[#F47AA6] text-white shadow-xs'
                      : 'text-[#733926] hover:bg-white/80'
                  }`}
                >
                  {t.cart.immediateOption}
                </button>
                <button
                  type="button"
                  onClick={() => setCartSchedule((prev) => ({ ...prev, timingMode: 'scheduled' }))}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    cartSchedule.timingMode === 'scheduled'
                      ? 'bg-[#F47AA6] text-white shadow-xs'
                      : 'text-[#733926] hover:bg-white/80'
                  }`}
                >
                  {t.cart.scheduledOption}
                </button>
              </div>

              {cartSchedule.timingMode === 'scheduled' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#542719] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>{t.checkout.orderDate}</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={cartSchedule.scheduledDate}
                      onChange={(e) =>
                        setCartSchedule((prev) => ({
                          ...prev,
                          scheduledDate: e.target.value || todayStr,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#542719] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>{t.checkout.timeSlot}</span>
                    </label>
                    <select
                      value={cartSchedule.scheduledTimeSlot}
                      onChange={(e) =>
                        setCartSchedule((prev) => ({
                          ...prev,
                          scheduledTimeSlot: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                    >
                      {ORDER_TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                      <option value="custom">{t.cart.customExactTime}</option>
                    </select>
                  </div>

                  {cartSchedule.scheduledTimeSlot === 'custom' && (
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-[#542719] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#F47AA6]" />
                        <span>{t.cart.exactTimeLabel}</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={cartSchedule.customTime || '14:00'}
                        onChange={(e) =>
                          setCartSchedule((prev) => ({
                            ...prev,
                            customTime: e.target.value || '14:00',
                          }))
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm font-mono text-[#542719] focus:outline-none focus:border-[#D9A441]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#542719] border-b border-[#F5E8D5] pb-3">
                {t.checkout.paymentMethod}
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-[#F47AA6] bg-[#FDEBF2]/30 shadow-xs'
                      : 'border-[#EAD6BC] hover:border-[#D9A441]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="mt-1 text-[#F47AA6] focus:ring-[#F47AA6]"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#542719] flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      <span>{t.checkout.cod}</span>
                    </span>
                    <p className="text-xs text-[#733926] mt-0.5">
                      {t.checkout.codDesc}
                    </p>
                  </div>
                </label>

                {/* Direct Bank Transfer */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#F47AA6] bg-[#FDEBF2]/30 shadow-xs'
                      : 'border-[#EAD6BC] hover:border-[#D9A441]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-1 text-[#F47AA6] focus:ring-[#F47AA6]"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#542719] flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-[#D9A441]" />
                      <span>{t.checkout.bankTransfer}</span>
                    </span>
                    <p className="text-xs text-[#733926] mt-0.5">
                      {t.checkout.bankDesc}
                    </p>
                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-2.5 p-2.5 rounded-lg bg-[#FFF7EA] border border-[#EAD6BC] text-xs font-mono text-[#542719]">
                        <p className="font-bold font-sans">{storeSettings.bankDetails.bankName}</p>
                        <p>{storeSettings.bankDetails.iban}</p>
                      </div>
                    )}
                  </div>
                </label>

                {/* Card Payment (Clear integration note per prompt rules) */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card_online'
                      ? 'border-[#F47AA6] bg-[#FDEBF2]/30 shadow-xs'
                      : 'border-[#EAD6BC] hover:border-[#D9A441]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card_online'}
                    onChange={() => setPaymentMethod('card_online')}
                    className="mt-1 text-[#F47AA6] focus:ring-[#F47AA6]"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#542719] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-sky-600" />
                      <span>{t.checkout.cardOnline}</span>
                    </span>
                    <p className="text-xs text-amber-800 mt-1 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      ℹ️ {t.checkout.cardDesc}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {validationError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Right Summary: Order Items & Place Order CTA (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-[#FFF7EA] p-6 sm:p-7 rounded-3xl border-2 border-[#EAD6BC] shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-[#542719] border-b border-[#EAD6BC] pb-3">
                {t.checkout.orderSummary}
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 text-xs pr-1">
                {cart.map((line) => (
                  <div key={line.id} className="flex justify-between items-start gap-2 border-b border-[#F5E8D5] pb-2">
                    <div>
                      <p className="font-bold text-[#542719]">
                        {line.quantity}x {line.product
                          ? language === 'ar'
                            ? line.product.name.ar
                            : line.product.name.en
                          : line.customBox
                          ? `✨ ${language === 'ar' ? line.customBox.boxSizeName.ar : line.customBox.boxSizeName.en}`
                          : 'Item'}
                      </p>
                      {line.customBox && (
                        <p className="text-[10px] text-[#733926]">
                          {line.customBox.items.length} items inside · {language === 'ar' ? line.customBox.packagingName.ar : line.customBox.packagingName.en}
                        </p>
                      )}
                    </div>
                    <span className="font-mono font-semibold text-[#542719] shrink-0">
                      {formatPrice(line.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#EAD6BC]">
                <div className="flex justify-between text-[#733926]">
                  <span>{t.cart.subtotal}:</span>
                  <span className="font-mono font-semibold">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#733926]">
                  <span>{t.cart.deliveryFee}:</span>
                  <span className="font-mono font-semibold">
                    {effectiveDeliveryFee === 0 ? t.cart.freeDelivery : formatPrice(effectiveDeliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#733926]">
                  <span>{t.cart.schedulingTitle}:</span>
                  <span className="font-semibold text-[#542719] text-end">
                    {cartSchedule.timingMode === 'asap'
                      ? `${orderType === 'pickup' ? t.cart.pickupFree : t.cart.deliveryHome} · ${t.cart.immediateOption}`
                      : `${orderType === 'pickup' ? t.cart.pickupFree : t.cart.deliveryHome} · ${cartSchedule.scheduledDate} · ${
                          cartSchedule.scheduledTimeSlot === 'custom'
                            ? formatCustomTime(cartSchedule.customTime || '14:00')
                            : cartSchedule.scheduledTimeSlot
                        }`}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#F47AA6] font-semibold">
                    <span>{t.cart.discount}:</span>
                    <span className="font-mono">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-[#542719] pt-2 border-t border-[#542719]">
                  <span>{t.cart.total}:</span>
                  <span className="font-mono text-[#D9A441]">{formatPrice(effectiveTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 px-6 rounded-2xl bg-[#542719] hover:bg-[#733926] disabled:opacity-50 text-[#FFF7EA] text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>{isPlacingOrder ? (language === 'ar' ? 'جاري تأكيد الطلب...' : 'Placing Order...') : t.checkout.placeOrder}</span>
                <ArrowRight className="w-4 h-4 text-[#D9A441]" />
              </button>

              <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Friendly Table Quality & Punctuality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
