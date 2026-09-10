import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CollectionsPage from './pages/CollectionsPage';
import BudgetFriendlyPage from './pages/BudgetFriendlyPage';
import ReservePage from './pages/ReservePage';
import Features from './components/Features';
import ReviewsPage from './pages/ReviewsPage';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';
import AdminPortal from './components/admin/AdminPortal';
import AdminLoginModal from './components/admin/AdminLoginModal';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { useCms } from './context/CmsContext';

export default function App() {
  const { isGlass } = useTheme();
  const { siteSettings, openAdmin, isAdminModalOpen } = useCms();
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);


  // Scroll Spy: Tracks which section is currently in view and underlines it in the header
  useEffect(() => {
    const sections = ['home', 'budget', 'collections', 'reserve', 'reviews'];
    let isTicking = false;

    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          if (scrollY < 100) {
            setActiveSection('home');
            isTicking = false;
            return;
          }

          for (let i = sections.length - 1; i >= 0; i--) {
            const sectionId = sections[i];
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              // Trigger when section top enters upper portion of viewport (320px)
              if (rect.top <= 320) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scroll navigation handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, null, ' ');
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, null, `#${sectionId}`);
      }
    }
  };

  // Handle direct hash navigation on initial load (e.g. #collections, #reserve, #reviews, #admin)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin' || hash === 'cms') {
        openAdmin();
      } else if (hash && ['budget', 'collections', 'reserve', 'reviews'].includes(hash)) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(hash);
          }
        }, 250);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [openAdmin]);

  const showToast = (title, message, type = 'cart') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    showToast('Added to Basket', `${product.name} has been added.`, 'cart');
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutComplete(true);
    setCartItems([]);
  };

  const handleOpenCustomWhatsApp = () => {
    const phone = siteSettings.whatsappNumber || '971501487453';
    const message = siteSettings.whatsappMessage || 'Hello Dazzling Hampers! I would like to inquire about a custom hamper curation tailored for my special occasion.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };


  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isGlass 
        ? 'bg-[#0d0214] text-[#F8F6FA] selection:bg-[#D4AF37] selection:text-black' 
        : 'bg-[#FAF8F5] text-[#141615] selection:bg-[#141615] selection:text-white'
    }`}>
      
      {/* Animated Ambient Gradient Mesh for Luxe Glass Mode (Matching Royal Violet & Imperial Gold Logo Shade) */}
      {isGlass && !isAdminModalOpen && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-paint">
          {/* Deep Royal Purple Glow Orb */}
          <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#4a0e4e]/50 blur-[90px] animate-mesh-1 will-change-transform" />
          {/* Luminous Warm Imperial Gold Orb */}
          <div className="absolute top-[22%] -right-40 w-[540px] h-[540px] rounded-full bg-[#D4AF37]/20 blur-[100px] animate-mesh-2 will-change-transform" />
          {/* Deep Velvet Plum Glow Orb */}
          <div className="absolute top-[58%] -left-32 w-[580px] h-[580px] rounded-full bg-[#340b49]/55 blur-[95px] animate-mesh-3 will-change-transform" />
          {/* Warm Champagne Velvet Bottom Orb */}
          <div className="absolute bottom-0 right-[15%] w-[460px] h-[460px] rounded-full bg-[#B78A45]/18 blur-[100px] animate-mesh-1 will-change-transform" />
        </div>
      )}

      {/* Navigation Header & Main Storefront (Completely unmounted in CMS mode for blazing fast 0ms latency) */}
      {!isAdminModalOpen && (
        <>
          <Header 
            cartCount={totalCartCount}
            currentPage={activeSection}
            onNavigate={handleNavigate}
            onOpenCart={() => setCartOpen(true)}
            onOpenCustomWhatsApp={handleOpenCustomWhatsApp}
          />

          {/* Main Continuous Boutique Experience with Scroll Spy Sections */}
          <main className="flex-grow relative z-10">
            {/* Section 1: Home / Hero */}
            <Hero 
              onOpenCustomWhatsApp={handleOpenCustomWhatsApp} 
            />

            {/* Section 2: Budget-Friendly Hampers Dedicated Showcase */}
            <BudgetFriendlyPage 
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onNavigate={handleNavigate}
            />

            {/* Section 3: Collections Catalog with Pill Filters, Search & Sort */}
            <CollectionsPage 
              onAddToCart={handleAddToCart}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onNavigate={handleNavigate}
            />

            {/* Section 3: The Reserve Vault & VIP Concierge Inquiry */}
            <ReservePage 
              onAddToCart={handleAddToCart}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />

            {/* The Atelier 3-Step Process */}
            <Features 
              onOpenCustomWhatsApp={handleOpenCustomWhatsApp}
            />

            {/* Section 4: Reviews, Verified Patron Stories & Submission Modal */}
            <ReviewsPage />
          </main>

          {/* Footer with onNavigate */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Modals & Overlays */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <QuickViewModal 
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <Toast 
        toast={toast}
        onClose={() => setToast(null)}
      />

      {/* Checkout Success Confirmation Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            onClick={() => setCheckoutComplete(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md" 
          />
          <div className={`relative rounded-3xl p-8 max-w-md w-full text-center space-y-4 border shadow-2xl z-10 animate-fade-in ${
            isGlass ? 'glass-panel border-white/20 text-white' : 'bg-white border-neutral-200/80'
          }`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-sm ${
              isGlass ? 'bg-[#D4AF37] text-black' : 'bg-neutral-900 text-white'
            }`}>
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-3xl font-normal">Order Placed</h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              Thank you for gifting with Dazzling Hampers. Your luxury bespoke allocation is being assembled with care.
            </p>
            <button
              onClick={() => {
                setCheckoutComplete(false);
                handleNavigate('collections');
              }}
              className={`w-full py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-all shadow-sm ${
                isGlass 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] text-[#0A0D0C] font-semibold' 
                  : 'bg-[#171717] hover:bg-neutral-800 text-white'
              }`}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

      {/* Admin CMS Suite & Login Modal */}
      <AdminPortal />
      <AdminLoginModal />

    </div>
  );
}


