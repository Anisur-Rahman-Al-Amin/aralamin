import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  activities,
  awards,
  certifications,
  experience,
  publications,
  researchProjects,
  ventures,
  type Highlight,
} from '../data/portfolio.ts'

type SectionHeadingProps = {
  id: string
  index: string
  label: string
  title: string
  accent: string
  action?: { label: string; to: string }
}

function SectionHeading({ id, index, label, title, accent, action }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        {(index || label) && <p className="eyebrow section-kicker">{index && `${index} / `}{label}</p>}
        <h2 id={id}>{title} {accent && <span>{accent}</span>}</h2>
      </div>
      {action && (
        <Link className="text-link section-link" to={action.to}>
          {action.label} <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

export function ResearchSection() {
  return (
    <section className="content-section section-wrap" id="research" aria-labelledby="research-title">
      <SectionHeading id="research-title" index="" label="" title="Current" accent="research" action={{ label: 'All research projects', to: '/research' }} />
      <div className="research-grid">
        {researchProjects.map((project, index) => (
          <article className={`research-item${index === 1 ? ' research-secondary' : ' research-feature'}`} key={project.title} data-reveal>
            <div className="item-topline"><span className="number-tag">0{index + 1}</span><span className="item-tag">{project.status}</span></div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="item-meta"><span>{project.field}</span><span>{project.period}</span></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function PublicationsSection() {
  return (
    <section className="publication-section" id="publications" aria-labelledby="publications-title">
      <div className="section-wrap publication-inner">
        <SectionHeading id="publications-title" index="" label="" title="Selected" accent="publications" />
        <div className="publication-list">
          {publications.map((publication) => {
            const content = (
              <>
                <span className="publication-year">{publication.year}</span>
                <div className="publication-body">
                  <span className={`publication-status status-${publication.tone}`}>{publication.status}</span>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors} · {publication.venue}</p>
                </div>
                <span className="round-link" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </>
            )
            return publication.url ? (
              <a className="publication-row publication-link" href={publication.url} key={publication.title} target="_blank" rel="noreferrer" data-reveal>
                {content}
              </a>
            ) : (
              <article className="publication-row" key={publication.title} data-reveal>{content}</article>
            )
          })}
        </div>
        <Link className="section-footnote-link" to="/publications">All publications <ArrowUpRight size={14} /></Link>
      </div>
    </section>
  )
}

export function ExperienceSection() {
  const groups = [...new Set(experience.map((item) => item.category))]

  return (
    <section className="content-section section-wrap experience-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" index="" label="" title="Experience" accent="" />
      <p className="heading-note">Research, industry and field work, teaching, and service.</p>
      <div className="timeline">
        {groups.map((group) => (
          <div className="timeline-group" key={group}>
            <h3 className="timeline-group-title">{group}</h3>
            {experience.filter((item) => item.category === group).map((item) => (
              <article className="timeline-entry" key={`${item.role}-${item.period}`} data-reveal>
                <span className="timeline-date">{item.period}</span>
                <span className="timeline-marker" aria-hidden="true" />
                <div>
                  <h4>{item.role}</h4>
                  <p>{item.organization}</p>
                  {item.project && <p className="timeline-project">Project: {item.project}</p>}
                  {item.description && <span className="timeline-detail">{item.description}</span>}
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function VenturesSection() {
  return (
    <section className="venture-section" id="ventures" aria-labelledby="ventures-title">
      <div className="section-wrap">
        <SectionHeading id="ventures-title" index="" label="" title="Ventures" accent="" />
        <p className="heading-note">Businesses I have founded, and what they are building.</p>
        <div className="venture-grid">
          {ventures.map((venture, index) => (
            <article className={`venture-card venture-card-${venture.tone}`} key={venture.name} data-reveal>
              <div className="venture-card-top"><span>0{index + 1} / {venture.type}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
              <div><p className="venture-role">{venture.role}</p><h3>{venture.name}</h3><p>{venture.description}</p></div>
              {venture.url ? (
                <a className="venture-link" href={venture.url} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={14} /></a>
              ) : (
                <span className="venture-link venture-link-muted">Add an authorized project URL</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HighlightsSection({ id, index, label, title, items }: {
  id: string
  index: string
  label: string
  title: string
  items: Highlight[]
}) {
  return (
    <section className="content-section section-wrap highlights-section" id={id} aria-labelledby={`${id}-title`}>
      <SectionHeading id={`${id}-title`} index={index} label={label} title={title} accent="" />
      <div className="highlight-list">
        {items.map((item) => (
          <article className="highlight-row" key={`${item.title}-${item.period}`} data-reveal>
            <span className="highlight-period">{item.period}</span>
            <div><h3>{item.title}</h3><p>{item.organization}</p><span>{item.detail}</span></div>
            <ArrowUpRight size={18} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}

export function RecognitionSections() {
  return (
    <>
      <HighlightsSection id="awards" index="05" label="Recognition" title="Awards" items={awards} />
      <HighlightsSection id="certifications" index="06" label="Professional learning" title="Certifications" items={certifications} />
      <HighlightsSection id="activities" index="07" label="Community" title="Activities" items={activities} />
    </>
  )
}
