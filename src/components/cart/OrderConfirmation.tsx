import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Printer,
  MessageCircle,
  Clock,
  ArrowRight,
  Package,
  Calendar,
  MapPin,
} from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const {
    currentOrder,
    storeSettings,
    language,
    t,
    setSelectedOrderForInvoice,
    setOrderToTrack,
    setActiveView,
    formatPrice,
  } = useApp();

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#542719]">
          {language === 'ar' ? 'لا يوجد طلب نشط حالياً' : 'No active order found'}
        </h2>
        <button
          onClick={() => setActiveView('home')}
          className="px-6 py-2.5 bg-[#542719] text-[#FFF7EA] text-sm font-bold rounded-xl"
        >
          {t.orderConfirmation.continueShopping}
        </button>
      </div>
    );
  }

  const order = currentOrder;

  // WhatsApp Message Generator according to specification
  const generateWhatsAppMessage = () => {
    const cleanNumber = storeSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const itemsList = order.items
      .map((item) => {
        const title = item.product
          ? language === 'ar'
            ? item.product.name.ar
            : item.product.name.en
          : item.customBox
          ? `Custom Box (${language === 'ar' ? item.customBox.boxSizeName.ar : item.customBox.boxSizeName.en})`
          : item.specialInstructions || 'Delicacy';
        return `• ${item.quantity}x ${title} (${formatPrice(item.totalPrice)})`;
      })
      .join('\n');

    const msg =
      language === 'ar'
        ? `مرحباً فرندلي تيبل! 🌸\nأود تأكيد طلبي الجديد:\n\n*رقم الطلب:* ${order.id}\n*العميل:* ${order.customer.name}\n*الجوال:* ${order.customer.phone}\n*الموعد:* ${order.deliveryDate} (${order.deliveryTimeSlot})\n*طريقة الاستلام:* ${order.orderType === 'delivery' ? 'توصيل' : 'استلام من الفرع'}\n\n*الأصناف:* \n${itemsList}\n\n*الإجمالي النهائي:* ${formatPrice(order.total)}\n*طريقة الدفع:* ${order.paymentMethod}\n${order.customer.notes ? `*ملاحظات:* ${order.customer.notes}` : ''}`
        : `Hello Friendly Table! 🌸\nHere are details for my new order:\n\n*Order No:* ${order.id}\n*Customer:* ${order.customer.name}\n*Phone:* ${order.customer.phone}\n*Preferred Time:* ${order.deliveryDate} (${order.deliveryTimeSlot})\n*Type:* ${order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}\n\n*Items:* \n${itemsList}\n\n*Total Amount:* ${formatPrice(order.total)}\n*Payment Method:* ${order.paymentMethod}\n${order.customer.notes ? `*Notes:* ${order.customer.notes}` : ''}`;

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-white rounded-3xl border-2 border-[#EAD6BC] shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Success Icon & Header */}
        <div className="text-center space-y-3 pb-6 border-b border-[#F5E8D5]">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#542719]">
            {t.orderConfirmation.thankYou}
          </h1>
          <p className="text-xs sm:text-sm text-[#733926]">
            {language === 'ar'
              ? 'تم استلام طلبك بنجاح وسيقوم فريق المطبخ بتحضيره طازجاً في الموعد المحدد.'
              : 'Your order has been placed successfully and our kitchen team is preparing it fresh.'}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7EA] border border-[#EAD6BC] text-xs font-mono font-bold text-[#542719]">
            <span>{t.orderConfirmation.orderNumber}:</span>
            <span className="text-[#D9A441]">{order.id}</span>
          </div>
        </div>

        {/* Quick Order Schedule & Delivery Status Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FFF7EA] p-5 rounded-2xl border border-[#F5E8D5] text-xs">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#D9A441] shrink-0" />
            <div>
              <p className="text-slate-500 font-semibold">{t.checkout.orderDate}</p>
              <p className="font-bold text-[#542719]">{order.deliveryDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#D9A441] shrink-0" />
            <div>
              <p className="text-slate-500 font-semibold">{t.checkout.timeSlot}</p>
              <p className="font-bold text-[#542719]">{order.deliveryTimeSlot}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#D9A441] shrink-0" />
            <div>
              <p className="text-slate-500 font-semibold">{t.checkout.deliveryType}</p>
              <p className="font-bold text-[#542719]">
                {order.orderType === 'delivery' ? t.checkout.delivery : t.checkout.pickup}
              </p>
            </div>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base text-[#542719]">
            {t.orderConfirmation.detailsTitle}
          </h3>
          <div className="divide-y divide-[#F5E8D5] text-xs">
            {order.items.map((line, idx) => (
              <div key={idx} className="py-3 flex justify-between items-start gap-3">
                <div>
                  <p className="font-bold text-sm text-[#542719]">
                    {line.quantity}x {line.product
                      ? language === 'ar'
                        ? line.product.name.ar
                        : line.product.name.en
                      : line.customBox
                      ? `✨ ${language === 'ar' ? line.customBox.boxSizeName.ar : line.customBox.boxSizeName.en}`
                      : line.specialInstructions || 'Delicacy'}
                  </p>
                  {line.selectedBread && (
                    <span className="text-[11px] text-[#F47AA6] font-semibold block">
                      Bread: {line.selectedBread}
                    </span>
                  )}
                  {line.customBox && (
                    <p className="text-[11px] text-[#733926] mt-0.5">
                      {line.customBox.items.map((it) => `${it.quantity}x ${language === 'ar' ? it.name.ar : it.name.en}`).join(', ')}
                    </p>
                  )}
                </div>
                <span className="font-mono font-bold text-sm text-[#542719]">
                  {formatPrice(line.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="bg-[#FFF7EA] p-4 rounded-xl space-y-1.5 text-xs border border-[#F5E8D5]">
            <div className="flex justify-between text-[#733926]">
              <span>{t.cart.subtotal}:</span>
              <span className="font-mono">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#733926]">
              <span>{t.cart.deliveryFee}:</span>
              <span className="font-mono">{order.deliveryFee === 0 ? t.cart.freeDelivery : formatPrice(order.deliveryFee)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#F47AA6]">
                <span>{t.cart.discount}:</span>
                <span className="font-mono">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#542719] pt-2 border-t border-[#EAD6BC]">
              <span>{t.cart.total}:</span>
              <span className="font-mono text-[#D9A441]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Bank Transfer Details if Bank Transfer selected */}
        {order.paymentMethod === 'bank_transfer' && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
            <h4 className="font-bold text-amber-900">{t.orderConfirmation.bankTransferTitle}:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#542719]">
              <div>
                <span className="text-slate-500">{t.orderConfirmation.bankName}: </span>
                <strong>{storeSettings.bankDetails.bankName}</strong>
              </div>
              <div>
                <span className="text-slate-500">{t.orderConfirmation.accountName}: </span>
                <strong>{storeSettings.bankDetails.accountName}</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500">{t.orderConfirmation.iban}: </span>
                <strong className="font-mono">{storeSettings.bankDetails.iban}</strong>
              </div>
            </div>
            <p className="text-[11px] text-amber-800 italic pt-1">
              {language === 'ar'
                ? 'يرجى إرسال إيصال التحويل عبر واتساب مع ذكر رقم الطلب لتسريع التجهيز.'
                : 'Please send transfer receipt via WhatsApp referencing your order number.'}
            </p>
          </div>
        )}

        {/* Action Buttons: WhatsApp Share, Print Invoice, Track Order */}
        <div className="pt-4 border-t border-[#F5E8D5] flex flex-wrap gap-3">
          <button
            onClick={generateWhatsAppMessage}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.orderConfirmation.shareWhatsApp}</span>
          </button>

          <button
            onClick={() => setSelectedOrderForInvoice(order)}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-slate-50 border border-[#EAD6BC] text-[#542719] text-xs sm:text-sm font-bold rounded-xl transition-colors"
          >
            <Printer className="w-4 h-4 text-[#D9A441]" />
            <span>{t.orderConfirmation.printInvoice}</span>
          </button>

          <button
            onClick={() => {
              setOrderToTrack(order);
              setActiveView('track-order');
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#542719] hover:bg-[#733926] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors"
          >
            <Package className="w-4 h-4 text-[#D9A441]" />
            <span>{t.orderConfirmation.trackOrder}</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-semibold text-[#733926] hover:text-[#F47AA6] transition-colors"
          >
            ← {t.orderConfirmation.continueShopping}
          </button>
        </div>
      </div>
    </div>
  );
};
