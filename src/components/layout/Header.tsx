import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  ShoppingBag,
  Search,
  User as UserIcon,
  Globe,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Building2,
  Heart,
} from 'lucide-react';
import { ProductCategory } from '../../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    activeView,
    setActiveView,
    selectedCategory,
    setSelectedCategory,
    cart,
    setIsCartDrawerOpen,
    setIsSearchModalOpen,
    setIsBulkModalOpen,
    setBulkModalTargetBox,
    storeSettings,
    user,
    wishlist,
    setIsWishlistDrawerOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (view: AppView, cat?: ProductCategory | 'all') => {
    setActiveView(view);
    if (cat !== undefined) {
      setSelectedCategory(cat);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { view: 'home' as AppView, label: t.nav.home },
    { view: 'shop' as AppView, cat: 'all' as const, label: t.nav.shopAll },
    { view: 'mini-sandwiches' as AppView, cat: 'mini-sandwiches' as const, label: t.nav.miniSandwiches },
    { view: 'finger-sandwiches' as AppView, cat: 'finger-sandwiches' as const, label: t.nav.fingerSandwiches },
    { view: 'mini-croissants' as AppView, cat: 'mini-croissants' as const, label: t.nav.miniCroissants },
    { view: 'mini-clubs' as AppView, cat: 'mini-clubs' as const, label: t.nav.miniClubs },
    { view: 'premium-sandwiches' as AppView, cat: 'premium-sandwiches' as const, label: t.nav.premiumSandwiches },
    { view: 'ready-made-boxes' as AppView, cat: 'ready-made-boxes' as const, label: t.nav.readyMadeBoxes },
    { view: 'custom-box' as AppView, label: t.nav.customBox, highlight: true },
    { view: 'group-boxes' as AppView, cat: 'group-boxes' as const, label: t.nav.groupBoxes },
    { view: 'bakery-croissants' as AppView, cat: 'bakery-croissants' as const, label: t.nav.bakeryCroissants },
    { view: 'cakes-desserts' as AppView, cat: 'cakes-desserts' as const, label: t.nav.cakesDesserts },
    { view: 'chocolates-gifts' as AppView, cat: 'chocolates-gifts' as const, label: t.nav.chocolatesGifts },
    { view: 'catering-events' as AppView, cat: 'catering-events' as const, label: t.nav.cateringEvents },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF7EA]/95 backdrop-blur-md border-b border-[#F5E8D5] shadow-xs">
      {/* Top Announcement Bar */}
      {showPromo && (
        <div className="bg-[#542719] text-[#FFF7EA] text-xs py-1.5 px-4 flex items-center justify-between">
          <div className="container mx-auto flex items-center justify-center gap-2 text-center text-[13px]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
            <span className="font-medium">
              {language === 'ar' ? storeSettings.announcementAr : storeSettings.announcementEn}
            </span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss banner"
            className="text-[#FFF7EA]/60 hover:text-[#FFF7EA] text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Brand & Action Zone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#542719] hover:bg-[#F5E8D5] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Official Friendly Table Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 text-start group py-1"
            >
              <img
                src="/logo.png"
                alt="Friendly Table - Good Food, Happy Moments"
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
              <div className="hidden sm:block">
                <span className="block font-serif text-lg font-bold text-[#542719] leading-tight tracking-tight">
                  {t.brandName}
                </span>
                <span className="block text-[11px] font-semibold text-[#D9A441] tracking-wider uppercase">
                  {t.categoriesSubtitle}
                </span>
              </div>
            </button>
          </div>

          {/* Center Search Input Trigger */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full flex items-center gap-2.5 px-4 py-2 bg-white border border-[#EAD6BC] rounded-full text-sm text-[#733926]/70 hover:border-[#D9A441] hover:shadow-xs transition-all text-start"
            >
              <Search className="w-4 h-4 text-[#D9A441]" />
              <span className="flex-1 truncate">{t.nav.searchPlaceholder}</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#FFF7EA] text-[#542719] border border-[#EAD6BC] rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons: Bulk Quotation, Language, Account, Cart, Admin shortcut */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bulk Quotation CTA button */}
            <button
              onClick={() => {
                setBulkModalTargetBox(language === 'ar' ? 'بوكسات توزيعات فردية' : 'Individual Distribution Boxes');
                setIsBulkModalOpen(true);
              }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D9A441] text-[#542719] hover:bg-[#FFF7EA] text-xs font-bold transition-all shadow-2xs"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{t.nav.bulkQuote}</span>
            </button>

            {/* Search icon on mobile */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="md:hidden p-2 text-[#542719] hover:bg-[#F5E8D5] rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#EAD6BC] hover:border-[#D9A441] bg-white text-xs font-semibold text-[#542719] transition-colors"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Customer Account / Sign In */}
            <button
              onClick={() => handleNavClick('account')}
              className={`p-2 rounded-full border transition-colors ${
                user
                  ? 'bg-[#F47AA6]/10 border-[#F47AA6] text-[#542719]'
                  : 'bg-white border-[#EAD6BC] text-[#542719] hover:border-[#D9A441]'
              }`}
              title={user ? user.name : t.nav.account}
            >
              <UserIcon className="w-4 h-4" />
            </button>

            {/* Wishlist Drawer Trigger */}
            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              className={`relative p-2 rounded-full border transition-colors ${
                wishlist.length > 0
                  ? 'bg-[#FDEBF2] border-[#F47AA6] text-[#F47AA6]'
                  : 'bg-white border-[#EAD6BC] text-[#542719] hover:border-[#F47AA6] hover:text-[#F47AA6]'
              }`}
              title={t.wishlist.title}
              aria-label={t.wishlist.title}
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-[#F47AA6]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -end-1.5 bg-[#542719] text-[#FFF7EA] text-[10px] font-bold px-1.5 min-w-4 h-4 flex items-center justify-center rounded-full tabular-nums shadow-2xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] shadow-xs transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D9A441]" />
              <span className="hidden sm:inline text-xs font-bold">{t.nav.cart}</span>
              {cartItemsCount > 0 && (
                <span className="bg-[#F47AA6] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeView === 'admin'
                  ? 'bg-[#D9A441] text-[#542719] shadow-xs'
                  : 'text-[#733926] hover:bg-[#F5E8D5] border border-[#EAD6BC] sm:border-transparent'
              }`}
              title={t.nav.adminDashboard}
              aria-label={t.nav.adminDashboard}
            >
              <ShieldCheck className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#542719]" />
              <span className="hidden sm:inline">{t.nav.adminDashboard}</span>
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation Strip (Desktop) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-[#F5E8D5] py-2 overflow-x-auto text-[13px] font-medium no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive =
                (item.view === 'shop' && activeView === 'shop' && selectedCategory === 'all') ||
                (item.cat && selectedCategory === item.cat && activeView === 'shop') ||
                activeView === item.view;

              if (item.highlight) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.view)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47AA6] hover:bg-[#E25B8D] text-white font-semibold text-xs shadow-xs transition-transform hover:scale-105 shrink-0"
                  >
                    <Sparkles className="w-3 h-3 text-[#FFF7EA]" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.cat ? 'shop' : item.view, item.cat)}
                  className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? 'bg-[#542719] text-[#FFF7EA] font-semibold'
                      : 'text-[#542719] hover:text-[#F47AA6] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs text-[#733926] shrink-0 ps-2">
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-[#F47AA6] transition-colors"
            >
              {t.nav.aboutUs}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#F47AA6] transition-colors"
            >
              {t.nav.contactUs}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-50 bg-black/40 backdrop-blur-xs flex justify-start">
          <div className="w-4/5 max-w-sm bg-[#FFF7EA] h-[calc(100vh-5rem)] overflow-y-auto p-5 shadow-2xl flex flex-col justify-between border-e border-[#EAD6BC]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAD6BC] pb-3">
                <span className="font-serif font-bold text-base text-[#542719]">
                  {t.brandName}
                </span>
                <span className="text-xs text-[#D9A441] font-semibold">
                  {t.tagline}
                </span>
              </div>

              {/* Mobile Custom Box CTA */}
              <button
                onClick={() => handleNavClick('custom-box')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F47AA6] text-white font-bold text-sm shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.nav.customBox}</span>
              </button>

              {/* Bulk Quotation CTA button mobile */}
              <button
                onClick={() => {
                  setBulkModalTargetBox(language === 'ar' ? 'بوكسات توزيعات فردية' : 'Individual Distribution Boxes');
                  setIsBulkModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-[#D9A441] text-[#542719] font-bold text-xs shadow-xs"
              >
                <Building2 className="w-4 h-4 text-[#D9A441]" />
                <span>{t.nav.bulkQuote} ({language === 'ar' ? '٥٠+ بوكس' : '50+ Boxes'})</span>
              </button>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1 pt-2 max-h-[45vh] overflow-y-auto pr-1">
                {navItems
                  .filter((item) => !item.highlight)
                  .map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.cat ? 'shop' : item.view, item.cat)}
                      className="text-start py-2 px-3 rounded-lg text-sm font-medium text-[#542719] hover:bg-[#F5E8D5] transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
              </div>

              <div className="border-t border-[#EAD6BC] pt-3 flex flex-col space-y-1.5 text-sm text-[#733926]">
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-start py-1.5 px-3 rounded-lg hover:bg-[#F5E8D5]"
                >
                  {t.nav.aboutUs}
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-start py-1.5 px-3 rounded-lg hover:bg-[#F5E8D5]"
                >
                  {t.nav.contactUs}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWishlistDrawerOpen(true);
                  }}
                  className="flex items-center justify-between text-start py-1.5 px-3 rounded-lg hover:bg-[#F5E8D5]"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#F47AA6]" />
                    <span>{t.wishlist.title}</span>
                  </span>
                  {wishlist.length > 0 && (
                    <span className="bg-[#F47AA6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('account')}
                  className="text-start py-1.5 px-3 rounded-lg hover:bg-[#F5E8D5]"
                >
                  {t.nav.account}
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-start py-1.5 px-3 rounded-lg text-[#D9A441] font-semibold hover:bg-[#F5E8D5]"
                >
                  {t.nav.adminDashboard}
                </button>
              </div>
            </div>

            {/* Bottom details */}
            <div className="pt-6 border-t border-[#EAD6BC] text-xs text-[#733926]/80 flex items-center justify-between">
              <span dir="ltr">{storeSettings.supportPhone}</span>
              <span className="text-[#D9A441] font-bold">{t.brandName}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
