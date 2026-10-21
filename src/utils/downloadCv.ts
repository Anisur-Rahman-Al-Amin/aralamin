import {
  awards,
  certifications,
  education,
  experience,
  profile,
  publications,
  references,
  skills,
  ventures,
} from '../data/portfolio'

type CvEntry = {
  title: string
  period?: string
  organization?: string
  detail?: string
}

export async function downloadCv() {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF()
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 19
  const textWidth = pageWidth - margin * 2
  let cursorY = 23

  const ensureSpace = (height: number) => {
    if (cursorY + height > pageHeight - 17) {
      pdf.addPage()
      cursorY = 20
    }
  }

  const addSection = (title: string, entries: CvEntry[]) => {
    if (entries.length === 0) return

    ensureSpace(20)
    pdf.setTextColor(25, 25, 25)
    pdf.setFont('times', 'bold')
    pdf.setFontSize(10)
    pdf.text(title.toUpperCase(), margin, cursorY)
    cursorY += 2
    pdf.setLineWidth(0.35)
    pdf.line(margin, cursorY, pageWidth - margin, cursorY)
    cursorY += 7

    entries.forEach((entry) => {
      const titleLines = pdf.splitTextToSize(entry.title, textWidth - (entry.period ? 30 : 0))
      const organizationLines = entry.organization
        ? pdf.splitTextToSize(entry.organization, textWidth)
        : []
      const detailLines = entry.detail ? pdf.splitTextToSize(entry.detail, textWidth - 8) : []
      const blockHeight = titleLines.length * 4.4 + organizationLines.length * 4 + detailLines.length * 4 + 4
      ensureSpace(blockHeight)

      pdf.setFont('times', 'bold')
      pdf.setFontSize(9.5)
      pdf.text(titleLines, margin, cursorY)
      if (entry.period) {
        pdf.setFont('times', 'italic')
        pdf.text(entry.period, pageWidth - margin, cursorY, { align: 'right' })
      }
      cursorY += titleLines.length * 4.4

      if (organizationLines.length > 0) {
        pdf.setFont('times', 'normal')
        pdf.setFontSize(9)
        pdf.text(organizationLines, margin, cursorY)
        cursorY += organizationLines.length * 4
      }
      if (detailLines.length > 0) {
        pdf.setFont('times', 'normal')
        pdf.setFontSize(8.5)
        pdf.text(detailLines, margin + 5, cursorY)
        cursorY += detailLines.length * 4
      }
      cursorY += 4
    })
    cursorY += 2
  }

  pdf.setTextColor(20, 20, 20)
  pdf.setFont('times', 'bold')
  pdf.setFontSize(16)
  pdf.text(profile.name.toUpperCase(), pageWidth / 2, cursorY, { align: 'center' })
  cursorY += 6
  pdf.setFont('times', 'normal')
  pdf.setFontSize(9)
  pdf.text(profile.role.replace(' | ', '  |  '), pageWidth / 2, cursorY, { align: 'center' })
  cursorY += 5

  const contactLine = [
    `${profile.institution}, ${profile.location}`,
    profile.phone,
    profile.contactEmail,
    profile.links.filter((link) => ['Google Scholar', 'ORCID', 'LinkedIn'].includes(link.label)).map((link) => link.label).join(' | '),
  ].filter(Boolean).join(' | ')
  if (contactLine) {
    pdf.setFontSize(8)
    const contactLines = pdf.splitTextToSize(contactLine, textWidth)
    pdf.text(contactLines, pageWidth / 2, cursorY, { align: 'center' })
    cursorY += contactLines.length * 4
  }
  pdf.setLineWidth(0.5)
  pdf.line(margin, cursorY, pageWidth - margin, cursorY)
  cursorY += 10

  addSection('Education', education.map((item) => ({
    title: item.degree,
    period: item.period,
    organization: item.institution,
    detail: item.details.join('\n'),
  })))
  addSection('Research Experience', experience
    .filter((item) => item.category === 'Research experience')
    .map((item) => ({
      title: item.role,
      period: item.period,
      organization: item.organization,
      detail: [item.project ? `Project: ${item.project}` : '', item.description].filter(Boolean).join('\n'),
    })))
  addSection('Publications', publications.map((item) => ({
    title: item.title,
    period: item.year,
    organization: `${item.authors} ${item.venue}`,
    detail: `${item.status}${item.url ? ` · ${item.url}` : ''}`,
  })))
  addSection('Industry and Field Experience', experience
    .filter((item) => ['Industry experience', 'Field experience'].includes(item.category))
    .map((item) => ({ title: item.role, period: item.period, organization: item.organization, detail: item.description })))
  addSection('Entrepreneurship', ventures.map((item) => ({
    title: item.role,
    period: item.period,
    organization: item.name,
    detail: item.description,
  })))
  addSection('Awards and Honors', awards.map((item) => ({ title: item.title, period: item.period, organization: item.organization, detail: item.detail })))
  addSection('Technical Skills', skills.map((group) => ({ title: group.title, detail: group.skills.join('\n') })))
  addSection('Certifications', certifications.map((item) => ({ title: item.title, period: item.period, organization: item.organization })))
  addSection('Teaching and Mentoring', experience
    .filter((item) => item.category === 'Teaching and mentoring')
    .map((item) => ({ title: item.role, period: item.period, organization: item.organization, detail: item.description })))
  addSection('Memberships and Volunteering Service', experience
    .filter((item) => item.category === 'Memberships and volunteering')
    .map((item) => ({ title: item.role, period: item.period, organization: item.organization })))
  addSection('Languages', profile.languages.map((language) => ({ title: language })))
  addSection('References', references.map((reference) => ({
    title: reference.name,
    organization: `${reference.title}, ${reference.department}, ${reference.institution}`,
    detail: `Email: ${reference.email} | Contact Number: ${reference.phone}`,
  })))

  const totalPages = pdf.getNumberOfPages()
  for (let page = 1; page <= totalPages; page += 1) {
    pdf.setPage(page)
    pdf.setFont('times', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(100)
    pdf.text(`${profile.name}  |  ${page} / ${totalPages}`, pageWidth / 2, pageHeight - 8, { align: 'center' })
  }

  const fileName = `${profile.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-cv.pdf`
  const pdfUrl = URL.createObjectURL(pdf.output('blob'))
  const downloadLink = document.createElement('a')
  downloadLink.href = pdfUrl
  downloadLink.download = fileName
  document.body.appendChild(downloadLink)
  downloadLink.click()
  downloadLink.remove()
  window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000)
}
