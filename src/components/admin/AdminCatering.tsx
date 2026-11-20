import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Calendar, Users, MapPin, CheckCircle, ArrowRight, DollarSign } from 'lucide-react';
import { CateringRequest } from '../../types';

export const AdminCatering: React.FC = () => {
  const {
    cateringRequests,
    updateCateringStatus,
    createOrder,
    products,
    formatPrice,
    storeSettings,
    language,
    t,
  } = useApp();

  const [quotingReq, setQuotingReq] = useState<CateringRequest | null>(null);
  const [quoteAmount, setQuoteAmount] = useState<number>(1500);
  const [quoteNotes, setQuoteNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSendQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotingReq) return;
    setBanner(null);
    setIsProcessing(true);
    try {
      const ok = await updateCateringStatus(quotingReq.id, 'quoted', quoteAmount, quoteNotes);
      if (ok) {
        setQuotingReq(null);
        setBanner({
          type: 'success',
          text: language === 'ar' ? 'تم حفظ وإرسال عرض السعر بنجاح.' : 'Quotation saved to Firestore.',
        });
        setTimeout(() => setBanner(null), 3500);
      } else {
        setBanner({
          type: 'error',
          text: language === 'ar' ? 'تعذر حفظ عرض السعر في قاعدة البيانات.' : 'Failed to save quotation.',
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvertToOrder = async (req: CateringRequest) => {
    setBanner(null);
    const cateringProd = products.find((p) => p.category === 'catering-events') || products[0];
    if (!cateringProd) {
      setBanner({
        type: 'error',
        text: language === 'ar' ? 'لا توجد منتجات متاحة لإنشاء الطلب.' : 'No catalog products found to attach to order.',
      });
      return;
    }

    const amount = req.quoteAmount || 1500;
    setIsProcessing(true);
    try {
      const created = await createOrder({
        customer: {
          name: req.customerName,
          phone: req.phone,
          email: req.email,
          address: req.location,
          city: 'Cairo',
          notes: `Converted from Catering Request #${req.id}. ${req.specialRequirements}`,
        },
        orderType: 'delivery',
        deliveryDate: req.eventDate,
        deliveryTimeSlot: '11:00 AM - 01:00 PM',
        items: [
          {
            id: `line-cat-${Date.now()}`,
            productId: cateringProd.id,
            product: cateringProd,
            quantity: 1,
            unitPrice: amount,
            totalPrice: amount,
            specialInstructions: `Catering for ${req.guestCount} guests (${req.eventType})`,
          },
        ],
        subtotal: amount,
        deliveryFee: 0,
        discount: 0,
        total: amount,
        paymentMethod: 'bank_transfer',
        paymentStatus: 'pending',
      });

      await updateCateringStatus(req.id, 'converted_to_order');
      setBanner({
        type: 'success',
        text:
          language === 'ar'
            ? `تم تحويل طلب الضيافة #${req.id} إلى طلب متجر رسمي برقم #${created.id}.`
            : `Catering Request #${req.id} converted to Order #${created.id}.`,
      });
      setTimeout(() => setBanner(null), 4000);
    } catch (err) {
      console.error(err);
      setBanner({
        type: 'error',
        text: language === 'ar' ? 'تعذر تحويل طلب الضيافة إلى طلب رسمي.' : 'Failed to convert catering request to order.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E8D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.catering}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'طلبات ضيافة الفعاليات والمؤتمرات وحفلات الشركات والمدارس' : 'Corporate catering inquiries, conference setups, and custom quotations.'}
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 bg-[#FFF7EA] text-[#542719] border border-[#EAD6BC] rounded-full">
          {cateringRequests.length} {language === 'ar' ? 'طلب ضيافة' : 'Inquiries'}
        </span>
      </div>

      {banner && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between ${
            banner.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <span>{banner.text}</span>
          <button type="button" onClick={() => setBanner(null)} className="px-1.5">✕</button>
        </div>
      )}

      {/* Quote Centered Modal */}
      {quotingReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSendQuote}
            className="w-full max-w-lg bg-white p-6 rounded-3xl border-2 border-[#D9A441] shadow-2xl space-y-4 text-xs my-auto"
          >
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <h3 className="font-serif font-bold text-base text-[#542719]">
                {language === 'ar'
                  ? `إرسال تسعيرة للطلب #${quotingReq.id} (${quotingReq.customerName})`
                  : `Send Official Quote for #${quotingReq.id} (${quotingReq.customerName})`}
              </h3>
              <button
                type="button"
                onClick={() => setQuotingReq(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar'
                    ? `إجمالي التسعيرة (${storeSettings.currency})`
                    : `Quotation Total (${storeSettings.currency})`}
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  min={1}
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'الملاحظات والمشتملات' : 'Notes / Inclusions'}
                </label>
                <input
                  type="text"
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  placeholder={language === 'ar' ? 'يشمل ٨٠ ميني كلوب، ركن حلويات، صواني خشبية' : 'Includes 80 mini clubs, dessert tier, wooden boards'}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setQuotingReq(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2 bg-[#542719] disabled:opacity-50 text-white font-bold rounded-xl"
              >
                {isProcessing
                  ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...')
                  : (language === 'ar' ? 'حفظ التسعيرة' : 'Save Quote')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Catering Requests Table */}
      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-[#FFF7EA] border-b border-[#EAD6BC] text-[#733926] font-bold uppercase">
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'الرقم والعميل' : 'ID & Customer'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'الفعالية والضيوف' : 'Event & Guests'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'التاريخ والموقع' : 'Date & Location'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'التفاصيل والملاحظات' : 'Categories & Notes'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'التسعير والإجراءات' : 'Quote / Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E8D5]">
              {cateringRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#FFF7EA]/30 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#542719]">#{req.id}</p>
                    <p className="text-[#542719] font-medium">{req.customerName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{req.phone}</p>
                  </td>
                  <td className="py-3 px-4 text-[#733926]">
                    <p className="font-semibold capitalize text-[#542719]">
                      {req.eventType.replace('_', ' ')}
                    </p>
                    <p className="text-[11px] font-mono text-[#D9A441] font-bold">
                      {req.guestCount} Guests
                    </p>
                  </td>
                  <td className="py-3 px-4 text-[#733926]">
                    <p className="font-mono">{req.eventDate}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{req.location}</p>
                  </td>
                  <td className="py-3 px-4 text-[#733926] max-w-xs">
                    <p className="font-semibold text-[11px] text-[#542719]">
                      {req.requestedCategories.join(', ')}
                    </p>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">
                      {req.specialRequirements}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'converted_to_order'
                        ? 'bg-purple-100 text-purple-800'
                        : req.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'quoted'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {req.status.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-end">
                    <div className="flex flex-col items-end gap-1.5">
                      {req.quoteAmount ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#D9A441]">
                            {formatPrice(req.quoteAmount)}
                          </span>
                          {req.status !== 'converted_to_order' && (
                            <button
                              type="button"
                              onClick={() => {
                                setQuotingReq(req);
                                setQuoteAmount(req.quoteAmount || 1500);
                                setQuoteNotes(req.adminNotes || '');
                              }}
                              className="px-2 py-0.5 rounded bg-[#FFF7EA] border border-[#EAD6BC] text-[10px] font-bold text-[#542719]"
                            >
                              {language === 'ar' ? 'تعديل' : 'Edit'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setQuotingReq(req);
                            setQuoteAmount(1500);
                            setQuoteNotes(req.adminNotes || '');
                          }}
                          className="px-2.5 py-1 rounded-md bg-[#FFF7EA] border border-[#EAD6BC] text-[#542719] font-bold hover:bg-[#F5E8D5]"
                        >
                          {language === 'ar' ? 'إرسال تسعيرة' : 'Send Quote'}
                        </button>
                      )}

                      {req.status !== 'converted_to_order' && (
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => handleConvertToOrder(req)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#542719] disabled:opacity-50 text-white text-[10px] font-bold hover:bg-[#733926]"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>{language === 'ar' ? 'تحويل لطلب رسمي' : 'Convert to Order'}</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
