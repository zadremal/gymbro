interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({ children, color, className = '' }: BadgeProps) {
  return (
    <span
      className={['inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white', className].join(' ')}
      style={color ? { backgroundColor: color } : undefined}
    >
      {children}
    </span>
  )
}
