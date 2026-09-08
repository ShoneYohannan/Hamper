import React, { useState, useRef, useEffect } from 'react';
import { 
  Package, 
  Crown, 
  Image as ImageIcon, 
  Star, 
  Settings, 
  Database, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Search, 
  Download, 
  RotateCcw, 
  KeyRound, 
  Layers, 
  Copy,
  FolderOpen,
  Cloud,
  Zap,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import { useCms } from '../../context/CmsContext';
import ProductEditorModal from './ProductEditorModal';
import ReviewEditorModal from './ReviewEditorModal';
import WhatsAppIcon from '../icons/WhatsAppIcon';

export default function AdminPortal() {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    logout,
    products,
    deleteProduct,
    reserveProducts,
    deleteReserveProduct,
    categories,
    addCategory,
    deleteCategory,
    testimonials,
    deleteTestimonial,
    siteSettings,
    updateSiteSettings,
    mediaLibrary,
    addMediaItem,
    deleteMediaItem,
    exportData,
    importData,
    resetToDefaults,
    updateAdminPin,
    // Supabase Cloud Backend
    isCloudEnabled,
    isCloudSyncing,
    getSupabaseConfig,
    configureSupabase,
    disconnectSupabase,
    testSupabaseConnection,
    syncAllLocalDataToCloud,
    refreshFromCloud,
    SUPABASE_SQL_SETUP_SCRIPT
  } = useCms();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'reserve', 'media', 'reviews', 'categories', 'settings', 'cloud', 'backup'

  // Cloud Config Form State
  const [cloudUrl, setCloudUrl] = useState(() => getSupabaseConfig().url);
  const [cloudKey, setCloudKey] = useState(() => getSupabaseConfig().anonKey);
  const [cloudTestResult, setCloudTestResult] = useState(null);
  const [isTestingCloud, setIsTestingCloud] = useState(false);
  const [cloudSyncResult, setCloudSyncResult] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Modals state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isReserveMode, setIsReserveMode] = useState(false);

  const [editingReview, setEditingReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // In-app Delete Confirmation states (bypasses blocked browser window.confirm)
  const [itemToDelete, setItemToDelete] = useState(null); // { id, name, isReserve: boolean }
  const [reviewToDelete, setReviewToDelete] = useState(null); // testimonial object
  const [categoryToDelete, setCategoryToDelete] = useState(null); // category object
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Search & Filter state for products
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  // New Category State
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('✨');

  // Change PIN State
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState(null);

  // Media upload input
  const mediaInputRef = useRef(null);
  const importFileRef = useRef(null);
  const [copiedUrl, setCopiedUrl] = useState('');

  if (!isAdminModalOpen) return null;

  // Handlers for product editing
  const handleOpenAddProduct = (reserve = false) => {
    setEditingProduct(null);
    setIsReserveMode(reserve);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod, reserve = false) => {
    setEditingProduct(prod);
    setIsReserveMode(reserve);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id, name, isReserve = false) => {
    setItemToDelete({ id, name, isReserve });
  };


  // Media upload
  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result;
      if (typeof url === 'string') {
        addMediaItem({ name: file.name, url });
      }
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  // Import JSON backup
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result;
      if (typeof content === 'string') {
        const res = importData(content);
        if (res.success) {
          alert('Catalog & settings restored successfully!');
        } else {
          alert(`Import error: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  const handlePinUpdate = (e) => {
    e.preventDefault();
    const res = updateAdminPin(oldPin, newPin);
    if (res.success) {
      setPinMessage({ type: 'success', text: 'Security PIN updated successfully!' });
      setOldPin('');
      setNewPin('');
    } else {
      setPinMessage({ type: 'error', text: res.error });
    }
  };

  // Filtered product lists
  const filteredProducts = products.filter(p => {
    const matchesCat = filterCat === 'all' || p.category === filterCat;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0d0214] text-[#F8F6FA] animate-fade-in overflow-hidden">
      
      {/* Top Admin Navigation Header */}
      <header className="h-16 sm:h-20 bg-[#160420] border-b border-[#D4AF37]/30 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-black shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg sm:text-2xl font-normal tracking-tight text-white">
                Dazzling Hampers Atelier CMS
              </h1>
              {isCloudEnabled ? (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>Supabase Live</span>
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <span>Local Mode</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400">
              Instant Content Management & Catalog Editor
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#D4AF37] text-black hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Website</span>
            <span className="sm:hidden">Live Site</span>
          </button>

          <button
            onClick={logout}
            title="Log out of CMS"
            className="p-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 transition-colors border border-white/10"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main CMS Container: Sidebar Tabs + Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-20 sm:w-64 bg-[#14031c] border-r border-white/10 flex flex-col justify-between shrink-0 overflow-y-auto custom-scrollbar">
          <div className="p-3 sm:p-4 space-y-1.5">
            
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">Collections ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reserve')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'reserve'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Crown className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">The Reserve ({reserveProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'media'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">Image Uploader</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Star className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">Reviews ({testimonials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'categories'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">Categories</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">Banners & Text</span>
            </button>

            <button
              onClick={() => setActiveTab('cloud')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'cloud'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Cloud className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">Supabase Cloud</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'backup'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B78A45]/10 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span className="hidden sm:inline">Backup & Reset</span>
            </button>
          </div>


          <div className="p-4 border-t border-white/10 hidden sm:block">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
              <span className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider block">
                Atelier Status
              </span>
              <p className="text-[11px] text-neutral-300">
                All edits take effect across the entire website instantly.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Main Content Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          
          {/* TAB 1: PRODUCTS / COLLECTIONS */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                    Collections & Hampers Catalog
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage bouqets, baby gifts, gourmet treats, and celebratory hampers
                  </p>
                </div>

                <button
                  onClick={() => handleOpenAddProduct(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black hover:brightness-110 flex items-center gap-2 shadow-lg shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Hamper</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by hamper title or description..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCat(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase whitespace-nowrap transition-all ${
                        filterCat === cat.id
                          ? 'bg-[#D4AF37] text-black font-semibold'
                          : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#180422] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group shadow-md"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {p.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9.5px] font-semibold uppercase tracking-wider bg-[#D4AF37] text-black">
                            {p.badge}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4 space-y-2">
                        <h3 className="font-serif text-lg font-medium text-white line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                        <div className="pt-2 flex items-baseline justify-between">
                          <span className="text-base font-serif font-bold text-[#D4AF37]">
                            {p.formattedPrice}
                          </span>
                          <span className="text-[10px] uppercase text-neutral-400 font-medium">
                            {categories.find(c => c.id === p.category)?.label || p.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-3 bg-black/30 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEditProduct(p, false)}
                        className="flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Edit Hamper</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name, false)}
                        className="p-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 space-y-3">
                  <Package className="w-10 h-10 mx-auto text-neutral-500" />
                  <p className="text-sm text-neutral-400">No hampers found matching your search.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setFilterCat('all'); }}
                    className="text-xs text-[#D4AF37] font-semibold underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: THE RESERVE VAULT */}
          {activeTab === 'reserve' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#D4AF37]" />
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                      The Reserve Vault Hampers
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Bespoke high-ticket showcase allocations (e.g. 500 AED / 450 AED heart trunks, Bento cakes & luxury perfumes)
                  </p>
                </div>

                <button
                  onClick={() => handleOpenAddProduct(true)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black hover:brightness-110 flex items-center gap-2 shadow-lg shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Reserve Piece</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reserveProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#180422] rounded-3xl border border-[#D4AF37]/30 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all group shadow-xl"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black">
                          {p.badge || 'THE RESERVE'}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-xl font-medium text-white leading-snug">
                            {p.name}
                          </h3>
                          <span className="text-xl font-serif font-bold text-[#D4AF37] shrink-0">
                            {p.formattedPrice}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {p.description}
                        </p>

                        {p.items && p.items.length > 0 && (
                          <div className="pt-2 border-t border-white/10 space-y-1">
                            <span className="text-[10px] uppercase font-semibold text-[#D4AF37] tracking-wider block">
                              Inclusions ({p.items.length}):
                            </span>
                            <ul className="text-[11px] text-neutral-400 space-y-0.5 list-disc list-inside">
                              {p.items.slice(0, 3).map((item, i) => (
                                <li key={i} className="truncate">{item}</li>
                              ))}
                              {p.items.length > 3 && (
                                <li className="text-[#D4AF37]">+ {p.items.length - 3} more items</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleOpenEditProduct(p, true)}
                        className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Edit Reserve Piece</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name, true)}
                        className="p-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Reserve item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA & IMAGE UPLOADER */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                    Image Uploader & Media Library
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Upload photos directly from your device. You can copy image URLs or reuse them in any hamper.
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => mediaInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black hover:brightness-110 flex items-center gap-2 shadow-lg"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Photo</span>
                  </button>
                  <input
                    type="file"
                    ref={mediaInputRef}
                    onChange={handleMediaUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Upload Drop Zone Card */}
              <div 
                onClick={() => mediaInputRef.current?.click()}
                className="border-2 border-dashed border-[#D4AF37]/40 rounded-3xl p-8 sm:p-12 text-center hover:border-[#D4AF37] hover:bg-white/5 transition-all cursor-pointer bg-black/20 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-normal text-white mt-4">
                  Tap to upload photos from your phone or laptop
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                  Supports JPG, PNG, WEBP. Uploaded images are instantly stored and ready for your hamper catalog.
                </p>
              </div>

              {/* Uploaded Photos Gallery */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-normal text-white">
                  Uploaded Photos ({mediaLibrary.length})
                </h3>

                {mediaLibrary.length === 0 ? (
                  <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/5 text-xs text-neutral-400">
                    No custom photos uploaded yet. Click upload above to add your first image!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mediaLibrary.map((m) => (
                      <div
                        key={m.id}
                        className="bg-[#180422] rounded-2xl border border-white/10 overflow-hidden group hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
                      >
                        <div className="aspect-square relative bg-neutral-900 overflow-hidden">
                          <img
                            src={m.url}
                            alt={m.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-2.5 flex items-center justify-between gap-1 bg-black/40 text-[11px]">
                          <span className="truncate text-neutral-300 flex-1">{m.name}</span>
                          <button
                            onClick={() => copyToClipboard(m.url)}
                            className="p-1.5 rounded hover:bg-white/10 text-[#D4AF37]"
                            title="Copy Image URL"
                          >
                            {copiedUrl === m.url ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => deleteMediaItem(m.id)}
                            className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400"
                            title="Delete Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: TESTIMONIALS & REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                    Patron Testimonials & Reviews
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage customer reviews showcased on the homepage and reviews section
                  </p>
                </div>

                <button
                  onClick={() => { setEditingReview(null); setIsReviewModalOpen(true); }}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black hover:brightness-110 flex items-center gap-2 shadow-lg shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#180422] rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#D4AF37]/40 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#D4AF37]">
                          {[...Array(t.stars || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                          ))}
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-neutral-400 px-2 py-0.5 rounded-full bg-white/5">
                          {t.occasionLabel || 'Verified Patron'}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-300 italic leading-relaxed">
                        {t.quote}
                      </p>

                      <div className="pt-2 border-t border-white/5">
                        <span className="text-xs font-semibold text-white block">
                          {t.author} · <span className="text-neutral-400 font-normal">{t.location}</span>
                        </span>
                        <span className="text-[11px] text-[#D4AF37] block truncate">
                          {t.hamper}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditingReview(t); setIsReviewModalOpen(true); }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white"
                        title="Edit review"
                      >
                        <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                      </button>
                      <button
                        onClick={() => setReviewToDelete(t)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Collections Category Tabs
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Add or manage category pills used to filter products in the catalog
                </p>
              </div>

              {/* Add category form */}
              <div className="bg-[#180422] p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 space-y-1 w-full">
                  <label className="text-xs font-semibold uppercase text-neutral-400">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCatLabel}
                    onChange={(e) => setNewCatLabel(e.target.value)}
                    placeholder="e.g. Wedding & Anniversary Hampers"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                  />
                </div>
                <div className="w-24 space-y-1">
                  <label className="text-xs font-semibold uppercase text-neutral-400">
                    Emoji Icon
                  </label>
                  <input
                    type="text"
                    value={newCatIcon}
                    onChange={(e) => setNewCatIcon(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-center text-white focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    if (newCatLabel.trim()) {
                      addCategory({ label: newCatLabel.trim(), icon: newCatIcon });
                      setNewCatLabel('');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black hover:brightness-110 flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Category list */}
              <div className="space-y-2">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#180422] px-5 py-3.5 rounded-2xl border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{c.icon}</span>
                      <span className="text-sm font-medium text-white">{c.label}</span>
                      <code className="text-[10px] text-neutral-500 bg-black/30 px-2 py-0.5 rounded">
                        id: {c.id}
                      </code>
                    </div>

                    {c.id !== 'all' && (
                      <button
                        onClick={() => setCategoryToDelete(c)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 6: SITE SETTINGS & BANNERS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Website Copy, Announcement & WhatsApp Concierge
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Update live text, phone numbers, delivery locations, and banners
                </p>
              </div>

              <div className="bg-[#180422] p-6 rounded-3xl border border-white/10 space-y-5">
                {/* Announcement Bar */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Top Header Announcement Bar
                  </label>
                  <input
                    type="text"
                    value={siteSettings.announcementText}
                    onChange={(e) => updateSiteSettings({ announcementText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                  />
                  <p className="text-[11px] text-neutral-400">
                    Displays at the very top of the website (e.g. Delivery destinations or promotion alerts).
                  </p>
                </div>

                {/* Hero Headline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={siteSettings.heroHeadline}
                    onChange={(e) => updateSiteSettings({ heroHeadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                  />
                </div>

                {/* Hero Subtitle */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Hero Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={siteSettings.heroSubtitle}
                    onChange={(e) => updateSiteSettings({ heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                  />
                </div>

                {/* Hero Floating Pill */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Hero Floating Badge Text
                  </label>
                  <input
                    type="text"
                    value={siteSettings.heroBadge}
                    onChange={(e) => updateSiteSettings({ heroBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                  />
                </div>

                {/* WhatsApp Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                      <span>WhatsApp Order Phone (International Format)</span>
                    </label>
                    <input
                      type="text"
                      value={siteSettings.whatsappNumber}
                      onChange={(e) => updateSiteSettings({ whatsappNumber: e.target.value })}
                      placeholder="e.g. 971501487453 (no plus or spaces)"
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                      Default Currency Symbol
                    </label>
                    <input
                      type="text"
                      value={siteSettings.currencySymbol}
                      onChange={(e) => updateSiteSettings({ currencySymbol: e.target.value })}
                      placeholder="AED or ₹ or $"
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Locations and Contact */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Concierge Location & Email
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={siteSettings.locationText}
                      onChange={(e) => updateSiteSettings({ locationText: e.target.value })}
                      placeholder="Location description"
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={siteSettings.email}
                      onChange={(e) => updateSiteSettings({ email: e.target.value })}
                      placeholder="Concierge email"
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Security PIN Change */}
              <div className="bg-[#180422] p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif text-lg font-normal text-white">
                    Change Security PIN
                  </h3>
                </div>

                <form onSubmit={handlePinUpdate} className="flex flex-col sm:flex-row gap-3 items-end">
                  <div className="space-y-1 flex-1 w-full">
                    <label className="text-xs font-semibold uppercase text-neutral-400">
                      Current PIN
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPin}
                      onChange={(e) => setOldPin(e.target.value)}
                      placeholder="Current PIN"
                      className="w-full px-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 flex-1 w-full">
                    <label className="text-xs font-semibold uppercase text-neutral-400">
                      New PIN (4+ digits)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="New PIN"
                      className="w-full px-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
                  >
                    Update PIN
                  </button>
                </form>

                {pinMessage && (
                  <p className={`text-xs ${pinMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {pinMessage.text}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB: SUPABASE CLOUD DATABASE */}
          {activeTab === 'cloud' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-[#D4AF37]" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                    Supabase Cloud Backend
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Connect your free Supabase PostgreSQL database so changes made on any phone or laptop update live for all website visitors worldwide.
                </p>
              </div>

              {/* Status Banner */}
              <div className={`p-6 rounded-3xl border transition-all ${
                isCloudEnabled 
                  ? 'bg-emerald-950/20 border-emerald-500/30' 
                  : 'bg-amber-950/20 border-amber-500/30'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isCloudEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {isCloudEnabled ? <Zap className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-medium text-white">
                          {isCloudEnabled ? 'Supabase Live Cloud Active' : 'Local Storage Mode (Offline)'}
                        </h3>
                        {isCloudSyncing && (
                          <span className="text-[10px] text-[#D4AF37] flex items-center gap-1 animate-pulse">
                            <RefreshCw className="w-3 h-3 animate-spin" /> Syncing...
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {isCloudEnabled 
                          ? `Connected to: ${cloudUrl || 'Supabase Project'}`
                          : 'Currently storing edits on this device only. Connect Supabase below to sync globally across all customers.'}
                      </p>
                    </div>
                  </div>

                  {isCloudEnabled && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={async () => {
                          await refreshFromCloud();
                          alert('Refreshed latest data from Supabase!');
                        }}
                        disabled={isCloudSyncing}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                        <span>Pull from Cloud</span>
                      </button>

                      <button
                        onClick={async () => {
                          const res = await syncAllLocalDataToCloud();
                          alert(res.message);
                        }}
                        disabled={isCloudSyncing}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black hover:brightness-110 flex items-center gap-1.5 transition-all shadow"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Push All Local Data to Cloud</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Supabase Credentials Setup Form */}
              <div className="bg-[#180422] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-normal text-white">
                    Supabase Project Credentials
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Find these in your Supabase Dashboard under <strong>Project Settings → API</strong>.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                      Project URL (HTTPS)
                    </label>
                    <input
                      type="text"
                      value={cloudUrl}
                      onChange={(e) => setCloudUrl(e.target.value)}
                      placeholder="https://your-project-ref.supabase.co"
                      className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                      Anon Public API Key
                    </label>
                    <input
                      type="password"
                      value={cloudKey}
                      onChange={(e) => setCloudKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white focus:outline-none"
                    />
                  </div>
                </div>

                {cloudTestResult && (
                  <div className={`p-4 rounded-xl text-xs flex items-start gap-2 border ${
                    cloudTestResult.success 
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  }`}>
                    {cloudTestResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div>
                      <span className="font-semibold block">{cloudTestResult.message}</span>
                      {cloudTestResult.needsTables && (
                        <p className="text-[11px] mt-1 text-emerald-400/90">
                          Step 2 below has the exact SQL script. Just copy and paste it into the Supabase SQL Editor and click RUN!
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      setIsTestingCloud(true);
                      setCloudTestResult(null);
                      const res = await testSupabaseConnection(cloudUrl, cloudKey);
                      setCloudTestResult(res);
                      setIsTestingCloud(false);
                    }}
                    disabled={isTestingCloud || !cloudUrl.trim() || !cloudKey.trim()}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 transition-all disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingCloud ? 'animate-spin' : ''}`} />
                    <span>{isTestingCloud ? 'Testing...' : 'Test Connection'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {isCloudEnabled && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Disconnect Supabase cloud? The app will revert to local storage mode.')) {
                            disconnectSupabase();
                            setCloudUrl('');
                            setCloudKey('');
                            setCloudTestResult(null);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-rose-400 transition-colors"
                      >
                        Disconnect
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (!cloudUrl.trim() || !cloudKey.trim()) {
                          alert('Please enter both Supabase URL and Anon API key.');
                          return;
                        }
                        configureSupabase(cloudUrl, cloudKey);
                        alert('Supabase credentials saved! Your website is now cloud-connected.');
                      }}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-black hover:brightness-110 flex items-center gap-1.5 shadow"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save & Connect</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 30-Second Setup Instructions & SQL Script */}
              <div className="bg-[#180422] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
                <div>
                  <h3 className="font-serif text-lg font-normal text-white flex items-center gap-2">
                    <span>⚡ 1-Minute Supabase Quick Setup Guide</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Follow these 3 quick steps to activate your free cloud database:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-[11px]">
                      1
                    </span>
                    <h4 className="font-semibold text-white">Create Free Project</h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#D4AF37] underline">supabase.com</a>, log in with GitHub/Google, and click "New Project".
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-[11px]">
                      2
                    </span>
                    <h4 className="font-semibold text-white">Run SQL Script</h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      In Supabase dashboard, click <strong>SQL Editor</strong> on left menu, click <strong>"New query"</strong>, paste the script below, and click <strong>"Run"</strong>.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-[11px]">
                      3
                    </span>
                    <h4 className="font-semibold text-white">Connect & Push</h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      Copy your Project URL & Anon Key from <strong>Settings → API</strong>, paste above, and click <strong>"Save & Connect"</strong>!
                    </p>
                  </div>
                </div>

                {/* SQL Code Box with 1-Click Copy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-neutral-400">
                      Supabase SQL Setup Script
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2500);
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#D4AF37] text-black hover:brightness-110 flex items-center gap-1.5 transition-all shadow"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-[11px] text-neutral-300 font-mono overflow-x-auto max-h-56 custom-scrollbar">
                    {SUPABASE_SQL_SETUP_SCRIPT}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Backup, Restore & Reset
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Export complete website data as a JSON file, or restore from a previous backup
                </p>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1-Click Export */}
                <div className="bg-[#180422] p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <Download className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-white">
                    Download Full JSON Backup
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Saves all products, reserve hampers, uploaded photos, reviews, and site settings to a single backup file on your computer.
                  </p>
                  <button
                    onClick={exportData}
                    className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Backup (.json)</span>
                  </button>
                </div>

                {/* Restore Import */}
                <div className="bg-[#180422] p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-white">
                    Restore from Backup
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Upload a previously downloaded JSON backup file to instantly restore all products and settings.
                  </p>
                  <button
                    onClick={() => importFileRef.current?.click()}
                    className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center gap-2"
                  >
                    <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>Select Backup File</span>
                  </button>
                  <input
                    type="file"
                    ref={importFileRef}
                    onChange={handleImportFile}
                    accept=".json"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Danger Zone: Reset to Factory Defaults */}
              <div className="bg-rose-950/20 border border-rose-500/30 p-6 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                  <RotateCcw className="w-4 h-4" />
                  <span>Factory Reset</span>
                </div>
                <h4 className="text-white font-serif text-lg">
                  Reset Catalog to Original Sample Data
                </h4>
                <p className="text-xs text-neutral-400">
                  This will clear custom edits and restore the original pre-loaded luxury collections.
                </p>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all"
                >
                  Reset to Factory Data
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Product & Reserve Editor Modal */}
      <ProductEditorModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={editingProduct}
        isReserveMode={isReserveMode}
      />

      {/* Review Editor Modal */}
      <ReviewEditorModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviewToEdit={editingReview}
      />

      {/* ─── IN-APP DELETE CONFIRMATION MODALS (100% Reliable & Browser-Popup Proof) ─── */}

      {/* Product / Reserve Delete Confirmation Dialog */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div 
            onClick={() => setItemToDelete(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative bg-[#180422] border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Trash2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-normal text-white">Remove Hamper?</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Are you sure you want to remove <strong className="text-white">"{itemToDelete.name}"</strong> from the website catalog?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (itemToDelete.isReserve) {
                    deleteReserveProduct(itemToDelete.id);
                  } else {
                    deleteProduct(itemToDelete.id);
                  }
                  setItemToDelete(null);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Delete Confirmation Dialog */}
      {reviewToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div 
            onClick={() => setReviewToDelete(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative bg-[#180422] border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Trash2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-normal text-white">Delete Review?</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Are you sure you want to remove the review from <strong className="text-white">"{reviewToDelete.author}"</strong>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReviewToDelete(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTestimonial(reviewToDelete.id);
                  setReviewToDelete(null);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Delete Confirmation Dialog */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div 
            onClick={() => setCategoryToDelete(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative bg-[#180422] border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Trash2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-normal text-white">Delete Category?</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Are you sure you want to remove the category <strong className="text-white">"{categoryToDelete.label}"</strong>? Products in this category will still remain.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteCategory(categoryToDelete.id);
                  setCategoryToDelete(null);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Factory Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div 
            onClick={() => setShowResetConfirm(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative bg-[#180422] border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <RotateCcw className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-normal text-white">Reset to Factory Data?</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                This will discard all custom changes and restore the original pre-loaded luxury hampers.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setShowResetConfirm(false);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

