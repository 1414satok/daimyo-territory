import data1520 from './territories/1520.json'
import data1560 from './territories/1560.json'
import data1580 from './territories/1580.json'

export const YEAR_MIN = 1460
export const YEAR_MAX = 1590
export const YEAR_STEP = 5

const snapshots = [
  { year: 1520, data: data1520 },
  { year: 1560, data: data1560 },
  { year: 1580, data: data1580 },
]

export function getTerritoriesForYear(year) {
  const exact = snapshots.find(s => s.year === year)
  if (exact) return exact.data

  // 前後のスナップショットを探す
  const before = [...snapshots].reverse().find(s => s.year <= year)
  const after = snapshots.find(s => s.year > year)

  if (!before) return after?.data ?? snapshots[0].data
  if (!after) return before.data

  // 時間的に近い方を返す（将来的にポリゴン補間に拡張可能）
  const distBefore = year - before.year
  const distAfter = after.year - year
  return distBefore <= distAfter ? before.data : after.data
}

export function getAvailableYears() {
  return snapshots.map(s => s.year)
}
