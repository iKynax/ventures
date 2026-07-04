import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import { RADAR_DIMENSIONS, radarValues } from '../../data/schemes'
import type { Scheme } from '../../data/types'

const PALETTE = ['#e8702a', '#4ea8de', '#8ac926']

export function RadarCard({ schemesToShow }: { schemesToShow: Scheme[] }) {
  const data = RADAR_DIMENSIONS.map((dim) => {
    const row: Record<string, string | number> = { dim: dim.label }
    schemesToShow.forEach((s) => {
      row[s.id] = radarValues(s)[dim.key]
    })
    return row
  })

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis
          dataKey="dim"
          tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 11 }}
        />
        {schemesToShow.map((s, i) => (
          <Radar
            key={s.id}
            name={s.shortName}
            dataKey={s.id}
            stroke={PALETTE[i % PALETTE.length]}
            fill={PALETTE[i % PALETTE.length]}
            fillOpacity={0.18}
            strokeWidth={2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  )
}
