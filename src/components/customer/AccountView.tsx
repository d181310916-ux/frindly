import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User as UserIcon,
  Package,
  MapPin,
  Clock,
  RotateCcw,
  LogOut,
  Plus,
  Printer,
  ChevronRight,
  ShieldCheck,
  Check,
  Heart,
  ShoppingBag,
  Trash2,
  Eye,
} from 'lucide-react';
import { Order, Product } from '../../types';
import { FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

export const AccountView: React.FC = () => {
  const {
    user,
    loginCustomer,
    registerCustomer,
    logoutCustomer,
    updateUserProfile,
    orders,
    addToCart,
    setOrderToTrack,
    setSelectedOrderForInvoice,
    setActiveView,
    formatPrice,
    language,
    t,
    wishlist,
    products,
    removeFromWishlist,
    clearWishlist,
    setSelectedProductForModal,
  } = useApp();

  // Auth tabs: Login vs Register
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('salma.m@example.com');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Account Tabs: Orders vs Wishlist vs Addresses
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses'>('orders');
  const wishlistProducts: Product[] = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // Address modal form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Cairo');
  const [newAddrText, setNewAddrText] = useState('');

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [addressFeedback, setAddressFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!loginEmail.trim()) return;
    setAuthLoading(true);
    try {
      const ok = await loginCustomer(loginEmail);
      if (!ok) setAuthError('Failed to sign in. Please verify your email.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) return;
    setAuthLoading(true);
    try {
      const ok = await registerCustomer(regName, regEmail, regPhone);
      if (!ok) setAuthError('Failed to create account. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart({
        productId: item.productId,
        product: item.product,
        customBox: item.customBox,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        specialInstructions: item.specialInstructions,
      });
    });
    setActiveView('cart');
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newAddrText.trim()) return;
    setAddressFeedback(null);
    const newAddress = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel || (language === 'ar' ? 'عنوان إضافي' : 'Additional Address'),
      city: newAddrCity,
      address: newAddrText,
    };
    try {
      const success = await updateUserProfile({
        savedAddresses: [...user.savedAddresses, newAddress],
      });
      if (success) {
        setIsAddingAddress(false);
        setNewAddrText('');
        setNewAddrLabel('');
        setAddressFeedback({
          type: 'success',
          text: language === 'ar' ? 'تم حفظ العنوان في حسابك بنجاح.' : 'Address saved to your account.',
        });
        setTimeout(() => setAddressFeedback(null), 3000);
      } else {
        setAddressFeedback({
          type: 'error',
          text: language === 'ar' ? 'تعذر حفظ العنوان. يرجى المحاولة مرة أخرى.' : 'Failed to save address.',
        });
      }
    } catch {
      setAddressFeedback({
        type: 'error',
        text: language === 'ar' ? 'حدث خطأ أثناء الاتصال بقاعدة البيانات.' : 'Database error while saving address.',
      });
    }
  };

  // If user is not logged in: Show Login / Register View
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-3xl border border-[#EAD6BC] shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF7EA] border border-[#EAD6BC] flex items-center justify-center text-[#D9A441]">
              <UserIcon className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#542719]">
              {authMode === 'login' ? t.customer.loginTitle : t.customer.registerTitle}
            </h2>
            <p className="text-xs text-[#733926]">
              {language === 'ar'
                ? 'تابع طلباتك السابقة واحفظ عناوينك المفضلة بسهولة'
                : 'Track previous orders, save favorite delivery addresses, and enjoy seamless reordering.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-[#FFF7EA] rounded-xl border border-[#EAD6BC] text-xs font-bold">
            <button
              onClick={() => setAuthMode('login')}
              className={`py-2 rounded-lg transition-colors ${
                authMode === 'login' ? 'bg-[#542719] text-white' : 'text-[#733926]'
              }`}
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`py-2 rounded-lg transition-colors ${
                authMode === 'register' ? 'bg-[#542719] text-white' : 'text-[#733926]'
              }`}
            >
              {language === 'ar' ? 'حساب جديد' : 'New Account'}
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#542719]">Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
              {authError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                  {authError}
                </div>
              )}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-[#542719] hover:bg-[#733926] disabled:opacity-50 text-[#FFF7EA] text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                {authLoading ? (language === 'ar' ? 'جاري الدخول...' : 'Signing in...') : t.customer.loginTitle}
              </button>
              <div className="p-3 bg-[#FFF7EA] rounded-xl border border-[#EAD6BC] text-[11px] text-[#733926]">
                💡 {language === 'ar' ? 'حساب تجريبي سريع: يمكنك تسجيل الدخول بالبريد الافتراضي salma.m@example.com' : 'Demo quick sign in: default demo account salma.m@example.com is pre-filled.'}
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#542719]">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#542719]">Email</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#542719]">
                  {language === 'ar' ? 'رقم الجوال' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+2010xxxxxxxx"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs sm:text-sm text-[#542719] font-mono"
                />
              </div>
              {authError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                  {authError}
                </div>
              )}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-[#542719] hover:bg-[#733926] disabled:opacity-50 text-[#FFF7EA] text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                {authLoading ? (language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...') : t.customer.registerTitle}
              </button>
            </form>
          )}

          <p className="text-center text-[11px] text-slate-500">
            {t.customer.guestCheckoutNotice}
          </p>
        </div>
      </div>
    );
  }

  // User is logged in: Dashboard view
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#FFF7EA] border border-[#EAD6BC] flex items-center justify-center text-[#D9A441] font-bold text-lg font-serif">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#542719]">
              {t.customer.welcomeBack} {user.name}
            </h1>
            <p className="text-xs text-[#733926] font-mono mt-0.5">
              {user.email} · {user.phone}
            </p>
          </div>
        </div>

        <button
          onClick={logoutCustomer}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t.customer.logout}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#EAD6BC] pb-3 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'orders'
              ? 'bg-[#542719] text-[#FFF7EA]'
              : 'text-[#733926] hover:bg-[#FFF7EA]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{t.customer.ordersHistory}</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded-full bg-white/20 tabular-nums">
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'wishlist'
              ? 'bg-[#542719] text-[#FFF7EA]'
              : 'text-[#733926] hover:bg-[#FFF7EA]'
          }`}
        >
          <Heart className={`w-4 h-4 ${activeTab === 'wishlist' ? 'text-[#F47AA6] fill-[#F47AA6]' : 'text-[#F47AA6]'}`} />
          <span>{t.wishlist.title}</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded-full bg-[#F47AA6]/20 tabular-nums">
            {wishlistProducts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'addresses'
              ? 'bg-[#542719] text-[#FFF7EA]'
              : 'text-[#733926] hover:bg-[#FFF7EA]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{t.customer.savedAddresses}</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-[#EAD6BC] text-[#733926] text-xs">
              <p>{t.customer.noOrders}</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAD6BC] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F5E8D5] gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#542719]">
                        #{order.id}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FFF7EA] text-[#D9A441] border border-[#EAD6BC] uppercase">
                        {t.admin.status[order.status]}
                      </span>
                    </div>
                    <p className="text-xs text-[#733926] mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()} · {order.deliveryTimeSlot}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setOrderToTrack(order);
                        setActiveView('track-order');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#542719] text-[#FFF7EA] text-xs font-bold hover:bg-[#733926]"
                    >
                      {t.customer.trackStatus}
                    </button>
                    <button
                      onClick={() => setSelectedOrderForInvoice(order)}
                      className="p-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA]"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FDEBF2] text-[#F47AA6] text-xs font-bold hover:bg-[#FDEBF2]/80"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.customer.reorder}</span>
                    </button>
                  </div>
                </div>

                {/* Items summary */}
                <div className="text-xs space-y-1">
                  {order.items.map((line, idx) => (
                    <div key={idx} className="flex justify-between text-[#733926]">
                      <span>
                        {line.quantity}x {line.product
                          ? language === 'ar'
                            ? line.product.name.ar
                            : line.product.name.en
                          : line.customBox
                          ? `✨ Custom Box (${language === 'ar' ? line.customBox.boxSizeName.ar : line.customBox.boxSizeName.en})`
                          : 'Item'}
                      </span>
                      <span className="font-mono">{formatPrice(line.totalPrice)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-sm text-[#542719] pt-2 border-t border-[#F5E8D5]">
                    <span>{t.customer.totalAmount}:</span>
                    <span className="font-mono text-[#D9A441]">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Saved Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif font-bold text-lg text-[#542719]">
              {t.wishlist.title} ({wishlistProducts.length})
            </h3>
            {wishlistProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    wishlistProducts
                      .filter((p) => p.isAvailable && p.stock > 0)
                      .forEach((p) =>
                        addToCart({
                          productId: p.id,
                          product: p,
                          quantity: 1,
                          unitPrice: p.price,
                          selectedBread: p.breadOptions ? p.breadOptions[0] : undefined,
                        })
                      );
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#542719] text-[#FFF7EA] text-xs font-bold hover:bg-[#733926]"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{t.wishlist.addAllToCart}</span>
                </button>
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="px-3 py-2 rounded-xl border border-[#EAD6BC] bg-white text-xs font-bold text-[#733926] hover:text-red-600 hover:border-red-200"
                >
                  {t.wishlist.clearWishlist}
                </button>
              </div>
            )}
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-[#EAD6BC] space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FDEBF2] flex items-center justify-center text-[#F47AA6]">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#542719]">{t.wishlist.emptyTitle}</h4>
              <p className="text-xs text-[#733926] max-w-sm mx-auto">{t.wishlist.emptyDesc}</p>
              <button
                type="button"
                onClick={() => setActiveView('shop')}
                className="px-4 py-2 rounded-xl bg-[#542719] text-[#FFF7EA] text-xs font-bold hover:bg-[#733926]"
              >
                {t.wishlist.browseMenu}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistProducts.map((product) => {
                const isOutOfStock = !product.isAvailable || product.stock <= 0;
                return (
                  <div
                    key={product.id}
                    className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-[#EAD6BC] shadow-xs"
                  >
                    <img
                      src={product.image}
                      alt={language === 'ar' ? product.name.ar : product.name.en}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#F5E8D5]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FRIENDLY_TABLE_PHOTOS.assortedSandwiches;
                      }}
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-[#542719] line-clamp-1">
                          {language === 'ar' ? product.name.ar : product.name.en}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded-md shrink-0"
                          title={t.wishlist.removeFromWishlist}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-[#D9A441]">
                        {t.categories[product.category] || product.category}
                      </p>
                      <div className="flex items-center justify-between pt-1.5 border-t border-[#F5E8D5]">
                        <span className="font-mono text-sm font-bold text-[#542719] tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedProductForModal(product)}
                            className="p-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA]"
                            title={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={() =>
                              addToCart({
                                productId: product.id,
                                product,
                                quantity: 1,
                                unitPrice: product.price,
                                selectedBread: product.breadOptions ? product.breadOptions[0] : undefined,
                              })
                            }
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold ${
                              isOutOfStock
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-[#542719] text-[#FFF7EA] hover:bg-[#733926]'
                            }`}
                          >
                            <ShoppingBag className="w-3 h-3 text-[#D9A441]" />
                            <span>{isOutOfStock ? t.sections.soldOut : t.sections.addToCart}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-lg text-[#542719]">
              {t.customer.savedAddresses}
            </h3>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#542719] text-[#FFF7EA] text-xs font-bold hover:bg-[#733926]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}</span>
            </button>
          </div>

          {addressFeedback && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold border ${
                addressFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {addressFeedback.text}
            </div>
          )}

          {isAddingAddress && (
            <form onSubmit={handleSaveAddress} className="bg-white p-5 rounded-2xl border-2 border-[#F47AA6] space-y-4">
              <h4 className="font-bold text-xs text-[#542719]">
                {language === 'ar' ? 'بيانات العنوان الجديد' : 'New Address Details'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'التسمية (المنزل، المكتب...)' : 'Label (e.g. Home, Office, Villa)'}
                  value={newAddrLabel}
                  onChange={(e) => setNewAddrLabel(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'المدينة (مثال: القاهرة)' : 'City (e.g. Cairo)'}
                  value={newAddrCity}
                  onChange={(e) => setNewAddrCity(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-lg text-xs"
                />
              </div>
              <textarea
                required
                rows={2}
                placeholder="Full Street, District, Landmark"
                value={newAddrText}
                onChange={(e) => setNewAddrText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-lg text-xs"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#542719] text-white text-xs font-bold rounded-lg"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white p-5 rounded-2xl border border-[#EAD6BC] shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D9A441]" />
                  <span className="font-bold text-sm text-[#542719]">{addr.label}</span>
                </div>
                <p className="text-[#733926]">{addr.address}</p>
                <p className="font-semibold text-slate-500">{addr.city}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
