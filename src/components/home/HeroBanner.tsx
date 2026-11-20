import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Box } from 'lucide-react';
import { FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

export const HeroBanner: React.FC = () => {
  const { language, t, setActiveView, setSelectedCategory, setIsCateringModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden bg-radial from-[#FFF7EA] to-[#F5E8D5] py-12 lg:py-20 border-b border-[#EAD6BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline, Copy, Action CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            
            {/* Pill-less subtle brand badge */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9A441]">
              <Sparkles className="w-4 h-4 text-[#F47AA6]" />
              <span>{t.hero.badge}</span>
              <span className="text-[#542719]">·</span>
              <span className="text-[#542719] font-serif">
                {language === 'ar' ? 'مطبخ فرندلي تيبل — القاهرة' : 'Cairo Artisanal Kitchen'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#542719] tracking-tight leading-[1.15] text-balance">
              {t.hero.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#733926] leading-relaxed max-w-xl">
              {t.hero.supporting}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  setActiveView('shop');
                  setSelectedCategory('all');
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] text-sm font-bold shadow-md transition-all duration-200 hover:scale-105"
              >
                <span>{t.hero.shopNow}</span>
                <ArrowRight className="w-4 h-4 text-[#D9A441] rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActiveView('custom-box')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F47AA6] hover:bg-[#E25B8D] text-white text-sm font-bold shadow-md transition-all duration-200 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-[#FFF7EA]" />
                <span>{t.hero.buildBox}</span>
              </button>

              <button
                onClick={() => setIsCateringModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#FFF7EA] text-[#542719] text-sm font-semibold border border-[#EAD6BC] transition-colors"
              >
                <span>{t.hero.cateringInquiry}</span>
              </button>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#EAD6BC]/70 text-xs text-[#542719]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D9A441]" />
                <span className="font-bold">{t.features.freshTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#F47AA6]" />
                <span className="font-bold">{t.features.gatheringTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#542719]" />
                <span className="font-bold">{t.features.customTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D9A441]" />
                <span className="font-bold">{t.features.promptTitle}</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Showcase Mosaic (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-4/3 sm:aspect-square">
                <img
                  src={FRIENDLY_TABLE_PHOTOS.assortedSandwiches}
                  alt="Friendly Table Signature Gourmet Box"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#542719]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
                    {language === 'ar' ? 'تشكيلة الجمعات الفاخرة' : 'Signature Gathering Collection'}
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-bold mt-1">
                    {language === 'ar' ? 'ساندوتشات طازجة مع تغليف راقٍ' : 'Fresh Mini Clubs & Celebration Platters'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Official Logo Watermark Card */}
              <div className="absolute -top-6 -start-6 hidden sm:flex items-center gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#EAD6BC] animate-bounce-subtle">
                <img
                  src="/logo.png"
                  alt="Friendly Table"
                  className="w-12 h-12 object-contain"
                />
                <div className="text-xs">
                  <p className="font-bold text-[#542719]">
                    {language === 'ar' ? 'فرندلي تيبل' : 'Friendly Table'}
                  </p>
                  <p className="text-[10px] text-[#D9A441] font-semibold">
                    {language === 'ar' ? 'صُنع يدوياً ١٠٠٪' : '100% Handcrafted'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Quick Mini Box Highlight */}
              <div className="absolute -bottom-6 -end-6 hidden sm:flex items-center gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#EAD6BC]">
                <div className="w-10 h-10 rounded-xl bg-[#FDEBF2] flex items-center justify-center text-[#F47AA6]">
                  <Box className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#542719] font-mono">
                    {language === 'ar' ? 'من ١٢ إلى +٥٠٠ ساندوتش' : '12 to 500+ Sandwiches'}
                  </p>
                  <p className="text-[10px] text-slate-500">{language === 'ar' ? 'جاهز للمناسبات الفورية' : 'Events & Meeting Platters'}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
