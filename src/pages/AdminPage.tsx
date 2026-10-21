import { useEffect, useState } from 'react'
import { Download, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioContent } from '../data/portfolio.ts'
import type { PortfolioContent } from '../data/portfolioTypes'

type EditableValue = string | number | boolean | null | EditableValue[] | { [key: string]: EditableValue }
type SectionKey = keyof PortfolioContent

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'education', label: 'Education' },
  { key: 'researchProjects', label: 'Research' },
  { key: 'publications', label: 'Publications' },
  { key: 'experience', label: 'Experience' },
  { key: 'ventures', label: 'Ventures' },
  { key: 'awards', label: 'Awards' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'activities', label: 'Activities' },
  { key: 'skills', label: 'Skills' },
  { key: 'references', label: 'References' },
]

const typeNames: Record<SectionKey, string> = {
  profile: 'PortfolioProfile',
  education: 'Education[]',
  researchProjects: 'ResearchProject[]',
  publications: 'Publication[]',
  experience: 'Experience[]',
  ventures: 'Venture[]',
  awards: 'Highlight[]',
  certifications: 'Highlight[]',
  activities: 'Highlight[]',
  skills: 'SkillGroup[]',
  references: 'Reference[]',
}

const emptyArrayTemplates: Record<string, EditableValue> = {
  links: { label: '', url: '' },
  metrics: { value: '', label: '' },
  education: { degree: '', institution: '', period: '', details: [''] },
  researchprojects: { title: '', description: '', field: '', period: '', status: '' },
  publications: { title: '', authors: '', venue: '', year: '', status: '', tone: 'green' },
  experience: { role: '', organization: '', description: '', period: '', category: '' },
  ventures: { name: '', role: '', description: '', type: '', tone: 'green', period: '' },
  awards: { title: '', organization: '', detail: '', period: '' },
  certifications: { title: '', organization: '', detail: '', period: '', category: '' },
  activities: { title: '', organization: '', detail: '', period: '' },
  skills: { title: '', skills: [''] },
  references: { name: '', title: '', department: '', institution: '', email: '', phone: '' },
}

function isRecord(value: unknown): value is Record<string, EditableValue> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readableLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase())
}

function emptyLike(value: EditableValue): EditableValue {
  if (Array.isArray(value)) return []
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, emptyLike(child)]))
  }
  if (typeof value === 'number') return 0
  if (typeof value === 'boolean') return false
  return ''
}

function newArrayItem(label: string, depth: number, template: EditableValue | undefined): EditableValue {
  if (template !== undefined) return emptyLike(template)
  const key = label.replace(/\s+\d+$/, '').replace(/\s+/g, '').toLowerCase()
  if (key === 'skills' && depth > 0) return ''
  return structuredClone(emptyArrayTemplates[key] ?? '')
}

function ValueEditor({
  label,
  value,
  onChange,
  depth = 0,
}: {
  label: string
  value: EditableValue
  onChange: (value: EditableValue) => void
  depth?: number
}) {
  if (Array.isArray(value)) {
    return (
      <fieldset className={`admin-array admin-depth-${Math.min(depth, 2)}`}>
        <legend>{readableLabel(label)}</legend>
        <div className="admin-array-list">
          {value.map((item, index) => (
            <fieldset className="admin-array-item" key={index}>
              <legend>{readableLabel(label)} {index + 1}</legend>
              <button
                className="admin-remove"
                type="button"
                aria-label={`Remove ${readableLabel(label)} ${index + 1}`}
                onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
              >
                Remove
              </button>
              <ValueEditor
                label={`${label} ${index + 1}`}
                value={item}
                depth={depth + 1}
                onChange={(nextValue) => onChange(value.map((entry, itemIndex) => itemIndex === index ? nextValue : entry))}
              />
            </fieldset>
          ))}
        </div>
        <button
          className="admin-add"
          type="button"
          onClick={() => onChange([...value, newArrayItem(label, depth, value[0])])}
        >
          Add {readableLabel(label)}
        </button>
      </fieldset>
    )
  }

  if (isRecord(value)) {
    return (
      <fieldset className={`admin-object admin-depth-${Math.min(depth, 2)}`}>
        <legend>{readableLabel(label)}</legend>
        <div className="admin-fields">
          {Object.entries(value).map(([key, child]) => (
            <ValueEditor
              key={key}
              label={key}
              value={child}
              depth={depth + 1}
              onChange={(nextValue) => onChange({ ...value, [key]: nextValue })}
            />
          ))}
        </div>
      </fieldset>
    )
  }

  if (typeof value === 'boolean') {
    return (
      <label className="admin-toggle-field">
        <span>{readableLabel(label)}</span>
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
      </label>
    )
  }

  if (label === 'tone') {
    const options = value === 'lime' ? ['green', 'coral', 'lime'] : ['green', 'coral']
    return (
      <label className="admin-field">
        <span>{readableLabel(label)}</span>
        <select value={String(value ?? '')} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
    )
  }

  const text = value === null ? '' : String(value)
  const isMultiline = text.length > 100 || text.includes('\n') || ['story', 'introduction', 'description', 'detail', 'skills', 'details'].includes(label)
  return (
    <label className="admin-field">
      <span>{readableLabel(label)}</span>
      {isMultiline ? (
        <textarea rows={Math.min(7, Math.max(3, Math.ceil(text.length / 90)))} value={text} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input
          type={label.toLowerCase().includes('email') ? 'email' : 'text'}
          value={text}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  )
}

function createDataModule(content: PortfolioContent) {
  const imports = [...new Set(Object.values(typeNames).map((typeName) => typeName.replace('[]', '')))]
  const importLine = `import type { ${imports.join(', ')}, PortfolioContent } from './portfolioTypes.ts'`
  const declarations = Object.entries(content).map(([key, value]) => {
    const typeName = typeNames[key as SectionKey]
    return `export const ${key}: ${typeName} = ${JSON.stringify(value, null, 2)}`
  })
  return `${importLine}\n\n${declarations.join('\n\n')}\n\nexport const portfolioContent: PortfolioContent = {\n${Object.keys(content).map((key) => `  ${key},`).join('\n')}\n}\n`
}

function loadDraft(): PortfolioContent {
  try {
    const saved = localStorage.getItem('aralamin-portfolio-draft')
    return saved ? JSON.parse(saved) as PortfolioContent : structuredClone(portfolioContent)
  } catch {
    return structuredClone(portfolioContent)
  }
}

export function AdminPage() {
  const [content, setContent] = useState<PortfolioContent>(loadDraft)
  const [activeSection, setActiveSection] = useState<SectionKey>('profile')
  const [status, setStatus] = useState('Draft saves in this browser.')

  useEffect(() => {
    try {
      localStorage.setItem('aralamin-portfolio-draft', JSON.stringify(content))
    } catch {
      setStatus('This browser cannot save a local draft. Download updates to keep your changes.')
    }
  }, [content])

  const section = sectionNames.find((item) => item.key === activeSection)!

  function downloadContent() {
    const file = new Blob([createDataModule(content)], { type: 'text/typescript;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio.ts'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus('Downloaded portfolio.ts. Replace src/data/portfolio.ts, then build and push to publish.')
  }

  function resetDraft() {
    let storageAvailable = true
    try {
      localStorage.removeItem('aralamin-portfolio-draft')
    } catch {
      storageAvailable = false
    }
    setContent(structuredClone(portfolioContent))
    setStatus(storageAvailable
      ? 'Draft reset to the published content.'
      : 'Local draft storage is unavailable; restored the published content in this session.')
  }

  return (
    <main id="main" className="admin-page">
      <header className="admin-header section-wrap">
        <div><p className="eyebrow">Portfolio editor</p><h1>Update your <span>portfolio.</span></h1></div>
        <div className="admin-actions">
          <Link className="admin-preview" to="/">View site</Link>
          <button className="admin-reset" type="button" onClick={resetDraft}><RotateCcw size={14} /> Reset</button>
          <button className="admin-download" type="button" onClick={downloadContent}><Download size={15} /> Download updates</button>
        </div>
      </header>
      <section className="admin-workspace section-wrap" aria-label="Portfolio content editor">
        <nav className="admin-sections" aria-label="Content sections">
          {sectionNames.map((item) => (
            <button
              className={activeSection === item.key ? 'is-active' : ''}
              type="button"
              key={item.key}
              aria-pressed={activeSection === item.key}
              onClick={() => setActiveSection(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-editor">
          <div className="admin-editor-heading"><div><p className="eyebrow">Editing section</p><h2>{section.label}</h2></div><span role="status">{status}</span></div>
          <ValueEditor
            label={section.label}
            value={content[activeSection] as unknown as EditableValue}
            onChange={(value) => setContent((current) => ({ ...current, [activeSection]: value }) as PortfolioContent)}
          />
        </div>
      </section>
      <p className="admin-publish-note section-wrap">Download the updated data file, replace <code>src/data/portfolio.ts</code>, then run <code>npm run build</code> and push your changes to publish.</p>
    </main>
  )
}
