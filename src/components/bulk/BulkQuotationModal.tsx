import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, Calendar, MapPin, Mail, Phone, User, Package, Check, Sparkles } from 'lucide-react';

export const BulkQuotationModal: React.FC = () => {
  const {
    isBulkModalOpen,
    setIsBulkModalOpen,
    bulkModalTargetBox,
    createBulkQuotation,
    language,
    t,
  } = useApp();

  const [form, setForm] = useState({
    customerName: '',
    organizationName: '',
    phone: '',
    email: '',
    boxQuantity: 100,
    eventDate: '',
    deliveryAddress: '',
    eventType: 'Corporate / School Distribution',
    specialInstructions: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isBulkModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await createBulkQuotation({
      customerName: form.customerName,
      organizationName: form.organizationName || undefined,
      phone: form.phone,
      email: form.email,
      boxType: 'ready_made',
      targetBoxName: bulkModalTargetBox,
      boxQuantity: Number(form.boxQuantity),
      eventDate: form.eventDate,
      deliveryAddress: form.deliveryAddress,
      eventType: form.eventType,
      specialInstructions: form.specialInstructions || undefined,
    });

    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsBulkModalOpen(false);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FFF7EA] rounded-3xl border-2 border-[#EAD6BC] shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsBulkModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#542719] hover:bg-[#F5E8D5] transition-colors border border-[#EAD6BC]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#542719]">
              {language === 'ar' ? 'تم استلام طلب التسعيرة بنجاح!' : 'Quotation Request Received!'}
            </h3>
            <p className="text-sm text-[#733926] max-w-md mx-auto leading-relaxed">
              {t.bulk.successMessage}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47AA6]/20 text-[#542719] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F47AA6]" />
                <span>{language === 'ar' ? 'للكميات الكبرى والتوزيعات' : 'Large Volume Distributions'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#542719]">
                {t.bulk.modalTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#733926] mt-1 leading-relaxed">
                {t.bulk.modalSubtitle}
              </p>
              <div className="mt-2.5 inline-block px-3 py-1 bg-white border border-[#EAD6BC] rounded-lg text-xs font-bold text-[#542719]">
                {language === 'ar' ? 'المنتج المطلوب: ' : 'Selected Box: '}
                <span className="text-[#F47AA6]">{bulkModalTargetBox}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.bulk.contactName}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    placeholder={language === 'ar' ? 'أ/ محمد أحمد' : 'e.g. Sarah Jenkins'}
                    className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.bulk.orgName}</span>
                  </label>
                  <input
                    type="text"
                    value={form.organizationName}
                    onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                    placeholder={language === 'ar' ? 'جامعة القاهرة / شركة فودافون' : 'e.g. Cairo University, Tech Corp'}
                    className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.bulk.phone}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="010xxxxxxxx"
                    className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.bulk.email}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.bulk.quantityLabel}</span>
                  </label>
                  <select
                    value={form.boxQuantity}
                    onChange={(e) => setForm({ ...form, boxQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] font-bold focus:outline-none focus:border-[#F47AA6]"
                  >
                    <option value={50}>50 {language === 'ar' ? 'بوكس' : 'Boxes'}</option>
                    <option value={100}>100 {language === 'ar' ? 'بوكس' : 'Boxes'}</option>
                    <option value={150}>150 {language === 'ar' ? 'بوكس' : 'Boxes'}</option>
                    <option value={200}>200 {language === 'ar' ? 'بوكس' : 'Boxes'}</option>
                    <option value={300}>300 {language === 'ar' ? 'بوكس' : 'Boxes'}</option>
                    <option value={500}>500+ {language === 'ar' ? 'بوكس (توزيعات كبرى)' : 'Boxes (Mega Distribution)'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.bulk.eventDate}</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{t.bulk.deliveryLocation}</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.deliveryAddress}
                  onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
                  placeholder={language === 'ar' ? 'الحي / الشارع / القاعة أو اسم المبنى' : 'Full address, building, or auditorium hall'}
                  className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719]">
                  {t.bulk.instructions}
                </label>
                <textarea
                  rows={2}
                  value={form.specialInstructions}
                  onChange={(e) => setForm({ ...form, specialInstructions: e.target.value })}
                  placeholder={language === 'ar' ? 'ملاحظات حول شعار الشركة على الكرتون، أصناف خاصة بالنباتيين، وقت التسليم...' : 'Notes regarding branded stickers, vegan preferences, split timing...'}
                  className="w-full px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-xs text-[#542719] focus:outline-none focus:border-[#F47AA6]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#542719] hover:bg-[#733926] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-colors disabled:opacity-50"
              >
                {isSubmitting
                  ? (language === 'ar' ? 'جاري إرسال الطلب...' : 'Submitting Quotation...')
                  : t.bulk.submitBtn}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
