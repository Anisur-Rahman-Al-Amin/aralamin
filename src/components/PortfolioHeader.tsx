import { useEffect, useState } from 'react'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profile } from '../data/portfolio.ts'
import { downloadCv } from '../utils/downloadCv'

const navigation = [
  { path: '/about', label: 'About' },
  { path: '/research', label: 'Research' },
  { path: '/publications', label: 'Publications' },
  { path: '/experience', label: 'Experience' },
  { path: '/ventures', label: 'Ventures' },
  { path: '/awards', label: 'Awards' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/activities', label: 'Activities' },
]

export function PortfolioHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const closeOnWideScreen = () => {
      if (window.innerWidth > 1024) setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnWideScreen)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnWideScreen)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label={`${profile.name}, home`}>
        {profile.name.split(' ').slice(0, 2).join(' ')}
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        aria-label={menuOpen ? 'Close menu' : 'Menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
      </button>
      <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="primary-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink
          className="nav-contact nav-contact-link"
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact <ArrowUpRight size={14} aria-hidden="true" />
        </NavLink>
        <button className="header-cv" type="button" onClick={downloadCv}>
          <Download size={14} aria-hidden="true" /> Download CV
        </button>
      </nav>
    </header>
  )
}
