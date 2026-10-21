import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { HeroSection } from './components/HeroSection'
import { PortfolioHeader } from './components/PortfolioHeader'
import {
  ExperienceSection,
  PublicationsSection,
  ResearchSection,
  VenturesSection,
} from './components/PortfolioSections'
import { SiteFooter } from './components/SiteFooter'
import { profile } from './data/portfolio.ts'

const PortfolioDetailPage = lazy(() => import('./pages/PortfolioDetailPage').then((module) => ({ default: module.PortfolioDetailPage })))
const AdminPage = lazy(() => import('./pages/AdminPage').then((module) => ({ default: module.AdminPage })))

function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      <HeroSection />
      <ResearchSection />
      <PublicationsSection />
      <ExperienceSection />
      <VenturesSection />
    </main>
  )
}

function PortfolioLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const section = location.pathname.split('/').filter(Boolean)[0]
    const pageTitle = section
      ? `${section[0].toUpperCase()}${section.slice(1)}`
      : 'Portfolio'
    document.title = `${pageTitle} | ${profile.name}`
  }, [location.pathname])

  function skipToContent() {
    document.querySelector<HTMLElement>('main')?.focus()
  }

  return (
    <>
      <button className="skip-link" type="button" onClick={skipToContent}>Skip to content</button>
      <PortfolioHeader />
      <Suspense fallback={<main className="route-loading" aria-live="polite">Loading page…</main>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/:section/:slug" element={<PortfolioDetailPage />} />
          <Route path="/:section" element={<PortfolioDetailPage />} />
          <Route path="*" element={<PortfolioDetailPage />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PortfolioLayout />
    </BrowserRouter>
  )
}

export default App
