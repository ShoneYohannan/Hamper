import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import HamperBuilderModal from './components/HamperBuilderModal';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

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
    showToast('Added to Cart', `${product.name} added to your basket.`, 'cart');
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
      
      {/* Navigation Header */}
      <Header 
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBuilder={() => setBuilderOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero 
          onOpenBuilder={() => setBuilderOpen(true)} 
        />

        <ProductGrid 
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        <Features 
          onOpenBuilder={() => setBuilderOpen(true)}
        />

        <Testimonials />
      </main>

      {/* Footer */}
      <Footer 
        onSubscribe={(email) => showToast('Subscribed!', `10% discount code sent to ${email}`, 'newsletter')}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <div className="relative bg-[#FFFDF8] rounded-3xl p-8 max-w-md w-full text-center space-y-4 border-2 border-[#153D32]/15 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#0F2E25] text-[#F3E5AB] border border-[#D4AF37]/40 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#0B251E]">Order Placed!</h3>
            <p className="text-sm sm:text-base text-[#2E4237] font-medium leading-relaxed">
              Thank you for choosing The Hamper Co. Your luxury gift hampers are being prepared with care.
            </p>
            <button
              onClick={() => setCheckoutComplete(false)}
              className="w-full bg-[#0F2E25] hover:bg-[#18483B] text-[#FFFDF8] py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all border border-[#D4AF37]/30 shadow-md"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
