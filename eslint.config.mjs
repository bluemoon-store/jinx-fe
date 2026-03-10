import { defineConfig } from 'eslint/config'
import js from '@eslint/js'

export default defineConfig([
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  js.configs.recommended,
])


