import { getPlateColor } from '@/lib/constants'

interface PlateChipProps {
  weight: number
  unit: string
  selected: boolean
  onToggle: () => void
}

export function PlateChip({ weight, unit, selected, onToggle }: PlateChipProps) {
  const color = getPlateColor(weight)

  return (
    <button
      onClick={onToggle}
      className={[
        'relative flex flex-col items-center justify-center',
        'w-16 h-16 rounded-lg border-2 font-bold text-sm transition-all duration-150 cursor-pointer',
        selected
          ? 'border-transparent text-white shadow-lg scale-105'
          : 'border-gray-700 text-gray-500 bg-gray-800/50 hover:border-gray-500',
      ].join(' ')}
      style={selected ? { backgroundColor: color, boxShadow: `0 0 12px ${color}60` } : undefined}
    >
      <span className="text-base font-extrabold leading-none">{weight}</span>
      <span className="text-[10px] font-medium opacity-80 mt-0.5">{unit}</span>
      {selected && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </button>
  )
}
