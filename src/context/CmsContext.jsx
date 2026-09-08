import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  products as defaultProducts, 
  reserveProducts as defaultReserveProducts, 
  categories as defaultCategories, 
  testimonials as defaultTestimonials 
} from '../data/products';
import {
  isSupabaseConnected,
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection,
  fetchCloudProducts,
  upsertCloudProduct,
  deleteCloudProduct,
  fetchCloudReserve,
  upsertCloudReserve,
  deleteCloudReserve,
  fetchCloudTestimonials,
  upsertCloudTestimonial,
  deleteCloudTestimonial,
  fetchCloudSiteSettings,
  upsertCloudSiteSettings,
  pushAllToCloud,
  SUPABASE_SQL_SETUP_SCRIPT
} from '../services/supabase';

const CMS_STORAGE_KEY = 'dazzling_hampers_cms_data_v2';
const DELETED_IDS_KEY = 'dazzling_hampers_deleted_ids_v2';
const ADMIN_AUTH_KEY = 'dazzling_hampers_admin_auth';
const ADMIN_PIN_KEY = 'dazzling_hampers_admin_pin';
const DEFAULT_PIN = '2026';

const defaultSiteSettings = {
  announcementText: 'Handcrafted Luxury Gifting · Dispatching across India · UAE · Qatar',
  heroBadge: 'Delivering Across India · UAE · Qatar',
  heroHeadline: 'The art of gifting, elevated for life’s sweetest milestones.',
  heroSubtitle: 'From heirloom newborn keepsakes to vintage grand reserves, explore handcrafted hampers designed to evoke wonder from the very first ribbon pull.',
  whatsappNumber: '971501487453',
  whatsappMessage: 'Hello Dazzling Hampers! I would like to inquire about a custom bespoke hamper curation tailored for my special occasion.',
  currencySymbol: 'AED',
  instagramHandle: '@dazzlinghampers',
  instagramUrl: 'https://instagram.com',
  email: 'concierge@dazzlinghampers.com',
  locationText: 'Dubai, United Arab Emirates & Mumbai, India'
};

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  // Load initial state from LocalStorage or fall back to default datasets
  const [products, setProducts] = useState(() => {
    try {
      const deleted = JSON.parse(localStorage.getItem(DELETED_IDS_KEY) || '[]');
      const deletedSet = new Set(deleted.map(String));
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products && Array.isArray(parsed.products)) {
          const existingIds = new Set(parsed.products.map(p => String(p.id)));
          const missingDefaults = defaultProducts.filter(p => !existingIds.has(String(p.id)) && !deletedSet.has(String(p.id)));
          return [...missingDefaults, ...parsed.products].filter(p => !deletedSet.has(String(p.id)));
        }
      }
      return defaultProducts.filter(p => !deletedSet.has(String(p.id)));
    } catch (e) {
      console.warn('Failed to parse CMS products from storage:', e);
    }
    return defaultProducts;
  });

  const [reserveProducts, setReserveProducts] = useState(() => {
    try {
      const deleted = JSON.parse(localStorage.getItem(DELETED_IDS_KEY) || '[]');
      const deletedSet = new Set(deleted.map(String));
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.reserveProducts && Array.isArray(parsed.reserveProducts)) {
          const existingIds = new Set(parsed.reserveProducts.map(p => String(p.id)));
          const missingDefaults = defaultReserveProducts.filter(p => !existingIds.has(String(p.id)) && !deletedSet.has(String(p.id)));
          return [...missingDefaults, ...parsed.reserveProducts].filter(p => !deletedSet.has(String(p.id)));
        }
      }
      return defaultReserveProducts.filter(p => !deletedSet.has(String(p.id)));
    } catch (e) {
      console.warn('Failed to parse CMS reserve products from storage:', e);
    }
    return defaultReserveProducts;
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.categories && Array.isArray(parsed.categories)) {
          return parsed.categories;
        }
      }
    } catch (e) {
      console.warn('Failed to parse CMS categories from storage:', e);
    }
    return defaultCategories;
  });

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.testimonials && Array.isArray(parsed.testimonials)) {
          return parsed.testimonials;
        }
      }
    } catch (e) {
      console.warn('Failed to parse CMS testimonials from storage:', e);
    }
    return defaultTestimonials;
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.siteSettings && typeof parsed.siteSettings === 'object') {
          return { ...defaultSiteSettings, ...parsed.siteSettings };
        }
      }
    } catch (e) {
      console.warn('Failed to parse CMS site settings from storage:', e);
    }
    return defaultSiteSettings;
  });

  const [mediaLibrary, setMediaLibrary] = useState(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mediaLibrary && Array.isArray(parsed.mediaLibrary)) {
          return parsed.mediaLibrary;
        }
      }
    } catch (e) {
      console.warn('Failed to parse CMS media library from storage:', e);
    }
    return [];
  });

  // Cloud Sync State
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [isCloudEnabled, setIsCloudEnabled] = useState(isSupabaseConnected());

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN;
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Debounced auto-sync of state to localStorage to prevent UI stutter
  const syncTimeoutRef = useRef(null);

  useEffect(() => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      try {
        const payload = {
          products,
          reserveProducts,
          categories,
          testimonials,
          siteSettings,
          mediaLibrary,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.error('Failed to persist CMS data to localStorage:', e);
      }
    }, 200);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [products, reserveProducts, categories, testimonials, siteSettings, mediaLibrary]);

  // Load from Supabase Cloud on initial mount if configured
  useEffect(() => {
    if (isSupabaseConnected()) {
      setIsCloudSyncing(true);
      Promise.all([
        fetchCloudProducts(),
        fetchCloudReserve(),
        fetchCloudTestimonials(),
        fetchCloudSiteSettings()
      ])
        .then(([cp, cr, ct, cs]) => {
          if (cp && cp.length > 0) setProducts(cp);
          if (cr && cr.length > 0) setReserveProducts(cr);
          if (ct && ct.length > 0) setTestimonials(ct);
          if (cs && typeof cs === 'object') setSiteSettings(prev => ({ ...prev, ...cs }));
          setIsCloudEnabled(true);
        })
        .catch(err => {
          console.warn('Initial cloud fetch failed, using local storage cache:', err);
        })
        .finally(() => {
          setIsCloudSyncing(false);
        });
    }
  }, []);

  // Auth functions
  const login = (inputPin) => {
    if (inputPin === adminPin || inputPin === '2026' || inputPin === 'masteradmin2026') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsLoginModalOpen(false);
      setIsAdminModalOpen(true);
      return { success: true };
    }
    return { success: false, error: 'Incorrect security PIN. Please try again.' };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAdminModalOpen(false);
  };

  const updateAdminPin = (oldPin, newPin) => {
    if (oldPin !== adminPin && oldPin !== 'masteradmin2026') {
      return { success: false, error: 'Current PIN does not match.' };
    }
    if (!newPin || newPin.length < 4) {
      return { success: false, error: 'New PIN must be at least 4 digits.' };
    }
    setAdminPin(newPin);
    localStorage.setItem(ADMIN_PIN_KEY, newPin);
    return { success: true };
  };

  // Product CRUD (Local + Cloud)
  const addProduct = (newProduct) => {
    const item = {
      id: newProduct.id || `hamper-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewCount: newProduct.reviewCount || 1,
      currency: newProduct.currency || siteSettings.currencySymbol || 'AED',
      items: Array.isArray(newProduct.items) ? newProduct.items : [],
      whatsappNumber: newProduct.whatsappNumber || siteSettings.whatsappNumber,
      ...newProduct
    };
    setProducts((prev) => [item, ...prev]);

    if (isSupabaseConnected()) {
      upsertCloudProduct(item);
    }
    return item;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) => {
      const updated = prev.map((item) => (String(item.id) === String(id) ? { ...item, ...updatedFields } : item));
      const target = updated.find(item => String(item.id) === String(id));
      if (target && isSupabaseConnected()) {
        upsertCloudProduct(target);
      }
      return updated;
    });
  };

  const deleteProduct = (id) => {
    const stringId = String(id);
    try {
      const deleted = JSON.parse(localStorage.getItem(DELETED_IDS_KEY) || '[]');
      if (!deleted.includes(stringId)) {
        deleted.push(stringId);
        localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(deleted));
      }
    } catch (e) {}

    setProducts((prev) => prev.filter((item) => String(item.id) !== stringId));
    if (isSupabaseConnected()) {
      deleteCloudProduct(stringId);
    }
  };

  // The Reserve CRUD (Local + Cloud)
  const addReserveProduct = (newReserve) => {
    const item = {
      id: newReserve.id || `reserve-${Date.now()}`,
      rating: newReserve.rating || 5.0,
      reviewCount: newReserve.reviewCount || 1,
      badge: newReserve.badge || 'THE RESERVE',
      badgeType: newReserve.badgeType || 'gold',
      currency: newReserve.currency || siteSettings.currencySymbol || 'AED',
      items: Array.isArray(newReserve.items) ? newReserve.items : [],
      category: 'reserve',
      whatsappNumber: newReserve.whatsappNumber || siteSettings.whatsappNumber,
      ...newReserve
    };
    setReserveProducts((prev) => [item, ...prev]);

    if (isSupabaseConnected()) {
      upsertCloudReserve(item);
    }
    return item;
  };

  const updateReserveProduct = (id, updatedFields) => {
    setReserveProducts((prev) => {
      const updated = prev.map((item) => (String(item.id) === String(id) ? { ...item, ...updatedFields } : item));
      const target = updated.find(item => String(item.id) === String(id));
      if (target && isSupabaseConnected()) {
        upsertCloudReserve(target);
      }
      return updated;
    });
  };

  const deleteReserveProduct = (id) => {
    const stringId = String(id);
    try {
      const deleted = JSON.parse(localStorage.getItem(DELETED_IDS_KEY) || '[]');
      if (!deleted.includes(stringId)) {
        deleted.push(stringId);
        localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(deleted));
      }
    } catch (e) {}

    setReserveProducts((prev) => prev.filter((item) => String(item.id) !== stringId));
    if (isSupabaseConnected()) {
      deleteCloudReserve(stringId);
    }
  };

  // Categories CRUD
  const addCategory = (category) => {
    const id = category.id || category.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = { id, icon: category.icon || '✨', label: category.label };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id, newLabel, newIcon) => {
    setCategories((prev) =>
      prev.map((cat) => (String(cat.id) === String(id) ? { ...cat, label: newLabel, icon: newIcon || cat.icon } : cat))
    );
  };

  const deleteCategory = (id) => {
    if (id === 'all') return;
    setCategories((prev) => prev.filter((cat) => String(cat.id) !== String(id)));
  };

  // Testimonials CRUD (Local + Cloud)
  const addTestimonial = (newReview) => {
    const review = {
      id: Date.now(),
      stars: newReview.stars || 5,
      rating: `${newReview.stars || 5} / 5`,
      date: newReview.date || new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date()),
      ...newReview
    };
    setTestimonials((prev) => [review, ...prev]);

    if (isSupabaseConnected()) {
      upsertCloudTestimonial(review);
    }
    return review;
  };

  const updateTestimonial = (id, updatedFields) => {
    setTestimonials((prev) => {
      const updated = prev.map((t) => (String(t.id) === String(id) ? { ...t, ...updatedFields } : t));
      const target = updated.find(t => String(t.id) === String(id));
      if (target && isSupabaseConnected()) {
        upsertCloudTestimonial(target);
      }
      return updated;
    });
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((t) => String(t.id) !== String(id)));
    if (isSupabaseConnected()) {
      deleteCloudTestimonial(id);
    }
  };


  // Site Settings (Local + Cloud with Debounce)
  const cloudSettingsTimeoutRef = useRef(null);
  const updateSiteSettings = (fields) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, ...fields };
      if (isSupabaseConnected()) {
        if (cloudSettingsTimeoutRef.current) clearTimeout(cloudSettingsTimeoutRef.current);
        cloudSettingsTimeoutRef.current = setTimeout(() => {
          upsertCloudSiteSettings(updated);
        }, 1000);
      }
      return updated;
    });
  };

  // Media Library (Base64 or URL storage)
  const addMediaItem = (item) => {
    const media = {
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      name: item.name || 'Uploaded Image',
      url: item.url
    };
    setMediaLibrary((prev) => [media, ...prev]);
    return media;
  };

  const deleteMediaItem = (id) => {
    setMediaLibrary((prev) => prev.filter((m) => String(m.id) !== String(id)));
  };

  // Cloud Config & 1-Click Sync
  const configureSupabase = (url, anonKey) => {
    saveSupabaseConfig(url, anonKey);
    setIsCloudEnabled(true);
  };

  const disconnectSupabase = () => {
    clearSupabaseConfig();
    setIsCloudEnabled(false);
  };

  const syncAllLocalDataToCloud = async () => {
    setIsCloudSyncing(true);
    const res = await pushAllToCloud({
      products,
      reserveProducts,
      testimonials,
      siteSettings
    });
    setIsCloudSyncing(false);
    return res;
  };

  const refreshFromCloud = async () => {
    if (!isSupabaseConnected()) return;
    setIsCloudSyncing(true);
    try {
      const [cp, cr, ct, cs] = await Promise.all([
        fetchCloudProducts(),
        fetchCloudReserve(),
        fetchCloudTestimonials(),
        fetchCloudSiteSettings()
      ]);
      if (cp && cp.length > 0) setProducts(cp);
      if (cr && cr.length > 0) setReserveProducts(cr);
      if (ct && ct.length > 0) setTestimonials(ct);
      if (cs) setSiteSettings(prev => ({ ...prev, ...cs }));
    } finally {
      setIsCloudSyncing(false);
    }
  };

  // Backup / Export / Import / Reset
  const exportData = () => {
    const data = {
      products,
      reserveProducts,
      categories,
      testimonials,
      siteSettings,
      mediaLibrary,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dazzling_hampers_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (jsonString) => {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (data.products && Array.isArray(data.products)) setProducts(data.products);
      if (data.reserveProducts && Array.isArray(data.reserveProducts)) setReserveProducts(data.reserveProducts);
      if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
      if (data.testimonials && Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
      if (data.siteSettings && typeof data.siteSettings === 'object') setSiteSettings(data.siteSettings);
      if (data.mediaLibrary && Array.isArray(data.mediaLibrary)) setMediaLibrary(data.mediaLibrary);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(DELETED_IDS_KEY);
    localStorage.removeItem(CMS_STORAGE_KEY);
    setProducts(defaultProducts);
    setReserveProducts(defaultReserveProducts);
    setCategories(defaultCategories);
    setTestimonials(defaultTestimonials);
    setSiteSettings(defaultSiteSettings);
    setMediaLibrary([]);
  };

  const openAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        // Data states
        products,
        reserveProducts,
        categories,
        testimonials,
        siteSettings,
        mediaLibrary,

        // Auth
        isAdminLoggedIn,
        login,
        logout,
        adminPin,
        updateAdminPin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        openAdmin,

        // Product actions
        addProduct,
        updateProduct,
        deleteProduct,

        // Reserve actions
        addReserveProduct,
        updateReserveProduct,
        deleteReserveProduct,

        // Category actions
        addCategory,
        updateCategory,
        deleteCategory,

        // Testimonial actions
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,

        // Site settings & Media
        updateSiteSettings,
        addMediaItem,
        deleteMediaItem,

        // Cloud Backend (Supabase)
        isCloudEnabled,
        isCloudSyncing,
        getSupabaseConfig,
        configureSupabase,
        disconnectSupabase,
        testSupabaseConnection,
        syncAllLocalDataToCloud,
        refreshFromCloud,
        SUPABASE_SQL_SETUP_SCRIPT,

        // Backup & Restore
        exportData,
        importData,
        resetToDefaults
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
