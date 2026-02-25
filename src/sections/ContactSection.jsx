import React from 'react';
import { Input, Button, colors } from '../design-system';

export const ContactSection = () => {
  return (
    <section className="px-6 md:px-20 my-32 max-w-2xl">
      <h2 className="text-3xl font-black tracking-tighter uppercase mb-2" style={{ color: colors.text }}>
        Let's <span style={{ color: colors.accent }}>Talk</span>
      </h2>
      <p className="text-zinc-500 mb-10">如果有合作意向或好的想法，欢迎随时联系。</p>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Your Name" />
        <Input placeholder="Email Address" type="email" />
        <textarea 
          className="w-full h-32 rounded-lg border-2 border-[#ffb5d9]/30 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#ffb5d9] focus:ring-2 focus:ring-[#ffb5d9]/20 placeholder:text-zinc-400"
          placeholder="Tell me something..."
        />
        <Button color="accent" size="lg" className="w-full sm:w-auto">
          Send Message
        </Button>
      </form>
    </section>
  );
};
