import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';

export const Card = ({ image, title, category, description, isFeatured }) => {
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="flex flex-col gap-6 group cursor-pointer"
    >
      {/* 展示容器：极致圆润 + 层叠投影 */}
      <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-white border-[8px] border-white shadow-[0_15px_40px_rgba(255,181,217,0.15)] transition-all duration-700 group-hover:shadow-[0_25px_60px_rgba(255,181,217,0.35)]">
        
        {/* 背景装饰：淡豹纹 */}
        <div className="absolute inset-0 bg-leopard-soft opacity-10 group-hover:opacity-20 transition-opacity" />
        
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        
        {/* 覆盖层：仅在悬停时显现的优雅信息 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ffb5d9]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <div className="text-white">
            <p className="text-[10px] font-black uppercase tracking-widest mb-1">View Details</p>
            <ArrowUpRight size={24} />
          </div>
        </div>

        {isFeatured && (
          <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff0fa2] animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#ff0fa2]">Featured Piece</span>
          </div>
        )}
      </div>

      {/* 底部信息：杂志排版感 */}
      <div className="flex flex-col items-center gap-2 text-center px-4">
        <span className="text-[9px] font-black text-[#ffb5d9] uppercase tracking-[0.3em]">{category}</span>
        <h3 className="text-lg text-[#5a4a4a] font-black tracking-tight leading-tight transition-colors group-hover:text-[#ff0fa2]">
          {title}
        </h3>
        {description && (
          <p className="text-[12px] text-[#8b6d5c]/70 font-medium leading-relaxed max-w-[200px]">
            {description}
          </p>
        )}
        <div className="h-[1px] w-0 bg-[#ffb5d9] group-hover:w-12 transition-all duration-500 mt-2" />
      </div>
    </motion.div>
  );
};
