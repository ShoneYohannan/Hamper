import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CollectionsPage from './pages/CollectionsPage';
import ReservePage from './pages/ReservePage';
import Features from './components/Features';
import ReviewsPage from './pages/ReviewsPage';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import HamperBuilderModal from './components/HamperBuilderModal';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Scroll Spy: Tracks which section is currently in view and underlines it in the header
  useEffect(() => {
    const sections = ['home', 'collections', 'reserve', 'reviews'];
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

  // Handle direct hash navigation on initial load (e.g. #collections, #reserve, #reviews)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && ['collections', 'reserve', 'reviews'].includes(hash)) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }
      }, 250);
    }
  }, []);

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

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141615] flex flex-col font-sans selection:bg-[#141615] selection:text-white">
      
      {/* Navigation Header with Active Scroll Indicator */}
      <Header 
        cartCount={totalCartCount}
        currentPage={activeSection}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBuilder={() => setBuilderOpen(true)}
      />

      {/* Main Continuous Boutique Experience with Scroll Spy Sections */}
      <main className="flex-grow">
        {/* Section 1: Home / Hero */}
        <Hero 
          onOpenBuilder={() => setBuilderOpen(true)} 
        />

        {/* Section 2: Collections Catalog with Pill Filters, Search & Sort */}
        <CollectionsPage 
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* Section 3: The Reserve Vault & VIP Concierge Inquiry */}
        <ReservePage 
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* The Atelier 3-Step Process */}
        <Features 
          onOpenBuilder={() => setBuilderOpen(true)}
        />

        {/* Section 4: Reviews, Verified Patron Stories & Submission Modal */}
        <ReviewsPage />
      </main>

      {/* Footer with onNavigate */}
      <Footer 
        onNavigate={handleNavigate}
        onSubscribe={(email) => showToast('Subscribed', `Privilege code dispatched to ${email}`, 'newsletter')}
      />

      {/* Modals & Overlays */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <SearchModal 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      <HamperBuilderModal 
        isOpen={builderOpen}
        onClose={() => setBuilderOpen(false)}
        onAddCustomHamper={(customHamper) => {
          handleAddToCart(customHamper);
          setCartOpen(true);
        }}
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
          />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 border border-neutral-200/80 shadow-2xl z-10 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-3xl font-normal text-neutral-900">Order Placed</h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
              Thank you for gifting with The Hamper Co. Your luxury bespoke allocation is being assembled with care.
            </p>
            <button
              onClick={() => {
                setCheckoutComplete(false);
                handleNavigate('collections');
              }}
              className="w-full bg-[#171717] hover:bg-neutral-800 text-white py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-all shadow-sm"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
