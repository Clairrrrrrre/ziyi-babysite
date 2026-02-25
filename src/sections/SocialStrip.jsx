import React from 'react';
import { Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import { colors } from '../design-system';

const SOCIALS = [
  { icon: <Github size={20} />, label: 'Github', href: '#' },
  { icon: <Twitter size={20} />, label: 'Twitter', href: '#' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', href: '#' },
  { icon: <Instagram size={20} />, label: 'Instagram', href: '#' },
  { icon: <Mail size={20} />, label: 'Email', href: '#' },
];

export const SocialStrip = () => {
  return (
    <section className="px-6 md:px-20 mt-20">
      <ul className="flex flex-wrap gap-10 items-center border-y border-[#ffb5d9]/30 py-8 justify-center">
        {SOCIALS.map((item) => (
          <li key={item.label}>
            <a 
              href={item.href}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#8b6d5c]/60 transition-all hover:text-[#ff0fa2] hover:scale-110"
            >
              <div className="p-2 rounded-full bg-[#ffb5d9]/10 border border-transparent hover:border-[#ffb5d9]/40 hover:bg-white transition-all">
                 {item.icon}
              </div>
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
