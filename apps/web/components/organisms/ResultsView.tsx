import { Badge } from '@/components/atoms/Badge'
import { BarbellVisual } from '@/components/molecules/BarbellVisual'
import { SwapIndicator } from '@/components/molecules/SwapIndicator'
import { getPlateColor } from '@/lib/constants'
import type { SessionResult } from '@gymbro/schemas'
import type { Unit } from '@gymbro/schemas'

interface ResultsViewProps {
  result: SessionResult
  unit: Unit
  barbellWeight: number
}

export function ResultsView({ result, unit, barbellWeight }: ResultsViewProps) {
  const { configs, transitions } = result

  if (configs.length === 0) return null

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Session Plan
        </h2>
        <span className="text-xs text-gray-700">
          Sorted lightest → heaviest to minimize plate swaps
        </span>
      </div>

      {configs.map((cfg, i) => {
        const transition = transitions[i - 1]
        const isFirst = i === 0
        const totalWeight = cfg.config.reduce((s, p) => s + p, 0) * 2 + barbellWeight

        return (
          <div key={cfg.exercise.id}>
            {!isFirst && transition && (
              <SwapIndicator transition={transition} unit={unit} />
            )}

            <div
              className="rounded-2xl border p-5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderColor: cfg.feasible ? 'rgba(255,255,255,0.07)' : 'rgba(239,68,68,0.3)',
              }}
            >
              {isFirst && (
                <div className="inline-flex items-center gap-1.5 text-orange-400 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3" style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)' }}>
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  Start here
                </div>
              )}

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {cfg.exercise.name || `Exercise ${i + 1}`}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-extrabold text-orange-400">
                      {cfg.exercise.weight}
                    </span>
                    <span className="text-sm text-gray-500">{unit}</span>
                    <span className="text-gray-700 text-sm mx-1">·</span>
                    <span className="text-sm text-gray-500">
                      {cfg.platesPerSide} {unit} per side
                    </span>
                  </div>
                </div>

                {cfg.addOnly && (
                  <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Add only
                  </div>
                )}
              </div>

              {cfg.feasible ? (
                <>
                  {cfg.config.length > 0 ? (
                    <>
                      <div className="overflow-x-auto pb-1">
                        <BarbellVisual config={cfg.config} />
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cfg.config.map((plate, pi) => (
                          <Badge key={pi} color={getPlateColor(plate)}>
                            {plate} {unit}
                          </Badge>
                        ))}
                        <span className="text-xs text-gray-600 self-center ml-1">per side</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Barbell only — no plates needed</p>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {cfg.platesPerSide < 0
                    ? `Weight is less than barbell (${barbellWeight} ${unit})`
                    : `Cannot make ${cfg.platesPerSide} ${unit}/side with selected plates`}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
