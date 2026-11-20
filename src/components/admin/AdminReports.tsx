import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, TrendingUp, BarChart3, PieChart, Calendar, DollarSign } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, products, formatPrice, storeSettings, language, t } = useApp();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'annual'>('weekly');

  const validOrders = orders.filter((o) => o.status !== 'cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderValue = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;

  // Category revenue calculation
  const categoryRevenue: { [cat: string]: number } = {};
  validOrders.forEach((ord) => {
    ord.items.forEach((item) => {
      const cat = item.product ? item.product.category : 'custom-box';
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + item.totalPrice;
    });
  });

  const handleExportFullReport = () => {
    const headers = ['Report Metric', 'Value'];
    const rows = [
      [`Total Recorded Sales (${storeSettings.currency})`, totalRevenue.toFixed(2)],
      ['Total Valid Orders', validOrders.length],
      [`Average Order Value (${storeSettings.currency})`, averageOrderValue.toFixed(2)],
      ['Total Catalog Products', products.length],
      ['Period', period.toUpperCase()],
      ['Export Date', new Date().toISOString()],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `friendly_table_financial_report_${period}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E8D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.reports}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'مؤشرات الأداء المالي، مبيعات الأقسام، ومتوسط قيمة السلة' : 'Sales performance analytics, category volume, and CSV financial exports.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="flex p-1 bg-white rounded-xl border border-[#EAD6BC] text-xs font-semibold">
            {([
              { id: 'daily', en: 'daily', ar: 'يومي' },
              { id: 'weekly', en: 'weekly', ar: 'أسبوعي' },
              { id: 'monthly', en: 'monthly', ar: 'شهري' },
              { id: 'annual', en: 'annual', ar: 'سنوي' },
            ] as const).map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  period === p.id ? 'bg-[#542719] text-white' : 'text-[#733926]'
                }`}
              >
                {language === 'ar' ? p.ar : p.en}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportFullReport}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#EAD6BC] text-[#542719] text-xs font-bold rounded-xl hover:bg-[#FFF7EA]"
          >
            <Download className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{t.admin.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-1">
          <p className="text-xs font-semibold text-[#733926]">
            {language === 'ar' ? 'إجمالي إيرادات الفترة' : 'Total Period Revenue'}
          </p>
          <p className="font-mono text-2xl font-bold text-[#542719]">{formatPrice(totalRevenue)}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">
            {language === 'ar' ? 'مؤشر مالي إيجابي' : 'Healthy financial trajectory'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-1">
          <p className="text-xs font-semibold text-[#733926]">
            {language === 'ar' ? 'متوسط قيمة الطلب' : 'Average Order Value (AOV)'}
          </p>
          <p className="font-mono text-2xl font-bold text-[#D9A441]">{formatPrice(averageOrderValue)}</p>
          <p className="text-[11px] text-slate-400 font-mono">
            {language === 'ar' ? `محسوب من ${validOrders.length} طلب` : `Calculated from ${validOrders.length} orders`}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-1">
          <p className="text-xs font-semibold text-[#733926]">
            {language === 'ar' ? 'نسبة إتمام الطلبات' : 'Completed Fulfillment Rate'}
          </p>
          <p className="font-mono text-2xl font-bold text-[#542719]">
            {orders.length > 0 ? `${Math.round((orders.filter(o => o.status === 'completed').length / orders.length) * 100)}%` : '100%'}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold">
            {language === 'ar' ? 'التزام دقيق بمواعيد التوصيل' : 'Strict delivery discipline'}
          </p>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-[#542719]">
          {language === 'ar' ? 'مساهمة الأقسام في المبيعات' : 'Category Sales Contribution'}
        </h3>

        <div className="space-y-3">
          {Object.entries(categoryRevenue).map(([cat, rev]) => {
            const pct = totalRevenue > 0 ? (rev / totalRevenue) * 100 : 0;
            return (
              <div key={cat} className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-[#542719] font-medium">
                  <span className="capitalize">{cat.replace('-', ' ')}</span>
                  <span className="font-mono font-bold">{formatPrice(rev)} ({pct.toFixed(0)}%)</span>
                </div>
                <div className="w-full h-2 bg-[#FFF7EA] rounded-full overflow-hidden border border-[#EAD6BC]">
                  <div
                    className="h-full bg-linear-to-r from-[#D9A441] to-[#F47AA6]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
