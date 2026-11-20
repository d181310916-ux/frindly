import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../products/ProductCard';
import { Clock, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

function computeTimeRemaining(targetMs: number, nowMs: number): TimeRemaining {
  const diff = Math.max(0, targetMs - nowMs);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, totalMs: diff };
}

export const SpecialOffers: React.FC = () => {
  const { products, language, t, setActiveView, setSelectedCategory } = useApp();
  const [now, setNow] = useState<number>(() => Date.now());
  const [fallbackEndMs] = useState<number>(() => Date.now() + 72 * 60 * 60 * 1000);
  const [showAllOffers, setShowAllOffers] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const specialOffers = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.isAvailable || p.stock <= 0) return false;
        if (!p.originalPrice || p.originalPrice <= p.price) return false;
        if (p.offerEndsAt) {
          const endMs = new Date(p.offerEndsAt).getTime();
          if (!Number.isNaN(endMs) && endMs <= now) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      });
  }, [products, now]);

  const nearestEndMs = useMemo(() => {
    const futureTimestamps = specialOffers
      .map((p) => (p.offerEndsAt ? new Date(p.offerEndsAt).getTime() : NaN))
      .filter((ms) => !Number.isNaN(ms) && ms > now);

    if (futureTimestamps.length > 0) {
      return Math.min(...futureTimestamps);
    }
    return fallbackEndMs;
  }, [specialOffers, now, fallbackEndMs]);

  if (specialOffers.length === 0) {
    return null;
  }

  const remaining = computeTimeRemaining(nearestEndMs, now);
  const pad = (val: number) => String(val).padStart(2, '0');

  const timerBlocks = [
    { value: pad(remaining.days), label: t.sections.days },
    { value: pad(remaining.hours), label: t.sections.hours },
    { value: pad(remaining.minutes), label: t.sections.minutes },
    { value: pad(remaining.seconds), label: t.sections.seconds },
  ];

  const displayedOffers = showAllOffers ? specialOffers : specialOffers.slice(0, 4);

  return (
    <section
      id="special-offers"
      className="py-16 sm:py-20 bg-gradient-to-b from-[#FDF5EA] via-[#FFF9F2] to-[#FDEBF2]/45 border-b border-[#EAD6BC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Live Countdown Timer */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 text-start">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E25B8D]">
              <Sparkles className="w-4 h-4 text-[#D9A441]" />
              <span>{t.sections.specialOffers}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#542719]">
              {t.sections.specialOffers}
            </h2>
            <p className="text-xs sm:text-sm text-[#733926] max-w-xl">
              {t.sections.specialOffersSub}
            </p>
          </div>

          {/* Live Countdown Timer Bar */}
          <div className="bg-white border border-[#EAD6BC] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 self-start lg:self-end">
            <div className="flex items-center gap-2 text-xs font-bold text-[#542719]">
              <Clock className="w-4 h-4 text-[#F47AA6] shrink-0" />
              <span>{t.sections.offerEndsIn}:</span>
            </div>

            <div className="flex items-center gap-2" dir="ltr">
              {timerBlocks.map((unit, idx) => (
                <React.Fragment key={unit.label}>
                  <div className="flex flex-col items-center justify-center min-w-[46px] px-2 py-1.5 rounded-xl bg-[#FFF7EA] border border-[#EAD6BC]/80">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#542719] leading-none tabular-nums">
                      {unit.value}
                    </span>
                    <span className="text-[10px] font-semibold text-[#733926] mt-1">
                      {unit.label}
                    </span>
                  </div>
                  {idx < timerBlocks.length - 1 && (
                    <span className="font-mono text-sm font-bold text-[#D9A441] select-none">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Discounted Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Offers / Full Menu Action */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {specialOffers.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAllOffers((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <span>
                {showAllOffers
                  ? (language === 'ar' ? 'عرض أقل' : 'Show Fewer Offers')
                  : (language === 'ar'
                      ? `عرض كل العروض الخاصة (${specialOffers.length})`
                      : `Show All Special Offers (${specialOffers.length})`)}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#D9A441] transition-transform ${showAllOffers ? 'rotate-180' : ''}`}
              />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#F5E8D5] text-[#542719] border border-[#EAD6BC] text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <span>{language === 'ar' ? 'تصفح القائمة الكاملة' : 'Explore Full Menu'}</span>
            <ArrowRight className="w-4 h-4 text-[#D9A441] rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};
