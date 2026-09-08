// Pure Native Fetch Supabase Cloud Backend Service
// Zero-dependency: Uses native browser fetch to communicate directly with Supabase PostgREST API.
// Works seamlessly on GitHub Pages, Vercel, Netlify, and Localhost without npm install issues.

const SUPABASE_CONFIG_KEY = 'dazzling_hampers_supabase_config_v1';

// Get config from localStorage or Vite environment variables
export function getSupabaseConfig() {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return {
          url: parsed.url.trim().replace(/\/+$/, ''),
          anonKey: parsed.anonKey.trim()
        };
      }
    }
  } catch (e) {
    console.warn('Failed to parse Supabase config from storage:', e);
  }

  return {
    url: envUrl,
    anonKey: envKey
  };
}

export function saveSupabaseConfig(url, anonKey) {
  const cleanUrl = url.trim().replace(/\/+$/, '');
  const cleanKey = anonKey.trim();
  const config = { url: cleanUrl, anonKey: cleanKey };
  localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
  return config;
}

export function clearSupabaseConfig() {
  localStorage.removeItem(SUPABASE_CONFIG_KEY);
}

export function isSupabaseConnected() {
  const conf = getSupabaseConfig();
  return Boolean(conf.url && conf.anonKey);
}

// Helper to make authenticated Supabase REST API requests
async function supabaseFetch(endpoint, options = {}) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    throw new Error('Supabase URL or Anon Key is missing.');
  }

  if (anonKey.startsWith('sb_secret_')) {
    throw new Error('You provided a Supabase Secret Key (sb_secret_...). Please use your public "anon" key from Supabase Dashboard -> Project Settings -> API.');
  }

  const fullUrl = `${url}/rest/v1/${endpoint.replace(/^\/+/, '')}`;
  const headers = {
    'apikey': anonKey,
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(fullUrl, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorMsg = `Supabase error (${response.status}): ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (errJson.message) errorMsg = errJson.message;
      if (errJson.details) errorMsg += ` - ${errJson.details}`;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  // Some endpoints (like 204 No Content) don't return JSON
  if (response.status === 204) return null;
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// Test connection to Supabase
export async function testSupabaseConnection(inputUrl = null, inputKey = null) {
  const conf = inputUrl && inputKey 
    ? { url: inputUrl.trim().replace(/\/+$/, ''), anonKey: inputKey.trim() } 
    : getSupabaseConfig();

  if (!conf.url || !conf.anonKey) {
    return { success: false, message: 'Please enter both Supabase Project URL and Anon API Key.' };
  }

  if (conf.anonKey.startsWith('sb_secret_')) {
    return {
      success: false,
      message: 'You entered a Secret Service Key (sb_secret_...). Please use your public "anon" key from Supabase Dashboard -> Project Settings -> API.'
    };
  }

  try {
    const testUrl = `${conf.url}/rest/v1/products?select=id&limit=1`;
    const res = await fetch(testUrl, {
      headers: {
        'apikey': conf.anonKey,
        'Authorization': `Bearer ${conf.anonKey}`
      }
    });

    if (res.ok) {
      return { success: true, needsTables: false, message: 'Connected to Supabase PostgreSQL database successfully!' };
    }

    if (res.status === 404 || res.status === 400) {
      const err = await res.json().catch(() => ({}));
      if (err.message && (err.message.includes('relation "public.products" does not exist') || err.code === '42P01')) {
        return { 
          success: true, 
          needsTables: true, 
          message: 'Connected to Supabase project! You just need to run the 1-click SQL setup script once.' 
        };
      }
    }

    const errJson = await res.json().catch(() => ({}));
    return { success: false, message: errJson.message || `Connection failed with status ${res.status}` };
  } catch (err) {
    return { success: false, message: err.message || 'Network connection failed' };
  }
}

// ─── Products Cloud Operations ──────────────────────────────────────────

export async function fetchCloudProducts() {
  if (!isSupabaseConnected()) return null;
  try {
    const data = await supabaseFetch('products?select=*&order=created_at.desc');
    if (!data || !Array.isArray(data)) return null;

    return data.map(item => ({
      ...item,
      items: Array.isArray(item.items) ? item.items : (typeof item.items === 'string' ? JSON.parse(item.items) : []),
      price: Number(item.price) || 0
    }));
  } catch (err) {
    console.warn('Supabase fetchCloudProducts error:', err);
    return null;
  }
}

export async function upsertCloudProduct(product) {
  if (!isSupabaseConnected()) return false;
  try {
    const payload = [{
      id: product.id,
      name: product.name,
      badge: product.badge || '',
      badge_type: product.badgeType || 'gold',
      price: product.price || 0,
      formatted_price: product.formattedPrice || `${product.price} AED`,
      price_note: product.priceNote || '',
      currency: product.currency || 'AED',
      description: product.description || '',
      long_description: product.longDescription || '',
      rating: product.rating || 5.0,
      review_count: product.reviewCount || 1,
      image: product.image || '',
      category: product.category || 'bouquets',
      whatsapp_number: product.whatsappNumber || '',
      whatsapp_message: product.whatsappMessage || '',
      items: product.items || [],
      updated_at: new Date().toISOString()
    }];

    await supabaseFetch('products', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    console.error('Supabase upsertCloudProduct failed:', err);
    return false;
  }
}

export async function deleteCloudProduct(id) {
  if (!isSupabaseConnected()) return false;
  try {
    await supabaseFetch(`products?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return true;
  } catch (err) {
    console.error('Supabase deleteCloudProduct failed:', err);
    return false;
  }
}

// ─── The Reserve Cloud Operations ───────────────────────────────────────

export async function fetchCloudReserve() {
  if (!isSupabaseConnected()) return null;
  try {
    const data = await supabaseFetch('reserve_products?select=*&order=created_at.desc');
    if (!data || !Array.isArray(data)) return null;

    return data.map(item => ({
      ...item,
      items: Array.isArray(item.items) ? item.items : (typeof item.items === 'string' ? JSON.parse(item.items) : []),
      price: Number(item.price) || 0
    }));
  } catch (err) {
    console.warn('Supabase fetchCloudReserve error:', err);
    return null;
  }
}

export async function upsertCloudReserve(product) {
  if (!isSupabaseConnected()) return false;
  try {
    const payload = [{
      id: product.id,
      name: product.name,
      badge: product.badge || 'THE RESERVE',
      badge_type: product.badgeType || 'gold',
      price: product.price || 500,
      formatted_price: product.formattedPrice || `${product.price} AED`,
      price_note: product.priceNote || '',
      currency: product.currency || 'AED',
      description: product.description || '',
      long_description: product.longDescription || '',
      rating: product.rating || 5.0,
      review_count: product.reviewCount || 1,
      image: product.image || '',
      category: 'reserve',
      whatsapp_number: product.whatsappNumber || '',
      whatsapp_message: product.whatsappMessage || '',
      items: product.items || [],
      updated_at: new Date().toISOString()
    }];

    await supabaseFetch('reserve_products', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    console.error('Supabase upsertCloudReserve failed:', err);
    return false;
  }
}

export async function deleteCloudReserve(id) {
  if (!isSupabaseConnected()) return false;
  try {
    await supabaseFetch(`reserve_products?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return true;
  } catch (err) {
    console.error('Supabase deleteCloudReserve failed:', err);
    return false;
  }
}

// ─── Testimonials Cloud Operations ──────────────────────────────────────

export async function fetchCloudTestimonials() {
  if (!isSupabaseConnected()) return null;
  try {
    const data = await supabaseFetch('testimonials?select=*&order=created_at.desc');
    return Array.isArray(data) ? data : null;
  } catch (err) {
    console.warn('Supabase fetchCloudTestimonials error:', err);
    return null;
  }
}

export async function upsertCloudTestimonial(t) {
  if (!isSupabaseConnected()) return false;
  try {
    const payload = [{
      id: String(t.id),
      author: t.author,
      location: t.location || '',
      occasion: t.occasion || 'reserve',
      occasion_label: t.occasionLabel || 'Verified Patron',
      hamper: t.hamper || '',
      stars: t.stars || 5,
      rating: t.rating || `${t.stars || 5} / 5`,
      quote: t.quote,
      date: t.date || new Date().toISOString()
    }];

    await supabaseFetch('testimonials', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    console.error('Supabase upsertCloudTestimonial failed:', err);
    return false;
  }
}

export async function deleteCloudTestimonial(id) {
  if (!isSupabaseConnected()) return false;
  try {
    await supabaseFetch(`testimonials?id=eq.${encodeURIComponent(String(id))}`, {
      method: 'DELETE'
    });
    return true;
  } catch (err) {
    console.error('Supabase deleteCloudTestimonial failed:', err);
    return false;
  }
}

// ─── Site Settings Cloud Operations ─────────────────────────────────────

export async function fetchCloudSiteSettings() {
  if (!isSupabaseConnected()) return null;
  try {
    const data = await supabaseFetch('site_settings?id=eq.default&select=settings');
    if (data && data[0] && data[0].settings) {
      return data[0].settings;
    }
    return null;
  } catch (err) {
    console.warn('Supabase fetchCloudSiteSettings error:', err);
    return null;
  }
}

export async function upsertCloudSiteSettings(settings) {
  if (!isSupabaseConnected()) return false;
  try {
    const payload = [{
      id: 'default',
      settings,
      updated_at: new Date().toISOString()
    }];

    await supabaseFetch('site_settings', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    console.error('Supabase upsertCloudSiteSettings failed:', err);
    return false;
  }
}

// ─── 1-Click Initial Sync: Push all current data to Supabase ────────────

export async function pushAllToCloud(data) {
  if (!isSupabaseConnected()) {
    return { success: false, message: 'Please enter and test your Supabase credentials first.' };
  }

  try {
    if (data.products && data.products.length > 0) {
      for (const p of data.products) {
        await upsertCloudProduct(p);
      }
    }

    if (data.reserveProducts && data.reserveProducts.length > 0) {
      for (const r of data.reserveProducts) {
        await upsertCloudReserve(r);
      }
    }

    if (data.testimonials && data.testimonials.length > 0) {
      for (const t of data.testimonials) {
        await upsertCloudTestimonial(t);
      }
    }

    if (data.siteSettings) {
      await upsertCloudSiteSettings(data.siteSettings);
    }

    return { 
      success: true, 
      message: 'All hampers, reserve collections, reviews & settings were successfully synced to Supabase!' 
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// ─── Ready-to-Run SQL Table Script ──────────────────────────────────────

export const SUPABASE_SQL_SETUP_SCRIPT = `-- 🎁 DAZZLING HAMPERS SUPABASE DATABASE SETUP SCRIPT
-- Paste this into your Supabase Dashboard -> SQL Editor -> Click "RUN"

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT DEFAULT '',
  badge_type TEXT DEFAULT 'gold',
  price NUMERIC DEFAULT 0,
  formatted_price TEXT DEFAULT '',
  price_note TEXT DEFAULT '',
  currency TEXT DEFAULT 'AED',
  description TEXT DEFAULT '',
  long_description TEXT DEFAULT '',
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 1,
  image TEXT DEFAULT '',
  category TEXT DEFAULT 'bouquets',
  whatsapp_number TEXT DEFAULT '',
  whatsapp_message TEXT DEFAULT '',
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Reserve Products Table
CREATE TABLE IF NOT EXISTS public.reserve_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT DEFAULT 'THE RESERVE',
  badge_type TEXT DEFAULT 'gold',
  price NUMERIC DEFAULT 500,
  formatted_price TEXT DEFAULT '',
  price_note TEXT DEFAULT '',
  currency TEXT DEFAULT 'AED',
  description TEXT DEFAULT '',
  long_description TEXT DEFAULT '',
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 1,
  image TEXT DEFAULT '',
  category TEXT DEFAULT 'reserve',
  whatsapp_number TEXT DEFAULT '',
  whatsapp_message TEXT DEFAULT '',
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  location TEXT DEFAULT '',
  occasion TEXT DEFAULT 'reserve',
  occasion_label TEXT DEFAULT 'Verified Patron',
  hamper TEXT DEFAULT '',
  stars INTEGER DEFAULT 5,
  rating TEXT DEFAULT '5 / 5',
  quote TEXT NOT NULL,
  date TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY,
  settings JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reserve_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all visitors worldwide
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read reserve" ON public.reserve_products FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);

-- Allow public write access for admin management
CREATE POLICY "Public insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Public delete products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Public insert reserve" ON public.reserve_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update reserve" ON public.reserve_products FOR UPDATE USING (true);
CREATE POLICY "Public delete reserve" ON public.reserve_products FOR DELETE USING (true);

CREATE POLICY "Public insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Public delete testimonials" ON public.testimonials FOR DELETE USING (true);

CREATE POLICY "Public insert settings" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update settings" ON public.site_settings FOR UPDATE USING (true);
`;
