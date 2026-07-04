export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function formatRM(value: number): string {
  if (value >= 1000) {
    const k = value / 1000
    return `RM${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`
  }
  return `RM${Math.round(value)}`
}
