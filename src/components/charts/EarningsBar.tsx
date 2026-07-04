import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { EarningsTier } from '../../data/types'
import { formatRM } from '../../lib/utils'

export function EarningsBar({ tiers }: { tiers: EarningsTier[] }) {
  const data = tiers.map((t) => ({
    label: t.label,
    low: t.low,
    range: t.high - t.low,
    high: t.high,
    note: t.note,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatRM(Number(v))}
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const d = payload[0].payload as (typeof data)[number]
            return (
              <div className="max-w-[220px] rounded-lg border border-white/10 bg-surface p-3 text-xs shadow-xl">
                <p className="font-semibold text-white">{d.label}</p>
                <p className="mt-1 text-accent">
                  {formatRM(d.low)} – {formatRM(d.high)} / mo
                </p>
                {d.note && <p className="mt-1 text-white/50">{d.note}</p>}
              </div>
            )
          }}
        />
        {/* invisible base to create a floating range bar */}
        <Bar dataKey="low" stackId="a" fill="transparent" />
        <Bar dataKey="range" stackId="a" radius={[4, 4, 4, 4]}>
          {data.map((_, i) => (
            <Cell key={i} fill="#e8702a" fillOpacity={0.45 + i * 0.2} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
