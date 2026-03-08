import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'

interface WeightInputProps {
  index: number
  name: string
  weights: string[]
  unit: string
  onNameChange: (value: string) => void
  onWeightsChange: (weights: string[]) => void
  onRemove: () => void
  showRemove: boolean
}

export function WeightInput({
  index,
  name,
  weights,
  unit,
  onNameChange,
  onWeightsChange,
  onRemove,
  showRemove,
}: WeightInputProps) {
  function updateWeight(i: number, val: string) {
    onWeightsChange(weights.map((w, j) => (j === i ? val : w)))
  }

  function addWeight() {
    if (weights.length < 5) onWeightsChange([...weights, ''])
  }

  function removeWeight(i: number) {
    if (weights.length <= 1) return
    onWeightsChange(weights.filter((_, j) => j !== i))
  }

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
      {/* Exercise name row */}
      <div className="flex gap-2 items-center">
        <Input
          id={`exercise-name-${index}`}
          placeholder={`Exercise ${index + 1}`}
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="flex-1"
        />
        {showRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-gray-600 hover:text-red-400 px-2 min-h-[44px]"
            title="Remove exercise"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        )}
      </div>

      {/* Weights row */}
      <div className="flex flex-wrap gap-2 items-center">
        {weights.map((w, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="relative w-24">
              <Input
                id={`exercise-weight-${index}-${i}`}
                type="number"
                inputMode="decimal"
                min="0"
                step="2.5"
                placeholder="0"
                value={w}
                onChange={(e) => updateWeight(i, e.target.value)}
                className="pr-9 text-center"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-500 pointer-events-none">
                {unit}
              </span>
            </div>
            {weights.length > 1 && (
              <button
                onClick={() => removeWeight(i)}
                className="text-gray-600 hover:text-red-400 transition-colors p-1 min-w-[24px] min-h-[24px] flex items-center justify-center"
                title="Remove this weight"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}

        {weights.length < 5 && (
          <button
            onClick={addWeight}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-orange-500/10 min-h-[36px]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add set
          </button>
        )}
      </div>
    </div>
  )
}
