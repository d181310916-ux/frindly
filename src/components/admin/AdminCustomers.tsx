import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { orders, formatPrice, language, t } = useApp();
  const [search, setSearch] = useState('');

  // Aggregate unique customers from orders
  const customerMap = new Map<string, {
    name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
  }>();

  orders.forEach((ord) => {
    const key = ord.customer.phone || ord.customer.name;
    if (customerMap.has(key)) {
      const existing = customerMap.get(key)!;
      existing.totalOrders += 1;
      existing.totalSpent += ord.total;
      if (new Date(ord.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = ord.createdAt;
      }
    } else {
      customerMap.set(key, {
        name: ord.customer.name,
        phone: ord.customer.phone,
        email: ord.customer.email,
        city: ord.customer.city,
        address: ord.customer.address,
        totalOrders: 1,
        totalSpent: ord.total,
        lastOrderDate: ord.createdAt,
      });
    }
  });

  const customersList = Array.from(customerMap.values()).filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E8D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.customers}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'سجل عملاء المتجر ومشترياتهم السابقة وبيانات التواصل' : 'Customer directory, purchasing totals, and contact records.'}
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 bg-[#FFF7EA] text-[#542719] border border-[#EAD6BC] rounded-full">
          {customersList.length} {language === 'ar' ? 'عميل' : 'Customers'}
        </span>
      </div>

      <div className="max-w-md relative text-xs">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === 'ar' ? 'ابحث بالاسم أو رقم الهاتف أو المدينة...' : 'Search customer by name, phone, or city...'}
          className="w-full pl-8 pr-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-[#542719] focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-[#FFF7EA] border-b border-[#EAD6BC] text-[#733926] font-bold uppercase">
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'التواصل والمدينة' : 'Contact & City'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الطلبات' : 'Orders'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'إجمالي المشتريات' : 'Total Spent'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'آخر طلب' : 'Last Order'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E8D5]">
              {customersList.map((cust, i) => (
                <tr key={i} className="hover:bg-[#FFF7EA]/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#542719]">
                    {cust.name}
                  </td>
                  <td className="py-3 px-4 text-[#733926]">
                    <p className="font-mono">{cust.phone}</p>
                    <p className="text-[11px] text-slate-400">{cust.city}</p>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-[#542719]">
                    {cust.totalOrders}
                  </td>
                  <td className="py-3 px-4 text-end font-mono font-bold text-[#D9A441]">
                    {formatPrice(cust.totalSpent)}
                  </td>
                  <td className="py-3 px-4 text-end text-slate-400 font-mono text-[11px]">
                    {new Date(cust.lastOrderDate).toLocaleDateString()}
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
