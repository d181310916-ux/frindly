import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FileText,
  Users,
  UtensilsCrossed,
  Tag,
  BarChart3,
  Settings,
  ShieldCheck,
  ArrowLeft,
  Lock,
  LogOut,
  Globe,
  Database,
  Box,
  Building2,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { AdminProducts } from './AdminProducts';
import { AdminBoxManager } from './AdminBoxManager';
import { AdminBulkOrders } from './AdminBulkOrders';
import { AdminInventory } from './AdminInventory';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminCatering } from './AdminCatering';
import { AdminPromotions } from './AdminPromotions';
import { AdminReports } from './AdminReports';
import { AdminSettings } from './AdminSettings';
import { FirebaseSetupModal } from './FirebaseSetupModal';

export type AdminTab =
  | 'overview'
  | 'products'
  | 'boxManager'
  | 'bulkOrders'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'catering'
  | 'promotions'
  | 'reports'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    setIsAdmin,
    language,
    setLanguage,
    t,
    setActiveView,
    orders,
    cateringRequests,
    products,
    bulkQuotations,
    boxTemplates,
    isFirebaseConnected,
    isDbLoading,
    dbError,
    refreshCloudData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode.trim() === 'admin' || adminPasscode.trim() === 'admin123' || adminPasscode.trim() === '1234') {
      setIsAdmin(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // If admin is not authenticated, show secure login barrier
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#FFF7EA]">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#EAD6BC] shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF7EA] border border-[#EAD6BC] flex items-center justify-center text-[#D9A441]">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#542719]">
              {t.admin.title}
            </h2>
            <p className="text-xs text-[#733926]">
              {language === 'ar'
                ? 'يرجى إدخال رمز المرور الإداري للوصول إلى لوحة العمليات'
                : 'Please enter authorized administrative credentials to access operations.'}
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#542719]">
                {language === 'ar' ? 'كلمة مرور الإدارة' : 'Admin Passcode'}
              </label>
              <input
                type="password"
                required
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل رمز المرور (مثال: admin123)' : 'Enter admin passcode (e.g. admin123)'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 font-semibold">
                {language === 'ar' ? 'رمز المرور غير صحيح. جرب: admin123' : 'Incorrect passcode. Try: admin123'}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              {language === 'ar' ? 'فتح لوحة التحكم' : 'Unlock Administration Dashboard'}
            </button>

            <button
              type="button"
              onClick={() => {
                setAdminPasscode('admin123');
                setAuthError(false);
                setIsAdmin(true);
              }}
              className="w-full py-2 bg-[#FFF7EA] hover:bg-[#F5E8D5] text-[#542719] text-xs font-semibold rounded-xl border border-[#EAD6BC] transition-colors"
            >
              {language === 'ar' ? '⚡ دخول سريع تجريبي (admin123)' : '⚡ 1-Click Demo Admin Sign In (admin123)'}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => setActiveView('home')}
              className="text-xs text-[#733926] hover:text-[#F47AA6] font-semibold"
            >
              {language === 'ar' ? '← العودة إلى واجهة المتجر' : '← Return to Customer Storefront'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview' as AdminTab, label: t.admin.overview, icon: LayoutDashboard },
    { id: 'products' as AdminTab, label: t.admin.products, icon: ShoppingBag, count: products.length },
    { id: 'boxManager' as AdminTab, label: t.admin.boxManager, icon: Box, count: boxTemplates.length },
    { id: 'bulkOrders' as AdminTab, label: t.admin.bulkOrders, icon: Building2, count: bulkQuotations.length },
    { id: 'orders' as AdminTab, label: t.admin.orders, icon: FileText, count: orders.length },
    { id: 'catering' as AdminTab, label: t.admin.catering, icon: UtensilsCrossed, count: cateringRequests.length },
    { id: 'inventory' as AdminTab, label: t.admin.inventory, icon: Package },
    { id: 'customers' as AdminTab, label: t.admin.customers, icon: Users },
    { id: 'promotions' as AdminTab, label: t.admin.promotions, icon: Tag },
    { id: 'reports' as AdminTab, label: t.admin.reports, icon: BarChart3 },
    { id: 'settings' as AdminTab, label: t.admin.settings, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7EA] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Operations Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-[#EAD6BC] shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Friendly Table"
              className="h-12 w-auto object-contain"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-xl font-bold text-[#542719]">
                  {t.admin.title}
                </h1>
                {isDbLoading ? (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {language === 'ar' ? 'جاري المزامنة...' : 'SYNCING...'}
                  </span>
                ) : isFirebaseConnected ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {language === 'ar' ? 'متصل بالسحابة' : 'CLOUD LIVE'}
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {language === 'ar' ? 'غير متصل بالسحابة' : 'OFFLINE / RETRY'}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#733926]">{t.admin.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => refreshCloudData()}
              disabled={isDbLoading}
              className="p-2 text-[#542719] hover:bg-[#FFF7EA] border border-[#EAD6BC] rounded-xl text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
              title={language === 'ar' ? 'تحديث البيانات من السحابة' : 'Sync with Cloud'}
            >
              <RefreshCw className={`w-4 h-4 text-[#D9A441] ${isDbLoading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{language === 'ar' ? 'تحديث' : 'Sync'}</span>
            </button>

            <button
              onClick={() => setIsFirebaseModalOpen(true)}
              className="p-2 text-[#542719] hover:bg-[#FFF7EA] border border-[#EAD6BC] rounded-xl text-xs font-semibold flex items-center gap-1.5"
              title={t.admin.firebaseModal}
            >
              <Database className="w-4 h-4 text-[#D9A441]" />
              <span className="hidden sm:inline">{language === 'ar' ? 'قاعدة البيانات' : 'Database'}</span>
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 text-[#542719] hover:bg-[#FFF7EA] border border-[#EAD6BC] rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <Globe className="w-4 h-4 text-[#D9A441]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <button
              onClick={() => setIsAdmin(false)}
              className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl text-xs font-semibold flex items-center gap-1"
              title={language === 'ar' ? 'قفل لوحة التحكم' : 'Lock Admin'}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">{language === 'ar' ? 'خروج' : 'Lock'}</span>
            </button>

            <button
              onClick={() => setActiveView('home')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#542719] hover:bg-[#733926] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'واجهة المتجر' : 'Storefront'}</span>
            </button>
          </div>
        </div>

        {dbError && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{dbError}</span>
            </div>
            <button
              onClick={() => refreshCloudData()}
              className="px-3 py-1.5 rounded-lg bg-[#542719] text-white font-bold text-[11px] shrink-0"
            >
              {language === 'ar' ? 'إعادة المحاولة' : 'Retry Sync'}
            </button>
          </div>
        )}

        {/* Admin Navigation Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 p-1.5 bg-white rounded-2xl border border-[#EAD6BC] no-scrollbar text-xs font-bold">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#542719] text-[#FFF7EA] shadow-xs'
                    : 'text-[#733926] hover:bg-[#FFF7EA] hover:text-[#542719]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D9A441]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <div className="pt-2">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'boxManager' && <AdminBoxManager />}
          {activeTab === 'bulkOrders' && <AdminBulkOrders />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'catering' && <AdminCatering />}
          {activeTab === 'inventory' && <AdminInventory />}
          {activeTab === 'customers' && <AdminCustomers />}
          {activeTab === 'promotions' && <AdminPromotions />}
          {activeTab === 'reports' && <AdminReports />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>

      <FirebaseSetupModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
      />
    </div>
  );
};
