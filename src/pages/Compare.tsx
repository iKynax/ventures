import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { Section, Eyebrow, Card } from '../components/ui/primitives'
import { MatrixTable } from '../components/compare/MatrixTable'
import { RadarCard } from '../components/charts/RadarCard'
import { ROICalculator } from '../components/compare/ROICalculator'
import { schemes } from '../data/schemes'
import { useStore } from '../store/useStore'

export function Compare() {
  const compareIds = useStore((s) => s.compareIds)
  const toggleCompare = useStore((s) => s.toggleCompare)
  const clearCompare = useStore((s) => s.clearCompare)
  const selected = schemes.filter((s) => compareIds.includes(s.id))

  return (
    <Section className="space-y-16 pt-28 pb-16">
      <div>
        <Eyebrow>Comparison</Eyebrow>
        <h1 className="mt-4 font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          All eleven, side by side
        </h1>
        <p className="mt-4 max-w-xl text-white/55">
          Sort any column. Add up to three models to overlay them on a radar. Then pressure-test
          the numbers with the ROI calculator.
        </p>
      </div>

      <MatrixTable />

      {/* Radar overlay */}
      <div className="scroll-mt-24 border-t border-white/8 pt-12">
        <Eyebrow>Radar overlay</Eyebrow>
        <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Compare shapes (up to 3)
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="p-6 lg:col-span-3">
            {selected.length > 0 ? (
              <RadarCard schemesToShow={selected} />
            ) : (
              <div className="flex h-[320px] flex-col items-center justify-center text-center text-white/40">
                <p>Add models below or from any scheme page to overlay them here.</p>
              </div>
            )}
          </Card>
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Selected ({selected.length}/3)</span>
              {selected.length > 0 && (
                <button onClick={clearCompare} className="text-xs text-white/40 hover:text-white">
                  Clear all
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {schemes.map((s) => {
                const active = compareIds.includes(s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleCompare(s.id)}
                    className={
                      'rounded-full border px-3 py-1.5 text-xs transition-colors ' +
                      (active
                        ? 'border-accent bg-accent/15 text-white'
                        : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white')
                    }
                  >
                    {s.shortName}
                    {active && <X className="ml-1.5 inline h-3 w-3" />}
                  </button>
                )
              })}
            </div>
            {selected.length > 0 && (
              <div className="mt-6 space-y-2">
                {selected.map((s, i) => (
                  <Link
                    key={s.id}
                    to={`/scheme/${s.id}`}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-surface/50 px-4 py-2.5 text-sm text-white/80 hover:border-white/25"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: ['#e8702a', '#4ea8de', '#8ac926'][i] }}
                    />
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROI */}
      <div className="scroll-mt-24 border-t border-white/8 pt-12">
        <Eyebrow>ROI calculator</Eyebrow>
        <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Simulate the return
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/55">
          Adjust effort, capital and horizon to see an illustrative revenue ramp and break-even for any model.
        </p>
        <div className="mt-6">
          <ROICalculator />
        </div>
      </div>
    </Section>
  )
}
