import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: 'test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter:['text','lcov'],
      reportsDirectory: './coverage',
    },
  },
})