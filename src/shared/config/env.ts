const apiToken = import.meta.env.VITE_API_KEY ?? import.meta.env.VITE_API_TOKEN ?? ''
const productionApiUrl = import.meta.env.VITE_API_URL ?? 'https://api.football-data.org/v4'
const apiBaseUrl = import.meta.env.PROD ? productionApiUrl : '/api'

if (!apiToken) {
  console.warn('VITE_API_KEY is not set. API requests can fail without auth token.')
}

export const env = {
  apiToken,
  apiBaseUrl,
}
