import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { storeSettings, language, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const cleanNumber = storeSettings.whatsappNumber.replace(/[^0-9]/g, '');

  const quickMessages = [
    {
      labelEn: 'Inquire about Group Boxes',
      labelAr: 'استفسار عن بوكسات الجمعات',
      textEn: 'Hello Friendly Table! I would like to inquire about group sandwich boxes for an upcoming event.',
      textAr: 'مرحباً فرندلي تيبل! أود الاستفسار عن تفاصيل وأسعار بوكسات الجمعات لمناسبة قريبة.',
    },
    {
      labelEn: 'Custom Catering Quote',
      labelAr: 'طلب تسعيرة بوفيه وضيافة',
      textEn: 'Hello Friendly Table! We have a corporate / family gathering and need catering options.',
      textAr: 'مرحباً فرندلي تيبل! لدينا فعالية عائلية / عمل ونرغب بالحصول على خيارات الضيافة والبوفيه.',
    },
    {
      labelEn: 'Celebration Cake Order',
      labelAr: 'طلب كيكة احتفال خاصة',
      textEn: 'Hello Friendly Table! I want to check availability and flavors for a celebration cake.',
      textAr: 'مرحباً فرندلي تيبل! أود معرفة النكهات المتوفرة لكيكات الاحتفال والمناسبات.',
    },
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end no-print">
      {isOpen && (
        <div className="mb-3 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[#EAD6BC] overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div>
                <h4 className="font-bold text-sm">Friendly Table WhatsApp</h4>
                <p className="text-[11px] text-white/90">Good Food, Happy Moments</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-[#FFF7EA]">
            <p className="text-xs text-[#542719] font-medium">
              {language === 'ar'
                ? 'مرحباً بك! اختر استفساراً سريعاً أو اكتب رسالتك مباشرة:'
                : 'Welcome! Choose a quick topic or send your custom message:'}
            </p>

            <div className="space-y-1.5">
              {quickMessages.map((qm, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(language === 'ar' ? qm.textAr : qm.textEn)}
                  className="w-full text-start p-2 bg-white hover:bg-[#F5E8D5] border border-[#EAD6BC] rounded-lg text-xs font-semibold text-[#542719] transition-colors"
                >
                  💬 {language === 'ar' ? qm.labelAr : qm.labelEn}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#EAD6BC]">
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Type message here...'}
                  className="flex-1 px-3 py-2 bg-white border border-[#EAD6BC] rounded-lg text-xs text-[#542719] focus:outline-none focus:border-[#25D366]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customMsg.trim()) {
                      handleSend(customMsg);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (customMsg.trim()) handleSend(customMsg);
                  }}
                  className="p-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
};
