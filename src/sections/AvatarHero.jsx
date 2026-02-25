import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export const AvatarHero = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden border-b-4 border-[#ffb5d9]/40">
      {/* 01 ▸ Top Marquee - Straight & Balanced MARS Style */}
      <div className="bg-[#4a3737] py-2.5 overflow-hidden border-b-2 border-[#ffb5d9]/30 shadow-md relative z-50">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(15).fill(0).map((_, i) => (
            <div key={i} className="flex items-center mx-12 text-[#ffb5d9] text-[10px] font-black uppercase tracking-[0.6em]">
              <Sparkles size={12} className="mr-4" /> 
              Princess Zoey * Digital Archive * Est. 2002 
              <Sparkles size={12} className="ml-4" />
            </div>
          ))}
        </div>
      </div>

      {/* 02 ▸ Main Content Area */}
      <div className="relative pt-32 pb-40 flex flex-col items-center">
        {/* Floating background elements - Refined Leopard Pattern */}
        <div className="absolute inset-0 bg-leopard-luxury opacity-[0.1] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fff0f6] rounded-full blur-[100px] opacity-40" />

        {/* Core Display: Heart Frame with Aesthetic Motif (Clean & Elegant) */}
        <div className="relative group z-20 mb-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative w-64 h-64 md:w-72 md:h-72"
          >
            {/* SVG Mask Definition */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
                  <path d="M0.5,0.21 C0.4,0, 0,0, 0,0.38 C0,0.65, 0.5,0.92, 0.5,0.92 C0.5,0.92, 1,0.65, 1,0.38 C1,0, 0.6,0, 0.5,0.21" />
                </clipPath>
              </defs>
            </svg>

            {/* The Frame - Minimalist White & Pink Glow */}
            <div className="w-full h-full bg-white p-4 rounded-[60px] shadow-[0_30px_80px_rgba(255,181,217,0.3)] border border-[#ffb5d9]/10 relative">
              <div 
                className="w-full h-full bg-[#fff5f8] overflow-hidden flex items-center justify-center"
                style={{ clipPath: 'url(#heartClip)' }}
              >
                {/* 替换照片为更有质感的装饰性元素，避免使用具体的女性人像 */}
                <div className="w-full h-full bg-gradient-to-br from-[#ffb5d9] to-[#fff0f6] flex items-center justify-center">
                   <Heart size={80} className="text-white opacity-40 animate-pulse" fill="currentColor" />
                </div>
              </div>

              {/* Rhinestones - Subtly placed */}
              <div className="absolute top-8 -left-4 w-2 h-2 rhinestone-shine animate-sparkle" />
              <div className="absolute bottom-8 -right-4 w-1.5 h-1.5 rhinestone-shine animate-sparkle delay-700" />
            </div>
          </motion.div>
        </div>

        {/* Name Display - Balanced & Refined Typography */}
        <div className="text-center z-10 space-y-4 px-4">
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#4a3737] leading-tight text-mars-style">
              ZOEY <span className="text-[#ffb5d9] italic italic-font-gothic ml-2">Song</span>
            </h1>
          </motion.div>
          <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
            <div className="h-[1px] w-8 bg-[#ffb5d9]" />
            <p className="text-[9px] font-black uppercase tracking-[0.6em] text-[#8b6d5c]">
               Curating Aesthetic Dreams
            </p>
            <div className="h-[1px] w-8 bg-[#ffb5d9]" />
          </div>
        </div>
      </div>

      {/* Bottom Marquee - Reversed & Refined */}
      <div className="bg-[#4a3737] py-2.5 overflow-hidden border-t-2 border-[#ffb5d9]/30 relative z-40">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center mx-12 text-[#ffb5d9] text-[9px] font-black uppercase tracking-[0.5em]">
              <Heart size={10} className="mr-4" fill="currentColor" /> 
              Taste is Silent 
              <Heart size={10} className="mx-4" fill="currentColor" /> 
              Refined Curation
              <Heart size={10} className="ml-4" fill="currentColor" />
            </div>
          ))}
        </div>
      </div>

      {/* Lace Edge */}
      <div className="lace-edge w-full absolute bottom-0 opacity-40" />
    </section>
  );
};
