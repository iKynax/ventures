import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flag, ArrowRight } from 'lucide-react'
import { Section, Eyebrow } from '../components/ui/primitives'
import { roadmap, roadmapStart, totalDays } from '../data/roadmap'
import { schemeById } from '../data/schemes'
import { getIcon } from '../components/icons'

function dateFor(dayOffset: number): string {
  const d = new Date(roadmapStart)
  d.setDate(d.getDate() + dayOffset)
  return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
}

export function Roadmap() {
  const [hovered, setHovered] = useState<string | null>(null)
  const monthMarks = Array.from({ length: Math.ceil(totalDays / 30) + 1 }, (_, i) => i * 30)

  return (
    <Section className="pt-28 pb-16">
      <Eyebrow>Build roadmap</Eyebrow>
      <h1 className="mt-4 font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        A validation-gated sequence
      </h1>
      <p className="mt-4 max-w-2xl text-white/55">
        Don't start all eleven. Start fast-cash plays to fund runway, layer a cashflow engine, and
        let long-term equity compound in the background. Every bar has a 30-day gate — hit it or reallocate.
      </p>

      {/* Timeline */}
      <div className="mt-12 overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Month axis */}
          <div className="relative mb-4 ml-[200px] h-6 border-b border-white/10">
            {monthMarks.map((d) => (
              <div
                key={d}
                className="absolute top-0 flex flex-col items-start"
                style={{ left: `${(d / totalDays) * 100}%` }}
              >
                <span className="text-[10px] text-white/35">{dateFor(d)}</span>
                <span className="mt-1 h-2 w-px bg-white/10" />
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {roadmap.map((phase) => (
              <div key={phase.name}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: phase.color }} />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{phase.name}</h3>
                  <span className="text-xs text-white/40">— {phase.intent}</span>
                </div>
                <div className="space-y-2.5">
                  {phase.items.map((item) => {
                    const scheme = schemeById(item.scheme)
                    const Icon = scheme ? getIcon(scheme.icon) : Flag
                    const isHover = hovered === item.label
                    return (
                      <div key={item.label} className="flex items-center gap-3">
                        <Link
                          to={`/scheme/${item.scheme}`}
                          className="flex w-[188px] shrink-0 items-center gap-2 text-sm text-white/70 hover:text-white"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0 text-white/40" />
                          <span className="truncate">{scheme?.shortName}</span>
                        </Link>
                        <div className="relative h-9 flex-1">
                          <div
                            className="group absolute top-0 flex h-9 cursor-default items-center rounded-lg border px-3 transition-all duration-300 ease-expo"
                            style={{
                              left: `${(item.start / totalDays) * 100}%`,
                              width: `${(item.duration / totalDays) * 100}%`,
                              background: `${phase.color}22`,
                              borderColor: isHover ? phase.color : `${phase.color}55`,
                            }}
                            onMouseEnter={() => setHovered(item.label)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            <span className="truncate text-xs font-medium text-white/85">{item.label}</span>
                          </div>
                          {isHover && (
                            <div className="absolute -top-1 left-0 z-20 -translate-y-full rounded-lg border border-white/10 bg-surface p-3 text-xs shadow-xl" style={{ minWidth: 220 }}>
                              <p className="font-semibold text-white">{item.label}</p>
                              <p className="mt-1 text-white/50">
                                {dateFor(item.start)} → {dateFor(item.start + item.duration)} · {item.duration} days
                              </p>
                              <p className="mt-1.5 flex items-start gap-1.5 text-accent">
                                <Flag className="mt-0.5 h-3 w-3 shrink-0" />
                                {item.gate}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="mt-16 grid gap-4 border-t border-white/8 pt-12 sm:grid-cols-3">
        {[
          { t: '30-day validation gates', d: 'Every venture gets 30 days to hit a clear signal. No signal → reallocate hours, don\'t sink cost.' },
          { t: 'Fast cash funds equity', d: 'Clipping, UGC and templates buy the runway to patiently build YouTube, SEO and SaaS.' },
          { t: 'Two founders, parallel lanes', d: 'One owns the service cashflow engine; one owns the compounding product lane. Reconvene weekly.' },
        ].map((p) => (
          <div key={p.t} className="rounded-2xl border border-white/10 bg-surface/50 p-6">
            <h4 className="font-semibold text-white">{p.t}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{p.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/compare" className="group inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover">
          Pressure-test the sequence in the comparison matrix
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  )
}
