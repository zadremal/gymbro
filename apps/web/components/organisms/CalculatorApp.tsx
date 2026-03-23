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
    { id: '1', name: '', weights: [''] },
  ])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadPreferences()
    if (saved) {
      setUnit(saved.unit)
      setBarbellWeight(saved.barbellWeight)
      setAvailablePlates(saved.availablePlates)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    savePreferences({ unit, barbellWeight, availablePlates })
  }, [unit, barbellWeight, availablePlates, hydrated])

  const handleUnitChange = useCallback((newUnit: Unit) => {
    setUnit(newUnit)
    setBarbellWeight(getDefaultBarbellWeight(newUnit))
    setAvailablePlates(getDefaultPlates(newUnit))
    setExercises([{ id: crypto.randomUUID(), name: '', weights: [''] }])
  }, [])

  const result = useMemo(() => {
    const validTargets = exercises
      .flatMap((e) =>
        e.weights
          .filter((w) => w.trim() !== '')
          .map((w, wi) => ({
            id: `${e.id}-${wi}`,
            name: e.name.trim() || 'Exercise',
            weight: parseFloat(w),
          })),
      )
      .filter((t) => !isNaN(t.weight) && t.weight > 0)

    if (validTargets.length === 0) return null

    return calculateSession({ unit, barbellWeight, availablePlates, targets: validTargets })
  }, [exercises, unit, barbellWeight, availablePlates])

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0a0a10' }}>
      {/* Header */}
      <header
        className="border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl"
        style={{
          borderColor: 'rgba(255,255,255,0.07)',
          backgroundColor: 'rgba(10,10,16,0.85)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            G
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight leading-none text-white">
              GymBro
            </h1>
            <p className="text-[11px] text-gray-500 leading-none mt-0.5">Plate Calculator</p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div
          className="flex items-center rounded-xl p-1 gap-1"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          {(['lbs', 'kg'] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => handleUnitChange(u)}
              className={[
                'px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[36px]',
                unit === u
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-white',
              ].join(' ')}
              style={
                unit === u
                  ? { background: 'linear-gradient(135deg, #f97316, #ea580c)' }
                  : undefined
              }
            >
              {u}
            </button>
          ))}
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 items-start">
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

          <p className="text-xs text-gray-700 text-center">
            Results update automatically as you type
          </p>
        </div>

        {/* Right: Results */}
        <div>
          {result ? (
            <ResultsView result={result} unit={unit} barbellWeight={barbellWeight} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-5"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.2)',
                  color: 'rgba(249,115,22,0.4)',
                }}
              >
                G
              </div>
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
