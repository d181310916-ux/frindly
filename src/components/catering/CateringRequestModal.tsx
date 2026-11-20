import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, CheckCircle2, Calendar, Users, MapPin, DollarSign } from 'lucide-react';
import { CateringRequest, ProductCategory } from '../../types';

export const CateringRequestModal: React.FC = () => {
  const {
    isCateringModalOpen,
    setIsCateringModalOpen,
    createCateringRequest,
    storeSettings,
    language,
    t,
  } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'corporate_event' as CateringRequest['eventType'],
    guestCount: 30,
    eventDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    location: '',
    estimatedBudget: '',
    specialRequirements: '',
  });

  const [selectedCats, setSelectedCats] = useState<ProductCategory[]>([
    'mini-clubs',
    'group-boxes',
    'bakery-cakes',
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isCateringModalOpen) return null;

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const success = await createCateringRequest({
        ...formData,
        requestedCategories: selectedCats,
      });
      if (success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setIsCateringModalOpen(false);
        }, 2500);
      } else {
        setSubmitError(
          language === 'ar'
            ? 'تعذر إرسال طلب الضيافة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.'
            : 'Failed to submit catering request. Please check your connection and try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypes: { id: CateringRequest['eventType']; labelEn: string; labelAr: string }[] = [
    { id: 'corporate_event', labelEn: 'Corporate Event / Conference', labelAr: 'فعالية شركات أو مؤتمر' },
    { id: 'office_meeting', labelEn: 'Office / Board Meeting', labelAr: 'اجتماع عمل ومجلس إدارة' },
    { id: 'birthday', labelEn: 'Birthday Celebration', labelAr: 'حفلة عيد ميلاد' },
    { id: 'family_gathering', labelEn: 'Family Gathering', labelAr: 'جمعة عائلية خاصة' },
    { id: 'school_university', labelEn: 'School or University Event', labelAr: 'فعالية مدرسية أو جامعية' },
    { id: 'wedding_celebration', labelEn: 'Wedding / Engagement Celebration', labelAr: 'حفل خطوبة أو زواج' },
  ];

  const categoryOptions: { id: ProductCategory; labelEn: string; labelAr: string }[] = [
    { id: 'mini-clubs', labelEn: 'Mini Club Sandwiches', labelAr: 'ميني كلوب ساندوتش' },
    { id: 'group-boxes', labelEn: 'Group Gathering Platters', labelAr: 'بوكسات وبلاترات الجمعات' },
    { id: 'premium-sandwiches', labelEn: 'Artisan Premium Sandwiches', labelAr: 'ساندوتشات بريوش فاخرة' },
    { id: 'bakery-cakes', labelEn: 'Cakes & Bakery Bites', labelAr: 'كيكات وحلويات طازجة' },
    { id: 'chocolates-gifts', labelEn: 'Gift Boxes & Pralines', labelAr: 'هدايا وشوكولاتة برالين' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAD6BC] p-6 sm:p-8 my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCateringModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#542719] rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#542719]">
              {language === 'ar' ? 'تم استلام طلب الضيافة بنجاح' : 'Catering Request Submitted'}
            </h3>
            <p className="text-xs sm:text-sm text-[#733926] max-w-md mx-auto">
              {t.cateringModal.successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="border-b border-[#F5E8D5] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#542719] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{language === 'ar' ? 'خدمة الضيافة والمناسبات' : 'Catering & Events Service'}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#542719]">
                {t.cateringModal.title}
              </h2>
              <p className="text-xs text-[#733926] mt-1 leading-relaxed">
                {t.cateringModal.subtitle}
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="space-y-4 text-xs">
              {/* Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">{t.cateringModal.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">{t.cateringModal.phone}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+2010xxxxxxxx"
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">{t.cateringModal.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                  />
                </div>
              </div>

              {/* Event Type & Guest Count & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">{t.cateringModal.eventType}</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                  >
                    {eventTypes.map((et) => (
                      <option key={et.id} value={et.id}>
                        {language === 'ar' ? et.labelAr : et.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#542719] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.cateringModal.guestCount}</span>
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={1000}
                    required
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#542719] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.cateringModal.eventDate}</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                  />
                </div>
              </div>

              {/* Location & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{t.cateringModal.location}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'مثال: فيلا بالمعادي أو قاعة بالتجمع الخامس' : 'e.g. Maadi Villa, or New Cairo Venue'}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#542719] flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{language === 'ar' ? 'الميزانية التقديرية (اختياري)' : 'Estimated Budget (Optional)'}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? `مثال: ٢٠٠٠ - ٣٠٠٠ ${storeSettings.currency === 'EGP' ? 'ج.م' : storeSettings.currency}` : `e.g. 2000 - 3000 ${storeSettings.currency}`}
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                  />
                </div>
              </div>

              {/* Items of Interest Checkboxes */}
              <div className="space-y-1.5 pt-1">
                <label className="font-semibold text-[#542719]">{t.cateringModal.categoriesInterest}:</label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => {
                    const isChecked = selectedCats.includes(cat.id);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          isChecked
                            ? 'bg-[#542719] text-white border-[#542719]'
                            : 'bg-white border-[#EAD6BC] text-[#733926] hover:bg-[#FFF7EA]'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}
                        {language === 'ar' ? cat.labelAr : cat.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Notes */}
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">{t.cateringModal.specialNotes}</label>
                <textarea
                  rows={2}
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  placeholder={language === 'ar' ? 'تفاصيل العرض، كروت إهداء، تقديم على ألواح خشبية...' : 'Presentation preferences, dietary requirements...'}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#542719] hover:bg-[#733926] disabled:opacity-50 text-[#FFF7EA] text-sm font-bold rounded-2xl shadow-md transition-colors"
            >
              {isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : t.cateringModal.submitBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
