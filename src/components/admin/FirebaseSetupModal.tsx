import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Database, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseSetupModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { language, isFirebaseConnected, isDbLoading, dbError, refreshCloudData } = useApp();
  const [syncResult, setSyncResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleResync = async () => {
    setSyncResult(null);
    const ok = await refreshCloudData();
    setSyncResult(
      ok
        ? (language === 'ar' ? 'تمت مزامنة جميع مجموعات البيانات بنجاح.' : 'All Firestore collections synced successfully.')
        : (language === 'ar' ? 'حدثت مشكلة أثناء المزامنة. راجع تفاصيل الخطأ.' : 'Sync completed with warnings. Check status above.')
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAD6BC] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFF7EA] text-[#D9A441] rounded-xl border border-[#EAD6BC]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#542719]">
                {language === 'ar' ? 'إعداد قاعدة البيانات السحابية (Firebase)' : 'Cloud Database Architecture (Firebase)'}
              </h3>
              <p className="text-xs text-[#733926]">
                {language === 'ar' ? 'معلومات التخزين الدائم والمزامنة الحية' : 'Persistent Storage & Cloud Deployment Status'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-[#542719]">
          <div
            className={`p-4 rounded-2xl border space-y-1.5 ${
              isFirebaseConnected && !dbError
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <p className={`font-bold flex items-center gap-1.5 text-sm ${isFirebaseConnected && !dbError ? 'text-emerald-900' : 'text-amber-900'}`}>
              {isFirebaseConnected && !dbError ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <span>
                {isDbLoading
                  ? (language === 'ar' ? 'جاري فحص ومزامنة Cloud Firestore...' : 'Checking Cloud Firestore Connection...')
                  : isFirebaseConnected && !dbError
                  ? (language === 'ar' ? 'قاعدة بيانات Cloud Firestore متصلة ونشطة' : 'Cloud Firestore Database Active & Connected')
                  : (language === 'ar' ? 'يوجد تنبيه في الاتصال بـ Cloud Firestore' : 'Cloud Firestore Sync Notice')}
              </span>
            </p>
            <p className={isFirebaseConnected && !dbError ? 'text-emerald-800' : 'text-amber-800'}>
              {dbError
                ? dbError
                : language === 'ar'
                ? 'المتجر مربوط بقاعدة بيانات Cloud Firestore السحابية لحفظ المنتجات، البوكسات، الطلبات، المخزون، وإعدادات المتجر.'
                : 'Your storefront is actively synchronized with persistent Google Cloud Firestore. Product catalog edits, orders, stock adjustments, and settings are permanently saved.'}
            </p>
            <div className="pt-2 border-t border-black/10 font-mono text-[11px] space-y-0.5">
              <p><span className="opacity-75">Project ID:</span> <strong>gen-lang-client-0369934782</strong></p>
              <p><span className="opacity-75">Database ID:</span> <strong>ai-studio-friendlytablegoo-0cc9c91b-601c-4e6a-af8d-9ec76b70f001</strong></p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#542719]">
              {language === 'ar' ? 'مجموعات البيانات الفعلية في Firestore:' : 'Active Firestore Collections:'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
              {['products', 'boxTemplates', 'orders', 'quotations', 'cateringRequests', 'coupons', 'inventory', 'settings', 'users'].map((col) => (
                <div key={col} className="p-2 bg-[#FFF7EA] rounded-lg border border-[#EAD6BC] text-[#542719] flex items-center gap-1.5">
                  <span className="text-[#D9A441]">●</span>
                  <span>{col}</span>
                </div>
              ))}
            </div>
          </div>

          {syncResult && (
            <div className="p-3 rounded-xl bg-[#FFF7EA] border border-[#EAD6BC] text-xs font-bold text-[#542719]">
              {syncResult}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={isDbLoading}
            onClick={handleResync}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#FFF7EA] hover:bg-[#F5E8D5] border border-[#EAD6BC] text-[#542719] text-xs font-bold rounded-xl disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#D9A441] ${isDbLoading ? 'animate-spin' : ''}`} />
            <span>{language === 'ar' ? 'إعادة المزامنة الآن' : 'Re-sync Firestore Now'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#542719] text-[#FFF7EA] text-xs font-bold rounded-xl hover:bg-[#733926]"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

