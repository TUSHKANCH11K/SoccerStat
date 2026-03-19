const apiToken = import.meta.env.VITE_API_TOKEN ?? ''

if (!apiToken) {
  console.warn('VITE_API_TOKEN is not set. API requests can fail without auth token.')
}

export const env = {
  apiToken,
}
