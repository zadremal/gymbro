import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'text-white shadow-lg',
  secondary: 'bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/[0.1]',
  ghost: 'bg-transparent hover:bg-white/[0.06] text-gray-400 hover:text-white',
  danger: 'bg-red-600 hover:bg-red-500 text-white',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <button
      {...props}
      style={
        isPrimary
          ? { background: 'linear-gradient(135deg, #f97316, #ea580c)', ...style }
          : style
      }
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
        'transition-all duration-200 cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}
