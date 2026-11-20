import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Package, Check } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, updateStock, packagingSupplies, updatePackagingStock, language, t } = useApp();
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAdjustProductStock = async (id: string, delta: number) => {
    setSyncFeedback(null);
    const ok = await updateStock(id, delta);
    if (ok) {
      setSyncFeedback({
        type: 'success',
        text: language === 'ar' ? 'تم تحديث مخزون المنتج في السحابة.' : 'Product stock updated in Firestore.',
      });
      setTimeout(() => setSyncFeedback(null), 2000);
    } else {
      setSyncFeedback({
        type: 'error',
        text: language === 'ar' ? 'تعذر تحديث مخزون المنتج.' : 'Failed to update product stock.',
      });
    }
  };

  const handleAdjustPackagingStock = async (id: string, delta: number) => {
    setSyncFeedback(null);
    const ok = await updatePackagingStock(id, delta);
    if (ok) {
      setSyncFeedback({
        type: 'success',
        text: language === 'ar' ? 'تم تحديث مخزون التغليف في السحابة.' : 'Packaging supply stock saved to Firestore.',
      });
      setTimeout(() => setSyncFeedback(null), 2000);
    } else {
      setSyncFeedback({
        type: 'error',
        text: language === 'ar' ? 'تعذر حفظ مخزون التغليف.' : 'Failed to update packaging stock.',
      });
    }
  };

  const lowStockItems = products.filter((p) => p.stock <= 15);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#F5E8D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.inventory}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'متابعة كميات المنتجات ومخزون علب التغليف والشرائط' : 'Track stock levels, replenish inventory, and manage packaging materials.'}
          </p>
        </div>

        {syncFeedback && (
          <div
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
              syncFeedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {syncFeedback.type === 'success' && <Check className="w-3.5 h-3.5" />}
            <span>{syncFeedback.text}</span>
          </div>
        )}
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-amber-900">
                {language === 'ar' ? 'تنبيه: أصناف قاربت على النفاد' : 'Attention: Low Stock Alert'}
              </p>
              <p className="text-amber-800 mt-0.5">
                {language === 'ar'
                  ? `${lowStockItems.length} منتجات وصلت إلى ١٥ قطعة أو أقل.`
                  : `${lowStockItems.length} delicacies have reached 15 units or fewer.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 1. Products Stock Table */}
      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs overflow-hidden space-y-4 p-6">
        <h3 className="font-serif font-bold text-base text-[#542719]">
          {language === 'ar' ? 'مخزون الساندوتشات والبوكسات والحلويات' : 'Delicacies & Boxes Stock'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-[#EAD6BC] text-[#733926] font-bold uppercase">
                <th className="py-2.5 text-start">{language === 'ar' ? 'المنتج' : 'Product'}</th>
                <th className="py-2.5 text-center">{language === 'ar' ? 'المخزون الحالي' : 'Current Stock'}</th>
                <th className="py-2.5 text-center">{language === 'ar' ? 'حد التنبيه' : 'Threshold'}</th>
                <th className="py-2.5 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-2.5 text-end">{language === 'ar' ? 'تعديل سريع' : 'Quick Adjust'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E8D5]">
              {products.map((p) => {
                const isLow = p.stock <= 15;
                return (
                  <tr key={p.id} className="hover:bg-[#FFF7EA]/30">
                    <td className="py-3 font-semibold text-[#542719]">
                      {language === 'ar' ? p.name.ar : p.name.en}
                    </td>
                    <td className="py-3 text-center font-mono font-bold text-sm">
                      <span className={isLow ? 'text-red-600' : 'text-[#542719]'}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-3 text-center text-slate-400 font-mono">15</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock === 0
                          ? 'bg-red-50 text-red-700'
                          : isLow
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {p.stock === 0
                          ? (language === 'ar' ? 'نفد المخزون' : 'Out of Stock')
                          : isLow
                          ? (language === 'ar' ? 'مخزون منخفض' : 'Low Stock')
                          : (language === 'ar' ? 'متوفر بكثرة' : 'Optimal')}
                      </span>
                    </td>
                    <td className="py-3 text-end">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAdjustProductStock(p.id, -5)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-[#542719]"
                        >
                          -5
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustProductStock(p.id, -1)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-[#542719]"
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustProductStock(p.id, 1)}
                          className="px-2 py-1 bg-[#542719] hover:bg-[#733926] rounded text-[11px] font-bold text-white"
                        >
                          +1
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustProductStock(p.id, 10)}
                          className="px-2 py-1 bg-[#D9A441] hover:bg-[#C4902F] rounded text-[11px] font-bold text-[#542719]"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Packaging & Supplies Tracker */}
      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-[#542719]">
          {language === 'ar' ? 'مستلزمات التغليف والعلب والشرائط الفاخرة' : 'Signature Packaging & Ribbon Supplies'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packagingSupplies.map((pkg) => {
            const isLowPkg = pkg.stock <= pkg.minThreshold;
            return (
              <div key={pkg.id} className="p-4 rounded-2xl border border-[#EAD6BC] bg-[#FFF7EA]/40 space-y-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[#542719]">
                    {language === 'ar' && pkg.nameAr ? pkg.nameAr : pkg.name}
                  </span>
                  <Package className="w-4 h-4 text-[#D9A441] shrink-0" />
                </div>
                <div className="flex items-baseline justify-between font-mono">
                  <span className={`text-xl font-bold ${isLowPkg ? 'text-red-600' : 'text-[#542719]'}`}>
                    {pkg.stock} {language === 'ar' ? 'قطعة' : 'units'}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {language === 'ar' ? `الحد الأدنى: ${pkg.minThreshold}` : `Min: ${pkg.minThreshold}`}
                  </span>
                </div>
                <div className="flex items-center gap-1 pt-1 border-t border-[#EAD6BC]">
                  <button
                    type="button"
                    onClick={() => handleAdjustPackagingStock(pkg.id, -10)}
                    className="flex-1 py-1 bg-white border border-[#EAD6BC] hover:bg-slate-50 rounded-md font-bold text-[11px] text-[#542719]"
                  >
                    -10
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdjustPackagingStock(pkg.id, 25)}
                    className="flex-1 py-1 bg-[#542719] hover:bg-[#733926] text-white rounded-md font-bold text-[11px]"
                  >
                    +25
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

