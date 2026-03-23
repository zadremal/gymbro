import type { SessionInput, SessionResult, PlateConfig, Transition } from '@gymbro/schemas'

const EPSILON = 0.001

/**
 * Finds a combination of plates (from available denominations, unlimited copies)
 * that sums exactly to `target`. Returns plates sorted descending (heaviest first),
 * or null if the target is not achievable.
 */
function findPlates(target: number, available: number[]): number[] | null {
  if (target < EPSILON) return []

  const sorted = [...new Set(available)].sort((a, b) => b - a)

  function backtrack(remaining: number, idx: number): number[] | null {
    if (remaining < EPSILON) return []
    if (idx >= sorted.length) return null

    const plate = sorted[idx]

    if (plate > remaining + EPSILON) {
      return backtrack(remaining, idx + 1)
    }

    const maxCount = Math.floor((remaining + EPSILON) / plate)

    for (let count = maxCount; count >= 0; count--) {
      const sub = backtrack(remaining - count * plate, idx + 1)
      if (sub !== null) {
        return [...Array(count).fill(plate), ...sub]
      }
    }

    return null
  }

  return backtrack(target, 0)
}

/**
 * Computes the plate diff (add/remove per side) between two configurations.
 */
function computeSwaps(
  from: number[],
  to: number[],
): { add: number[]; remove: number[] } {
  const fromCounts = new Map<number, number>()
  for (const p of from) fromCounts.set(p, (fromCounts.get(p) ?? 0) + 1)

  const toCounts = new Map<number, number>()
  for (const p of to) toCounts.set(p, (toCounts.get(p) ?? 0) + 1)

  const add: number[] = []
  const remove: number[] = []

  for (const [plate, toCount] of toCounts) {
    const fromCount = fromCounts.get(plate) ?? 0
    for (let i = 0; i < toCount - fromCount; i++) add.push(plate)
  }

  for (const [plate, fromCount] of fromCounts) {
    const toCount = toCounts.get(plate) ?? 0
    for (let i = 0; i < fromCount - toCount; i++) remove.push(plate)
  }

  return {
    add: add.sort((a, b) => b - a),
    remove: remove.sort((a, b) => b - a),
  }
}

/**
 * Calculates the optimal plate configuration for each exercise in the session.
 *
 * Exercises are sorted ascending by weight so transitions favor add-only swaps:
 * the lighter exercise is set up first, then you just add plates for heavier ones.
 */
export function calculateSession(input: SessionInput): SessionResult {
  const { targets, availablePlates, barbellWeight } = input

  const sorted = [...targets].sort((a, b) => a.weight - b.weight)

  const configs: PlateConfig[] = []

  for (let i = 0; i < sorted.length; i++) {
    const exercise = sorted[i]
    const platesPerSide = (exercise.weight - barbellWeight) / 2

    if (platesPerSide < -EPSILON) {
      configs.push({ exercise, platesPerSide, config: [], feasible: false, addOnly: false })
      continue
    }

    if (platesPerSide < EPSILON) {
      configs.push({ exercise, platesPerSide: 0, config: [], feasible: true, addOnly: i > 0 })
      continue
    }

    let config: number[]
    let addOnly = false

    const prev = configs.length > 0 ? configs[configs.length - 1] : null

    if (prev?.feasible) {
      const prevSum = prev.config.reduce((s, p) => s + p, 0)
      const remaining = platesPerSide - prevSum

      if (remaining >= -EPSILON) {
        const additions = findPlates(Math.max(0, remaining), availablePlates)
        if (additions !== null) {
          config = [...prev.config, ...additions].sort((a, b) => b - a)
          addOnly = true
        } else {
          config = findPlates(platesPerSide, availablePlates) ?? []
        }
      } else {
        config = findPlates(platesPerSide, availablePlates) ?? []
      }
    } else {
      config = findPlates(platesPerSide, availablePlates) ?? []
    }

    const feasible = config.length > 0 || Math.abs(platesPerSide) < EPSILON

    configs.push({
      exercise,
      platesPerSide,
      config,
      feasible,
      addOnly: addOnly && i > 0,
    })
  }

  const transitions: Transition[] = []
  for (let i = 1; i < configs.length; i++) {
    const { add, remove } = computeSwaps(configs[i - 1].config, configs[i].config)
    transitions.push({
      from: configs[i - 1].exercise,
      to: configs[i].exercise,
      add,
      remove,
    })
  }

  return { configs, transitions }
}
