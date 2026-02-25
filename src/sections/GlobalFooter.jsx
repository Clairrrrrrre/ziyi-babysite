import React from 'react';
import { Heart } from 'lucide-react';

export const GlobalFooter = () => {
  return (
    <footer className="px-6 md:px-20 py-24 border-t border-[#ffb5d9]/20 bg-[#fffafc]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-[#ffb5d9]">
            <Heart size={14} fill="currentColor" />
            <span className="text-sm font-black tracking-[0.3em] uppercase text-[#5a4a4a]">Zoey Song</span>
            <Heart size={14} fill="currentColor" />
          </div>
          <p className="text-[10px] font-bold text-[#8b6d5c]/50 uppercase tracking-widest mt-2">
            Refined Digital Creation • Based in Shanghai
          </p>
        </div>

        <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-[#8b6d5c]/40">
          <a href="#" className="hover:text-[#ff0fa2] transition-colors">沪ICP备88888888号</a>
          <a href="#" className="hover:text-[#ff0fa2] transition-colors italic decoration-wavy">Privacy</a>
        </div>

        <div className="text-[10px] font-bold text-[#8b6d5c]/30 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Curated with Love.
        </div>
      </div>
    </footer>
  );
};
