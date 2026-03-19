import { env } from '../config/env'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions extends Omit<RequestInit, 'method'> {
  method?: HttpMethod
}

const DEFAULT_HEADERS: HeadersInit = {
  'X-Auth-Token': env.apiToken,
}

export async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { headers, ...restOptions } = options

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
