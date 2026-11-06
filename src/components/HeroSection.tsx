import { ArrowUpRight, Download, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePortfolioData } from '../data/PortfolioDataProvider'
import { downloadCv } from '../utils/downloadCv'

export function HeroSection() {
  const { content } = usePortfolioData()
  const { profile } = content
  const nameParts = profile.name.split(' ')
  const [primaryRole, secondaryRole = ''] = profile.role.split(' | ')

  return (
    <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow"><span className="status-dot" /> Academic portfolio <span className="eyebrow-line" /> {new Date().getFullYear()}</p>
        <h1 id="hero-title">
          {nameParts[0]}<br />{nameParts.slice(1, -1).join(' ')}<br /><span>{nameParts.at(-1)}</span>
        </h1>
        <p className="hero-role">{primaryRole} <span className="role-divider">/</span> {secondaryRole}</p>
        <p className="hero-intro">{profile.introduction}</p>
        <div className="hero-actions">
          <button className="button button-dark" type="button" onClick={() => downloadCv(content)}>
            <Download size={15} aria-hidden="true" /> Download CV
          </button>
          <Link className="text-link" to="/contact">Get in touch <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="hero-facts" aria-label="Portfolio highlights">
          {profile.metrics.map((metric) => (
            <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
          ))}
        </div>
      </div>
      <div className="hero-visual" data-reveal="up">
        <div className="photo-frame">
          {profile.imageUrl ? (
            <img src={profile.imageUrl} alt={profile.imageAlt} fetchPriority="high" />
          ) : (
            <div className="portrait-placeholder" role="img" aria-label="Add your portrait">
              <span>{profile.initials}</span>
              <small>Add your portrait</small>
            </div>
          )}
        </div>
        <div className="hero-3d-scene" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-orbit hero-orbit-three" />
          <div className="hero-core"><Sparkles size={22} /></div>
          <span className="hero-node hero-node-one" />
          <span className="hero-node hero-node-two" />
          <span className="hero-node hero-node-three" />
        </div>
      </div>
    </section>
  )
}
