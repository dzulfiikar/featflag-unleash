import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const unleashProxyUrl = env.VITE_UNLEASH_PROXY_URL || '/unleash'
  const unleashUrl = env.VITE_UNLEASH_URL

  return {
    plugins: [react()],
    server: unleashUrl
      ? {
          proxy: {
            [unleashProxyUrl]: {
              target: unleashUrl,
              changeOrigin: true,
              headers: {
                Authorization: env.VITE_UNLEASH_API_KEY,
                'Content-Type': 'application/json',
              },
              rewrite: (path) => path.replace(unleashProxyUrl, ''),
            },
          },
        }
      : undefined,
  }
})

