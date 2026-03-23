import { z } from 'zod'

export const UnitSchema = z.enum(['lbs', 'kg'])
export type Unit = z.infer<typeof UnitSchema>

export const ExerciseTargetSchema = z.object({
  id: z.string(),
  name: z.string(),
  weight: z.number().positive(),
})
export type ExerciseTarget = z.infer<typeof ExerciseTargetSchema>

export const SessionInputSchema = z.object({
  unit: UnitSchema,
  barbellWeight: z.number().positive(),
  availablePlates: z.array(z.number().positive()),
  targets: z.array(ExerciseTargetSchema).min(1).max(25),
})
export type SessionInput = z.infer<typeof SessionInputSchema>

export const PlateConfigSchema = z.object({
  exercise: ExerciseTargetSchema,
  platesPerSide: z.number(),
  config: z.array(z.number()),
  feasible: z.boolean(),
  addOnly: z.boolean(),
})
export type PlateConfig = z.infer<typeof PlateConfigSchema>

export const TransitionSchema = z.object({
  from: ExerciseTargetSchema,
  to: ExerciseTargetSchema,
  add: z.array(z.number()),
  remove: z.array(z.number()),
})
export type Transition = z.infer<typeof TransitionSchema>

export const SessionResultSchema = z.object({
  configs: z.array(PlateConfigSchema),
  transitions: z.array(TransitionSchema),
})
export type SessionResult = z.infer<typeof SessionResultSchema>

export const SavedPreferencesSchema = z.object({
  unit: UnitSchema,
  barbellWeight: z.number().positive(),
  availablePlates: z.array(z.number().positive()),
})
export type SavedPreferences = z.infer<typeof SavedPreferencesSchema>
