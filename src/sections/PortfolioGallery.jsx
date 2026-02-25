import React from 'react';
import { Card } from '../design-system';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

const SHOWCASE_PHOTOS = [
  {
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=1000', /* 抽象美学：花卉与光影 */
    title: 'Archive No.01',
    category: 'Visual Journal'
  },
  {
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=1000', /* 抽象美学：闪耀质感 */
    title: 'Ephemeral Bloom',
    category: 'Aesthetic'
  }
];

export const PortfolioGallery = () => {
  return (
    <section id="collections" className="py-48 bg-white relative overflow-hidden border-b-2 border-[#ffb5d9]/10">
      {/* 侧边背景点缀 - 保持绝对的平衡与对齐 */}
      <div className="absolute top-0 right-0 w-2 h-full bg-[#ffb5d9]/10" />
      <div className="absolute top-0 left-0 w-2 h-full bg-leopard-luxury opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 章节标题：杂志排版感 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-40 gap-16 border-b-2 border-[#ffb5d9]/40 pb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-[#ffb5d9]/10 flex items-center justify-center border border-[#ffb5d9]/20">
                  <Heart size={18} className="text-[#ff0fa2]" fill="currentColor" />
               </div>
               <span className="text-[#ff0fa2] font-black tracking-[0.8em] text-[10px] uppercase block">Personal Archive</span>
            </div>
            <h2 className="text-7xl md:text-[10rem] font-black text-[#4a3737] tracking-tighter leading-[0.65] text-mars-style">
              Selected <br/>
              <span className="text-[#ffb5d9] italic italic-font-gothic text-6xl md:text-9xl">Showcase.</span>
            </h2>
          </div>
          <div className="max-w-xs flex gap-6 items-start">
            <div className="h-20 w-[1px] bg-[#ffb5d9]" />
            <p className="text-xs text-[#8b6d5c] leading-loose font-bold uppercase tracking-[0.2em]">
              每一次快门的按下，都是对瞬间美学的永恒定格。在这里，我分享我的视觉日记与风格探索。
            </p>
          </div>
        </div>

        {/* 核心照片展示：照片 2 和 3 (爱心相框) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-48">
          {SHOWCASE_PHOTOS.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center group"
            >
              <div className="relative w-full max-w-[400px] aspect-square">
                <div className="absolute inset-0 bg-[#ffb5d9]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* 爱心切割容器 */}
                <div className="w-full h-full bg-white p-4 shadow-[0_30px_60px_rgba(255,181,217,0.25)] rounded-[60px] group-hover:rounded-[100px] transition-all duration-1000 overflow-hidden">
                   <div 
                     className="w-full h-full bg-[#fdf2f7] overflow-hidden"
                     style={{ clipPath: 'url(#heartClip)' }}
                   >
                      <img 
                        src={item.image} 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                        alt={item.title}
                      />
                   </div>
                </div>

                {/* 装饰性的水钻粒子 */}
                <div className="absolute top-10 right-10 w-3 h-3 rhinestone-shine animate-sparkle" />
                <div className="absolute bottom-10 left-10 w-2 h-2 rhinestone-shine animate-sparkle delay-700" />
              </div>

              <div className="mt-12 text-center space-y-2">
                <span className="text-[9px] font-black text-[#ffb5d9] uppercase tracking-[0.4em]">{item.category}</span>
                <h3 className="text-3xl font-black text-[#4a3737] italic">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 服务橱窗：更强界限感的 Section */}
        <div id="services" className="relative mt-40">
          <div className="absolute inset-0 bg-[#fff5f8] rounded-[100px] -m-12 border-8 border-white shadow-[0_40px_100px_rgba(255,181,217,0.3)]" />
          
          <div className="relative z-10 p-12 md:p-32 grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              { title: 'Digital Curation', desc: '以策展人的视角，打造具有艺术高度的数字化品牌呈现。', icon: <Sparkles size={28} /> },
              { title: 'Visual Direction', desc: '在浪漫与理性之间，寻找最适合品牌的视觉叙事逻辑。', icon: <Heart size={28} /> },
              { title: 'Style Consulting', desc: '探索 Princess Chic 审美在现代商业与 Web 交互中的无限可能。', icon: <Star size={28} /> }
            ].map((service, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-8 group">
                <div className="w-20 h-20 rounded-full bg-white text-[#ffb5d9] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_30px_rgba(255,181,217,0.8)] group-hover:scale-110 transition-all duration-500 border border-[#ffb5d9]/20">
                  {service.icon}
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-[0.4em] text-[#4a3737]">{service.title}</h4>
                  <div className="h-[2px] w-12 bg-[#ffb5d9] mx-auto opacity-40 group-hover:w-20 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <p className="text-[13px] text-[#8b6d5c] leading-[2.2] font-medium opacity-80 max-w-[240px]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
