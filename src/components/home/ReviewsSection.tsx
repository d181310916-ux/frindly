import React from 'react';
import { useApp } from '../../context/AppContext';
import { initialReviews } from '../../data/mockData';
import { Star, Heart, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { language, t } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#EAD6BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D9A441]">
            <Heart className="w-3.5 h-3.5 text-[#F47AA6]" />
            <span>{t.sections.reviewsTitle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#542719]">
            {t.sections.reviewsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#733926]">
            {t.sections.reviewsSub}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFF7EA] p-6 sm:p-7 rounded-3xl border border-[#EAD6BC] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#D9A441]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment Quote */}
                <p className="text-xs sm:text-sm text-[#542719] leading-relaxed italic">
                  "{language === 'ar' ? rev.commentAr : rev.commentEn}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-[#F5E8D5] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#542719]">{rev.name}</h4>
                  <p className="text-[11px] text-[#733926]">
                    {language === 'ar' ? rev.roleAr : rev.roleEn}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(rev.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
