import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, GitCompareArrows, Plus, Check } from 'lucide-react'
import { schemeById, schemes } from '../data/schemes'
import { flowsById } from '../data/flows'
import { getIcon } from '../components/icons'
import { Section, Eyebrow, Button, Disclaimer, Tag } from '../components/ui/primitives'
import { Scorecard } from '../components/scorecard/Scorecard'
import { FlowDiagram } from '../components/flow/FlowDiagram'
import { EarningsBar } from '../components/charts/EarningsBar'
import { GrowthArea } from '../components/charts/GrowthArea'
import { ToolStack, Playbook, Downsides, Resources } from '../components/scheme/Sections'
import { AgencyOffers } from '../components/scheme/AgencyOffers'
import { useStore } from '../store/useStore'

function Block({ id, eyebrow, title, children, note }: {
  id: string
  eyebrow: string
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/8 pt-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      {note && <p className="mt-2 max-w-2xl text-sm text-white/55">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function SchemePage() {
  const { id } = useParams()
  const scheme = id ? schemeById(id) : undefined
  const flow = id && scheme ? flowsById[scheme.id] : undefined
  const compareIds = useStore((s) => s.compareIds)
  const toggleCompare = useStore((s) => s.toggleCompare)
  const setLastViewed = useStore((s) => s.setLastViewed)

  useEffect(() => {
    if (scheme) setLastViewed(scheme.id)
  }, [scheme, setLastViewed])

  if (!scheme || !flow) {
    return (
      <Section className="flex min-h-dvh flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold text-white">Scheme not found</h1>
        <Link to="/schemes" className="mt-4 text-accent hover:text-accent-hover">← Back to schemes</Link>
      </Section>
    )
  }

  const Icon = getIcon(scheme.icon)
  const idx = schemes.findIndex((s) => s.id === scheme.id)
  const next = schemes[(idx + 1) % schemes.length]
  const inCompare = compareIds.includes(scheme.id)
  const isAgency = scheme.id === 'ai-agency'

  return (
    <>
      {/* Hero band */}
      <div className="relative overflow-hidden border-b border-white/8 pt-28 pb-14">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <Section>
          <Link to="/schemes" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All schemes
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                <Icon className="h-7 w-7" />
              </span>
              <h1 className="mt-5 font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                {scheme.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/65">{scheme.oneLiner}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {scheme.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <Button variant={inCompare ? 'primary' : 'ghost'} onClick={() => toggleCompare(scheme.id)}>
              {inCompare ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {inCompare ? 'In comparison' : 'Add to compare'}
            </Button>
          </div>
        </Section>
      </div>

      <Section className="space-y-12 py-12">
        <Block id="scorecard" eyebrow="Execution scorecard" title="How it scores" note={scheme.note}>
          <Scorecard scheme={scheme} />
        </Block>

        <Block
          id="flow"
          eyebrow="How it runs"
          title="The process, end to end"
          note="This is the centerpiece — the real operating logic of the business as an interactive flow. Click any node for detail, toggle Simple/Detailed, or press Play to walk it through."
        >
          <FlowDiagram flow={flow} />
        </Block>

        {isAgency && (
          <Block
            id="offers"
            eyebrow="Productized offers"
            title="Prebuilt systems to sell"
            note="The catalog of ready-to-deploy systems for non-tech-savvy businesses — travel agencies, beauty clinics, plumbers, electricians, dentists, gyms and more. Each is a template you build once and resell. Expand any card for the pitch, pricing, target businesses and build stack."
          >
            <AgencyOffers />
          </Block>
        )}

        <Block
          id="earnings"
          eyebrow="Earnings reality"
          title="What it realistically pays"
          note="Monthly revenue ranges by stage. Wide on purpose — outcomes are execution-dependent."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white/50">Income by stage</h3>
              <div className="mt-4">
                <EarningsBar tiers={scheme.earnings.tiers} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white/50">Revenue trajectory (first year)</h3>
              <div className="mt-4">
                <GrowthArea growth={scheme.growth} />
              </div>
            </div>
          </div>
          <Disclaimer>{scheme.earnings.disclaimer}</Disclaimer>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {scheme.earnings.cases.map((c) => (
              <div key={c.name} className="rounded-xl border border-white/10 bg-surface/40 p-5">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="mt-1.5 text-sm text-white/65">{c.result}</p>
                <p className="mt-2 text-xs italic text-white/35">Source: {c.source}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="tools" eyebrow="Tool stack" title="What you'll actually use">
          <ToolStack tools={scheme.tools} />
        </Block>

        <Block id="playbook" eyebrow="Playbook" title="Step by step" note="Expand each step. Times and costs are per-step estimates.">
          <Playbook steps={scheme.playbook} />
        </Block>

        <Block id="downsides" eyebrow="The honest part" title="Why it might not work">
          <Downsides items={scheme.downsides} />
        </Block>

        <Block id="resources" eyebrow="Go deeper" title="Resources">
          <Resources items={scheme.resources} />
        </Block>

        {/* Footer nav */}
        <div className="flex flex-col gap-3 border-t border-white/8 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/compare" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <GitCompareArrows className="h-4 w-4" /> Compare all eleven
          </Link>
          <Link
            to={`/scheme/${next.id}`}
            className="group inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover"
          >
            Next: {next.name}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Section>
    </>
  )
}
