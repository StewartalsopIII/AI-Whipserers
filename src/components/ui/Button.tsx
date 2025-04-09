import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { className = '', children, variant = 'default', size = 'md', asChild = false, ...props },
  ref
) => {
  // Base styles for all buttons
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50';
  
  // Size variants
  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 py-3 text-lg'
  };
  
  // Appearance variants
  const variantStyles = {
    default: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
  };
  
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  // If asChild is true, clone the child and merge props
  if (asChild && children) {
    const child = children as React.ReactElement;
    return (
      <span ref={ref as any} className={buttonStyles} {...props}>
        {child}
      </span>
    );
  }
  
  return (
    <button ref={ref} className={buttonStyles} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };