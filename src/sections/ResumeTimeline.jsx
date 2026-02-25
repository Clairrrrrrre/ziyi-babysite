import React from 'react';
import { colors } from '../design-system';

const EXPERIENCES = [
  { year: '2024 - Present', role: 'Senior Frontend Developer', company: 'Tech Design Studio' },
  { year: '2022 - 2024', role: 'UI/UX Designer', company: 'Creative Agency' },
  { year: '2020 - 2022', role: 'Junior Developer', company: 'Startup Hub' },
];

export const ResumeTimeline = () => {
  return (
    <section className="px-6 md:px-20 mt-40 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
         <div className="h-[2px] w-8 bg-[#ffb5d9]" />
         <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ffb5d9]">The Journey</h2>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {EXPERIENCES.map((item, index) => (
          <li key={index} className="relative p-8 rounded-[40px] bg-white border border-[#ffb5d9]/10 shadow-[0_20px_40px_rgba(255,181,217,0.1)] group hover:shadow-[0_30px_60px_rgba(255,181,217,0.2)] transition-all duration-500">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#ffb5d9] flex items-center justify-center text-white text-[9px] font-bold shadow-lg group-hover:scale-110 transition-transform">
               {index + 1}
            </div>
            <span className="text-[10px] font-black text-[#ffb5d9] tracking-widest uppercase block mb-4">{item.year}</span>
            <h3 className="text-xl font-black text-[#4a3737] leading-tight mb-2 group-hover:text-[#ff0fa2] transition-colors">{item.role}</h3>
            <p className="text-[#8b6d5c] text-xs font-medium uppercase tracking-widest opacity-60">{item.company}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
