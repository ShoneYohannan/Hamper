import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Gift } from 'lucide-react';

export default function Header({ cartCount, onOpenCart, onOpenSearch, onOpenBuilder }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F9F6F0]/90 backdrop-blur-md border-b border-[#153D32]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-[#153D32] group-hover:text-[#B78A45] transition-colors">
            The Hamper Co.
          </span>
        </a>

        {/* Desktop Navigation Menu Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#collections" 
            className="text-sm font-medium text-[#153D32]/80 hover:text-[#153D32] transition-colors hover:underline underline-offset-4"
          >
            Hampers
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-[#153D32]/80 hover:text-[#153D32] transition-colors hover:underline underline-offset-4"
          >
            Occasions
          </a>
          <a 
            href="#collections" 
            className="text-sm font-medium text-[#153D32]/80 hover:text-[#153D32] transition-colors hover:underline underline-offset-4"
          >
            Corporate Gifts
          </a>
          <a 
            href="#testimonials" 
            className="text-sm font-medium text-[#153D32]/80 hover:text-[#153D32] transition-colors hover:underline underline-offset-4"
          >
            About
          </a>
        </nav>

        {/* Right Action Icons: Search & Cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#153D32] hover:text-[#B78A45] transition-colors rounded-full hover:bg-[#153D32]/5"
            aria-label="Search hampers"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Trigger Button matching Framer prototype */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#153D32] hover:bg-[#1E5042] text-[#FFFDF8] px-4 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>Cart ({cartCount})</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#153D32] hover:text-[#B78A45] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-b border-[#153D32]/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <a 
            href="#collections" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#153D32] hover:text-[#B78A45]"
          >
            Hampers
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#153D32] hover:text-[#B78A45]"
          >
            Occasions
          </a>
          <a 
            href="#collections" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#153D32] hover:text-[#B78A45]"
          >
            Corporate Gifts
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#153D32] hover:text-[#B78A45]"
          >
            About
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenBuilder(); }}
            className="w-full text-center bg-[#B78A45] text-[#FFFDF8] py-2.5 rounded-full font-medium text-sm shadow"
          >
            Build Your Custom Hamper
          </button>
        </div>
      )}
    </header>
  );
}
