import { WeightInput } from '@/components/molecules/WeightInput'
import { Button } from '@/components/atoms/Button'
import type { Unit } from '@gymbro/schemas'

export interface ExerciseRow {
  id: string
  name: string
  weights: string[]
}

interface SessionFormProps {
  exercises: ExerciseRow[]
  unit: Unit
  onChange: (exercises: ExerciseRow[]) => void
}

export function SessionForm({ exercises, unit, onChange }: SessionFormProps) {
  function updateRow(id: string, patch: Partial<ExerciseRow>) {
    onChange(exercises.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function addRow() {
    if (exercises.length >= 5) return
    onChange([
      ...exercises,
      { id: crypto.randomUUID(), name: '', weights: [''] },
    ])
  }

  function removeRow(id: string) {
    onChange(exercises.filter((e) => e.id !== id))
  }

  return (
    <section className="rounded-2xl p-5 border border-white/[0.07] bg-white/[0.02]">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
        Session Weights
      </h2>

      <div className="flex flex-col gap-3 mb-4">
        {exercises.map((ex, i) => (
          <WeightInput
            key={ex.id}
            index={i}
            name={ex.name}
            weights={ex.weights}
            unit={unit}
            onNameChange={(v) => updateRow(ex.id, { name: v })}
            onWeightsChange={(v) => updateRow(ex.id, { weights: v })}
            onRemove={() => removeRow(ex.id)}
            showRemove={exercises.length > 1}
          />
        ))}
      </div>

      {exercises.length < 5 && (
        <Button variant="ghost" size="sm" onClick={addRow} className="text-gray-500 hover:text-white min-h-[44px]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add exercise
        </Button>
      )}

      {exercises.length === 5 && (
        <p className="text-xs text-gray-700 mt-1">Maximum 5 exercises per session</p>
      )}
    </section>
  )
}
