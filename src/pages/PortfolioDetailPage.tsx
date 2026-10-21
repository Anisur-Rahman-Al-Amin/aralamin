import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ContactSection } from '../components/ContactSection'
import { AboutPage } from './AboutPage'
import {
  activities,
  awards,
  certifications,
  experience,
  publications,
  researchProjects,
  ventures,
} from '../data/portfolio.ts'

type PageItem = {
  title: string
  body: string
  period: string
  meta: string
  category?: string
  group?: string
  url?: string
  path?: string
}

type PageDefinition = {
  index: string
  eyebrow: string
  title: string
  accent: string
  introduction: string
  items: PageItem[]
  groupBy?: boolean
  filters?: string[]
}

const pages: Record<string, PageDefinition> = {
  research: {
    index: '01',
    eyebrow: 'Inquiry',
    title: 'Research',
    accent: '',
    introduction: 'Current and past research projects.',
    items: researchProjects.map((item) => ({
      title: item.title,
      body: item.description,
      period: item.period,
      meta: `${item.field} · ${item.status}`,
    })),
  },
  publications: {
    index: '02',
    eyebrow: 'Selected writing',
    title: 'Publications',
    accent: '',
    introduction: 'Journal articles, manuscripts under review and conference papers. See also my Google Scholar profile.',
    groupBy: true,
    items: publications.map((item) => ({
      title: item.title,
      body: item.authors,
      period: item.year,
      meta: `${item.venue} · ${item.status}`,
      group: item.status === 'Published' ? 'Published' : item.status === 'Oral, AAAP 2026' ? 'Conference papers' : 'Under review',
      url: item.url,
    })),
  },
  experience: {
    index: '03',
    eyebrow: 'The path',
    title: 'Experience',
    accent: '',
    introduction: 'Research, industry and field work, teaching, and service.',
    groupBy: true,
    items: experience.map((item) => ({
      title: item.role,
      body: item.description,
      period: item.period,
      meta: `${item.organization} · ${item.category}`,
      group: item.category,
      path: item.path,
    })),
  },
  ventures: {
    index: '04',
    eyebrow: 'Beyond the lab',
    title: 'Ventures',
    accent: '',
    introduction: 'Businesses I have founded, and what they are building.',
    items: ventures.map((item) => ({
      title: item.name,
      body: item.description,
      period: item.type,
      meta: item.role,
      url: item.url,
      path: item.path,
    })),
  },
  awards: {
    index: '05',
    eyebrow: 'Recognition',
    title: 'Awards',
    accent: '',
    introduction: 'Recognition for research, innovation and entrepreneurship.',
    items: awards.filter((item) => item.category !== 'CV only').map((item) => ({
      title: item.title,
      body: item.detail,
      period: item.period,
      meta: item.organization,
      path: item.path,
    })),
  },
  certifications: {
    index: '06',
    eyebrow: 'Professional learning',
    title: 'Certifications',
    accent: '',
    introduction: 'Courses and training covering research methods, livestock production, animal welfare and communication.',
    filters: ['All', 'Livestock', 'Research', 'Entrepreneurship', 'Volunteering', 'Skills'],
    items: certifications.map((item) => ({
      title: item.title,
      body: item.detail,
      period: item.period,
      meta: item.organization,
      category: item.category,
      path: item.path,
    })),
  },
  activities: {
    index: '07',
    eyebrow: 'Community',
    title: 'Extra-curricular Activities',
    accent: '',
    introduction: 'Moments from events, volunteering, competitions and campus life.',
    items: activities.map((item) => ({
      title: item.title,
      body: item.detail,
      period: item.period,
      meta: item.organization,
    })),
  },
}

function NotFoundPage() {
  return (
    <main id="main" className="route-page section-wrap">
      <p className="eyebrow">Page not found</p>
      <h1>This page <span>isn’t here.</span></h1>
      <Link className="text-link" to="/">Return to the portfolio <ArrowLeft size={15} /></Link>
    </main>
  )
}

export function PortfolioDetailPage() {
  const { section, slug } = useParams()
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    setActiveFilter('All')
  }, [section])

  if (section === 'about') {
    return <AboutPage />
  }
  if (section === 'contact') {
    return <main id="main"><ContactSection /></main>
  }

  const page = section ? pages[section] : undefined
  if (!page) return <NotFoundPage />
  if (slug) {
    const item = page.items.find((entry) => entry.path?.split('/').at(-1) === slug)
    if (!item) return <NotFoundPage />

    return (
      <main id="main" tabIndex={-1}>
        <section className="route-page section-wrap" aria-labelledby="route-item-title">
          <div className="route-page-topline">
            <Link to={`/${section}`}><ArrowLeft size={14} /> All {page.title}</Link>
            <span>{item.period}</span>
          </div>
          <h1 id="route-item-title">{item.title}</h1>
          <p className="route-introduction">{item.meta}</p>
          {item.body && <div className="route-item route-item-detail"><p>{item.body}</p></div>}
          {item.url && <a className="route-item-link" href={item.url} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={14} /></a>}
        </section>
      </main>
    )
  }
  const filteredItems = activeFilter === 'All'
    ? page.items
    : page.items.filter((item) => item.category === activeFilter)
  const groups = page.groupBy
    ? [...new Set(filteredItems.map((item) => item.group ?? ''))].map((label) => ({
      label,
      items: filteredItems.filter((item) => (item.group ?? '') === label),
    }))
    : [{ label: '', items: filteredItems }]

  return (
    <main id="main">
      <section className="route-page section-wrap" aria-labelledby="route-title">
        <div className="route-page-topline">
          <Link to="/"><ArrowLeft size={14} /> Portfolio home</Link>
          <span>{page.index} / {page.eyebrow}</span>
        </div>
        <h1 id="route-title">{page.title} <span>{page.accent}</span></h1>
        <p className="route-introduction">{page.introduction}</p>
        {page.filters && (
          <div className="certificate-filters" role="group" aria-label="Filter certificates">
            {page.filters.map((filter) => (
              <button
                className={activeFilter === filter ? 'is-active' : ''}
                type="button"
                key={filter}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
            <span>Showing {filteredItems.length} certificates</span>
          </div>
        )}
        <div className="route-list">
          {groups.map((group) => (
            <div className="route-group" key={group.label || page.title}>
              {group.label && <h2 className="route-group-title">{group.label}</h2>}
              {group.items.map((item) => {
                const content = (
                  <>
                    <div className="route-item-topline">{item.period && <span>{item.period}</span>}{item.meta && <span>{item.meta}</span>}</div>
                    <h2>{item.title}</h2>
                    {item.body && <p>{item.body}</p>}
                    {item.url && <span className="route-item-link">Open source <ArrowUpRight size={14} /></span>}
                  </>
                )
                if (item.path) {
                  return <Link className="route-item route-item-linked" to={item.path} key={`${item.title}-${item.period}`}>{content}</Link>
                }
                return item.url ? (
                  <a className="route-item route-item-linked" href={item.url} key={`${item.title}-${item.period}`} target="_blank" rel="noreferrer">{content}</a>
                ) : (
                  <article className="route-item" key={`${item.title}-${item.period}`}>{content}</article>
                )
              })}
            </div>
          ))}
        </div>
        <div className="route-page-footer">
          <Link className="text-link" to="/contact">Contact <ArrowUpRight size={14} /></Link>
        </div>
      </section>
    </main>
  )
}
