import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { education, profile, skills } from '../data/portfolio.ts'

export function AboutPage() {
  return (
    <main id="main" className="about-page">
      <section className="about-hero section-wrap">
        <div>
          <h1>{profile.tagline}</h1>
          <p>{profile.introduction}</p>
        </div>
        <div className="about-hero-photo photo-frame">
          {profile.imageUrl ? (
            <img src={profile.imageUrl} alt={profile.imageAlt} />
          ) : (
            <div className="portrait-placeholder" role="img" aria-label="Add your portrait">
              <span>{profile.initials}</span>
              <small>Add your portrait</small>
            </div>
          )}
        </div>
      </section>
      <section className="about-story section-wrap" aria-labelledby="story-title">
        <p className="eyebrow section-kicker">My story</p>
        <h2 id="story-title">My story</h2>
        <p className="about-story-copy">{profile.story}</p>
        <p className="about-status">{profile.phdStatus}</p>
        <div className="profile-links">
          {profile.links.map((link) => (
            <a href={link.url} key={link.label} target="_blank" rel="noreferrer">
              {link.label} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <section className="about-interests section-wrap" aria-labelledby="interests-title">
        <div><p className="eyebrow section-kicker">Research interests</p><h2 id="interests-title">Research <span>interests.</span></h2></div>
        <ul>{profile.researchInterests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
      </section>
      <section className="about-education section-wrap" aria-labelledby="education-title">
        <p className="eyebrow section-kicker">Education</p>
        <h2 id="education-title">Education</h2>
        <div className="about-education-list">
          {education.map((item) => (
            <article className="about-education-item" key={item.degree}>
              <div className="about-education-top"><h3>{item.degree}</h3><span>{item.period}</span></div>
              <p>{item.institution}</p>
              <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className="about-skills section-wrap" aria-labelledby="skills-title">
        <p className="eyebrow section-kicker">Skills</p>
        <h2 id="skills-title">Skills</h2>
        <div className="about-skill-grid">
          {skills.map((group) => (
            <article className="about-skill" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="about-languages"><strong>Languages</strong> {profile.languages.join('. ')}.</p>
        <p className="references-note">{profile.referencesNote}</p>
      </section>
      <div className="about-contact-link section-wrap"><Link className="text-link" to="/contact">Get in touch <ArrowUpRight size={15} /></Link></div>
    </main>
  )
}
