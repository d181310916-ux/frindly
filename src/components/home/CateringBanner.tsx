import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

export const CateringBanner: React.FC = () => {
  const { language, t, setIsCateringModalOpen, setActiveView } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-[#542719] text-[#FFF7EA] relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-[#733926]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 rounded-full bg-[#D9A441]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9A441]">
              <Sparkles className="w-4 h-4 text-[#F47AA6]" />
              <span>{t.sections.cateringTitle}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {language === 'ar'
                ? 'ضيافة وبوفيهات راقية لجميع المناسبات والشركات'
                : 'Effortless Catering for Corporate Events & Celebrations'}
            </h2>

            <p className="text-sm sm:text-base text-[#FFF7EA]/80 leading-relaxed max-w-xl">
              {t.sections.cateringDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#FFF7EA]/90 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{language === 'ar' ? 'ساندوتشات وبوكسات تكفي من ٥ إلى ٥٠٠+ شخص' : 'Capacity from 5 to 500+ guests'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{language === 'ar' ? 'حوامل تقديم خشبية ومفارش وألواح أنيقة' : 'Artisanal wooden trays & custom decor'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{language === 'ar' ? 'تسعير مخصص وخدمة مسؤولي الفعاليات' : 'Dedicated event coordinator & quotation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{language === 'ar' ? 'توصيل مبرد في موعد الفعالية بدقة' : 'Climate-controlled punctual setup'}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setIsCateringModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D9A441] hover:bg-[#C4902F] text-[#542719] text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
              >
                <span>{language === 'ar' ? 'طلب تسعيرة مناسبة خاصة' : 'Request Event Quotation'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActiveView('custom-box')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
              >
                <span>{language === 'ar' ? 'صمّم بوكس الجمعات الخاص بك' : 'Build Custom Box'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-4/3 sm:aspect-square">
              <img
                src={FRIENDLY_TABLE_PHOTOS.cateringBuffetDisplay}
                alt="Friendly Table Event Catering Setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white text-xs">
                  <p className="font-bold text-sm text-[#D9A441]">
                    {language === 'ar' ? 'حفلات ومناسبات القاهرة والشركات' : 'Cairo Corporate & Private Events'}
                  </p>
                  <p className="text-white/80">
                    {language === 'ar'
                      ? 'قوائم مخصصة للجامعات والاجتماعات والمناسبات العائلية في القاهرة.'
                      : 'Tailored menus for universities, boardrooms, and family parties.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
