import React from 'react';
import { cn } from '../../lib/utils';

export function Button({ children, className, variant = 'primary', as: Component = 'button', ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded transition-all duration-300 ease-out cursor-pointer font-medium";
  
  const variants = {
    primary: "primary-button text-primary-cta-text",
    secondary: "secondary-button text-secondary-cta-text",
  };

  return (
    <Component className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </Component>
  );
}
