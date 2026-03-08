'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { PlateSetupPanel } from './PlateSetupPanel'
import { SessionForm, type ExerciseRow } from './SessionForm'
import { ResultsView } from './ResultsView'
import { calculateSession } from '@/lib/calculator'
import { loadPreferences, savePreferences } from '@/lib/storage'
import { getDefaultPlates, getDefaultBarbellWeight } from '@/lib/constants'
import type { Unit } from '@gymbro/schemas'

export function CalculatorApp() {
  const [unit, setUnit] = useState<Unit>('lbs')
  const [barbellWeight, setBarbellWeight] = useState(45)
  const [availablePlates, setAvailablePlates] = useState<number[]>(getDefaultPlates('lbs'))
  const [exercises, setExercises] = useState<ExerciseRow[]>([
    { id: '1', name: '', weightStr: '' },
  ])
  const [hydrated, setHydrated] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const saved = loadPreferences()
    if (saved) {
      setUnit(saved.unit)
      setBarbellWeight(saved.barbellWeight)
      setAvailablePlates(saved.availablePlates)
    }
    setHydrated(true)
  }, [])

  // Save preferences whenever they change
  useEffect(() => {
    if (!hydrated) return
    savePreferences({ unit, barbellWeight, availablePlates })
  }, [unit, barbellWeight, availablePlates, hydrated])

  const handleUnitChange = useCallback((newUnit: Unit) => {
    setUnit(newUnit)
    setBarbellWeight(getDefaultBarbellWeight(newUnit))
    setAvailablePlates(getDefaultPlates(newUnit))
    setExercises([{ id: crypto.randomUUID(), name: '', weightStr: '' }])
  }, [])

  const result = useMemo(() => {
    const validTargets = exercises
      .filter((e) => e.weightStr.trim() !== '')
      .map((e) => ({
        id: e.id,
        name: e.name.trim() || `Exercise`,
        weight: parseFloat(e.weightStr),
      }))
      .filter((e) => !isNaN(e.weight) && e.weight > 0)

    if (validTargets.length === 0) return null

    return calculateSession({ unit, barbellWeight, availablePlates, targets: validTargets })
  }, [exercises, unit, barbellWeight, availablePlates])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800/60 px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-gray-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏋️</span>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight leading-none">GymBro</h1>
            <p className="text-[11px] text-gray-500 leading-none mt-0.5">Plate Calculator</p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center bg-gray-800 rounded-lg p-1 gap-1">
          {(['lbs', 'kg'] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => handleUnitChange(u)}
              className={[
                'px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-150 cursor-pointer',
                unit === u
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-gray-400 hover:text-white',
              ].join(' ')}
            >
              {u}
            </button>
          ))}
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
        {/* Left: Setup */}
        <div className="flex flex-col gap-4">
          <PlateSetupPanel
            unit={unit}
            availablePlates={availablePlates}
            barbellWeight={barbellWeight}
            onPlatesChange={setAvailablePlates}
            onBarbellChange={setBarbellWeight}
          />
          <SessionForm exercises={exercises} unit={unit} onChange={setExercises} />

          <p className="text-xs text-gray-600 text-center">
            Results update automatically as you type
          </p>
        </div>

        {/* Right: Results */}
        <div>
          {result ? (
            <ResultsView result={result} unit={unit} barbellWeight={barbellWeight} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4 opacity-30">🏋️</div>
              <p className="text-gray-600 text-sm">
                Enter at least one weight above to see your plate setup
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
