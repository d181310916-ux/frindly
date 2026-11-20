import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Printer,
  Download,
  Eye,
  X,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Check,
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    setSelectedOrderForInvoice,
    formatPrice,
    storeSettings,
    language,
    t,
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [statusNote, setStatusNote] = useState('');
  const [editDeliveryDate, setEditDeliveryDate] = useState('');
  const [editTimeSlot, setEditTimeSlot] = useState('');
  const [isSavingModal, setIsSavingModal] = useState(false);
  const [modalFeedback, setModalFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [orderFeedback, setOrderFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.phone.toLowerCase().includes(q) ||
        o.customer.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'City', 'Status', `Total ${storeSettings.currency}`, 'Payment Method'];
    const rows = filteredOrders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customer.name}"`,
      o.customer.phone,
      o.customer.city,
      o.status,
      o.total.toFixed(2),
      o.paymentMethod,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `friendly_table_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTableStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setOrderFeedback(null);
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      setOrderFeedback({
        type: 'success',
        text: language === 'ar' ? `تم تحديث حالة الطلب #${orderId} وحفظها في السحابة.` : `Order #${orderId} status saved to Firestore.`,
      });
      setTimeout(() => setOrderFeedback(null), 2500);
    } else {
      setOrderFeedback({
        type: 'error',
        text: language === 'ar' ? `تعذر تحديث حالة الطلب #${orderId}.` : `Failed to update Order #${orderId}.`,
      });
    }
  };

  const handleUpdateStatusInModal = async (newStatus: OrderStatus) => {
    if (!viewingOrder) return;
    setModalFeedback(null);
    setIsSavingModal(true);
    try {
      const success = await updateOrderStatus(
        viewingOrder.id,
        newStatus,
        statusNote.trim() ? statusNote : undefined,
        editDeliveryDate.trim() || undefined,
        editTimeSlot.trim() || undefined
      );
      if (success) {
        setViewingOrder((prev) =>
          prev
            ? {
                ...prev,
                status: newStatus,
                statusNotes: statusNote,
                deliveryDate: editDeliveryDate || prev.deliveryDate,
                deliveryTimeSlot: editTimeSlot || prev.deliveryTimeSlot,
              }
            : null
        );
        setModalFeedback({
          type: 'success',
          text: language === 'ar' ? `تم تحديث حالة الطلب #${viewingOrder.id} وحفظها.` : `Order #${viewingOrder.id} updated.`,
        });
        setTimeout(() => setModalFeedback(null), 2500);
      } else {
        setModalFeedback({
          type: 'error',
          text: language === 'ar' ? 'تعذر حفظ التعديل في السحابة.' : 'Failed to update status in Firestore.',
        });
      }
    } finally {
      setIsSavingModal(false);
    }
  };

  const handleSaveDetailsInModal = async () => {
    if (!viewingOrder) return;
    setModalFeedback(null);
    setIsSavingModal(true);
    try {
      const success = await updateOrderStatus(
        viewingOrder.id,
        viewingOrder.status,
        statusNote,
        editDeliveryDate.trim() || viewingOrder.deliveryDate,
        editTimeSlot.trim() || viewingOrder.deliveryTimeSlot
      );
      if (success) {
        setViewingOrder((prev) =>
          prev
            ? {
                ...prev,
                statusNotes: statusNote,
                deliveryDate: editDeliveryDate.trim() || prev.deliveryDate,
                deliveryTimeSlot: editTimeSlot.trim() || prev.deliveryTimeSlot,
              }
            : null
        );
        setModalFeedback({
          type: 'success',
          text: language === 'ar' ? 'تم حفظ الملاحظة وموعد التوصيل في السحابة.' : 'Note & schedule saved to Firestore.',
        });
        setTimeout(() => setModalFeedback(null), 2500);
      } else {
        setModalFeedback({
          type: 'error',
          text: language === 'ar' ? 'تعذر حفظ تعديلات الطلب.' : 'Failed to save order edits.',
        });
      }
    } finally {
      setIsSavingModal(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & CSV Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5E8D5]">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.orders}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'متابعة وإدارة طلبات العملاء وتحديث الحالات وطباعة الفواتير' : 'View customer orders, update delivery pipeline, and print receipts.'}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#EAD6BC] hover:bg-[#FFF7EA] text-[#542719] text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <Download className="w-4 h-4 text-[#D9A441]" />
          <span>{t.admin.exportCsv}</span>
        </button>
      </div>

      {orderFeedback && (
        <div
          className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between ${
            orderFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <span>{orderFeedback.text}</span>
          <button type="button" onClick={() => setOrderFeedback(null)} className="px-1.5">✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex-1 w-full max-w-md relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.admin.searchOrders}
            className="w-full pl-8 pr-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-[#542719] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#D9A441]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-[#542719] font-medium"
          >
            <option value="all">{language === 'ar' ? `جميع الحالات (${orders.length})` : `All Statuses (${orders.length})`}</option>
            <option value="new">{t.admin.status.new} ({orders.filter(o => o.status === 'new').length})</option>
            <option value="confirmed">{t.admin.status.confirmed} ({orders.filter(o => o.status === 'confirmed').length})</option>
            <option value="preparing">{t.admin.status.preparing} ({orders.filter(o => o.status === 'preparing').length})</option>
            <option value="ready_for_pickup">{t.admin.status.ready_for_pickup} ({orders.filter(o => o.status === 'ready_for_pickup').length})</option>
            <option value="out_for_delivery">{t.admin.status.out_for_delivery} ({orders.filter(o => o.status === 'out_for_delivery').length})</option>
            <option value="completed">{t.admin.status.completed} ({orders.filter(o => o.status === 'completed').length})</option>
            <option value="cancelled">{t.admin.status.cancelled} ({orders.filter(o => o.status === 'cancelled').length})</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-[#FFF7EA] border-b border-[#EAD6BC] text-[#733926] font-bold uppercase">
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'رقم الطلب' : 'Order No.'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'التاريخ والموعد' : 'Date & Slot'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'الأصناف' : 'Items Preview'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'الإجمالي' : 'Total'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E8D5]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FFF7EA]/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#542719]">
                    #{ord.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-[#542719]">{ord.customer.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{ord.customer.phone}</p>
                  </td>
                  <td className="py-3 px-4 text-[#733926]">
                    <p>{ord.deliveryDate}</p>
                    <p className="text-[10px] text-slate-400">{ord.deliveryTimeSlot}</p>
                  </td>
                  <td className="py-3 px-4 text-[#542719] max-w-xs truncate">
                    {ord.items.map((i) => `${i.quantity}x ${i.product ? (language === 'ar' ? i.product.name.ar : i.product.name.en) : (language === 'ar' ? 'بوكس مخصص' : 'Custom Box')}`).join(', ')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <select
                      value={ord.status}
                      onChange={(e) => handleTableStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1 bg-[#FFF7EA] border border-[#EAD6BC] rounded-lg font-bold text-[11px] text-[#542719]"
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
                  <td className="py-3 px-4 text-end font-mono font-bold text-sm text-[#542719]">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="py-3 px-4 text-end">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setViewingOrder(ord);
                          setStatusNote(ord.statusNotes || '');
                          setEditDeliveryDate(ord.deliveryDate || '');
                          setEditTimeSlot(ord.deliveryTimeSlot || '');
                          setModalFeedback(null);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA] font-bold text-[11px]"
                        title={language === 'ar' ? 'عرض وتعديل الطلب' : 'View / Edit Order Details'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تفاصيل' : 'Edit'}</span>
                      </button>
                      <button
                        onClick={() => setSelectedOrderForInvoice(ord)}
                        className="p-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA]"
                        title="Print Invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#EAD6BC] p-6 sm:p-8 space-y-5 my-auto">
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#542719]">
                  {language === 'ar' ? `الطلب #${viewingOrder.id}` : `Order #${viewingOrder.id}`}
                </h3>
                <p className="text-xs text-[#733926]">
                  {new Date(viewingOrder.createdAt).toLocaleString()} · {viewingOrder.orderType === 'pickup' ? (language === 'ar' ? 'استلام من الفرع' : 'PICKUP') : (language === 'ar' ? 'توصيل' : 'DELIVERY')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalFeedback && (
              <div
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between ${
                  modalFeedback.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                <span>{modalFeedback.text}</span>
                <button type="button" onClick={() => setModalFeedback(null)} className="px-1.5">✕</button>
              </div>
            )}

            {/* Customer Details */}
            <div className="bg-[#FFF7EA] p-4 rounded-2xl border border-[#F5E8D5] text-xs space-y-1">
              <p className="font-bold text-sm text-[#542719]">{viewingOrder.customer.name}</p>
              <p className="text-[#733926] font-mono">{viewingOrder.customer.phone} · {viewingOrder.customer.email}</p>
              <p className="text-[#733926]">{viewingOrder.customer.address}, {viewingOrder.customer.city}</p>
              {viewingOrder.customer.notes && (
                <p className="text-slate-500 italic pt-1">
                  {language === 'ar' ? 'ملاحظة العميل:' : 'Note:'} {viewingOrder.customer.notes}
                </p>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-[#D9A441]">
                {language === 'ar' ? 'الأصناف في الطلب' : 'Items in Order'}
              </h4>
              <div className="divide-y divide-[#F5E8D5] max-h-44 overflow-y-auto pe-1">
                {viewingOrder.items.map((line, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-start">
                    <div>
                      <p className="font-bold text-[#542719]">
                        {line.quantity}x {line.product ? (language === 'ar' ? line.product.name.ar : line.product.name.en) : (language === 'ar' ? 'بوكس مخصص' : 'Custom Box')}
                      </p>
                      {line.customBox && (
                        <p className="text-[11px] text-[#733926]">
                          {line.customBox.items.map((it) => `${it.quantity}x ${language === 'ar' ? it.name.ar : it.name.en}`).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-mono font-bold text-[#542719]">{formatPrice(line.totalPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update + Editable Schedule & Kitchen Note */}
            <div className="space-y-3 pt-2 border-t border-[#F5E8D5] text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-[#542719]">{language === 'ar' ? 'حالة الطلب:' : 'Status:'}</span>
                <div className="flex gap-1.5 flex-wrap">
                  {(['new', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'completed', 'cancelled'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isSavingModal}
                      onClick={() => handleUpdateStatusInModal(st)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors disabled:opacity-50 ${
                        viewingOrder.status === st
                          ? 'bg-[#542719] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {t.admin.status[st]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">
                    {language === 'ar' ? 'تاريخ التوصيل / الاستلام:' : 'Delivery / Pickup Date:'}
                  </label>
                  <input
                    type="date"
                    value={editDeliveryDate}
                    onChange={(e) => setEditDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs font-mono text-[#542719]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">
                    {language === 'ar' ? 'الفترة الزمنية / الوقت:' : 'Time Slot:'}
                  </label>
                  <input
                    type="text"
                    value={editTimeSlot}
                    onChange={(e) => setEditTimeSlot(e.target.value)}
                    placeholder="11:00 AM - 01:00 PM"
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'ملاحظة المطبخ للعميل:' : 'Kitchen Note for Customer:'}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: تم تجهيز وتغليف الطلب بشرائط الساتان' : 'e.g. Fresh batch packed with pink ribbons'}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                  />
                  <button
                    type="button"
                    disabled={isSavingModal}
                    onClick={handleSaveDetailsInModal}
                    className="px-4 py-2 rounded-xl bg-[#D9A441] hover:bg-[#C4902F] disabled:opacity-50 text-[#542719] font-bold text-xs flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isSavingModal ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (language === 'ar' ? 'حفظ الملاحظة والموعد' : 'Save Note & Schedule')}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#F5E8D5]">
              <span className="font-mono font-bold text-base text-[#D9A441]">
                {language === 'ar' ? 'الإجمالي:' : 'Total:'} {formatPrice(viewingOrder.total)}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForInvoice(viewingOrder)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#542719] text-white text-xs font-bold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'طباعة الفاتورة' : 'Print Receipt'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
