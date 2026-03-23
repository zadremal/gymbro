import { getPlateColor, getPlateWidth, getPlateHeight } from '@/lib/constants'

interface BarbellVisualProps {
  config: number[]
}

function PlateRect({ weight }: { weight: number }) {
  const color = getPlateColor(weight)
  const width = getPlateWidth(weight)
  const height = getPlateHeight(weight)

  return (
    <div
      title={`${weight}`}
      style={{
        width,
        height,
        backgroundColor: color,
        boxShadow: `inset -2px 0 0 rgba(0,0,0,0.25)`,
        flexShrink: 0,
      }}
      className="rounded-sm"
    />
  )
}

export function BarbellVisual({ config }: BarbellVisualProps) {
  const maxHeight = 72

  return (
    <div
      className="flex items-center justify-center gap-0.5"
      style={{ minHeight: maxHeight + 16 }}
    >
      {/* Left side — config is sorted heaviest first (innermost), so render reversed for visual left side */}
      <div className="flex items-center gap-0.5 flex-row-reverse">
        {config.map((plate, i) => (
          <PlateRect key={i} weight={plate} />
        ))}
      </div>

      {/* Left collar */}
      <div className="w-2 bg-gray-500 rounded-l-sm" style={{ height: 32, flexShrink: 0 }} />

      {/* Barbell shaft */}
      <div className="bg-gray-400 rounded" style={{ width: 56, height: 12, flexShrink: 0 }} />

      {/* Right collar */}
      <div className="w-2 bg-gray-500 rounded-r-sm" style={{ height: 32, flexShrink: 0 }} />

      {/* Right side */}
      <div className="flex items-center gap-0.5">
        {config.map((plate, i) => (
          <PlateRect key={i} weight={plate} />
        ))}
      </div>
    </div>
  )
}
