const runtimeEnv = window.__APP_ENV__ ?? {}

const defaultUnleashUrl = new URL('/unleash', window.location.origin).toString()

const appEnv = {
    env: import.meta.env.VITE_APP_ENV ?? 'development',
    unleashProxyUrl: runtimeEnv.UNLEASH_PROXY_URL ?? defaultUnleashUrl
}

export default appEnv;