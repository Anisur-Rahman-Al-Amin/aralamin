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

export const profile = {
  name: 'Anisur Rahman Al Amin',
  initials: 'AR',
  role: 'M.Sc. Researcher in Animal Science | Agri-Entrepreneur',
  tagline: 'Where livestock research meets the plate.',
  introduction:
    'M.Sc. student in Animal Science at Bangladesh Agricultural University and founder of Meat Bros, now seeking a PhD position in meat science and food safety.',
  story:
    'I am an animal scientist at Bangladesh Agricultural University, working on meat quality, safety and authenticity. My path began with a problem on campus: students could not afford safe, good-quality protein. In February 2024 I founded Meat Bros to supply vacuum-packed, ready-to-cook beef, chicken and fish in small, affordable portions. It now serves students and families across Mymensingh, online and offline. An internship at Bengal Meat gave me hands-on experience in meat processing, cold-chain management and HACCP. Since December 2024, I have worked in Professor M. A. Hashem’s laboratory on meat-quality evaluation, NIR spectroscopy and data analysis. This work includes a Warner–Bratzler shear-force model accepted for oral presentation at AAAP 2026. I want to combine spectroscopy, chemometrics and machine learning to build rapid, non-destructive tools for assessing meat quality and safety, especially in tropical supply chains.',
  imageUrl: '',
  imageAlt: 'Portrait of Anisur Rahman Al Amin',
  contactEmail: 'bosunia.2003135@bau.edu.bd',
  phone: '+880 1783 227982',
  whatsapp: 'https://wa.me/8801783227982',
  institution: 'Bangladesh Agricultural University',
  location: 'Mymensingh - 2202, Bangladesh',
  contactInvitation:
    'Write to me about livestock emissions, meat quality, spectroscopy or agri-business.',
  phdStatus: 'Open to PhD positions and research collaborations.',
  links: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=8qQXwnYAAAAJ' },
    { label: 'ORCID', url: 'https://orcid.org/0009-0004-7820-2611' },
    { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Md-Arman-Habib-Bosunia' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/arman1631/' },
  ],
  metrics: [
    { value: '5', label: 'Articles' },
    { value: 'Research Output', label: 'Dr. MA Hashem Laboratory' },
    { value: 'Champion', label: 'Start-up Innovator, University Innovation Hub Program' },
    { value: '5K USD', label: 'Valued Start-up, Meat Bros' },
  ],
  researchInterests: [
    'Enteric methane mitigation',
    'Meat quality and tenderness',
    'NIR and FTIR spectroscopy',
    'Precision livestock farming',
    'Alternative feed from insects',
    'Smallholder livestock systems',
  ],
  languages: [
    'Bangla (native)',
    'English B2, assessed by the British Council',
  ],
  referencesNote: 'References are available on request.',
} as const

export const education: Education[] = [
  {
    degree: 'M.Sc. in Animal Science',
    institution: 'Bangladesh Agricultural University (BAU)',
    period: 'Oct 2025 - Apr 2027 (Expected)',
    details: [
      'CGPA: 3.50/4.00 (first semester) | Credits: 40',
      'Thesis: Effects of Seaweed and Black Cumin Supplementation on Enteric Methane Emissions, Carcass Traits, and Beef Quality in Indigenous Deshi Cattle',
    ],
  },
  {
    degree: 'B.Sc. in Animal Husbandry (Hons.)',
    institution: 'Bangladesh Agricultural University (BAU)',
    period: 'Jan 2020 - Oct 2025',
    details: ['CGPA: 3.15/4.00 | Final-semester GPA: 3.93/4.00 | Credits: 192'],
  },
]

export const researchProjects: ResearchProject[] = [
  {
    title: 'Assessing Non-invasive technology for meat authentication',
    description:
      'NIR and FTIR spectroscopy for non-invasive meat authentication, alongside physicochemical and microbiological analysis.',
    field: 'Dr. M. A. Hashem Laboratory',
    period: 'Since Dec 2024',
    status: 'Current research',
  },
  {
    title: 'Seaweed and black cumin for lower-methane beef',
    description:
      'Testing whether seaweed and black cumin supplements cut enteric methane from indigenous Deshi cattle while improving carcass traits and beef quality.',
    field: 'M.Sc. thesis, Bangladesh Agricultural University',
    period: '2025–2027',
    status: 'M.Sc. thesis',
  },
  {
    title: '4IR Technologies from Farm to Fork for Beef Cattle in Bangladesh',
    description:
      'Feeding trials to reduce methane and heat stress in beef cattle, using precision livestock farming tools.',
    field: 'BAUsmart Beef Cattle Farm',
    period: 'Since Sep 2026',
    status: 'Current research',
  },
]

export const publications: Publication[] = [
  {
    title: 'Effect of irradiation with black cumin (Nigella sativa) on the biochemical properties and microbial population of beef at different days of interval at ambient temperature',
    authors: 'Sadakuzzaman, M., Bosunia, M. A. H., Amin, M., & Hashem, M. A. (2025).',
    venue: 'Meat Research, 5(2).',
    year: '2025',
    status: 'Published',
    tone: 'green',
    url: 'https://doi.org/10.55002/mr.5.2.115',
  },
  {
    title: 'Crossbred cattle, higher output, higher risk? A multidimensional assessment of smallholder dairy trade-offs in Bangladesh',
    authors: 'Bosunia, M. A. H., Bipa, K. M. L. S., Shathy, L. A., & Hashem, M. A. (2026).',
    venue: 'Tropical Animal Health and Production.',
    year: '2026',
    status: 'Under review',
    tone: 'coral',
  },
  {
    title: 'Calpain–calpastatin and cathepsin systems in postmortem proteolysis and tenderization',
    authors: 'Bosunia, M. A. H., Apon, S., Chowdhury, R. I., Farsi, M. S., & Hashem, M. A. (2026).',
    venue: 'Food and Humanity.',
    year: '2026',
    status: 'Under review',
    tone: 'coral',
  },
  {
    title: 'Muscle-cut specificity and cross-cut transferability of near-infrared spectroscopy for meat-quality prediction in Sonali chicken',
    authors: 'Mou, M. A., Apon, S., Bosunia, M. A. H., Tasnim, T., Hosen, M. S., Sagor, A. I., & Hashem, M. A. (2026).',
    venue: 'Journal of Food Measurement and Characterization.',
    year: '2026',
    status: 'Under review',
    tone: 'coral',
  },
  {
    title: 'Predictive modeling of Warner–Bratzler shear force in primal cuts of Holstein × Indigenous crossbred cattle',
    authors: 'Bosunia, M. A. H., & Hashem, M. A. (2026).',
    venue: '20th Asian-Australasian Association of Animal Production Animal Science Congress. Accepted for oral presentation.',
    year: '2026',
    status: 'Oral, AAAP 2026',
    tone: 'lime',
  },
]

export const experience: Experience[] = [
  {
    role: 'Research Assistant',
    organization: 'BAUsmart Beef Cattle Farm, BAU',
    description: 'Conducted feeding trials to reduce enteric methane emissions and heat stress in beef cattle and implemented precision livestock farming technologies.',
    period: 'Sep 2026 – present',
    category: 'Research experience',
    project: 'Application of 4IR Technologies from Farm to Fork for Beef Cattle in Bangladesh',
    path: '/experience/research-assistant-bausmart-beef-cattle-farm-bau',
  },
  {
    role: 'Research Assistant',
    organization: 'Dr. M. A. Hashem Laboratory, BAU',
    description: 'Applied NIR and FTIR spectroscopy for non-invasive meat authentication; evaluated physicochemical and microbiological properties of meat; analyzed research data, designed methodologies, and drafted research proposals and manuscripts.',
    period: 'Dec 2024 – present',
    category: 'Research experience',
    path: '/experience/research-assistant-dr-m-a-hashem-laboratory-bau',
  },
  {
    role: 'Intern',
    organization: 'Bengal Meat Processing Industries Ltd.',
    description: 'Participated in an Omega-3 enriched chicken meat production trial. Trained in cattle, sheep, and goat farm management, meat processing, and Hazard Analysis and Critical Control Points (HACCP) management.',
    period: 'Jul – Oct 2025',
    category: 'Industry experience',
    path: '/experience/intern-bengal-meat-processing-industries-ltd',
  },
  {
    role: 'Intern',
    organization: 'Upazila Livestock and Veterinary Office, Saidpur',
    description: 'Conducted structured household-level livestock surveys in 100 households.',
    period: 'May – Jun 2025',
    category: 'Field experience',
    path: '/experience/intern-upazila-livestock-and-veterinary-office-saidpur',
  },
  {
    role: 'Data Collector',
    organization: 'BRAC Artificial Insemination',
    description: "Collected field-level market data from artificial insemination service providers and livestock farmers to support the Indigenous Livestock Conservation Programme and implementation of Bangladesh's National Livestock Breeding Policy, 2007.",
    period: 'May – Jun 2025',
    category: 'Field experience',
    path: '/experience/data-collector-brac-artificial-insemination',
  },
  {
    role: 'Mentor',
    organization: '“Idea to Impact” Event',
    description: 'Delivered sessions on business development, fundraising, sustainability, and risk management.',
    period: '2026',
    category: 'Teaching and mentoring',
    path: '/experience/mentor-idea-to-impact-event',
  },
  {
    role: 'Mentor',
    organization: 'High school students',
    description: 'Taught General Knowledge.',
    period: '2021 – 2022',
    category: 'Teaching and mentoring',
    path: '/experience/mentor-high-school-students',
  },
  {
    role: 'Branding and Content Executive',
    organization: 'Bangladesh Agricultural Olympiad',
    description: '',
    period: 'Dec 2021 – Sep 2022',
    category: 'Memberships and volunteering',
    path: '/experience/branding-and-content-executive-bangladesh-agricultural-olympiad',
  },
  {
    role: 'Member',
    organization: 'Poultry Professionals Bangladesh',
    description: '',
    period: '2021 – present',
    category: 'Memberships and volunteering',
    path: '/experience/member-poultry-professionals-bangladesh',
  },
  {
    role: 'Volunteer',
    organization: 'WPSA International Poultry Show and Seminar',
    description: '',
    period: '2023, 2025',
    category: 'Memberships and volunteering',
    path: '/experience/volunteer-wpsa-international-poultry-show-and-seminar',
  },
  {
    role: 'Member',
    organization: 'Animal Husbandry Students Association, BAU',
    description: '',
    period: '2022 – 2024',
    category: 'Memberships and volunteering',
    path: '/experience/member-animal-husbandry-students-association-bau',
  },
]

export const ventures: Venture[] = [
  {
    name: 'Meat Bros',
    role: 'Founder and CEO',
    description: 'A hygienic meat start-up serving more than 4,000 customers online and offline across the Mymensingh region.',
    type: 'Start-up',
    tone: 'green',
    period: 'Since Feb 2024',
    url: 'https://www.meatbros.app/',
    path: '/ventures/meat-bros',
  },
  {
    name: 'NutriLivestock',
    role: 'Co-founder',
    description: 'Developing sustainable livestock feed from black soldier fly larvae, to reduce dependence on conventional feed.',
    type: 'Venture',
    tone: 'coral',
    period: 'Since Aug 2025',
    path: '/ventures/nutrilivestock',
  },
]

export const awards: Highlight[] = [
  { title: 'Champion, Business Idea Competition', organization: 'Business Idea Competition', detail: '', period: '2026', category: 'CV only' },
  { title: 'Runner-Up, CP Cup Global (Thailand)', organization: 'CP Group, Bangkok, Thailand', detail: '', period: '2026', path: '/awards/runner-up-cp-cup-global-thailand-2026' },
  { title: 'Champion, CP Cup Bangladesh', organization: 'CP Cup Bangladesh', detail: '', period: '2025', path: '/awards/champion-cp-cup-bangladesh-2025' },
  { title: 'Champion, University Innovation Hub Program', organization: 'University Innovation Hub Program', detail: '', period: '2025', path: '/awards/champion-university-innovation-hub-program-2025' },
  { title: 'Best Content Creator Award, Publician Group', organization: 'Publician Group', detail: '', period: '2023', path: '/awards/best-content-creator-award-publician-group-2023' },
  { title: '2nd Runner UP - Regional Math Olympiad', organization: 'Compus Foundation, Saidpur Govt. Science College', detail: '', period: '2015', path: '/awards/2nd-runner-up-regional-math-olympiad' },
]

export const certifications: Highlight[] = [
  { title: 'Agricultural Extension Field Work', organization: 'Bangladesh Agricultural University', detail: '', period: '2025', category: 'Livestock', path: '/certifications/agricultural-extension-field-work' },
  { title: 'Research Methodologies', organization: 'Queen Mary University of London', detail: '', period: 'August 2024', category: 'Research', path: '/certifications/research-methodologies' },
  { title: 'Dairy Production and Management', organization: 'Penn State University', detail: '', period: 'July 2024', category: 'Livestock', path: '/certifications/dairy-production-and-management' },
  { title: 'Sustainable Livestock Health Management', organization: 'University of Illinois', detail: '', period: 'August 14, 2024', category: 'Livestock', path: '/certifications/sustainable-livestock-health-management' },
  { title: 'Animal Behaviour and Welfare', organization: 'University of Edinburgh', detail: '', period: 'June 2021', category: 'Livestock', path: '/certifications/animal-behaviour-and-welfare' },
  { title: 'Chicken Behaviour and Welfare', organization: 'The University of Edinburgh', detail: '', period: '', category: 'Livestock', path: '/certifications/chicken-behaviour-and-welfare' },
  { title: 'Speak English Professionally: In Person, Online & On the Phone', organization: 'Georgia Institute of Technology', detail: '', period: 'August 2024', category: 'Livestock', path: '/certifications/speak-english-professionally-in-person-online-on-the-phone' },
  { title: 'Sustainable Food Production Through Livestock Health Management', organization: 'University of Illinois Urbana-Champaign', detail: '', period: '', category: 'Livestock', path: '/certifications/sustainable-food-production-through-livestock-health-management' },
  { title: 'BRAC AI Market Survey - 2024', organization: 'BRAC - Artificial Insemination Data Collection', detail: '', period: '', category: 'Research', path: '/certifications/brac-ai-market-survey-2024' },
  { title: 'Innovation Cohort - UIHP (BAUIC2)', organization: 'University Innovation Hub Program', detail: '', period: '2025', category: 'Entrepreneurship', path: '/certifications/innovation-cohort-uihp-bauic2' },
  { title: '13th International Poultry Show & Seminar 2025 - Volunteer', organization: 'World Poultry Science Association - WPSA', detail: '', period: '', category: 'Volunteering', path: '/certifications/13th-international-poultry-show-seminar-2025-volunteer' },
  { title: 'Fundamentals of Graphic Design', organization: 'California Institute of the Arts', detail: '', period: 'May 13, 2020', category: 'Skills', path: '/certifications/fundamentals-of-graphic-design' },
  { title: 'Public Speaking', organization: 'Udemy', detail: '', period: '2021', category: 'Skills', path: '/certifications/public-speaking' },
]

export const activities: Highlight[] = [
  { title: "We're in Thailand in 2026 (representing Bangladesh).", organization: 'Thailand', detail: '', period: '2026' },
  { title: 'In earlier2024, I started learning about research and started loving these daily activities.', organization: 'Research', detail: '', period: '2024' },
  { title: 'In 2020, during the COVID-19 Pandemic we made hand sanitizer in our college chemistry lab and distributed in my locality for free.', organization: 'Community service', detail: '', period: '2020' },
  { title: 'In 2022, I took decision to cross the country from one border to another border by cycling. This was a 600 KM cycle riding.', organization: 'Cycling', detail: '', period: '2022' },
  { title: 'KABADI is our national game. This was the very first time when KABADI Tournament was organized in our university campus and our team was the champion. I was the rider (key attacker) of my team.', organization: 'Kabadi tournament', detail: '', period: '' },
  { title: 'I love to play football most. I play as the forward winger. In 2023, we won the "Topu Smrity Tournament" trophy.', organization: 'Football', detail: '', period: '2023' },
  { title: 'Receiving the medal for runners up team in AH Football Tournament 2022', organization: 'AH Football Tournament', detail: '', period: '2022' },
  { title: 'Giving speech on sustainability in Thailand (Representing Bangladesh)', organization: 'Thailand', detail: '', period: '' },
  { title: 'Tree Plantation Program – 2023', organization: 'Tree Plantation Program', detail: '', period: '2023' },
  { title: 'Celebrating World Egg Day 2021 in BAU Campus', organization: 'Bangladesh Agricultural University', detail: '', period: '2021' },
  { title: 'I was the elected member of Animal Husbandry Students Association. I also served as a CR (Class-representative) from 2020 to 2024.', organization: 'Animal Husbandry Students Association', detail: '', period: '2020–2024' },
  { title: '12th WPSA Fair. I served a a volunteer managing the guests entrance.', organization: 'WPSA Fair', detail: '', period: '' },
  { title: 'Clothing Distribution Program for winter to poor people in my locality.', organization: 'Community service', detail: '', period: '' },
  { title: 'Artificial Insemination is a fascinating thing. This was the earlier period when I was learning AI.', organization: 'Artificial insemination', detail: '' , period: '' },
  { title: 'Participated on a Hand-drawn poster presentation', organization: 'Poster presentation', detail: '', period: '' },
  { title: 'This frame is one of my favourive. I have bunch of experience of Stage-drama. This was in 2023.', organization: 'Stage drama', detail: '', period: '2023' },
  { title: 'I was the Lead actor in that stage drama "KOBOR" by Munir Chowdhury.', organization: 'Stage drama', detail: '', period: '' },
]

export const skills: SkillGroup[] = [
  {
    title: 'Data analysis',
    skills: ['Python for data cleaning, exploratory and statistical analysis, visualisation and machine learning.'],
  },
  {
    title: 'Laboratory',
    skills: ['NIR and FTIR spectroscopy; physicochemical and microbiological analysis of meat.'],
  },
  {
    title: 'Design and media',
    skills: [
      'Adobe Photoshop - Advanced Level',
      'Adobe Premiere Pro - Advanced Level',
      'Adobe Illustrator - Intermediate Level',
      'Adobe After Effects - Beginning Level',
    ],
  },
]

export const references: Reference[] = [
  {
    name: 'Dr. Md. Abul Hashem',
    title: 'Professor, Department of Animal Science',
    department: 'Faculty of Animal Husbandry',
    institution: 'Bangladesh Agricultural University, Mymensingh-2202',
    email: 'hashem_as@bau.edu.bd',
    phone: '+8801721310621',
  },
  {
    name: 'Dr. Md Safiqur Rahaman Shishir',
    title: 'Associate Professor, Department of Animal Nutrition',
    department: 'Faculty of Animal Husbandry',
    institution: 'Bangladesh Agricultural University, Mymensingh-2202',
    email: 'shishir.an@bau.edu.bd',
    phone: '+8801717817715',
  },
  {
    name: 'Dr. Md. Mukhlesur Rahman',
    title: 'Professor, Department of Animal Science',
    department: 'Faculty of Animal Husbandry',
    institution: 'Bangladesh Agricultural University, Mymensingh-2202',
    email: 'mmrahman.as@bau.edu.bd',
    phone: '+8801933548922',
  },
]
