import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BulkQuotationRequest } from '../../types';
import { Building2, Calendar, MapPin, Phone, Mail, CheckCircle2, ArrowRight, Clock, ShieldCheck, Check } from 'lucide-react';

export const AdminBulkOrders: React.FC = () => {
  const {
    bulkQuotations,
    updateBulkQuotationStatus,
    convertQuotationToOrder,
    language,
    formatPrice,
  } = useApp();

  const [selectedQuote, setSelectedQuote] = useState<BulkQuotationRequest | null>(null);
  const [unitPriceInput, setUnitPriceInput] = useState<number>(75);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [confirmConvertId, setConfirmConvertId] = useState<string | null>(null);
  const [conversionSuccess, setConversionSuccess] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleOpenEdit = (quote: BulkQuotationRequest) => {
    setSelectedQuote(quote);
    setActionFeedback(null);
    setUnitPriceInput(quote.quotedUnitPrice || 75);
    setAdminNotesInput(quote.adminNotes || '');
  };

  const handleSaveQuote = async (status: BulkQuotationRequest['status']) => {
    if (!selectedQuote) return;
    setActionFeedback(null);
    setIsUpdating(true);
    try {
      const ok = await updateBulkQuotationStatus(selectedQuote.id, status, unitPriceInput, adminNotesInput);
      if (ok) {
        setSelectedQuote((prev) => (prev ? { ...prev, status, quotedUnitPrice: unitPriceInput, adminNotes: adminNotesInput } : null));
        setActionFeedback({
          type: 'success',
          text: language === 'ar' ? 'تم حفظ عرض السعر في قاعدة البيانات بنجاح.' : 'Quotation saved to Firestore.',
        });
        setTimeout(() => setActionFeedback(null), 3000);
      } else {
        setActionFeedback({
          type: 'error',
          text: language === 'ar' ? 'تعذر حفظ عرض السعر. يرجى المحاولة مرة أخرى.' : 'Failed to save quotation to Firestore.',
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConvert = async (quoteId: string) => {
    setActionFeedback(null);
    setIsUpdating(true);
    try {
      const created = await convertQuotationToOrder(quoteId);
      setConfirmConvertId(null);
      if (created) {
        setConversionSuccess(created.id);
        setTimeout(() => setConversionSuccess(null), 4000);
      } else {
        setActionFeedback({
          type: 'error',
          text: language === 'ar' ? 'تعذر تحويل العرض إلى طلب مؤكد.' : 'Failed to convert quotation into an order.',
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-[#EAD6BC]">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#542719]">
            {language === 'ar' ? 'إدارة طلبات التوزيعات والكميات الكبرى (المدارس والشركات)' : 'Bulk Distributions & Volume Orders Management'}
          </h2>
          <p className="text-xs text-[#733926] mt-0.5">
            {language === 'ar'
              ? 'دراسة طلبات الكميات (٥٠ إلى ٥٠٠+ بوكس)، تحديد الأسعار المخفضة، وتحويلها لطلبات مؤكدة'
              : 'Review volume quotation requests (50 to 500+ boxes), set corporate prices, and convert to live orders'}
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-[#D9A441] bg-[#FFF7EA] px-3 py-1.5 rounded-full border border-[#EAD6BC]">
          {bulkQuotations.length} {language === 'ar' ? 'طلبات توزيع' : 'Quotation Requests'}
        </span>
      </div>

      {actionFeedback && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between ${
            actionFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <span>{actionFeedback.text}</span>
          <button type="button" onClick={() => setActionFeedback(null)} className="px-1.5">✕</button>
        </div>
      )}

      {conversionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>
            {language === 'ar'
              ? `تم بنجاح تحويل عرض السعر إلى طلب مؤكد برقم: ${conversionSuccess} وتم تسجيله بالنظام!`
              : `Quotation successfully converted to confirmed Order #${conversionSuccess}!`}
          </span>
        </div>
      )}

      {/* Grid of Bulk Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {bulkQuotations.map((quote) => {
          const isSelected = selectedQuote?.id === quote.id;
          return (
            <div
              key={quote.id}
              className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-xs transition-all space-y-4 ${
                isSelected ? 'border-[#D9A441] ring-2 ring-[#D9A441]/20' : 'border-[#EAD6BC]'
              }`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 border-b border-[#F5E8D5] pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#D9A441] uppercase tracking-wider block">
                    {quote.id}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#542719]">
                    {quote.organizationName ? `${quote.organizationName} (${quote.customerName})` : quote.customerName}
                  </h3>
                  <span className="text-xs text-[#733926]">
                    {quote.eventType}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    quote.status === 'converted_to_order'
                      ? 'bg-purple-100 text-purple-800'
                      : quote.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : quote.status === 'quoted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {quote.status}
                </span>
              </div>

              {/* Details specs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#FFF7EA] rounded-xl border border-[#EAD6BC]">
                  <span className="text-[#733926] text-[10px] block">{language === 'ar' ? 'الكمية المطلوبة' : 'Quantity Needed'}</span>
                  <span className="font-mono font-bold text-[#542719] text-sm">
                    {quote.boxQuantity} {language === 'ar' ? 'بوكس' : 'Boxes'}
                  </span>
                </div>

                <div className="p-2.5 bg-[#FFF7EA] rounded-xl border border-[#EAD6BC]">
                  <span className="text-[#733926] text-[10px] block">{language === 'ar' ? 'تاريخ الفعالية' : 'Event Date'}</span>
                  <span className="font-mono font-bold text-[#542719]">
                    {quote.eventDate}
                  </span>
                </div>
              </div>

              {/* Contact info & address */}
              <div className="text-xs text-[#733926] space-y-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{quote.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{quote.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span className="truncate">{quote.deliveryAddress}</span>
                </div>
              </div>

              {quote.specialInstructions && (
                <p className="text-xs text-[#542719] bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <strong>{language === 'ar' ? 'الملاحظات: ' : 'Notes: '}</strong>
                  {quote.specialInstructions}
                </p>
              )}

              {/* Quoted Pricing summary */}
              {quote.quotedUnitPrice && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-blue-700 block font-semibold">{language === 'ar' ? 'السعر المحدد للبوكس' : 'Quoted Unit Price'}</span>
                    <span className="font-mono font-bold text-blue-900 text-sm">{formatPrice(quote.quotedUnitPrice)}</span>
                  </div>
                  <div className="text-end">
                    <span className="text-blue-700 block font-semibold">{language === 'ar' ? 'إجمالي الصفقة' : 'Quoted Total'}</span>
                    <span className="font-mono font-bold text-blue-900 text-sm">
                      {formatPrice(quote.quotedUnitPrice * quote.boxQuantity)}
                    </span>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 border-t border-[#F5E8D5] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(quote)}
                  className="px-3.5 py-1.5 bg-[#FFF7EA] hover:bg-[#F5E8D5] border border-[#EAD6BC] text-[#542719] text-xs font-bold rounded-xl transition-colors"
                >
                  {language === 'ar' ? 'تسعير / تعديل العرض' : 'Set Price & Notes'}
                </button>

                {quote.status !== 'converted_to_order' && (
                  confirmConvertId === quote.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleConvert(quote.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                      >
                        {language === 'ar' ? 'تأكيد التحويل' : 'Confirm Order'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmConvertId(null)}
                        className="px-2.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmConvertId(quote.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تحويل لطلب رسمي' : 'Convert to Order'}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing / Status Modal Form */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-[#D9A441] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#D9A441] uppercase">{selectedQuote.id}</span>
                <h3 className="font-serif font-bold text-lg text-[#542719]">
                  {language === 'ar' ? 'إعداد عرض السعر للكميات' : 'Prepare Bulk Quotation'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#733926] bg-[#FFF7EA] p-3 rounded-xl border border-[#EAD6BC]">
              <p><strong>{language === 'ar' ? 'العميل: ' : 'Client: '}</strong>{selectedQuote.customerName} ({selectedQuote.organizationName})</p>
              <p><strong>{language === 'ar' ? 'الكمية: ' : 'Volume: '}</strong>{selectedQuote.boxQuantity} {selectedQuote.targetBoxName || 'Boxes'}</p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719]">
                  {language === 'ar' ? 'سعر الوحدة المقترح للبوكس الواحد:' : 'Quoted Unit Price per Box:'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="any"
                    min={0}
                    value={unitPriceInput}
                    onChange={(e) => setUnitPriceInput(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs font-mono font-bold text-[#542719]"
                  />
                  <span className="font-bold text-xs text-[#D9A441]">
                    = {formatPrice(unitPriceInput * selectedQuote.boxQuantity)} {language === 'ar' ? 'إجمالي' : 'Total'}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719]">
                  {language === 'ar' ? 'ملاحظات الإدارة وشروط التوزيع:' : 'Administrative Notes / Delivery Terms:'}
                </label>
                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder={language === 'ar' ? 'تخفيض خاص بالجامعة، استلام صباحي...' : 'Volume discount applied, morning delivery terms...'}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F5E8D5] gap-2">
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 border border-[#EAD6BC] rounded-xl text-xs font-bold text-[#542719]"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleSaveQuote('quoted')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  {language === 'ar' ? 'إرسال السعر (Quoted)' : 'Mark Quoted'}
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleSaveQuote('approved')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  {language === 'ar' ? 'اعتماد العرض (Approved)' : 'Approve Quote'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
