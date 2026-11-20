import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BoxTemplate } from '../../types';
import { Plus, Edit2, Trash2, PackageCheck } from 'lucide-react';
import { FRIENDLY_TABLE_GALLERY, FRIENDLY_TABLE_PHOTOS } from '../../data/mockData';

export const AdminBoxManager: React.FC = () => {
  const { boxTemplates, saveBoxTemplate, deleteBoxTemplate, language, formatPrice } = useApp();

  const [editingTemplate, setEditingTemplate] = useState<BoxTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formState, setFormState] = useState<Partial<BoxTemplate>>({
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    category: 'ready-made',
    basePrice: 65,
    capacity: 4,
    defaultContents: { en: '', ar: '' },
    image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
    isAvailable: true,
    minOrderQuantity: 1,
    maxOrderQuantity: 500,
  });

  const handleStartEdit = (tpl: BoxTemplate) => {
    setEditingTemplate(tpl);
    setBanner(null);
    setFormState(tpl);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingTemplate(null);
    setBanner(null);
    setFormState({
      id: `box-tpl-${Date.now()}`,
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      category: 'ready-made',
      basePrice: 75,
      capacity: 4,
      defaultContents: { en: '', ar: '' },
      image: FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
      isAvailable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 500,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);
    if (!formState.name?.en?.trim() || !formState.name?.ar?.trim()) {
      setBanner({
        type: 'error',
        text: language === 'ar' ? 'يرجى إدخال اسم البوكس بالعربية والإنجليزية.' : 'Please enter the box name in both languages.',
      });
      return;
    }

    const tplToSave: BoxTemplate = {
      id: formState.id || `box-tpl-${Date.now()}`,
      name: formState.name as any,
      description: (formState.description || { en: '', ar: '' }) as any,
      category: formState.category || 'ready-made',
      basePrice: Number(formState.basePrice) || 60,
      capacity: Number(formState.capacity) || 4,
      defaultContents: formState.defaultContents,
      image: formState.image || FRIENDLY_TABLE_PHOTOS.readyMealSnackBox,
      isAvailable: formState.isAvailable ?? true,
      minOrderQuantity: Number(formState.minOrderQuantity) || 1,
      maxOrderQuantity: Number(formState.maxOrderQuantity) || 500,
    };

    setIsSaving(true);
    try {
      const ok = await saveBoxTemplate(tplToSave);
      if (ok) {
        setEditingTemplate(null);
        setIsCreating(false);
        setBanner({
          type: 'success',
          text: language === 'ar' ? 'تم حفظ قالب البوكس في قاعدة البيانات بنجاح.' : 'Box template saved to Firestore.',
        });
        setTimeout(() => setBanner(null), 3000);
      } else {
        setBanner({
          type: 'error',
          text: language === 'ar' ? 'تعذر حفظ البوكس في قاعدة البيانات.' : 'Failed to save box template.',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setBanner(null);
    const ok = await deleteBoxTemplate(id);
    setConfirmDeleteId(null);
    if (ok) {
      setBanner({
        type: 'success',
        text: language === 'ar' ? 'تم حذف قالب البوكس.' : 'Box template deleted.',
      });
      setTimeout(() => setBanner(null), 3000);
    } else {
      setBanner({
        type: 'error',
        text: language === 'ar' ? 'تعذر حذف البوكس.' : 'Failed to delete box template.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-[#EAD6BC]">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#542719]">
            {language === 'ar' ? 'إدارة البوكسات الجاهزة وتصاميم التوزيعات' : 'Ready-Made Box & Template Management'}
          </h2>
          <p className="text-xs text-[#733926] mt-0.5">
            {language === 'ar'
              ? 'تعديل محتويات البوكسات، الأسعار الثابتة، وسعة الصناديق دون تعديل الكود'
              : 'Configure default box contents, fixed prices, and capacities without editing code'}
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#542719] hover:bg-[#733926] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9A441]" />
          <span>{language === 'ar' ? 'إضافة بوكس جديد' : 'Add New Box Template'}</span>
        </button>
      </div>

      {banner && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between ${
            banner.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <span>{banner.text}</span>
          <button type="button" onClick={() => setBanner(null)} className="text-xs px-1.5">✕</button>
        </div>
      )}

      {/* Centered Editor Modal */}
      {(isCreating || editingTemplate) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-3xl border-2 border-[#D9A441] shadow-2xl space-y-4 my-auto"
          >
            <div className="flex items-center justify-between border-b border-[#F5E8D5] pb-3">
              <h3 className="font-serif font-bold text-base text-[#542719]">
                {isCreating
                  ? (language === 'ar' ? 'إضافة تصميم بوكس جديد' : 'Create New Box Template')
                  : (language === 'ar' ? 'تعديل بيانات البوكس' : 'Edit Box Template')}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingTemplate(null);
                }}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕ {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719]">
                  {language === 'ar' ? 'اسم البوكس (إنجليزي) *' : 'English Box Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.name?.en || ''}
                  onChange={(e) => setFormState({ ...formState, name: { ...formState.name!, en: e.target.value } })}
                  placeholder="e.g. Deluxe Meeting Box"
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719]">اسم البوكس بالعربية *</label>
                <input
                  type="text"
                  required
                  value={formState.name?.ar || ''}
                  onChange={(e) => setFormState({ ...formState, name: { ...formState.name!, ar: e.target.value } })}
                  placeholder="مثال: بوكس الاجتماعات والجمعات"
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719]">
                  {language === 'ar' ? 'السعر الثابت للبوكس' : 'Base / Fixed Price'}
                </label>
                <input
                  type="number"
                  step="any"
                  min={0.01}
                  required
                  value={formState.basePrice ?? 0}
                  onChange={(e) => setFormState({ ...formState, basePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#542719]">
                  {language === 'ar' ? 'سعة البوكس (أقصى عدد قطع)' : 'Item Capacity (Max Pieces)'}
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={formState.capacity ?? 4}
                  onChange={(e) => setFormState({ ...formState, capacity: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-[#542719]">
                  {language === 'ar' ? 'المحتويات المحددة مسبقاً (إنجليزي)' : 'Default Contents (English)'}
                </label>
                <input
                  type="text"
                  value={formState.defaultContents?.en || ''}
                  onChange={(e) => setFormState({ ...formState, defaultContents: { ar: formState.defaultContents?.ar || '', en: e.target.value } })}
                  placeholder="e.g. 2 Mini Sandwiches, 1 Mini Cake, 1 Juice (250ml)"
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
                />
              </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#542719]">المحتويات المحددة مسبقاً (بالعربية)</label>
              <input
                type="text"
                value={formState.defaultContents?.ar || ''}
                onChange={(e) => setFormState({ ...formState, defaultContents: { en: formState.defaultContents?.en || '', ar: e.target.value } })}
                placeholder="مثال: ٢ ميني ساندوتش، ١ كيك ميني، ١ عصير فريش"
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#542719]">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <input
                type="text"
                value={formState.description?.en || ''}
                onChange={(e) => setFormState({ ...formState, description: { ar: formState.description?.ar || '', en: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#542719]">الوصف (بالعربية)</label>
              <input
                type="text"
                value={formState.description?.ar || ''}
                onChange={(e) => setFormState({ ...formState, description: { en: formState.description?.en || '', ar: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719]"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-bold text-[#542719]">
                {language === 'ar' ? 'مسار أو رابط الصورة' : 'Photo Path or URL'}
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={formState.image || FRIENDLY_TABLE_PHOTOS.assortedSandwiches}
                  alt="Preview"
                  className="w-12 h-12 rounded-xl object-cover border border-[#EAD6BC] shrink-0"
                />
                <input
                  type="text"
                  value={formState.image || ''}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-[#EAD6BC] rounded-xl text-xs text-[#542719] font-mono"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
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

            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-[#542719] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formState.isAvailable ?? true}
                  onChange={(e) => setFormState({ ...formState, isAvailable: e.target.checked })}
                  className="rounded text-[#F47AA6]"
                />
                <span>{language === 'ar' ? 'متاح للطلب في المتجر' : 'Available for ordering'}</span>
              </label>
            </div>
          </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingTemplate(null);
                }}
                className="px-4 py-2 border border-[#EAD6BC] rounded-xl text-xs font-semibold text-[#542719]"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-[#542719] hover:bg-[#733926] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                {isSaving
                  ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...')
                  : (language === 'ar' ? 'حفظ التعديلات في السحابة' : 'Save to Cloud')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Box Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {boxTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-3xl border border-[#EAD6BC] overflow-hidden shadow-xs p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#FFF7EA]">
                <img
                  src={tpl.image}
                  alt={language === 'ar' ? tpl.name.ar : tpl.name.en}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-[#542719] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {formatPrice(tpl.basePrice)}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base text-[#542719]">
                  {language === 'ar' ? tpl.name.ar : tpl.name.en}
                </h3>
                <p className="text-xs text-[#733926] mt-0.5 line-clamp-2">
                  {language === 'ar' ? tpl.description.ar : tpl.description.en}
                </p>
              </div>

              {tpl.defaultContents && (
                <div className="p-2.5 rounded-xl bg-[#FFF7EA] border border-[#EAD6BC] text-[11px] text-[#542719] flex items-center gap-1.5">
                  <PackageCheck className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                  <span className="truncate">
                    {language === 'ar' ? tpl.defaultContents.ar : tpl.defaultContents.en}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#F5E8D5] flex items-center justify-between text-xs">
              <span className="text-[#733926] font-mono">
                {tpl.capacity} {language === 'ar' ? 'قطع كحد أقصى' : 'items max'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStartEdit(tpl)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#EAD6BC] hover:bg-[#FFF7EA] text-[#542719] font-bold text-[11px]"
                  title={language === 'ar' ? 'تعديل' : 'Edit Box'}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                </button>
                {confirmDeleteId === tpl.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDelete(tpl.id)}
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
                    onClick={() => setConfirmDeleteId(tpl.id)}
                    className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600"
                    title={language === 'ar' ? 'حذف' : 'Delete Box'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
