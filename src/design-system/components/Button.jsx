import React from 'react';
import { tv } from 'tailwind-variants';
import { clsx } from 'clsx';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 transition-all active:scale-95 text-sm uppercase tracking-wider',
  variants: {
    color: {
      primary: 'bg-[#ffb5d9] text-[#222222] hover:opacity-90',
      accent: 'bg-[#ff0fa2] text-white hover:opacity-90',
      outline: 'border-2 border-[#ffb5d9] text-[#222222] hover:bg-[#ffb5d9]/10',
      ghost: 'text-[#222222] hover:bg-[#ffb5d9]/20',
    },
    size: {
      sm: 'px-4 py-1.5 text-xs',
      md: 'px-6 py-2 text-sm',
      lg: 'px-8 py-3 text-base',
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});

export const Button = ({ children, color, size, className, ...props }) => {
  return (
    <button className={buttonVariants({ color, size, className })} {...props}>
      {children}
    </button>
  );
};
