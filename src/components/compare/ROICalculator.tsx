import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { schemes } from '../../data/schemes'
import type { SchemeId } from '../../data/types'
import { Disclaimer } from '../ui/primitives'
import { formatRM } from '../../lib/utils'

/**
 * Illustrative projection model. Revenue follows a capped exponential ramp:
 *   rev(t) = ceiling * effortFactor * capitalFactor * (1 - e^(-t / ramp))
 * effortFactor scales with hours vs the model's reference; capitalFactor
 * nudges capital-sensitive models. Deliberately simple and clearly labeled.
 */
export function ROICalculator() {
  const [schemeId, setSchemeId] = useState<SchemeId>('ai-agency')
  const [hours, setHours] = useState(20)
  const [capital, setCapital] = useState(1000)
  const [months, setMonths] = useState(12)

  const scheme = schemes.find((s) => s.id === schemeId)!
  const roi = scheme.roi

  const { data, cumulative, monthlyAtEnd, breakEven } = useMemo(() => {
    const effortFactor = Math.min(1.6, Math.max(0.25, hours / roi.hoursRef))
    const capitalFactor = 1 + roi.capitalWeight * (Math.min(3, capital / Math.max(1, roi.capitalRef)) - 1)
    let cum = -capital
    let be: number | null = null
    const pts = Array.from({ length: months + 1 }, (_, m) => {
      const monthly =
        roi.ceilingMonthly * effortFactor * Math.max(0.3, capitalFactor) * (1 - Math.exp(-m / roi.rampMonths))
      cum += monthly
      if (be === null && cum >= 0 && m > 0) be = m
      return { month: m, monthly: Math.round(monthly), cumulative: Math.round(cum) }
    })
    return {
      data: pts,
      cumulative: cum,
      monthlyAtEnd: pts[pts.length - 1].monthly,
      breakEven: be,
    }
  }, [scheme, hours, capital, months, roi])

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-white/50">Model</label>
          <select
            value={schemeId}
            onChange={(e) => setSchemeId(e.target.value as SchemeId)}
            className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white outline-none focus:border-accent"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id} className="bg-surface">
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <Slider label="Hours / week" value={hours} min={5} max={50} step={5} suffix=" hrs" onChange={setHours} />
        <Slider label="Starting capital" value={capital} min={0} max={5000} step={100} prefix="RM" onChange={setCapital} />
        <Slider label="Time horizon" value={months} min={3} max={24} step={1} suffix=" mo" onChange={setMonths} />

        <div className="rounded-xl border border-accent/20 bg-accent/[0.05] p-4 text-sm text-white/60">
          {scheme.roi.note}.
        </div>
      </div>

      {/* Outputs */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-3 gap-3">
          <Stat label={`Monthly at mo ${months}`} value={formatRM(monthlyAtEnd)} accent />
          <Stat label="Net cumulative" value={formatRM(Math.round(cumulative))} />
          <Stat label="Break-even" value={breakEven ? `mo ${breakEven}` : `> ${months} mo`} />
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-surface/60 p-5">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="roi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8702a" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#e8702a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tickFormatter={(v) => `mo ${v}`} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
              <YAxis tickFormatter={(v) => formatRM(Number(v))} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} tickLine={false} axisLine={false} width={52} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  const d = payload[0].payload as (typeof data)[number]
                  return (
                    <div className="rounded-lg border border-white/10 bg-surface p-3 text-xs shadow-xl">
                      <p className="font-semibold text-white">Month {label}</p>
                      <p className="text-accent">Monthly: {formatRM(d.monthly)}</p>
                      <p className="text-white/60">Cumulative: {formatRM(d.cumulative)}</p>
                    </div>
                  )
                }}
              />
              <Area type="monotone" dataKey="monthly" stroke="#e8702a" strokeWidth={2} fill="url(#roi)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Disclaimer>
          Illustrative only. A simplified capped-growth model using per-model coefficients — real outcomes vary
          enormously with execution, niche and luck. Not a forecast or a promise.
        </Disclaimer>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-white/50">{label}</label>
        <span className="text-sm font-medium text-white">
          {prefix}
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
      />
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface/60 p-4">
      <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
      <p className={cnStat(accent)}>{value}</p>
    </div>
  )
}

function cnStat(accent?: boolean) {
  return `mt-1 text-lg font-semibold ${accent ? 'text-accent' : 'text-white'}`
}
