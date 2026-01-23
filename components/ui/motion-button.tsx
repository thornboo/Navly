'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Button, type ButtonProps } from './button';

type MotionButtonProps = Omit<ButtonProps, 'asChild'> & Omit<HTMLMotionProps<'button'>, 'ref'>;

/**
 * Bridge shadcn/ui Button + framer-motion without duplicating styles everywhere.
 * Uses Radix Slot (`asChild`) to pass Button classes to the underlying motion.button.
 */
export function MotionButton({ variant, size, className, ...props }: MotionButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <motion.button {...props} />
    </Button>
  );
}
