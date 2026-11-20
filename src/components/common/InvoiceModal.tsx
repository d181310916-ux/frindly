import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { selectedOrderForInvoice, setSelectedOrderForInvoice, storeSettings, formatPrice, language, t } = useApp();

  if (!selectedOrderForInvoice) return null;

  const order = selectedOrderForInvoice;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-[#542719] rounded-2xl shadow-2xl p-6 sm:p-10 my-8">
        
        {/* Action Header (hidden in print) */}
        <div className="flex items-center justify-between border-b border-[#EAD6BC] pb-4 mb-6 no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#542719]">Tax Invoice / فاتورة ضريبية مبسطة</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F47AA6]/10 text-[#542719] font-mono">
              #{order.id}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#542719] hover:bg-[#733926] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice / طباعة</span>
            </button>
            <button
              onClick={() => setSelectedOrderForInvoice(null)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="space-y-6">
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-[#EAD6BC] pb-6">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Friendly Table"
                className="h-20 w-auto object-contain"
              />
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#542719]">
                  Friendly Table
                </h2>
                <p className="text-xs font-semibold text-[#D9A441] tracking-wider uppercase">
                  Bakery · Catering · Gifts · Events
                </p>
                <p className="text-xs text-[#733926] italic mt-0.5">
                  Good Food, Happy Moments
                </p>
              </div>
            </div>

            <div className="text-end text-xs text-[#733926] space-y-1">
              <p className="font-bold text-sm text-[#542719]">INVOICE / فاتورة</p>
              <p><span className="text-slate-400">Invoice No:</span> <strong className="font-mono text-[#542719]">{order.id}</strong></p>
              <p><span className="text-slate-400">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><span className="text-slate-400">Time Window:</span> {order.deliveryTimeSlot}</p>
              <p><span className="text-slate-400">Type:</span> {order.orderType === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup'}</p>
            </div>
          </div>

          {/* Customer & Merchant Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FFF7EA] p-4 rounded-xl border border-[#F5E8D5] text-xs">
            <div>
              <h4 className="font-bold text-[#542719] mb-1.5 uppercase tracking-wide">Billed To / بيانات العميل</h4>
              <p className="font-semibold text-sm text-[#542719]">{order.customer.name}</p>
              <p className="text-[#733926] font-mono">{order.customer.phone}</p>
              {order.customer.email && <p className="text-[#733926]">{order.customer.email}</p>}
              <p className="text-[#733926] mt-1">{order.customer.address}, {order.customer.city}</p>
              {order.customer.notes && (
                <p className="text-slate-500 italic mt-1">Note: {order.customer.notes}</p>
              )}
            </div>

            <div className="sm:text-end">
              <h4 className="font-bold text-[#542719] mb-1.5 uppercase tracking-wide">Store Information / المتجر</h4>
              <p className="font-semibold text-sm text-[#542719]">Friendly Table Bakery & Catering Co.</p>
              <p className="text-[#733926]">{storeSettings.address.en}</p>
              <p className="text-[#733926] font-mono">Tel: {storeSettings.supportPhone}</p>
              <p className="text-[#733926]">Email: {storeSettings.supportEmail}</p>
              <p className="text-[#D9A441] font-semibold mt-1">VAT ID: 31098245100003</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-[#542719] text-[#542719] font-bold uppercase tracking-wider">
                  <th className="py-2.5 text-start">Item Description / الصنف</th>
                  <th className="py-2.5 text-center">Qty / الكمية</th>
                  <th className="py-2.5 text-end">Price / السعر</th>
                  <th className="py-2.5 text-end">Total / الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAD6BC]/60">
                {order.items.map((line, idx) => (
                  <tr key={idx} className="py-2">
                    <td className="py-3 text-start">
                      {line.product ? (
                        <div>
                          <p className="font-bold text-[#542719]">
                            {language === 'ar' ? line.product.name.ar : line.product.name.en}
                          </p>
                          <p className="text-[11px] text-[#733926]">
                            {language === 'ar' ? line.product.servingSize?.ar : line.product.servingSize?.en}
                          </p>
                        </div>
                      ) : line.customBox ? (
                        <div>
                          <p className="font-bold text-[#F47AA6]">
                            ✨ {language === 'ar' ? line.customBox.boxSizeName.ar : line.customBox.boxSizeName.en}
                          </p>
                          <p className="text-[11px] text-[#733926]">
                            {language === 'ar' ? line.customBox.packagingName.ar : line.customBox.packagingName.en}
                            {' · '}{line.customBox.peopleCount} {language === 'ar' ? 'ضيوف' : 'guests'}
                          </p>
                          {line.customBox.items && line.customBox.items.length > 0 && (
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              {line.customBox.items.map((it) => `${it.quantity}x ${language === 'ar' ? it.name.ar : it.name.en}`).join(', ')}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="font-bold text-[#542719]">Artisan Item</p>
                      )}
                    </td>
                    <td className="py-3 text-center font-mono font-semibold text-[#542719]">{line.quantity}</td>
                    <td className="py-3 text-end font-mono text-[#542719]">{formatPrice(line.unitPrice)}</td>
                    <td className="py-3 text-end font-mono font-bold text-[#542719]">{formatPrice(line.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end pt-4 border-t border-[#EAD6BC]">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-[#733926]">
                <span>Subtotal / المجموع الفرعي:</span>
                <span className="font-mono font-semibold">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#733926]">
                <span>Delivery Fee / رسوم التوصيل:</span>
                <span className="font-mono font-semibold">
                  {order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#F47AA6] font-semibold">
                  <span>Discount / الخصم ({order.couponCode || 'Promo'}):</span>
                  <span className="font-mono">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#542719] pt-2 border-t border-[#542719]">
                <span>Total Amount / الإجمالي:</span>
                <span className="font-mono text-[#D9A441]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method & Bank Info */}
          <div className="border-t border-[#EAD6BC] pt-4 text-xs text-[#733926] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p><span className="font-bold text-[#542719]">Payment Method:</span> {order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
              <p><span className="font-bold text-[#542719]">Payment Status:</span> <span className="font-bold text-emerald-600 uppercase">{order.paymentStatus}</span></p>
            </div>
            {order.paymentMethod === 'bank_transfer' && (
              <div className="bg-[#FFF7EA] p-2.5 rounded-lg border border-[#F5E8D5] text-[11px]">
                <p className="font-bold text-[#542719]">{storeSettings.bankDetails.bankName}</p>
                <p className="font-mono">{storeSettings.bankDetails.iban}</p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="text-center pt-6 border-t border-[#EAD6BC] text-[11px] text-slate-400">
            <p>Thank you for choosing Friendly Table! We look forward to serving you again.</p>
            <p className="text-[#D9A441] font-semibold mt-0.5">Good Food, Happy Moments ❤️</p>
          </div>
        </div>
      </div>
    </div>
  );
};
