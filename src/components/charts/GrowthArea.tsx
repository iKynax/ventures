import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { GrowthPoint } from '../../data/types'
import { formatRM } from '../../lib/utils'

export function GrowthArea({ growth }: { growth: GrowthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={growth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="good" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8702a" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#e8702a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="typical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ea8de" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#4ea8de" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="month"
          tickFormatter={(v) => `mo ${v}`}
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
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="rounded-lg border border-white/10 bg-surface p-3 text-xs shadow-xl">
                <p className="font-semibold text-white">Month {label}</p>
                {payload.map((p) => (
                  <p key={p.name} style={{ color: p.color as string }}>
                    {p.name}: {formatRM(Number(p.value))}/mo
                  </p>
                ))}
              </div>
            )
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
          formatter={(v) => <span className="text-white/60">{v}</span>}
        />
        <Area
          type="monotone"
          dataKey="good"
          name="Good execution"
          stroke="#e8702a"
          strokeWidth={2}
          fill="url(#good)"
        />
        <Area
          type="monotone"
          dataKey="typical"
          name="Typical"
          stroke="#4ea8de"
          strokeWidth={2}
          fill="url(#typical)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
