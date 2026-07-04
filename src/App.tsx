import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'

const Schemes = lazy(() => import('./pages/Schemes').then((m) => ({ default: m.Schemes })))
const SchemePage = lazy(() => import('./pages/Scheme').then((m) => ({ default: m.SchemePage })))
const Compare = lazy(() => import('./pages/Compare').then((m) => ({ default: m.Compare })))
const Roadmap = lazy(() => import('./pages/Roadmap').then((m) => ({ default: m.Roadmap })))

function PageFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/schemes"
          element={
            <Suspense fallback={<PageFallback />}>
              <Schemes />
            </Suspense>
          }
        />
        <Route
          path="/scheme/:id"
          element={
            <Suspense fallback={<PageFallback />}>
              <SchemePage />
            </Suspense>
          }
        />
        <Route
          path="/compare"
          element={
            <Suspense fallback={<PageFallback />}>
              <Compare />
            </Suspense>
          }
        />
        <Route
          path="/roadmap"
          element={
            <Suspense fallback={<PageFallback />}>
              <Roadmap />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
