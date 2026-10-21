export type ResearchProject = {
  title: string
  description: string
  field: string
  period: string
  status: string
  url?: string
}

export type Publication = {
  title: string
  authors: string
  venue: string
  year: string
  status: string
  tone: 'green' | 'coral' | 'lime'
  url?: string
}

export type Experience = {
  role: string
  organization: string
  description: string
  period: string
  category: string
  project?: string
  url?: string
  path?: string
}

export type Venture = {
  name: string
  role: string
  description: string
  type: string
  tone: 'green' | 'coral'
  period: string
  url?: string
  path?: string
}

export type Highlight = {
  title: string
  organization: string
  detail: string
  period: string
  category?: string
  url?: string
  path?: string
}

export type Education = {
  degree: string
  institution: string
  period: string
  details: string[]
}

export type SkillGroup = {
  title: string
  skills: string[]
}

export type Reference = {
  name: string
  title: string
  department: string
  institution: string
  email: string
  phone: string
}

export type PortfolioProfile = {
  name: string
  initials: string
  role: string
  tagline: string
  introduction: string
  story: string
  imageUrl: string
  imageAlt: string
  contactEmail: string
  phone: string
  whatsapp: string
  institution: string
  location: string
  contactInvitation: string
  phdStatus: string
  links: { label: string; url: string }[]
  metrics: { value: string; label: string }[]
  researchInterests: string[]
  languages: string[]
  referencesNote: string
}

export type PortfolioContent = {
  profile: PortfolioProfile
  education: Education[]
  researchProjects: ResearchProject[]
  publications: Publication[]
  experience: Experience[]
  ventures: Venture[]
  awards: Highlight[]
  certifications: Highlight[]
  activities: Highlight[]
  skills: SkillGroup[]
  references: Reference[]
}
