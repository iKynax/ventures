import type { Scheme } from '../../data/types'
import { RadarCard } from '../charts/RadarCard'
import { Card } from '../ui/primitives'
import { cn } from '../../lib/utils'

interface Gauge {
  label: string
  value: number
  /** true = higher is worse (saturation) */
  inverted?: boolean
  display?: string
}

export function Scorecard({ scheme }: { scheme: Scheme }) {
  const s = scheme.scorecard
  const gauges: Gauge[] = [
    { label: 'Difficulty', value: s.difficulty, inverted: true },
    { label: 'Automatability', value: s.automatability },
    { label: 'Skill-fit (AI devs)', value: s.skillFit },
    { label: 'Income ceiling', value: s.ceiling },
    { label: 'Saturation risk', value: s.saturation, inverted: true },
  ]

  const tiles = [
    { label: 'Startup cost', value: s.startupCost },
    { label: 'Time to first RM', value: s.firstDollar },
    { label: 'Weekly upkeep', value: s.upkeep },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-sm font-medium uppercase tracking-wider text-white/50">Scorecard shape</h3>
        <RadarCard schemesToShow={[scheme]} />
      </Card>

      <div className="grid gap-4 lg:col-span-3">
        <div className="grid grid-cols-3 gap-4">
          {tiles.map((t) => (
            <Card key={t.label} className="p-4">
              <p className="text-xs uppercase tracking-wider text-white/40">{t.label}</p>
              <p className="mt-2 text-lg font-semibold text-white sm:text-xl">{t.value}</p>
            </Card>
          ))}
        </div>
        <Card className="grid gap-4 p-6 sm:grid-cols-2">
          {gauges.map((g) => (
            <GaugeRow key={g.label} gauge={g} />
          ))}
        </Card>
      </div>
    </div>
  )
}

function GaugeRow({ gauge }: { gauge: Gauge }) {
  const pct = (gauge.value / 5) * 100
  // For inverted metrics, high value = bad = warmer/red bar
  const good = gauge.inverted ? gauge.value <= 2 : gauge.value >= 4
  const bad = gauge.inverted ? gauge.value >= 4 : gauge.value <= 2
  const color = good ? 'bg-[#8ac926]' : bad ? 'bg-[#e5484d]' : 'bg-accent'

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{gauge.label}</span>
        <span className="font-medium text-white/90">{gauge.value}/5</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <div className={cn('h-full rounded-full transition-all duration-700 ease-expo', color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
