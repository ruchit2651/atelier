
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').at(-1) || 'atelier'

export default defineConfig({
  plugins: [react()],
  base: `/${repositoryName}/`,
})
