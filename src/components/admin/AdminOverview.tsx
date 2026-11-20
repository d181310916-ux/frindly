import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Printer,
  TrendingUp,
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const AdminOverview: React.FC = () => {
  const {
    orders,
    products,
    language,
    formatPrice,
    storeSettings,
    t,
    updateOrderStatus,
    setSelectedOrderForInvoice,
  } = useApp();
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const handleQuickStatusChange = async (orderId: string, status: OrderStatus) => {
    const ok = await updateOrderStatus(orderId, status);
    if (ok) {
      setStatusNotice(language === 'ar' ? `تم تحديث حالة الطلب #${orderId}` : `Order #${orderId} updated.`);
      setTimeout(() => setStatusNotice(null), 2500);
    }
  };

  const totalSales = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter(
    (o) => o.status === 'new' || o.status === 'confirmed' || o.status === 'preparing'
  );

  const completedOrders = orders.filter((o) => o.status === 'completed');
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled');

  const lowStockProducts = products.filter((p) => p.stock <= 15);

  const uniqueCustomersCount = new Set(orders.map((o) => o.customer.phone)).size;

  // Recent 5 orders
  const recentOrders = orders.slice(0, 5);

  // Best sellers
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* 1. KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAD6BC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#733926]">
            <span>{t.admin.totalSales}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-2xl font-bold text-[#542719]">
              {totalSales.toFixed(1)}
            </span>
            <span className="text-xs font-bold text-[#D9A441]">{storeSettings.currency}</span>
          </div>
          <p className="text-[11px] text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{language === 'ar' ? 'نمو +١٨.٤٪ عن الأسبوع الماضي' : '+18.4% from last week'}</span>
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAD6BC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#733926]">
            <span>{t.admin.totalOrders}</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="font-mono text-2xl font-bold text-[#542719]">
            {orders.length}
          </p>
          <p className="text-[11px] text-slate-500">
            {completedOrders.length} {language === 'ar' ? 'مكتمل' : 'completed'} · {pendingOrders.length} {language === 'ar' ? 'قيد التنفيذ' : 'pending'}
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAD6BC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#733926]">
            <span>{t.admin.pendingOrders}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="font-mono text-2xl font-bold text-[#D9A441]">
            {pendingOrders.length}
          </p>
          <p className="text-[11px] text-amber-800">
            {language === 'ar' ? 'بانتظار التجهيز في المطبخ' : 'Requires kitchen attention'}
          </p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAD6BC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#733926]">
            <span>{t.admin.lowStockAlerts}</span>
            <div className="p-2 rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="font-mono text-2xl font-bold text-red-600">
            {lowStockProducts.length}
          </p>
          <p className="text-[11px] text-red-600">
            {language === 'ar' ? 'أصناف أقل من الحد الأدنى (≤١٥)' : 'Items below threshold (≤15)'}
          </p>
        </div>

      </div>

      {/* 2. Sales Trend & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Performance Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-[#542719]">
                {t.admin.salesBreakdown} ({language === 'ar' ? 'الأداء اليومي' : 'Daily Trend'})
              </h3>
              <p className="text-xs text-[#733926]">
                {language === 'ar' ? 'إيرادات المبيعات خلال آخر ٧ أيام' : 'Revenue performance over the last 7 days'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#D9A441] bg-[#FFF7EA] px-3 py-1 rounded-full border border-[#EAD6BC]">
              {storeSettings.currency}
            </span>
          </div>

          {/* Simple Clean SVG Bar Chart */}
          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Mon', val: 580, h: 45 },
              { day: 'Tue', val: 820, h: 62 },
              { day: 'Wed', val: 940, h: 70 },
              { day: 'Thu', val: 1420, h: 90 },
              { day: 'Fri', val: 1850, h: 100 },
              { day: 'Sat', val: 1210, h: 80 },
              { day: 'Sun', val: 780, h: 55 },
            ].map((col) => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono font-semibold text-[#542719] opacity-0 group-hover:opacity-100 transition-opacity">
                  {col.val}
                </span>
                <div
                  className="w-full max-w-[42px] bg-linear-to-t from-[#542719] to-[#D9A441] rounded-t-lg transition-all duration-300 group-hover:brightness-110"
                  style={{ height: `${col.h}%` }}
                />
                <span className="text-xs font-semibold text-[#733926] mt-1">{col.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best-Selling Delicacies (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#542719] border-b border-[#F5E8D5] pb-3">
            {language === 'ar' ? 'الأكثر مبيعاً' : 'Top Bestsellers'}
          </h3>

          <div className="space-y-3">
            {bestsellers.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.image}
                  alt={language === 'ar' ? item.name.ar : item.name.en}
                  className="w-11 h-11 rounded-lg object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#542719] truncate">
                    {language === 'ar' ? item.name.ar : item.name.en}
                  </p>
                  <p className="text-[11px] text-[#733926] font-mono">
                    {formatPrice(item.price)} · Stock: {item.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Recent Orders Quick Table */}
      <div className="bg-white p-6 rounded-3xl border border-[#EAD6BC] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
          <h3 className="font-serif font-bold text-base text-[#542719]">
            {t.admin.recentOrders}
          </h3>
          <div className="flex items-center gap-3">
            {statusNotice && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {statusNotice}
              </span>
            )}
            <span className="text-xs text-[#733926]">
              {language === 'ar' ? `عرض أحدث ${recentOrders.length} طلبات` : `Showing latest ${recentOrders.length} orders`}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-[#EAD6BC] text-[#733926] font-bold uppercase">
                <th className="py-2.5 text-start">{language === 'ar' ? 'رقم الطلب' : 'Order ID'}</th>
                <th className="py-2.5 text-start">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="py-2.5 text-start">{language === 'ar' ? 'التاريخ والموعد' : 'Date & Window'}</th>
                <th className="py-2.5 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-2.5 text-end">{language === 'ar' ? 'الإجمالي' : 'Total'}</th>
                <th className="py-2.5 text-end">{language === 'ar' ? 'طباعة' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E8D5]">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FFF7EA]/40 transition-colors">
                  <td className="py-3 font-mono font-bold text-[#542719]">#{ord.id}</td>
                  <td className="py-3">
                    <p className="font-semibold text-[#542719]">{ord.customer.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{ord.customer.phone}</p>
                  </td>
                  <td className="py-3 text-[#733926]">
                    <p>{ord.deliveryDate}</p>
                    <p className="text-[10px] text-slate-400">{ord.deliveryTimeSlot}</p>
                  </td>
                  <td className="py-3 text-center">
                    <select
                      value={ord.status}
                      onChange={(e) => handleQuickStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="px-2 py-1 bg-[#FFF7EA] border border-[#EAD6BC] rounded-md font-semibold text-[11px] text-[#542719] focus:outline-none"
                    >
                      <option value="new">{t.admin.status.new}</option>
                      <option value="confirmed">{t.admin.status.confirmed}</option>
                      <option value="preparing">{t.admin.status.preparing}</option>
                      <option value="ready_for_pickup">{t.admin.status.ready_for_pickup}</option>
                      <option value="out_for_delivery">{t.admin.status.out_for_delivery}</option>
                      <option value="completed">{t.admin.status.completed}</option>
                      <option value="cancelled">{t.admin.status.cancelled}</option>
                    </select>
                  </td>
                  <td className="py-3 text-end font-mono font-bold text-[#542719]">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="py-3 text-end">
                    <button
                      onClick={() => setSelectedOrderForInvoice(ord)}
                      className="p-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA]"
                      title={language === 'ar' ? 'طباعة الفاتورة' : 'Print Invoice'}
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
