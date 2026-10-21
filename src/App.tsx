import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { HeroSection } from './components/HeroSection'
import { PortfolioHeader } from './components/PortfolioHeader'
import {
  ExperienceSection,
  PublicationsSection,
  ResearchSection,
  VenturesSection,
} from './components/PortfolioSections'
import { SiteFooter } from './components/SiteFooter'
import { profile } from './data/portfolio'
import { PortfolioDetailPage } from './pages/PortfolioDetailPage'

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:section/:slug" element={<PortfolioDetailPage />} />
        <Route path="/:section" element={<PortfolioDetailPage />} />
        <Route path="*" element={<PortfolioDetailPage />} />
      </Routes>
      <SiteFooter />
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <PortfolioLayout />
    </HashRouter>
  )
}

export default App
