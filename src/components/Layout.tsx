import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './nav/Nav'
import { CommandPalette } from './CommandPalette'
import { Footer } from './Footer'
import { GridBackground } from './GridBackground'

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="relative min-h-dvh">
      <GridBackground />
      <Nav />
      <CommandPalette />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
