import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyles: Record<string, string> = {
    primary:
      'bg-gradient-to-tr from-teal-600 to-teal-400 text-white hover:brightness-110 hover:scale-105 focus:ring-teal-500 border-0',
    secondary:
      'border-2 border-teal-400 bg-transparent text-teal-300 hover:bg-teal-900/20 hover:text-white hover:border-teal-300 focus:ring-teal-400',
    outline:
      'border-2 border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800 hover:text-teal-300 focus:ring-teal-500',
    text:
      'bg-transparent text-teal-400 hover:text-white font-semibold focus:ring-teal-400',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-8 py-3',
  };

  return (
    <button
      className={[
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
