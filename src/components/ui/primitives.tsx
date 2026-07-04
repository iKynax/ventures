import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('mx-auto w-full max-w-wrap px-5 sm:px-8', className)}>
      {children}
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
      <span className="h-px w-6 bg-accent/60" />
      {children}
    </span>
  )
}

export function Card({
  children,
  className,
  interactive,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-sm',
        interactive &&
          'transition-all duration-300 ease-expo hover:border-white/20 hover:bg-surface-raised',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white/60">
      {children}
    </span>
  )
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
        variant === 'primary' &&
          'bg-accent text-white hover:bg-accent-hover hover:shadow-[0_8px_30px_-8px_rgba(232,112,42,0.6)]',
        variant === 'ghost' && 'border border-white/15 text-white/80 hover:border-white/30 hover:text-white',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-xs italic leading-relaxed text-white/40">
      <span className="text-accent/70">*</span> {children}
    </p>
  )
}
