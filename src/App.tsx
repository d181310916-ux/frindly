import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryHighlights } from './components/home/CategoryHighlights';
import { SpecialOffers } from './components/home/SpecialOffers';
import { Bestsellers } from './components/home/Bestsellers';
import { CateringBanner } from './components/home/CateringBanner';
import { ReviewsSection } from './components/home/ReviewsSection';
import { ShopView } from './components/products/ShopView';
import { CustomBoxBuilder } from './components/products/CustomBoxBuilder';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutView } from './components/cart/CheckoutView';
import { OrderConfirmation } from './components/cart/OrderConfirmation';
import { AccountView } from './components/customer/AccountView';
import { OrderTrackingView } from './components/customer/OrderTrackingView';
import { AboutView } from './components/common/AboutView';
import { ContactView } from './components/common/ContactView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductDetailsModal } from './components/products/ProductDetailsModal';
import { WishlistDrawer } from './components/products/WishlistDrawer';
import { InvoiceModal } from './components/common/InvoiceModal';
import { SearchModal } from './components/common/SearchModal';
import { CateringRequestModal } from './components/catering/CateringRequestModal';
import { BulkQuotationModal } from './components/bulk/BulkQuotationModal';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { Sparkles, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, language, t } = useApp();

  // If in Admin Dashboard view, render the Admin Portal without the customer top navigation
  if (activeView === 'admin') {
    return (
      <div className="min-h-screen bg-[#FFF7EA]">
        <AdminDashboard />
        <InvoiceModal />
      </div>
    );
  }

  const isShopCategoryView =
    activeView === 'shop' ||
    activeView === 'mini-sandwiches' ||
    activeView === 'finger-sandwiches' ||
    activeView === 'mini-croissants' ||
    activeView === 'mini-clubs' ||
    activeView === 'premium-sandwiches' ||
    activeView === 'ready-made-boxes' ||
    activeView === 'individual-boxes' ||
    activeView === 'group-boxes' ||
    activeView === 'bakery-croissants' ||
    activeView === 'bakery-cakes' ||
    activeView === 'cakes-desserts' ||
    activeView === 'chocolates-gifts' ||
    activeView === 'catering-events' ||
    activeView === 'cart';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7EA] text-[#542719]">
      <Header />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroBanner />
            <CategoryHighlights />
            <SpecialOffers />
            <Bestsellers />

            {/* Interactive "Build Your Box" Feature Highlight Strip */}
            <section className="py-14 bg-radial from-[#FDEBF2] to-[#FFF7EA] border-y border-[#F47AA6]/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl border-2 border-[#F47AA6] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 max-w-xl text-start">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47AA6]/20 text-[#542719] text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#F47AA6]" />
                      <span>{language === 'ar' ? 'ميزة حصرية' : 'Exclusive Feature'}</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#542719]">
                      {t.sections.customBoxCtaTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#733926] leading-relaxed">
                      {t.sections.customBoxCtaDesc}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('custom-box');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#F47AA6] hover:bg-[#E25B8D] text-white text-sm font-bold shadow-md transition-all duration-200 hover:scale-105 shrink-0"
                  >
                    <Sparkles className="w-4 h-4 text-[#FFF7EA]" />
                    <span>{t.hero.buildBox}</span>
                    <ArrowRight className="w-4 h-4 text-white rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </section>

            <CateringBanner />
            <ReviewsSection />
          </>
        )}

        {isShopCategoryView && <ShopView />}
        {activeView === 'custom-box' && <CustomBoxBuilder />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'order-confirmation' && <OrderConfirmation />}
        {activeView === 'account' && <AccountView />}
        {activeView === 'track-order' && <OrderTrackingView />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'contact' && <ContactView />}
      </main>

      <Footer />

      {/* Global Modals & Float Affordances */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailsModal />
      <InvoiceModal />
      <SearchModal />
      <CateringRequestModal />
      <BulkQuotationModal />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
