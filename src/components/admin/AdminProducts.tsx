import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Check, X, Search } from 'lucide-react';
import { Product, ProductCategory } from '../../types';
import { FRIENDLY_TABLE_GALLERY, FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, formatPrice, storeSettings, language, t } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [statusBanner, setStatusBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormState: Omit<Product, 'id'> = {
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    category: 'individual-boxes',
    price: 95,
    originalPrice: undefined,
    offerEndsAt: undefined,
    image: FRIENDLY_TABLE_PHOTOS.assortedSandwiches,
    stock: 30,
    isAvailable: true,
    isBestseller: false,
    isFeatured: false,
    ingredients: { en: '', ar: '' },
    boxContents: { en: '', ar: '' },
    servingSize: { en: '1 Person', ar: 'شخص واحد' },
  };

  const [formState, setFormState] = useState<Omit<Product, 'id'>>(initialFormState);

  const toDateTimeLocalValue = (iso?: string): string => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  const handleEditClick = (p: Product) => {
    setEditingProduct(p);
    setActionError(null);
    setFormState({
      name: { ...p.name },
      description: { ...p.description },
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      offerEndsAt: p.offerEndsAt,
      image: p.image,
      stock: p.stock,
      isAvailable: p.isAvailable,
      isBestseller: p.isBestseller || false,
      isFeatured: p.isFeatured || false,
      ingredients: p.ingredients ? { en: p.ingredients.en, ar: p.ingredients.ar } : { en: '', ar: '' },
      boxContents: p.boxContents ? { en: p.boxContents.en, ar: p.boxContents.ar } : { en: '', ar: '' },
      servingSize: p.servingSize ? { ...p.servingSize } : { en: '1 Person', ar: 'شخص واحد' },
    });
    setIsAddingNew(false);
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setActionError(null);
    setFormState(initialFormState);
    setIsAddingNew(true);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    setStatusBanner(null);
    if (!formState.name.en.trim() || !formState.name.ar.trim()) {
      setActionError(
        language === 'ar'
          ? 'يرجى إدخال اسم المنتج باللغتين الإنجليزية والعربية.'
          : 'Please fill the product name in both English and Arabic.'
      );
      return;
    }

    const sanitizedPayload: Omit<Product, 'id'> = {
      ...formState,
      originalPrice:
        formState.originalPrice && formState.originalPrice > 0 ? formState.originalPrice : undefined,
      offerEndsAt: formState.offerEndsAt?.trim() ? formState.offerEndsAt : undefined,
    };

    setIsSubmitting(true);
    try {
      if (editingProduct) {
        const success = await updateProduct({
          ...editingProduct,
          ...sanitizedPayload,
          id: editingProduct.id,
        });
        if (success) {
          setEditingProduct(null);
          setStatusBanner({
            type: 'success',
            text: language === 'ar' ? 'تم تحديث بيانات المنتج في قاعدة البيانات بنجاح.' : 'Product updated in Firestore.',
          });
          setTimeout(() => setStatusBanner(null), 3000);
        } else {
          setActionError(language === 'ar' ? 'تعذر تحديث المنتج في قاعدة البيانات.' : 'Failed to update product in database.');
        }
      } else {
        const success = await addProduct(sanitizedPayload);
        if (success) {
          setIsAddingNew(false);
          setStatusBanner({
            type: 'success',
            text: language === 'ar' ? 'تمت إضافة المنتج الجديد إلى المتجر بنجاح.' : 'New product added to Firestore catalog.',
          });
          setTimeout(() => setStatusBanner(null), 3000);
        } else {
          setActionError(language === 'ar' ? 'تعذر إضافة المنتج إلى قاعدة البيانات.' : 'Failed to add product to database.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    setStatusBanner(null);
    const success = await deleteProduct(id);
    setConfirmDeleteId(null);
    if (success) {
      setStatusBanner({
        type: 'success',
        text: language === 'ar' ? 'تم حذف المنتج من الكتالوج.' : 'Product removed from Firestore.',
      });
      setTimeout(() => setStatusBanner(null), 3000);
    } else {
      setStatusBanner({
        type: 'error',
        text: language === 'ar' ? 'تعذر حذف المنتج. يرجى المحاولة مرة أخرى.' : 'Failed to delete product.',
      });
    }
  };

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.en.toLowerCase().includes(q) ||
        p.name.ar.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'mini-sandwiches', label: t.categories['mini-sandwiches'] || 'Mini Sandwiches' },
    { id: 'finger-sandwiches', label: t.categories['finger-sandwiches'] || 'Finger Sandwiches' },
    { id: 'mini-croissants', label: t.categories['mini-croissants'] || 'Mini Croissants & Brioche' },
    { id: 'mini-clubs', label: t.categories['mini-clubs'] || 'Mini Club Sandwiches' },
    { id: 'premium-sandwiches', label: t.categories['premium-sandwiches'] || 'Premium Sandwiches' },
    { id: 'ready-made-boxes', label: t.categories['ready-made-boxes'] || 'Ready-Made Boxes' },
    { id: 'individual-boxes', label: t.categories['individual-boxes'] || 'Individual Boxes' },
    { id: 'group-boxes', label: t.categories['group-boxes'] || 'Group & Party Boxes' },
    { id: 'bakery-croissants', label: t.categories['bakery-croissants'] || 'Bakery & Croissants' },
    { id: 'bakery-cakes', label: t.categories['bakery-cakes'] || 'Bakery & Cakes' },
    { id: 'cakes-desserts', label: t.categories['cakes-desserts'] || 'Cakes & Desserts' },
    { id: 'chocolates-gifts', label: t.categories['chocolates-gifts'] || 'Chocolates & Gifts' },
    { id: 'catering-events', label: t.categories['catering-events'] || 'Catering & Events' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5E8D5]">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#542719]">
            {t.admin.products}
          </h2>
          <p className="text-xs text-[#733926]">
            {language === 'ar' ? 'إضافة وتعديل وحذف منتجات المتجر وتحديث الأسعار' : 'Manage catalog items, prices, descriptions, and stock status.'}
          </p>
        </div>

        <button
          onClick={handleAddNewClick}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#542719] hover:bg-[#733926] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#D9A441]" />
          <span>{t.admin.addProduct}</span>
        </button>
      </div>

      {/* Status Banner */}
      {statusBanner && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between ${
            statusBanner.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <span>{statusBanner.text}</span>
          <button type="button" onClick={() => setStatusBanner(null)} className="text-xs px-1.5">✕</button>
        </div>
      )}

      {/* Add / Edit Centered Modal */}
      {(isAddingNew || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveForm}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D9A441] shadow-2xl space-y-5 animate-in fade-in duration-200 my-auto"
          >
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <h3 className="font-serif font-bold text-base text-[#542719]">
                {editingProduct ? t.admin.editProduct : t.admin.addProduct}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingNew(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Name EN */}
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'اسم المنتج (إنجليزي) *' : 'Product Name (English) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.name.en}
                  onChange={(e) => setFormState({ ...formState, name: { ...formState.name, en: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>

              {/* Name AR */}
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'اسم المنتج (عربي) *' : 'Product Name (Arabic) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.name.ar}
                  onChange={(e) => setFormState({ ...formState, name: { ...formState.name, ar: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'القسم' : 'Category'}
                </label>
                <select
                  value={formState.category}
                  onChange={(e) => setFormState({ ...formState, category: e.target.value as ProductCategory })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">
                    {language === 'ar' ? `السعر (${storeSettings.currency}) *` : `Price (${storeSettings.currency}) *`}
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    min={0.01}
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#542719]">
                    {language === 'ar' ? `السعر قبل الخصم (${storeSettings.currency})` : `Original Price (${storeSettings.currency})`}
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={0}
                    value={formState.originalPrice || ''}
                    onChange={(e) => setFormState({ ...formState, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                    placeholder={language === 'ar' ? 'اختياري لتفعيل عرض خاص' : 'Optional for discount'}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
                  />
                </div>
              </div>

              {/* Special Offer End Date/Time */}
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-[#542719]">
                  {language === 'ar' ? 'تاريخ انتهاء العرض الخاص (اختياري)' : 'Special Offer Ends At (Optional)'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="datetime-local"
                    value={toDateTimeLocalValue(formState.offerEndsAt)}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        offerEndsAt: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                      })
                    }
                    className="flex-1 px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
                  />
                  {formState.offerEndsAt && (
                    <button
                      type="button"
                      onClick={() => setFormState({ ...formState, offerEndsAt: undefined })}
                      className="px-2.5 py-2 rounded-xl border border-[#EAD6BC] text-[#733926] hover:bg-[#FFF7EA] text-[11px] font-semibold"
                    >
                      {language === 'ar' ? 'مسح' : 'Clear'}
                    </button>
                  )}
                </div>
              </div>

            {/* Image URL / Local Photo Picker */}
            <div className="sm:col-span-2 space-y-2">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'مسار أو رابط الصورة *' : 'Product Image Path or URL *'}
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={formState.image}
                  alt="Preview"
                  className="w-12 h-12 rounded-xl object-cover border border-[#EAD6BC] bg-slate-100 shrink-0"
                />
                <input
                  type="text"
                  required
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  placeholder="/assets/aistudio/... or https://..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-[#733926]">
                  {language === 'ar' ? 'صور فرندلي تيبل المعتمدة:' : 'Quick-pick Friendly Table Photos:'}
                </span>
                {FRIENDLY_TABLE_GALLERY.map((photo) => (
                  <button
                    key={photo.url}
                    type="button"
                    onClick={() => setFormState({ ...formState, image: photo.url })}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] transition-colors ${
                      formState.image === photo.url
                        ? 'border-[#F47AA6] bg-[#FDEBF2] text-[#542719] font-bold'
                        : 'border-[#EAD6BC] bg-white text-[#733926] hover:bg-[#FFF7EA]'
                    }`}
                  >
                    <img src={photo.url} alt="" className="w-5 h-5 rounded object-cover" />
                    <span>{language === 'ar' ? photo.labelAr : photo.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description EN */}
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <textarea
                rows={2}
                value={formState.description.en}
                onChange={(e) => setFormState({ ...formState, description: { ...formState.description, en: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            {/* Description AR */}
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
              </label>
              <textarea
                rows={2}
                value={formState.description.ar}
                onChange={(e) => setFormState({ ...formState, description: { ...formState.description, ar: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            {/* Box Contents EN & AR */}
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'محتويات البوكس (إنجليزي)' : 'Box Contents (English)'}
              </label>
              <input
                type="text"
                value={formState.boxContents?.en || ''}
                onChange={(e) => setFormState({ ...formState, boxContents: { en: e.target.value, ar: formState.boxContents?.ar || '' } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'محتويات البوكس (عربي)' : 'Box Contents (Arabic)'}
              </label>
              <input
                type="text"
                value={formState.boxContents?.ar || ''}
                onChange={(e) => setFormState({ ...formState, boxContents: { en: formState.boxContents?.en || '', ar: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>

            {/* Stock & Serving size */}
            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'الكمية بالمخزن' : 'Stock Quantity'}
              </label>
              <input
                type="number"
                min={0}
                value={formState.stock}
                onChange={(e) => setFormState({ ...formState, stock: parseInt(e.target.value) || 0, isAvailable: (parseInt(e.target.value) || 0) > 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719] font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#542719]">
                {language === 'ar' ? 'حجم التقديم (مثال: 4-6 أشخاص)' : 'Serving Size (e.g. 4-6 Persons)'}
              </label>
              <input
                type="text"
                value={language === 'ar' ? (formState.servingSize?.ar || '') : (formState.servingSize?.en || '')}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    servingSize: language === 'ar'
                      ? { en: formState.servingSize?.en || e.target.value, ar: e.target.value }
                      : { en: e.target.value, ar: formState.servingSize?.ar || e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-[#542719]"
              />
            </div>
          </div>

          {/* Flags: Available, Bestseller, Featured */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#F5E8D5] text-xs font-semibold text-[#542719]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.isAvailable}
                onChange={(e) => setFormState({ ...formState, isAvailable: e.target.checked })}
                className="rounded text-[#F47AA6]"
              />
              <span>{language === 'ar' ? 'متاح للشراء في المتجر' : 'Is Available for Purchase'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.isBestseller}
                onChange={(e) => setFormState({ ...formState, isBestseller: e.target.checked })}
                className="rounded text-[#D9A441]"
              />
              <span>{language === 'ar' ? 'تمييز كالأكثر مبيعاً ★' : 'Mark as Bestseller ★'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.isFeatured}
                onChange={(e) => setFormState({ ...formState, isFeatured: e.target.checked })}
                className="rounded text-[#F47AA6]"
              />
              <span>{language === 'ar' ? 'عرض في الصفحة الرئيسية' : 'Featured on Homepage'}</span>
            </label>
          </div>

          {actionError && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
              {actionError}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setIsAddingNew(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-xl bg-[#542719] hover:bg-[#733926] disabled:opacity-50 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              {isSubmitting
                ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving to Database...')
                : editingProduct
                ? (language === 'ar' ? 'حفظ التعديلات' : 'Update Product')
                : (language === 'ar' ? 'إضافة للكتالوج' : 'Add to Catalog')}
            </button>
          </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex-1 w-full max-w-sm relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث باسم المنتج أو القسم...' : 'Search products...'}
            className="w-full ps-8 pe-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-[#542719] focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-[#EAD6BC] rounded-xl text-[#542719] font-medium"
        >
          <option value="all">{language === 'ar' ? 'جميع الأقسام' : 'All Categories'}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#EAD6BC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-[#FFF7EA] border-b border-[#EAD6BC] text-[#733926] font-bold uppercase">
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'المنتج' : 'Product'}</th>
                <th className="py-3 px-4 text-start">{language === 'ar' ? 'القسم' : 'Category'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'السعر' : 'Price'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'المخزون' : 'Stock'}</th>
                <th className="py-3 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-end">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E8D5]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FFF7EA]/30 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={language === 'ar' ? prod.name.ar : prod.name.en}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-100"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-[#542719] truncate">
                        {language === 'ar' ? prod.name.ar : prod.name.en}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {language === 'ar' ? prod.servingSize?.ar : prod.servingSize?.en}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#733926] font-medium">
                    {t.categories[prod.category]}
                  </td>
                  <td className="py-3 px-4 text-end font-mono font-bold text-[#542719]">
                    {formatPrice(prod.price)}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold">
                    <span className={prod.stock <= 15 ? 'text-red-600 font-bold' : 'text-[#542719]'}>
                      {prod.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      prod.isAvailable && prod.stock > 0
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {prod.isAvailable && prod.stock > 0
                        ? (language === 'ar' ? 'متوفر' : 'In Stock')
                        : (language === 'ar' ? 'نفد' : 'Sold Out')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-end">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEditClick(prod)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#EAD6BC] text-[#542719] hover:bg-[#FFF7EA] font-bold text-[11px]"
                        title={t.admin.editProduct}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                      </button>
                      {confirmDeleteId === prod.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleConfirmDelete(prod.id)}
                            className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold"
                          >
                            {language === 'ar' ? 'تأكيد' : 'Confirm'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(prod.id)}
                          className="p-1.5 rounded-lg border border-[#EAD6BC] text-red-500 hover:bg-red-50"
                          title={language === 'ar' ? 'حذف المنتج' : 'Delete Product'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
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
