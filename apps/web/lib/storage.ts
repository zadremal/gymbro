import { SavedPreferencesSchema, type SavedPreferences } from '@gymbro/schemas'

const STORAGE_KEY = 'gymbro:preferences'

export function loadPreferences(): SavedPreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return SavedPreferencesSchema.parse(JSON.parse(raw))
  } catch {
    return null
  }
}

export function savePreferences(prefs: SavedPreferences): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // localStorage unavailable (private mode, storage full, etc.)
  }
}
