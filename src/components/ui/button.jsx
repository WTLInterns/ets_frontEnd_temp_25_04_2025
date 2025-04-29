import React from 'react';

const Button = React.forwardRef(({ 
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary-dashboard hover:bg-primary-dashboard/90 text-white focus:ring-primary-dashboard',
    secondary: 'bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 py-3 text-lg',
  };

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <button
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
