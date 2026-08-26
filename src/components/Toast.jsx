import React from 'react';
import { CheckCircle2, ShoppingBag, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#153D32] text-[#FFFDF8] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#1E5042] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0D2921] border border-[#B78A45]/40 flex items-center justify-center text-[#D4AF37]">
          {toast.type === 'cart' ? <ShoppingBag className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
        </div>
        <div>
          <h5 className="font-semibold text-xs text-[#FFFDF8]">{toast.title}</h5>
          <p className="text-[11px] text-[#FFFDF8]/70">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}
