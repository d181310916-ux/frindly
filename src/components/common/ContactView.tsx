import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { storeSettings, language, t } = useApp();

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
          {language === 'ar' ? 'يسعدنا تواصلكم دائماً' : 'Get in Touch'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#542719]">
          {t.nav.contactUs}
        </h1>
        <p className="text-xs sm:text-sm text-[#733926]">
          {language === 'ar'
            ? 'فريق خدمة عملاء فرندلي تيبل متواجد لمساعدتكم في اختيار الأصناف وترتيب المناسبات.'
            : 'Friendly Table customer care team is delighted to assist you with orders, custom hampers, and event catering.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs flex items-start gap-4">
            <div className="p-3 bg-[#FFF7EA] text-[#25D366] rounded-2xl border border-[#EAD6BC]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#542719]">WhatsApp Direct Support</h3>
              <p className="text-xs text-[#733926] mt-0.5">Quick order placement & order tracking</p>
              <a
                href={`https://wa.me/${storeSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-mono text-xs font-bold text-[#25D366] hover:underline"
              >
                {storeSettings.whatsappNumber}
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs flex items-start gap-4">
            <div className="p-3 bg-[#FFF7EA] text-[#D9A441] rounded-2xl border border-[#EAD6BC]">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#542719]">Customer Service Call Center</h3>
              <p className="text-xs text-[#733926] mt-0.5">Assistance with orders, billing, and scheduling</p>
              <p className="font-mono text-xs font-bold text-[#542719] mt-2">
                {storeSettings.supportPhone}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs flex items-start gap-4">
            <div className="p-3 bg-[#FFF7EA] text-[#F47AA6] rounded-2xl border border-[#EAD6BC]">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#542719]">Corporate & Email Inquiries</h3>
              <p className="text-xs text-[#733926] mt-0.5">B2B contracts, RFPs, and official receipts</p>
              <p className="text-xs font-semibold text-[#542719] mt-2">
                {storeSettings.supportEmail}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs flex items-start gap-4">
            <div className="p-3 bg-[#FFF7EA] text-[#542719] rounded-2xl border border-[#EAD6BC]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#542719]">Bakery & Kitchen Headquarters</h3>
              <p className="text-xs text-[#733926] mt-0.5">
                {language === 'ar' ? storeSettings.address.ar : storeSettings.address.en}
              </p>
              <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{t.footer.workingHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD6BC] shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#542719] mb-4">
            {language === 'ar' ? 'أرسل لنا رسالة مباشرة' : 'Send Us a Direct Message'}
          </h2>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <p className="font-serif font-bold text-lg text-[#542719]">
                {language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
              </p>
              <p className="text-xs text-[#733926]">
                {language === 'ar' ? 'سيتواصل معك فريقنا في أقرب فرصة.' : 'Our team will respond promptly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">{t.checkout.fullName}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">{t.checkout.phone}</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">{t.checkout.email}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">Message / الرسالة</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help make your gathering special?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#542719] hover:bg-[#733926] text-[#FFF7EA] font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-4 h-4 text-[#D9A441]" />
                <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
