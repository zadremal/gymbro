import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'

interface WeightInputProps {
  index: number
  name: string
  weightStr: string
  unit: string
  onNameChange: (value: string) => void
  onWeightChange: (value: string) => void
  onRemove: () => void
  showRemove: boolean
}

export function WeightInput({
  index,
  name,
  weightStr,
  unit,
  onNameChange,
  onWeightChange,
  onRemove,
  showRemove,
}: WeightInputProps) {
  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1">
        <Input
          id={`exercise-name-${index}`}
          placeholder={`Exercise ${index + 1}`}
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className="w-28">
        <div className="relative">
          <Input
            id={`exercise-weight-${index}`}
            type="number"
            inputMode="decimal"
            min="0"
            step="2.5"
            placeholder="0"
            value={weightStr}
            onChange={(e) => onWeightChange(e.target.value)}
            className="pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
            {unit}
          </span>
        </div>
      </div>
      {showRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-gray-500 hover:text-red-400 px-2"
          title="Remove"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      )}
    </div>
  )
}
