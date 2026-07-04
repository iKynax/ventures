import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-wrap flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-sm font-semibold">Ventures</span>
          <span className="text-sm text-white/40">— a private planning tool.</span>
        </div>
        <div className="flex gap-6 text-sm text-white/50">
          <Link to="/schemes" className="hover:text-white">Schemes</Link>
          <Link to="/compare" className="hover:text-white">Compare</Link>
          <Link to="/roadmap" className="hover:text-white">Roadmap</Link>
        </div>
        <p className="text-xs text-white/30">
          Figures are planning estimates, not guarantees.
        </p>
      </div>
    </footer>
  )
}
