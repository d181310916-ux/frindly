import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, Trash2, Edit2, X } from 'lucide-react';
import { Coupon } from '../../types';

export const AdminPromotions: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, toggleCoupon, deleteCoupon, formatPrice, storeSettings, language, t } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [promoBanner, setPromoBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const defaultCouponForm: Omit<Coupon, 'id'> = {
    code: '',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 100,
    expiresAt: '2027-12-31',
    isActive: true,
    usageCount: 0,
  };

  const [couponForm, setCouponForm] = useState<Omit<Coupon, 'id'>>(defaultCouponForm);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setCouponForm(defaultCouponForm);
    setIsAdding(true);
  };

  const openEditModal = (c: Coupon) => {
    setIsAdding(false);
    setEditingCoupon(c);
    setCouponForm({
      code: c.code,
      discountType: c.discountType,
      discountValue: c.discountValue,
      minOrderValue: c.minOrderValue,
      expiresAt: c.expiresAt,
      isActive: c.isActive,
      usageCount: c.usageCount,
    });
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingCoupon(null);
  };

  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromoBanner(null);
    if (!couponForm.code.trim()) return;
    setIsSubmitting(true);
    try {
      if (editingCoupon) {
        const updated: Coupon = {
          ...editingCoupon,
          ...couponForm,
          code: couponForm.code.trim().toUpperCase(),
        };
        const success = await updateCoupon(updated);
        if (success) {
          closeModal();
          setPromoBanner({
            type: 'success',
            text: language === 'ar' ? 'تم تحديث كود الخصم في قاعدة البيانات بنجاح.' : 'Coupon updated in Firestore.',
          });
          setTimeout(() => setPromoBanner(null), 3000);
        } else {
          setPromoBanner({
            type: 'error',
            text: language === 'ar' ? 'تعذر تحديث كود الخصم في قاعدة البيانات.' : 'Failed to update coupon in database.',
          });
        }
      } else {
        const success = await addCoupon({
          ...couponForm,
          code: couponForm.code.trim().toUpperCase(),
        });
        if (success) {
          closeModal();
          setCouponForm(defaultCouponForm);
          setPromoBanner({
            type: 'success',
            text: language === 'ar' ? 'تم حفظ كود الخصم في قاعدة البيانات.' : 'Coupon saved to Firestore.',
          });
          setTimeout(() => setPromoBanner(null), 3000);
        } else {
          setPromoBanner({
            type: 'error',
            text: language === 'ar' ? 'تعذر حفظ كود الخصم في قاعدة البيانات.' : 'Failed to save coupon code to database.',
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleCoupon = async (id: string) => {
    setPromoBanner(null);
    const ok = await toggleCoupon(id);
    if (!ok) {
      setPromoBanner({
        type: 'error',
        text: language === 'ar' ? 'تعذر تحديث حالة الكوبون.' : 'Failed to update coupon status.',
      });
    }
  };

  const handleConfirmDeleteCoupon = async (id: string) => {
    setPromoBanner(null);
    const ok = await deleteCoupon(id);
    setConfirmDeleteId(null);
    if (ok) {
      setPromoBanner({
        type: 'success',
        text: language === 'ar' ? 'تم حذف كود الخصم.' : 'Coupon deleted.',
      });
      setTimeout(() => setPromoBanner(null), 3000);
    } else {
      setPromoBanner({
        type: 'error',
        text: language === 'ar' ? 'تعذر حذف الكوبون.' : 'Failed to delete coupon.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E8D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.promotions}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'إنشاء أكواد الخصم وتحديد نسب التخفيض والحد الأدنى للطلب' : 'Create promo codes, manage percentage discounts, and configure seasonal offers.'}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#542719] hover:bg-[#733926] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#D9A441]" />
          <span>{language === 'ar' ? 'إنشاء كود خصم' : 'Create Coupon Code'}</span>
        </button>
      </div>

      {promoBanner && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between ${
            promoBanner.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <span>{promoBanner.text}</span>
          <button type="button" onClick={() => setPromoBanner(null)} className="px-1.5">✕</button>
        </div>
      )}

      {(isAdding || editingCoupon) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveCoupon}
            className="w-full max-w-xl bg-white p-6 rounded-3xl border-2 border-[#D9A441] shadow-2xl space-y-4 text-xs my-auto"
          >
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <h3 className="font-serif font-bold text-base text-[#542719]">
                {editingCoupon
                  ? (language === 'ar' ? `تعديل كود الخصم: ${editingCoupon.code}` : `Edit Coupon: ${editingCoupon.code}`)
                  : (language === 'ar' ? 'إنشاء كود خصم جديد' : 'New Promotional Coupon')}
              </h3>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'كود الخصم (مثال: WELCOME10) *' : 'Coupon Code (e.g. SUMMER25) *'}
                </label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  placeholder="WELCOME10"
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl uppercase font-mono font-bold text-[#542719]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'نوع الخصم' : 'Discount Type'}
                </label>
                <select
                  value={couponForm.discountType}
                  onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value as Coupon['discountType'] })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                >
                  <option value="percentage">{language === 'ar' ? 'نسبة مئوية (%)' : 'Percentage Discount (%)'}</option>
                  <option value="fixed">{language === 'ar' ? `مبلغ ثابت (${storeSettings.currency})` : `Fixed Amount (${storeSettings.currency})`}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'قيمة الخصم *' : 'Discount Value *'}
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  min={0.01}
                  value={couponForm.discountValue}
                  onChange={(e) => setCouponForm({ ...couponForm, discountValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-[#542719]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? `الحد الأدنى للطلب (${storeSettings.currency})` : `Minimum Order Spend (${storeSettings.currency})`}
                </label>
                <input
                  type="number"
                  step="any"
                  min={0}
                  value={couponForm.minOrderValue}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl font-mono text-[#542719]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'تاريخ الانتهاء' : 'Expiration Date'}
                </label>
                <input
                  type="date"
                  required
                  value={couponForm.expiresAt}
                  onChange={(e) => setCouponForm({ ...couponForm, expiresAt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#542719] disabled:opacity-50 text-white font-bold rounded-xl"
              >
                {isSubmitting
                  ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...')
                  : editingCoupon
                  ? (language === 'ar' ? 'حفظ التعديلات' : 'Update Coupon')
                  : (language === 'ar' ? 'حفظ الكوبون' : 'Save Coupon')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-[#FFF7EA] border-b border-[#EAD6BC] text-[#733926] font-bold uppercase">
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'الكود' : 'Coupon Code'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'الخصم' : 'Discount'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الحد الأدنى' : 'Min Spend'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الصلاحية' : 'Expires'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الاستخدام' : 'Usage Count'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'إجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E8D5]">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-[#FFF7EA]/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sm text-[#542719] flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#D9A441]" />
                    <span>{c.code}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#F47AA6]">
                    {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `${formatPrice(c.discountValue)} OFF`}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[#733926]">
                    {formatPrice(c.minOrderValue)}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-500 font-mono">
                    {c.expiresAt}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-[#542719]">
                    {c.usageCount} {language === 'ar' ? 'مرة' : 'times'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleCoupon(c.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                        c.isActive
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {c.isActive ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'معطل' : 'Inactive')}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-end">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(c)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA] font-bold text-[11px]"
                        title={language === 'ar' ? 'تعديل الكوبون' : 'Edit Coupon'}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                      </button>

                      {confirmDeleteId === c.id ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleConfirmDeleteCoupon(c.id)}
                            className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold"
                          >
                            {language === 'ar' ? 'حذف' : 'Delete'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(c.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg border border-[#EAD6BC]"
                          title={language === 'ar' ? 'حذف الكوبون' : 'Delete Coupon'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
