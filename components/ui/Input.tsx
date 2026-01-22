import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm',
            'placeholder:text-zinc-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
