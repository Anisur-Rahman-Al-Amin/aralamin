import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import {
  activities,
  awards,
  certifications,
  experience,
  publications,
  researchProjects,
  ventures,
} from './src/data/portfolio'

const sectionPaths = [
  '/about',
  '/research',
  '/publications',
  '/experience',
  '/ventures',
  '/awards',
  '/certifications',
  '/activities',
  '/contact',
]

const detailPaths = [
  ...researchProjects,
  ...publications,
  ...experience,
  ...ventures,
  ...awards,
  ...certifications,
  ...activities,
].flatMap((item) => 'path' in item && item.path ? [item.path] : [])

function githubPagesFallback() {
  return {
    name: 'github-pages-fallback',
    apply: 'build' as const,
    closeBundle() {
      const outputDirectory = resolve(process.cwd(), 'dist')
      const indexFile = resolve(outputDirectory, 'index.html')
      copyFileSync(indexFile, resolve(outputDirectory, '404.html'))

      for (const route of new Set([...sectionPaths, ...detailPaths])) {
        const routeFile = resolve(outputDirectory, route.slice(1), 'index.html')
        mkdirSync(dirname(routeFile), { recursive: true })
        copyFileSync(indexFile, routeFile)
      }
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/aralamin/' : '/',
  plugins: [react(), githubPagesFallback()],
}))
