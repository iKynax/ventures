import { Link } from 'react-router-dom'
import { ArrowRight, GitCompareArrows, Map } from 'lucide-react'
import { SpotlightHero } from '../components/hero/SpotlightHero'
import { SchemeCard } from '../components/scheme/SchemeCard'
import { Section, Eyebrow } from '../components/ui/primitives'
import { schemes } from '../data/schemes'

export function Home() {
  return (
    <>
      <SpotlightHero />

      <Section id="schemes-preview" className="py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>The eleven models</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Every path, <span className="font-display italic font-normal text-accent">dissected.</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/55">
              Eleven online business models, each with a scorecard, an interactive process flow,
              real earnings ranges, a step-by-step playbook and the downsides nobody advertises.
            </p>
          </div>
          <Link
            to="/schemes"
            className="group inline-flex items-center gap-2 whitespace-nowrap text-sm text-accent hover:text-accent-hover"
          >
            See all eleven
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.slice(0, 6).map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/compare"
            className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-8 transition-all duration-300 ease-expo hover:border-white/25"
          >
            <div>
              <GitCompareArrows className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-xl font-semibold text-white">Comparison matrix</h3>
              <p className="mt-2 max-w-sm text-sm text-white/55">
                Sort and filter all eleven across every dimension. Overlay up to three on a radar.
                Simulate returns with the ROI calculator.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
          <Link
            to="/roadmap"
            className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-8 transition-all duration-300 ease-expo hover:border-white/25"
          >
            <div>
              <Map className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-xl font-semibold text-white">Build roadmap</h3>
              <p className="mt-2 max-w-sm text-sm text-white/55">
                A validation-gated sequence: what to start first for fast cash, what to build in
                parallel for cashflow, and what compounds into long-term equity.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </div>
      </Section>
    </>
  )
}
