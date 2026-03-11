import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      port: env.PORT ? Number(env.PORT) : 5173,
      hmr: true,
      open: true,
    },
    base: mode === "production" ? "/GrowthPlusFarm/" : "/",
    plugins: [react()],
  }
})
