import { useState } from 'react'
import { Check, ChevronDown, Sparkles } from 'lucide-react'
import { agencyOffers, offerBundles, type AgencyOffer } from '../../data/agencyOffers'
import { getIcon } from '../icons'
import { Card } from '../ui/primitives'
import { cn, formatRM } from '../../lib/utils'

function ScoreDots({ value, tone }: { value: number; tone: 'good' | 'warn' }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            n <= value ? (tone === 'good' ? 'bg-[#8ac926]' : 'bg-accent') : 'bg-white/12',
          )}
        />
      ))}
    </div>
  )
}

function OfferCard({ offer }: { offer: AgencyOffer }) {
  const [open, setOpen] = useState(false)
  const Icon = getIcon(offer.icon)
  return (
    <Card interactive className="overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full p-5 text-left" aria-expanded={open}>
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate font-semibold text-white">{offer.name}</h4>
              {offer.flagship && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                  <Sparkles className="h-2.5 w-2.5" /> Lead offer
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-white/50">{offer.tagline}</p>
          </div>
          <ChevronDown className={cn('h-4 w-4 shrink-0 text-white/40 transition-transform duration-300', open && 'rotate-180')} />
        </div>

        {/* Headline data row */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Deploy fee" value={`${formatRM(offer.deployFee[0])}–${formatRM(offer.deployFee[1])}`} />
          <Stat label="Retainer / mo" value={offer.retainer[1] === 0 ? 'optional' : `${formatRM(offer.retainer[0])}–${formatRM(offer.retainer[1])}`} />
          <Stat label="Setup" value={offer.setupTime} />
          <Stat label="Impact" value={offer.impact} accent />
        </div>
      </button>

      <div className={cn('grid transition-all duration-300 ease-expo', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <div className="border-t border-white/8 px-5 py-5">
            <p className="text-sm leading-relaxed text-white/75">{offer.what}</p>
            <p className="mt-3 rounded-lg border border-accent/15 bg-accent/[0.05] p-3 text-sm leading-relaxed text-white/70">
              <span className="font-medium text-accent">Why they buy · </span>
              {offer.outcome}
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/40">Best for</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {offer.bestFor.map((b) => (
                    <span key={b} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/40">Build with</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {offer.buildStack.map((t) => (
                    <span key={t} className="rounded-md border border-accent/20 bg-accent/5 px-2 py-0.5 text-xs text-accent/90">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/8 pt-4">
              <Metric label="SMB demand" value={offer.demand} tone="good" />
              <Metric label="Your margin" value={offer.margin} tone="good" />
              <Metric label="Build effort" value={offer.effort} tone="warn" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-white/35">{label}</p>
      <p className={cn('mt-0.5 text-sm font-medium', accent ? 'text-accent' : 'text-white/85')}>{value}</p>
    </div>
  )
}

function Metric({ label, value, tone }: { label: string; value: number; tone: 'good' | 'warn' }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/55">{label}</span>
        <span className="text-xs text-white/40">{value}/5</span>
      </div>
      <div className="mt-1.5">
        <ScoreDots value={value} tone={tone} />
      </div>
    </div>
  )
}

export function AgencyOffers() {
  return (
    <div className="space-y-8">
      <div className="grid gap-3">
        {agencyOffers.map((o) => (
          <OfferCard key={o.id} offer={o} />
        ))}
      </div>

      {/* Bundles */}
      <div>
        <h3 className="mb-1 font-display text-2xl italic text-white">Package them into offers</h3>
        <p className="mb-5 text-sm text-white/50">
          Don't sell parts — sell outcomes. Anchor the conversation on a bundle, start with the low-risk one.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {offerBundles.map((b, i) => {
            const included = b.includes
              .map((id) => agencyOffers.find((o) => o.id === id))
              .filter((o): o is AgencyOffer => Boolean(o))
            return (
              <Card key={b.name} className={cn('flex flex-col p-6', i === 1 && 'border-accent/30 bg-accent/[0.04]')}>
                {i === 1 && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Core system
                  </span>
                )}
                <h4 className="text-lg font-semibold text-white">{b.name}</h4>
                <p className="mt-1 text-sm text-white/55">{b.positioning}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {included.map((o) => (
                    <li key={o.id} className="flex items-center gap-2 text-sm text-white/75">
                      <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                      {o.name}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/40">Deploy</span>
                    <span className="font-semibold text-white">
                      {formatRM(b.deployFee[0])}–{formatRM(b.deployFee[1])}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/40">Retainer</span>
                    <span className="font-semibold text-accent">
                      {formatRM(b.retainer[0])}–{formatRM(b.retainer[1])}/mo
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
