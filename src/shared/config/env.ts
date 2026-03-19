const apiToken = import.meta.env.VITE_API_TOKEN ?? ''
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'https://api.football-data.org/v4'

if (!apiToken) {
  console.warn('VITE_API_TOKEN is not set. API requests can fail without auth token.')
}

export const env = {
  apiToken,
  apiBaseUrl,
}
