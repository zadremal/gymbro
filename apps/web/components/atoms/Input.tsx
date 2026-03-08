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
          'bg-gray-800 border rounded-lg px-3 py-2 text-white text-sm',
          'placeholder-gray-500 outline-none',
          'transition-colors duration-150',
          error
            ? 'border-red-500 focus:border-red-400'
            : 'border-gray-700 focus:border-orange-500',
          className,
        ].join(' ')}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
