import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, GitCompareArrows } from 'lucide-react'
import { Button } from '../ui/primitives'

/**
 * Hero: a blurred, darkened looping video base for depth and motion, with a
 * cursor-following accent spotlight glow layered over it. Playfair italic
 * display type, blur-rise stagger. Reduced-motion / no-autoplay safe via poster.
 */
export function SpotlightHero() {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 42 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
      setActive(true)
    }
    const onLeave = () => setActive(false)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const spotlight = `radial-gradient(circle 340px at ${pos.x}% ${pos.y}%, rgba(232,112,42,0.28), transparent 70%)`

  return (
    <div
      ref={ref}
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-ink"
    >
      {/* Blurred video base */}
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-[4px] brightness-[0.55]"
        src={`${import.meta.env.BASE_URL}media/hero.mp4`}
        poster={`${import.meta.env.BASE_URL}media/hero-poster.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Darkening + accent wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(232,112,42,0.16),transparent_55%)]" />

      {/* Cursor spotlight accent */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: active ? 1 : 0, background: spotlight }}
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6))]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-wrap px-5 sm:px-8">
        <p className="blur-rise mb-6 text-xs font-medium uppercase tracking-[0.28em] text-accent" style={{ animationDelay: '0.05s' }}>
          A planning environment for two AI-capable founders
        </p>
        <h1 className="max-w-4xl text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl">
          <span className="blur-rise block" style={{ animationDelay: '0.15s' }}>
            Eleven ways to build
          </span>
          <span className="blur-rise block" style={{ animationDelay: '0.32s' }}>
            <span className="font-display italic font-normal text-accent">the same freedom.</span>
          </span>
        </h1>
        <p
          className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-white/70"
          style={{ animationDelay: '0.55s' }}
        >
          Not a slide deck — an interactive war room. Scorecards, real earnings, and a clickable
          process flow for every online business model, so you can pick the right one and actually run it.
        </p>
        <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: '0.7s' }}>
          <Button onClick={() => navigate('/schemes')}>
            Explore the eleven
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => navigate('/compare')}>
            <GitCompareArrows className="h-4 w-4" />
            Compare models
          </Button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="fade-up absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-white/40" style={{ animationDelay: '1s' }}>
        Scroll
      </div>
    </div>
  )
}
