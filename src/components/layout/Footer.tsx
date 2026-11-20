import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, Heart, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, storeSettings, setActiveView, setSelectedCategory } = useApp();

  return (
    <footer className="bg-[#542719] text-[#FFF7EA] pt-16 pb-8 border-t border-[#3A180E] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#733926]/40">
          
          {/* Col 1 & 2: Brand Story & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Friendly Table"
                className="h-20 w-auto object-contain bg-white/10 p-1.5 rounded-xl shadow-inner"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  {t.brandName}
                </h3>
                <p className="text-xs font-semibold text-[#D9A441] uppercase tracking-wider">
                  {t.categoriesSubtitle}
                </p>
                <p className="text-xs text-[#F47AA6] italic mt-0.5">
                  "{t.tagline}"
                </p>
              </div>
            </div>

            <p className="text-sm text-[#FFF7EA]/80 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${storeSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-full transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ar' ? 'اطلب عبر واتساب' : 'WhatsApp Order Support'}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-[#D9A441] uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF7EA]/80">
              <li>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    setSelectedCategory('all');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.nav.shopAll}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('custom-box');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors font-medium text-[#F47AA6]"
                >
                  ✨ {t.nav.customBox}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('catering-events');
                    setSelectedCategory('catering-events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.nav.cateringEvents}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.nav.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.nav.contactUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D9A441] text-xs text-[#D9A441]/80 transition-colors"
                >
                  {t.nav.adminDashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div>
            <h4 className="text-sm font-bold text-[#D9A441] uppercase tracking-wider mb-4">
              {t.footer.categories}
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF7EA]/80">
              <li>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    setSelectedCategory('individual-boxes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.categories['individual-boxes']}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    setSelectedCategory('group-boxes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.categories['group-boxes']}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    setSelectedCategory('mini-clubs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.categories['mini-clubs']}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    setSelectedCategory('bakery-cakes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.categories['bakery-cakes']}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    setSelectedCategory('chocolates-gifts');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F47AA6] transition-colors"
                >
                  {t.categories['chocolates-gifts']}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Working Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#D9A441] uppercase tracking-wider mb-4">
              {t.footer.contactInfo}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#FFF7EA]/80">
              <MapPin className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
              <span>{language === 'ar' ? storeSettings.address.ar : storeSettings.address.en}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#FFF7EA]/80">
              <Phone className="w-4 h-4 text-[#D9A441] shrink-0" />
              <span dir="ltr">{storeSettings.supportPhone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#FFF7EA]/80">
              <Mail className="w-4 h-4 text-[#D9A441] shrink-0" />
              <span>{storeSettings.supportEmail}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#FFF7EA]/80 pt-1">
              <Clock className="w-4 h-4 text-[#F47AA6] shrink-0" />
              <span>{t.footer.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF7EA]/60 gap-4">
          <p>© {new Date().getFullYear()} {t.footer.allRights}</p>
          <div className="flex items-center gap-1 text-[#FFF7EA]/80">
            <span>{t.brandName}</span>
            <span>·</span>
            <span>{t.footer.taglineFooter}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
