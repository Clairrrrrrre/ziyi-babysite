import React from 'react';
import { tv } from 'tailwind-variants';

const inputVariants = tv({
  base: 'w-full rounded-lg border-2 border-[#ffb5d9]/30 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-[#ffb5d9] focus:ring-2 focus:ring-[#ffb5d9]/20 placeholder:text-zinc-400',
});

export const Input = ({ className, ...props }) => {
  return (
    <input className={inputVariants({ className })} {...props} />
  );
};
