import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { portfolioContent as defaultPortfolioContent } from './portfolio.ts'
import type { PortfolioContent } from './portfolioTypes'
import { fetchPortfolio, savePortfolio } from '../lib/portfolioApi'

type PortfolioDataContextValue = {
  content: PortfolioContent
  loading: boolean
  loadError: string
  save: (content: PortfolioContent, idToken: string) => Promise<void>
}

const PortfolioDataContext = createContext<PortfolioDataContextValue | null>(null)

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true
    fetchPortfolio()
      .then((remoteContent) => {
        if (active) setContent(remoteContent)
      })
      .catch(() => {
        if (active) setLoadError('Showing the bundled portfolio while the database is unavailable.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  async function save(contentToSave: PortfolioContent, idToken: string) {
    await savePortfolio(contentToSave, idToken)
    setContent(contentToSave)
    setLoadError('')
  }

  const value = useMemo(
    () => ({ content, loading, loadError, save }),
    [content, loading, loadError],
  )

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>
}

export function usePortfolioData() {
  const value = useContext(PortfolioDataContext)
  if (!value) throw new Error('usePortfolioData must be used inside PortfolioDataProvider')
  return value
}
