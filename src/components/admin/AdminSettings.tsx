import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreSettings } from '../../types';
import { Save, Check, Database, MessageCircle, Building, Truck, Bell } from 'lucide-react';
import { FirebaseSetupModal } from './FirebaseSetupModal';

export const AdminSettings: React.FC = () => {
  const { storeSettings, updateStoreSettings, language, t } = useApp();
  const [form, setForm] = useState<StoreSettings>({ ...storeSettings });
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  useEffect(() => {
    setForm(storeSettings);
  }, [storeSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setIsSaving(true);
    try {
      const success = await updateStoreSettings(form);
      if (success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
      } else {
        setSaveError(
          language === 'ar'
            ? 'تعذر حفظ الإعدادات في قاعدة البيانات. يرجى المحاولة مرة أخرى.'
            : 'Failed to update store settings in database.'
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E8D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.settings}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'تعديل رقم واتساب، ورسوم التوصيل، وحساب التحويل البنكي، وشريط الإعلانات' : 'Manage contact channels, WhatsApp routing, delivery thresholds, and bank accounts.'}
          </p>
        </div>

        <button
          onClick={() => setIsFirebaseModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#FFF7EA] border border-[#EAD6BC] text-[#542719] text-xs font-bold rounded-xl hover:bg-[#F5E8D5] transition-colors"
        >
          <Database className="w-4 h-4 text-[#D9A441]" />
          <span>{t.admin.firebaseModal}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* 1. Contact & WhatsApp */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F5E8D5] pb-3">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <h3 className="font-serif font-bold text-base text-[#542719]">
              {language === 'ar' ? 'قنوات التواصل والواتساب' : 'WhatsApp & Contact Channels'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'رقم واتساب الأعمال *' : 'WhatsApp Business Phone *'}
              </label>
              <input
                type="text"
                required
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-[#542719]"
              />
              <p className="text-[10px] text-slate-400">
                {language === 'ar' ? 'يستخدم لاستقبال الطلبات واستفسارات الواتساب.' : 'Used for WhatsApp inquiry & order share buttons.'}
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'هاتف خدمة العملاء' : 'Customer Service Phone'}
              </label>
              <input
                type="text"
                required
                value={form.supportPhone}
                onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'بريد خدمة العملاء' : 'Customer Service Email'}
              </label>
              <input
                type="email"
                required
                value={form.supportEmail}
                onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'عنوان المطبخ والمتجر (إنجليزي)' : 'Kitchen / Store Address (English)'}
                </label>
                <input
                  type="text"
                  required
                  value={form.address.en}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, en: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'عنوان المطبخ والمتجر (عربي)' : 'Kitchen / Store Address (Arabic)'}
                </label>
                <input
                  type="text"
                  required
                  value={form.address.ar}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, ar: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Delivery Fees & Thresholds */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F5E8D5] pb-3">
            <Truck className="w-4 h-4 text-[#D9A441]" />
            <h3 className="font-serif font-bold text-base text-[#542719]">
              {language === 'ar' ? 'رسوم التوصيل والحد المجاني' : 'Delivery Fees & Free Shipping Threshold'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'عملة المتجر' : 'Store Currency'}
              </label>
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-bold text-[#542719]"
              >
                <option value="EGP">EGP (Egyptian Pound / ج.م)</option>
                <option value="SAR">SAR (Saudi Riyal / ر.س)</option>
                <option value="AED">AED (UAE Dirham / د.إ)</option>
                <option value="USD">USD (US Dollar / $)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? `رسوم التوصيل (${form.currency})` : `Standard Doorstep Delivery Fee (${form.currency})`}
              </label>
              <input
                type="number"
                step="any"
                required
                min={0}
                value={form.deliveryFee}
                onChange={(e) => setForm({ ...form, deliveryFee: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? `الحد الأدنى للتوصيل المجاني (${form.currency})` : `Free Delivery Minimum Spend (${form.currency})`}
              </label>
              <input
                type="number"
                step="any"
                required
                min={0}
                value={form.freeDeliveryThreshold}
                onChange={(e) => setForm({ ...form, freeDeliveryThreshold: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-[#542719]"
              />
            </div>
          </div>
        </div>

        {/* 3. Corporate Bank Account Details */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F5E8D5] pb-3">
            <Building className="w-4 h-4 text-[#542719]" />
            <h3 className="font-serif font-bold text-base text-[#542719]">
              {language === 'ar' ? 'بيانات التحويل البنكي (IBAN)' : 'Bank Transfer Details (IBAN)'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'اسم البنك' : 'Bank Name'}
              </label>
              <input
                type="text"
                required
                value={form.bankDetails.bankName}
                onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'اسم صاحب الحساب' : 'Account Holder Name'}
              </label>
              <input
                type="text"
                required
                value={form.bankDetails.accountName}
                onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, accountName: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'رقم الآيبان (IBAN)' : 'IBAN Number'}
              </label>
              <input
                type="text"
                required
                value={form.bankDetails.iban}
                onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, iban: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-[#542719]"
              />
            </div>
          </div>
        </div>

        {/* 4. Top Announcement Bar Text */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F5E8D5] pb-3">
            <Bell className="w-4 h-4 text-[#F47AA6]" />
            <h3 className="font-serif font-bold text-base text-[#542719]">
              {language === 'ar' ? 'شريط الإعلانات العلوي (عربي / إنجليزي)' : 'Header Announcement Bar (Bilingual)'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'نص الإعلان (إنجليزي)' : 'Announcement (English)'}
              </label>
              <textarea
                rows={2}
                value={form.announcementEn}
                onChange={(e) => setForm({ ...form, announcementEn: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">شريط الإعلانات (عربي)</label>
              <textarea
                rows={2}
                value={form.announcementAr}
                onChange={(e) => setForm({ ...form, announcementAr: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>
          </div>
        </div>

        {saveError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700">
            {saveError}
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-7 py-3.5 bg-[#542719] hover:bg-[#733926] disabled:opacity-50 text-white font-bold rounded-2xl shadow-md transition-all active:scale-98"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-[#D9A441]" />}
            <span>
              {isSaving
                ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving Settings...')
                : isSaved
                ? (language === 'ar' ? 'تم حفظ الإعدادات بنجاح!' : 'Settings Saved Successfully!')
                : (language === 'ar' ? 'حفظ جميع الإعدادات' : 'Save All Settings')}
            </span>
          </button>
        </div>
      </form>

      <FirebaseSetupModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
      />
    </div>
  );
};
