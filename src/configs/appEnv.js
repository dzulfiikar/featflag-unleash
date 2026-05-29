const runtimeEnv = window.__APP_ENV__ ?? {}

const defaultUnleashProxyPath = '/unleash'

const toUnleashClientUrl = (value) => {
    const configuredUrl = value || defaultUnleashProxyPath
    const url = new URL(configuredUrl, window.location.href)

    if (url.host === window.location.host) {
        url.protocol = window.location.protocol
    }

    return url.toString().replace(/\/$/, '')
}

const appEnv = {
    env: runtimeEnv.APP_ENV ?? import.meta.env.VITE_APP_ENV ?? 'development',
    unleashProxyUrl: toUnleashClientUrl(runtimeEnv.UNLEASH_PROXY_URL ?? import.meta.env.VITE_UNLEASH_PROXY_URL)
}

export default appEnv;