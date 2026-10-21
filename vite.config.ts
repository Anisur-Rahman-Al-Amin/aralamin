import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

function githubPagesFallback() {
  return {
    name: 'github-pages-fallback',
    apply: 'build' as const,
    closeBundle() {
      const outputDirectory = resolve(process.cwd(), 'dist')
      copyFileSync(
        resolve(outputDirectory, 'index.html'),
        resolve(outputDirectory, '404.html'),
      )
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/aralamin/' : '/',
  plugins: [react(), githubPagesFallback()],
}))
