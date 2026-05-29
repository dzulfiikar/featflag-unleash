import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      proxy: {
        [env.VITE_UNLEASH_PROXY_URL]: {
          target: env.VITE_UNLEASH_URL,
          changeOrigin: true,
          headers: {
            Authorization: env.VITE_UNLEASH_API_KEY,
            'Content-Type': 'application/json',
          },
          rewrite: (path) => path.replace(env.VITE_UNLEASH_PROXY_URL, ''),
        },
      }
    }
  }
})

