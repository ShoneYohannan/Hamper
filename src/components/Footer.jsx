import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      if (onSubscribe) onSubscribe(email);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#153D32] text-[#FFFDF8] pt-16 pb-12 border-t border-[#1E5042]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Brand Quote */}
        <div>
          <p className="font-serif text-2xl sm:text-3xl text-[#FFFDF8]/90 font-medium">
            Gifting, thoughtfully gathered.
          </p>
        </div>

        {/* Newsletter Callout & Input Row matching Screenshot 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0D2921] rounded-3xl p-8 sm:p-10 border border-[#1E5042]">
          
          <div className="lg:col-span-6 space-y-2">
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FFFDF8]">
              A little luxury, in your inbox.
            </h3>
            <p className="text-sm text-[#FFFDF8]/70">
              Enjoy 10% off your first hamper, plus gifting notes worth keeping.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-[#153D32] border border-[#1E5042] text-[#FFFDF8] placeholder:text-[#FFFDF8]/40 px-5 py-3 rounded-full text-sm focus:outline-none focus:border-[#B78A45] transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto whitespace-nowrap bg-[#B78A45] hover:bg-[#D4AF37] text-[#153D32] font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Subscribed!
                  </>
                ) : (
                  'Claim 10% Off'
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer Navigation & Social Links matching Screenshot 6 */}
        <div className="pt-8 border-t border-[#1E5042] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#FFFDF8]/70">
          
          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-[#B78A45] transition-colors">Customer Support</a>
            <span>·</span>
            <a href="#" className="hover:text-[#B78A45] transition-colors">FAQ</a>
            <span>·</span>
            <a href="#" className="hover:text-[#B78A45] transition-colors">Delivery & Returns</a>
          </div>

          {/* Social Icons (SVG) */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a href="#" className="p-2 rounded-full bg-[#0D2921] hover:bg-[#1E5042] text-[#FFFDF8] hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="p-2 rounded-full bg-[#0D2921] hover:bg-[#1E5042] text-[#FFFDF8] hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="p-2 rounded-full bg-[#0D2921] hover:bg-[#1E5042] text-[#FFFDF8] hover:text-[#D4AF37] transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
