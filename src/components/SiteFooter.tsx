import { ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePortfolioData } from '../data/PortfolioDataProvider'

export function SiteFooter() {
  const { content } = usePortfolioData()
  const { profile } = content
  return (
    <footer className="site-footer section-wrap">
      <Link className="footer-name" to="/">{profile.name}<span>.</span></Link>
      <p>{profile.institution}, {profile.location}</p>
      <Link className="back-top" to="/">Back to top <ArrowDownRight size={13} /></Link>
      <span className="footer-copy">© {new Date().getFullYear()} {profile.name}</span>
    </footer>
  )
}
