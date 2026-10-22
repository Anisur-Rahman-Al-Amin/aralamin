import type { PortfolioContent } from '../data/portfolioTypes'

const portfolioEndpoint = import.meta.env.VITE_PORTFOLIO_API_URL || '/api/portfolio'

type PortfolioResponse = { data: PortfolioContent }

export async function fetchPortfolio(): Promise<PortfolioContent> {
  const response = await fetch(portfolioEndpoint, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Portfolio request failed (${response.status})`)
  const result = await response.json() as PortfolioResponse
  return result.data
}

export async function savePortfolio(content: PortfolioContent, idToken: string): Promise<void> {
  const response = await fetch(portfolioEndpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: content }),
  })
  if (!response.ok) {
    const result = await response.json().catch(() => ({})) as { error?: string }
    throw new Error(result.error || `Portfolio save failed (${response.status})`)
  }
}
