import { env } from '../config/env'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions extends Omit<RequestInit, 'method'> {
  method?: HttpMethod
}

export const BASE_URL = env.apiBaseUrl

const DEFAULT_HEADERS: HeadersInit = {
  'X-Auth-Token': env.apiToken,
}

function buildUrl(endpoint: string): string {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint
  }

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${BASE_URL}${normalizedEndpoint}`
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { headers, ...restOptions } = options
  const url = buildUrl(endpoint)

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
