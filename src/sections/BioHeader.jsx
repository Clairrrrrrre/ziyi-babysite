import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const BioHeader = () => {
  return (
    <section id="about" className="py-32 bg-white relative border-y-2 border-[#ffb5d9]/20 overflow-hidden">
      {/* 背景点缀：极简且平衡的装饰条 (MARS style) */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-leopard-luxury opacity-20 border-r border-[#ffb5d9]/10" />
      <div className="absolute top-0 right-0 w-1.5 h-full bg-[#ffb5d9]/10 border-l border-[#ffb5d9]/10" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          {/* 左侧文字：深度介绍 */}
          <div className="md:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 opacity-60">
                <div className="h-[1px] w-10 bg-[#ffb5d9]" />
                <span className="text-[9px] font-black text-[#ffb5d9] uppercase tracking-[0.6em]">
                   The Philosophy
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[#4a3737] tracking-tight leading-tight text-mars-style">
                Taste is <br/>
                <span className="text-[#ffb5d9] italic italic-font-gothic">Silent.</span>
              </h2>
            </div>
            
            <div className="space-y-10 text-[#5a4a4a] text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              <p className="border-l-4 border-[#ffb5d9]/30 pl-6">
                我是 Zoey，数字世界的视觉策展人。我坚信真正的品味无需言说，它存在于每一个被精确打磨的像素与光影之间。
              </p>
              <div className="flex items-start gap-4 p-8 bg-[#fff5f8] rounded-[40px] border border-[#ffb5d9]/10 shadow-sm relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-[#ffb5d9]/20">
                   <Heart size={20} className="text-[#ff0fa2]" fill="currentColor" />
                </div>
                <p className="text-[#8b6d5c] italic text-base leading-loose">
                  “我追求的不是单纯的‘设计’，而是一种被温柔包裹的感官体验。在这里，代码只是实现梦幻的画笔，而个性才是唯一的底色。”
                </p>
              </div>
            </div>
          </div>

          {/* 右侧装饰：更加平衡的展示块 */}
          <div className="md:col-span-5 flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-[320px] aspect-[4/5] bg-white rounded-[40px] border-[8px] border-white shadow-[0_20px_60px_rgba(255,181,217,0.2)] overflow-hidden flex items-center justify-center p-8 group"
            >
              <div className="absolute inset-0 bg-leopard-luxury opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="text-center z-10 border border-[#ffb5d9]/20 rounded-[30px] w-full h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-white/30">
                <div className="w-12 h-12 bg-[#ffb5d9]/10 rounded-full flex items-center justify-center mb-4">
                   <Heart size={24} className="text-[#ffb5d9]" fill="currentColor" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4a3737]">Curated</span>
                <p className="text-xs font-bold text-[#8b6d5c] mt-3 italic italic-font-gothic uppercase tracking-widest">Digital Archive</p>
                <div className="mt-6 flex gap-1.5">
                   {Array(3).fill(0).map((_, i) => (
                     <div key={i} className="w-1 h-1 rounded-full bg-[#ffb5d9]/40" />
                   ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
