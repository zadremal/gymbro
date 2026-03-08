import { PlateChip } from '@/components/molecules/PlateChip'
import { getDefaultPlates, getBarbellOptions } from '@/lib/constants'
import type { Unit } from '@gymbro/schemas'

interface PlateSetupPanelProps {
  unit: Unit
  availablePlates: number[]
  barbellWeight: number
  onPlatesChange: (plates: number[]) => void
  onBarbellChange: (weight: number) => void
}

export function PlateSetupPanel({
  unit,
  availablePlates,
  barbellWeight,
  onPlatesChange,
  onBarbellChange,
}: PlateSetupPanelProps) {
  const allPlates = getDefaultPlates(unit)
  const barbellOptions = getBarbellOptions(unit)

  function togglePlate(weight: number) {
    if (availablePlates.includes(weight)) {
      onPlatesChange(availablePlates.filter((p) => p !== weight))
    } else {
      onPlatesChange([...availablePlates, weight].sort((a, b) => b - a))
    }
  }

  return (
    <section className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Available Plates
      </h2>

      <div className="flex flex-wrap gap-3 mb-5">
        {allPlates.map((weight) => (
          <PlateChip
            key={weight}
            weight={weight}
            unit={unit}
            selected={availablePlates.includes(weight)}
            onToggle={() => togglePlate(weight)}
          />
        ))}
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
          Barbell Weight
        </p>
        <div className="flex gap-2 flex-wrap">
          {barbellOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onBarbellChange(opt.value)}
              className={[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer',
                barbellWeight === opt.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
