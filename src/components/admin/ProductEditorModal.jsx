import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Sparkles, Plus, Trash2, Image as ImageIcon, Eye, Check } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProductEditorModal({ 
  isOpen, 
  onClose, 
  productToEdit = null, 
  isReserveMode = false 
}) {
  const { 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    addReserveProduct, 
    updateReserveProduct, 
    deleteReserveProduct,
    siteSettings,
    mediaLibrary,
    addMediaItem
  } = useCms();
  const { isGlass } = useTheme();

  const fileInputRef = useRef(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);


  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: isReserveMode ? 'reserve' : 'bouquets',
    price: 100,
    currency: siteSettings.currencySymbol || 'AED',
    formattedPrice: '100 AED',
    priceNote: '(Delivery charges apply)',
    badge: 'NEW ARRIVAL',
    badgeType: 'gold',
    image: '',
    description: '',
    longDescription: '',
    items: [''],
    whatsappNumber: siteSettings.whatsappNumber || '971501487453',
    whatsappMessage: ''
  });

  const [previewTab, setPreviewTab] = useState('edit'); // 'edit' or 'preview'
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || (isReserveMode ? 'reserve' : 'bouquets'),
        price: productToEdit.price || 0,
        currency: productToEdit.currency || siteSettings.currencySymbol || 'AED',
        formattedPrice: productToEdit.formattedPrice || `${productToEdit.price || 0} AED`,
        priceNote: productToEdit.priceNote || '(Delivery charges apply)',
        badge: productToEdit.badge || 'EXCLUSIVE',
        badgeType: productToEdit.badgeType || 'gold',
        image: productToEdit.image || '',
        description: productToEdit.description || '',
        longDescription: productToEdit.longDescription || '',
        items: productToEdit.items && productToEdit.items.length > 0 ? productToEdit.items : [''],
        whatsappNumber: productToEdit.whatsappNumber || siteSettings.whatsappNumber || '971501487453',
        whatsappMessage: productToEdit.whatsappMessage || ''
      });
    } else {
      setFormData({
        name: '',
        category: isReserveMode ? 'reserve' : (categories[1]?.id || 'bouquets'),
        price: isReserveMode ? 500 : 120,
        currency: siteSettings.currencySymbol || 'AED',
        formattedPrice: isReserveMode ? '500 AED' : '120 AED',
        priceNote: '(Delivery charges apply)',
        badge: isReserveMode ? 'THE RESERVE · 500 AED' : 'NEW ARRIVAL',
        badgeType: isReserveMode ? 'gold' : 'rose',
        image: '',
        description: '',
        longDescription: '',
        items: ['Signature Gift Box & Keepsake Ribbon', 'Handcrafted Premium Treats & Confections'],
        whatsappNumber: siteSettings.whatsappNumber || '971501487453',
        whatsappMessage: ''
      });
    }
  }, [productToEdit, isReserveMode, isOpen, siteSettings]);

  if (!isOpen) return null;

  // Handle local image file upload and auto-compress/convert to base64
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result;
      if (typeof base64Url === 'string') {
        setFormData(prev => ({ ...prev, image: base64Url }));
        addMediaItem({
          name: file.name,
          url: base64Url
        });
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Failed to read image file.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handlePriceChange = (val) => {
    const num = Number(val) || 0;
    const curr = formData.currency || 'AED';
    setFormData(prev => ({
      ...prev,
      price: num,
      formattedPrice: curr === '₹' ? `₹${num.toLocaleString()}` : `${num} ${curr}`
    }));
  };

  const handleItemTextChange = (idx, value) => {
    const updated = [...formData.items];
    updated[idx] = value;
    setFormData(prev => ({ ...prev, items: updated }));
  };

  const addItemRow = () => {
    setFormData(prev => ({ ...prev, items: [...prev.items, ''] }));
  };

  const removeItemRow = (idx) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a product name.');
      return;
    }

    const cleanedItems = formData.items.map(i => i.trim()).filter(Boolean);
    const generatedMsg = formData.whatsappMessage.trim() || 
      `Hello! I would like to order the ${formData.name} for ${formData.formattedPrice} ${formData.priceNote || ''}.`;

    const payload = {
      ...formData,
      items: cleanedItems,
      whatsappMessage: generatedMsg
    };

    if (isReserveMode || formData.category === 'reserve') {
      if (productToEdit) {
        updateReserveProduct(productToEdit.id, payload);
      } else {
        addReserveProduct(payload);
      }
    } else {
      if (productToEdit) {
        updateProduct(productToEdit.id, payload);
      } else {
        addProduct(payload);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-10 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className={`relative rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl z-10 border overflow-hidden ${
        isGlass 
          ? 'glass-panel border-white/20 text-white' 
          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-900'
      }`}>
        {/* Top Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between shrink-0 ${
          isGlass ? 'border-white/10 bg-white/5' : 'border-neutral-200 bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isGlass ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-neutral-900 text-white'
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal">
                {productToEdit ? 'Edit Hamper Collection' : isReserveMode ? 'Add New Reserve Hamper' : 'Add New Hamper Collection'}
              </h2>
              <p className={`text-xs ${isGlass ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Configure pricing, imagery, luxury inclusions, and WhatsApp messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className={`flex rounded-full p-1 border ${
              isGlass ? 'bg-black/30 border-white/10' : 'bg-neutral-100 border-neutral-200'
            }`}>
              <button
                type="button"
                onClick={() => setPreviewTab('edit')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  previewTab === 'edit'
                    ? isGlass ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-white shadow text-neutral-900'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('preview')}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  previewTab === 'preview'
                    ? isGlass ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-white shadow text-neutral-900'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Card Preview</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isGlass ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-neutral-200 text-neutral-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {previewTab === 'preview' ? (
            /* Live Card Preview */
            <div className="py-8 flex justify-center">
              <div className={`w-full max-w-sm rounded-2xl overflow-hidden border shadow-xl transition-all ${
                isGlass ? 'glass-panel border-white/20 text-white' : 'bg-white border-neutral-200 text-neutral-900'
              }`}>
                <div className="relative aspect-[4/3] bg-neutral-800 overflow-hidden">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt={formData.name || 'Preview'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 gap-2">
                      <ImageIcon className="w-10 h-10 opacity-40" />
                      <span className="text-xs">No image uploaded yet</span>
                    </div>
                  )}
                  {formData.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#D4AF37] text-black">
                      {formData.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-lg font-medium leading-tight">
                    {formData.name || 'Untitled Luxury Hamper'}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {formData.description || 'No description provided.'}
                  </p>
                  <div className="pt-2 flex items-baseline justify-between border-t border-white/10">
                    <div>
                      <span className="text-lg font-serif font-bold text-[#D4AF37]">
                        {formData.formattedPrice}
                      </span>
                      <span className="text-[10px] text-neutral-400 block">
                        {formData.priceNote}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      WhatsApp Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Product Name */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Hamper Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Royal Ruby Chocolate & Rose Velvet Trunk"
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${
                      isGlass 
                        ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                        : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                    }`}
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Category Filter
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${
                      isGlass 
                        ? 'bg-[#180422] border-white/10 focus:border-[#D4AF37] text-white' 
                        : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                    }`}
                  >
                    {categories.filter(c => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                    <option value="reserve">👑 The Reserve Vault</option>
                  </select>
                </div>

                {/* Badge Label */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Display Badge
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                      placeholder="e.g. BESTSELLER, BOUQUET, THE RESERVE"
                      className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${
                        isGlass 
                          ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                          : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                      }`}
                    />
                    <select
                      value={formData.badgeType}
                      onChange={(e) => setFormData(prev => ({ ...prev, badgeType: e.target.value }))}
                      className={`px-3 py-3 rounded-xl text-xs border focus:outline-none ${
                        isGlass ? 'bg-[#180422] border-white/10 text-white' : 'bg-white border-neutral-200'
                      }`}
                    >
                      <option value="gold">Gold</option>
                      <option value="rose">Rose</option>
                      <option value="sky">Sky Blue</option>
                      <option value="green">Forest</option>
                      <option value="sage">Sage</option>
                    </select>
                  </div>
                </div>

                {/* Price & Currency */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Numeric Price
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${
                        isGlass 
                          ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                          : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                      }`}
                    />
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                      placeholder="AED"
                      className={`w-20 px-3 py-3 rounded-xl text-sm border focus:outline-none text-center ${
                        isGlass ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-neutral-200'
                      }`}
                    />
                  </div>
                </div>

                {/* Formatted Price Display Text */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Display Price Text
                  </label>
                  <input
                    type="text"
                    value={formData.formattedPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, formattedPrice: e.target.value }))}
                    placeholder="e.g. 100 AED or From ₹4,500"
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${
                      isGlass 
                        ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                        : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                    }`}
                  />
                </div>

                {/* Image Upload / URL Selector */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Product Photo / Image *
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      Upload from phone/laptop or paste image link
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {/* Thumbnail preview */}
                    <div className={`w-28 h-28 rounded-2xl overflow-hidden border shrink-0 flex items-center justify-center relative ${
                      isGlass ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
                    }`}>
                      {formData.image ? (
                        <img 
                          src={formData.image} 
                          alt="Thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-neutral-400" />
                      )}
                    </div>

                    {/* Uploader Controls */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                            isGlass
                              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black font-semibold shadow hover:brightness-110'
                              : 'bg-neutral-900 text-white hover:bg-neutral-800'
                          }`}
                        >
                          <Upload className="w-4 h-4" />
                          <span>{isUploading ? 'Compressing...' : 'Upload Image File'}</span>
                        </button>

                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileUpload} 
                          accept="image/*" 
                          className="hidden" 
                        />

                        {mediaLibrary.length > 0 && (
                          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
                            <span className="text-[10px] uppercase text-neutral-400 whitespace-nowrap">
                              From Library:
                            </span>
                            {mediaLibrary.slice(0, 4).map((m) => (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: m.url }))}
                                className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 shrink-0 hover:scale-105 transition-transform"
                                title={m.name}
                              >
                                <img src={m.url} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="Or paste image URL (e.g. /images/ruby_gold_chocolate_bouquet.jpg or https://...)"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none transition-all ${
                          isGlass 
                            ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                            : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Short Description (Card Summary)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief highlights visible on catalog cards..."
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                      isGlass 
                        ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                        : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                    }`}
                  />
                </div>

                {/* Long Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Detailed Story & Description (Modal View)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.longDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                    placeholder="Full luxury narrative detailing craft, packaging, and presentation..."
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                      isGlass 
                        ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                        : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                    }`}
                  />
                </div>

                {/* Items & Inclusions List */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      What's Inside (Inclusions List)
                    </label>
                    <button
                      type="button"
                      onClick={addItemRow}
                      className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleItemTextChange(idx, e.target.value)}
                          placeholder={`Inclusion #${idx + 1} (e.g. Vintage Dom Pérignon Champagne 750ml)`}
                          className={`flex-1 px-4 py-2 rounded-xl text-xs border focus:outline-none ${
                            isGlass 
                              ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                              : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                          }`}
                        />
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItemRow(idx)}
                            className="p-2 text-neutral-400 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Pre-filled message */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    WhatsApp Order Pre-filled Message (Optional Override)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappMessage: e.target.value }))}
                    placeholder={`Default: Hello! I would like to order the ${formData.name || 'hamper'} for ${formData.formattedPrice}.`}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none ${
                      isGlass 
                        ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                        : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
                {productToEdit && (
                  isConfirmingDelete ? (
                    <div className="mr-auto flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-2xl animate-fade-in">
                      <span className="text-xs text-rose-300 font-medium">Permanently delete?</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (isReserveMode || formData.category === 'reserve') {
                            deleteReserveProduct(productToEdit.id);
                          } else {
                            deleteProduct(productToEdit.id);
                          }
                          setIsConfirmingDelete(false);
                          onClose();
                        }}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow transition-all"
                      >
                        Yes, Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsConfirmingDelete(false)}
                        className="px-2 py-1 rounded-xl text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsConfirmingDelete(true)}
                      className="mr-auto px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Hamper</span>
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isGlass ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.14em] flex items-center gap-2 shadow-lg transition-all ${
                    isGlass
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-black'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{productToEdit ? 'Save Changes' : 'Publish to Website'}</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
