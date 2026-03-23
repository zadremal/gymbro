import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={[
          'border rounded-xl px-3 py-2 text-white text-sm min-h-[40px]',
          'placeholder-gray-600 outline-none',
          'transition-all duration-200',
          error
            ? 'border-red-500/60 focus:border-red-400 bg-red-950/20'
            : 'border-white/[0.08] focus:border-orange-500/60 bg-white/[0.05] focus:bg-white/[0.07]',
          className,
        ].join(' ')}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
