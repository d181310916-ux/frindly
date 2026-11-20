import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  CheckCircle,
  Clock,
  Truck,
  Store,
  Printer,
  MessageCircle,
  Search,
  ArrowRight,
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackingView: React.FC = () => {
  const {
    orderToTrack,
    setOrderToTrack,
    orders,
    language,
    formatPrice,
    t,
    setSelectedOrderForInvoice,
    setActiveView,
  } = useApp();

  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState(false);

  const order = orderToTrack || (orders.length > 0 ? orders[0] : null);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(false);
    const clean = searchId.trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === clean);
    if (found) {
      setOrderToTrack(found);
    } else {
      setSearchError(true);
    }
  };

  const steps: { key: OrderStatus; labelEn: string; labelAr: string; descEn: string; descAr: string }[] = [
    {
      key: 'new',
      labelEn: 'Order Received',
      labelAr: 'تم استلام الطلب',
      descEn: 'Your order was registered in our system.',
      descAr: 'تم تسجيل طلبك بنجاح في نظام المطبخ.',
    },
    {
      key: 'confirmed',
      labelEn: 'Confirmed',
      labelAr: 'تم التأكيد',
      descEn: 'Order verified and queued for kitchen preparation.',
      descAr: 'تمت مراجعة الأصناف وجدولة التحضير.',
    },
    {
      key: 'preparing',
      labelEn: 'Kitchen Preparing',
      labelAr: 'جاري التحضير طازجاً',
      descEn: 'Artisanal sandwiches and bakery delights are being handcrafted.',
      descAr: 'يقوم طهاة فرندلي بتحضير الساندوتشات والبوكسات بعناية.',
    },
    {
      key: 'ready_for_pickup',
      labelEn: 'Ready for Pickup / Dispatch',
      labelAr: 'جاهز للتسليم أو الانطلاق',
      descEn: 'Packaged in signature boxes with ribbons and gift cards.',
      descAr: 'تم التغليف بالعلب والشرائط الأنيقة وأصبح جاهزاً.',
    },
    {
      key: 'out_for_delivery',
      labelEn: 'Out for Delivery',
      labelAr: 'في الطريق إليكم',
      descEn: 'Our courier is en route to your doorstep in climate-safe vehicles.',
      descAr: 'المندوب في طريقه لموقعك بسيارة مجهزة ومبردة.',
    },
    {
      key: 'completed',
      labelEn: 'Delivered / Completed',
      labelAr: 'تم التسليم بنجاح',
      descEn: 'Enjoy good food and happy moments!',
      descAr: 'بالصحة والعافية، نأمل لكم أسعد اللحظات!',
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'cancelled') return -1;
    return steps.findIndex((s) => s.key === status);
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header & Order Lookup Input */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl font-bold text-[#542719]">
          {language === 'ar' ? 'تتبع حالة الطلب المباشرة' : 'Live Order Tracking'}
        </h1>
        <p className="text-xs sm:text-sm text-[#733926]">
          {language === 'ar'
            ? 'تابع مراحل إعداد وتوصيل طلبك لحظة بلحظة برقم الطلب'
            : 'Track the live kitchen preparation and delivery progress of your order.'}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchOrder} className="pt-2 max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={language === 'ar' ? 'أدخل رقم الطلب (مثال: FT-2026-8941)' : 'Enter Order Number (e.g. FT-2026-8941)'}
            className="flex-1 px-4 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs font-mono text-[#542719] focus:outline-none focus:border-[#D9A441]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#542719] text-[#FFF7EA] text-xs font-bold rounded-xl hover:bg-[#733926] transition-colors"
          >
            {language === 'ar' ? 'بحث' : 'Track'}
          </button>
        </form>

        {searchError && (
          <p className="text-xs text-red-600 font-semibold">
            {language === 'ar' ? 'لم يتم العثور على هذا الطلب' : 'Order number not found.'}
          </p>
        )}
      </div>

      {order ? (
        <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs p-6 sm:p-10 space-y-8">
          
          {/* Order Header Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#F5E8D5] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
                {language === 'ar' ? 'الطلب الحالي' : 'Active Order'}
              </span>
              <h2 className="font-mono text-2xl font-bold text-[#542719] mt-0.5">
                #{order.id}
              </h2>
              <p className="text-xs text-[#733926] mt-0.5">
                {new Date(order.createdAt).toLocaleDateString()} · {order.deliveryTimeSlot}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedOrderForInvoice(order)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFF7EA] border border-[#EAD6BC] text-xs font-bold text-[#542719] hover:bg-[#F5E8D5] transition-colors"
              >
                <Printer className="w-4 h-4 text-[#D9A441]" />
                <span>{t.orderConfirmation.printInvoice}</span>
              </button>
            </div>
          </div>

          {/* Cancelled State Warning */}
          {order.status === 'cancelled' ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700">
              <p className="font-bold text-sm">
                {language === 'ar' ? 'تم إلغاء هذا الطلب' : 'This Order Has Been Cancelled'}
              </p>
              {order.statusNotes && <p className="mt-1">{order.statusNotes}</p>}
            </div>
          ) : (
            /* Progress Timeline */
            <div className="relative space-y-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {steps.map((step, idx) => {
                  const isDone = currentStepIdx >= idx;
                  const isCurrent = currentStepIdx === idx;

                  return (
                    <div
                      key={step.key}
                      className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'border-[#F47AA6] bg-[#FDEBF2]/40 shadow-xs'
                          : isDone
                          ? 'border-[#D9A441] bg-[#FFF7EA]/60'
                          : 'border-slate-100 bg-slate-50 opacity-50'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                          isDone
                            ? 'bg-[#542719] text-[#FFF7EA]'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <h4 className="font-bold text-xs text-[#542719] line-clamp-1">
                        {language === 'ar' ? step.labelAr : step.labelEn}
                      </h4>
                      <p className="text-[10px] text-[#733926] mt-1 leading-snug line-clamp-2">
                        {language === 'ar' ? step.descAr : step.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>

              {order.statusNotes && (
                <div className="bg-[#FFF7EA] p-3.5 rounded-xl border border-[#F5E8D5] text-xs text-[#542719]">
                  <strong className="text-[#D9A441]">
                    {language === 'ar' ? 'ملاحظة من فريق التجهيز:' : 'Kitchen Update:'}{' '}
                  </strong>
                  <span>{order.statusNotes}</span>
                </div>
              )}
            </div>
          )}

          {/* Delivery & Items Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#F5E8D5] text-xs text-[#542719]">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[#D9A441] mb-2">
                {language === 'ar' ? 'بيانات التوصيل' : 'Delivery Destination'}
              </h4>
              <p className="font-semibold text-sm">{order.customer.name}</p>
              <p className="text-[#733926] font-mono">{order.customer.phone}</p>
              <p className="text-[#733926] mt-0.5">{order.customer.address}, {order.customer.city}</p>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-[#D9A441] mb-2">
                {language === 'ar' ? 'أصناف الطلب' : 'Ordered Items'}
              </h4>
              <div className="space-y-1">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {it.quantity}x {it.product
                        ? language === 'ar'
                          ? it.product.name.ar
                          : it.product.name.en
                        : it.customBox
                        ? `Custom Box (${language === 'ar' ? it.customBox.boxSizeName.ar : it.customBox.boxSizeName.en})`
                        : 'Item'}
                    </span>
                    <span className="font-mono font-semibold">{formatPrice(it.totalPrice)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-[#F5E8D5] text-[#D9A441]">
                  <span>{t.cart.total}:</span>
                  <span className="font-mono">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-[#733926]">
          <p>{language === 'ar' ? 'لا توجد طلبات لعرضها حالياً' : 'No orders found to track.'}</p>
        </div>
      )}
    </div>
  );
};
