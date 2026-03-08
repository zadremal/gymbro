import type { Unit } from '@gymbro/schemas'

export const DEFAULT_PLATES_LBS = [45, 35, 25, 10, 5, 2.5]
export const DEFAULT_PLATES_KG = [25, 20, 15, 10, 5, 2.5, 1.25]

export const DEFAULT_BARBELL_LBS = 45
export const DEFAULT_BARBELL_KG = 20

export const BARBELL_OPTIONS_LBS = [
  { label: '45 lbs (Standard)', value: 45 },
  { label: '35 lbs (Women\'s)', value: 35 },
  { label: '15 lbs (EZ-curl)', value: 15 },
]

export const BARBELL_OPTIONS_KG = [
  { label: '20 kg (Standard)', value: 20 },
  { label: '15 kg (Women\'s)', value: 15 },
  { label: '10 kg (EZ-curl)', value: 10 },
]

// Plate colors follow international bumper plate standards (adapted for lbs)
const PLATE_COLORS: Record<string, string> = {
  // lbs
  '45': '#3B82F6',   // blue
  '35': '#EAB308',   // yellow
  '25': '#22C55E',   // green
  '10': '#E5E7EB',   // light gray (white)
  '5':  '#6B7280',   // gray
  '2.5': '#9CA3AF',  // light gray
  // kg
  '20': '#3B82F6',   // blue
  '15': '#EAB308',   // yellow
  '1.25': '#D1D5DB', // silver
}

export function getPlateColor(weight: number): string {
  return PLATE_COLORS[weight.toString()] ?? '#6B7280'
}

export function getPlateWidth(weight: number): number {
  if (weight >= 45) return 18
  if (weight >= 35) return 15
  if (weight >= 25) return 13
  if (weight >= 20) return 13
  if (weight >= 15) return 11
  if (weight >= 10) return 10
  if (weight >= 5) return 7
  if (weight >= 2.5) return 5
  return 4
}

export function getPlateHeight(weight: number): number {
  if (weight >= 45) return 72
  if (weight >= 35) return 64
  if (weight >= 25) return 56
  if (weight >= 20) return 56
  if (weight >= 15) return 48
  if (weight >= 10) return 40
  if (weight >= 5) return 32
  if (weight >= 2.5) return 24
  return 18
}

export function getDefaultPlates(unit: Unit): number[] {
  return unit === 'lbs' ? [...DEFAULT_PLATES_LBS] : [...DEFAULT_PLATES_KG]
}

export function getDefaultBarbellWeight(unit: Unit): number {
  return unit === 'lbs' ? DEFAULT_BARBELL_LBS : DEFAULT_BARBELL_KG
}

export function getBarbellOptions(unit: Unit) {
  return unit === 'lbs' ? BARBELL_OPTIONS_LBS : BARBELL_OPTIONS_KG
}
