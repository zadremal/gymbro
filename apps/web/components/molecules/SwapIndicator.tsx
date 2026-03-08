import { Badge } from '@/components/atoms/Badge'
import { getPlateColor } from '@/lib/constants'
import type { Transition } from '@gymbro/schemas'

interface SwapIndicatorProps {
  transition: Transition
  unit: string
}

export function SwapIndicator({ transition, unit }: SwapIndicatorProps) {
  const { add, remove } = transition
  const isAddOnly = remove.length === 0

  if (add.length === 0 && remove.length === 0) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <div className="w-px h-4 bg-gray-700" />
          <span>Same setup</span>
          <div className="w-px h-4 bg-gray-700" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div
        className={[
          'w-0.5 h-3',
          isAddOnly ? 'bg-green-500' : 'bg-amber-500',
        ].join(' ')}
      />

      <div
        className={[
          'flex flex-col gap-1.5 px-4 py-2.5 rounded-xl border text-xs w-full max-w-sm',
          isAddOnly
            ? 'border-green-800 bg-green-950/60'
            : 'border-amber-800 bg-amber-950/40',
        ].join(' ')}
      >
        {remove.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-red-400 font-semibold uppercase tracking-wide text-[10px]">
              Remove per side
            </span>
            <div className="flex gap-1 flex-wrap">
              {remove.map((p, i) => (
                <Badge key={i} color={getPlateColor(p)}>
                  {p} {unit}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {add.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-green-400 font-semibold uppercase tracking-wide text-[10px]">
              Add per side
            </span>
            <div className="flex gap-1 flex-wrap">
              {add.map((p, i) => (
                <Badge key={i} color={getPlateColor(p)}>
                  {p} {unit}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {isAddOnly && (
          <span className="text-green-500 text-[10px] font-medium">
            Add-only — no plate removal needed
          </span>
        )}
      </div>

      <div
        className={[
          'w-0.5 h-3',
          isAddOnly ? 'bg-green-500' : 'bg-amber-500',
        ].join(' ')}
      />
    </div>
  )
}
