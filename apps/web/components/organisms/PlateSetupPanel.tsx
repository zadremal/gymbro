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
    <section className="rounded-2xl p-5 border border-white/[0.07] bg-white/[0.02]">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
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
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Barbell Weight
        </p>
        <div className="flex gap-2 flex-wrap">
          {barbellOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onBarbellChange(opt.value)}
              className={[
                'px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[40px]',
                barbellWeight === opt.value
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-white border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08]',
              ].join(' ')}
              style={
                barbellWeight === opt.value
                  ? { background: 'linear-gradient(135deg, #f97316, #ea580c)' }
                  : undefined
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
