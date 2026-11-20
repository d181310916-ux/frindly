import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart, ShieldCheck, Award, Users, Utensils } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { language, t, setActiveView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      
      {/* Hero section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <img
          src="/logo.png"
          alt="Friendly Table Logo"
          className="h-28 mx-auto object-contain"
        />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#542719] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
          <span>{t.categoriesSubtitle}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#542719] leading-tight">
          {language === 'ar' ? 'قصة فرندلي تيبل' : 'Our Story: Friendly Table'}
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-[#F47AA6]">
          "{t.tagline}"
        </p>
        <p className="text-xs sm:text-sm text-[#733926] leading-relaxed">
          {t.footer.aboutText}
        </p>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF7EA] text-[#F47AA6] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#542719]">
            {language === 'ar' ? 'شغف بالمخبوزات الطازجة' : 'Artisanal Craftsmanship'}
          </h3>
          <p className="text-xs text-[#733926] leading-relaxed">
            {language === 'ar'
              ? 'نبدأ صباح كل يوم بخبز البريوش، والكرواسون، والميني كلوب بأجود أنواع الزبدة الطبيعية والمكونات الطازجة.'
              : 'Every morning begins in our Cairo kitchen with baking pure butter brioche, crusty ciabatta, and tender mini club rolls.'}
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF7EA] text-[#D9A441] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#542719]">
            {language === 'ar' ? 'صُنعت لجمع الأحبة' : 'Made for Gatherings'}
          </h3>
          <p className="text-xs text-[#733926] leading-relaxed">
            {language === 'ar'
              ? 'سواء كانت جمعة عائلية دافئة لشخصين أو مؤتمراً ضخماً لـ ٥٠٠ ضيف، صممنا بوكساتنا لتكون جاهزة للمشاركة فوراً وبأناقة.'
              : 'Whether an intimate lunch for two or a 500-guest gala, our boxes are crafted to make sharing effortless, beautiful, and memorable.'}
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF7EA] text-[#542719] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#542719]">
            {language === 'ar' ? 'تغليف راقٍ وبطاقات إهداء' : 'Thoughtful Gifting'}
          </h3>
          <p className="text-xs text-[#733926] leading-relaxed">
            {language === 'ar'
              ? 'علبنا الوردية والذهبية المميزة ليست مجرد تغليف؛ إنها تجربة إهداء متكاملة مع شرائط ساتان وبطاقات إهداء مخصصة.'
              : 'Our signature soft pink and gold boxes are not mere packaging; they are designed as gift moments complete with satin ribbons and personalized notes.'}
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-[#542719] text-[#FFF7EA] p-8 sm:p-12 rounded-3xl text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold">
          {language === 'ar' ? 'جاهز لتجربة فرندلي تيبل؟' : 'Ready to Experience Friendly Table?'}
        </h3>
        <p className="text-xs sm:text-sm text-[#FFF7EA]/80 max-w-md mx-auto">
          {language === 'ar'
            ? 'تصفح قائمتنا الشهية أو ابدأ بتصميم بوكسك الخاص لجمعتك القادمة.'
            : 'Explore our curated menu or build a custom gathering box with your favorite varieties.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveView('shop')}
            className="px-6 py-3 bg-[#D9A441] text-[#542719] text-xs sm:text-sm font-bold rounded-full hover:bg-[#C4902F]"
          >
            {t.hero.shopNow}
          </button>
          <button
            onClick={() => setActiveView('custom-box')}
            className="px-6 py-3 bg-[#F47AA6] text-white text-xs sm:text-sm font-bold rounded-full hover:bg-[#E25B8D]"
          >
            {t.hero.buildBox}
          </button>
        </div>
      </div>
    </div>
  );
};
