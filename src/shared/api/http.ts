import { env } from '../config/env'
import { ApiRequestError } from '../lib/api-error'

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

  let response: Response

  try {
    response = await fetch(url, {
      ...restOptions,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    })
  } catch {
    throw new ApiRequestError('Network request failed', { code: 'NETWORK' })
  }

  if (!response.ok) {
    throw new ApiRequestError(`API request failed: ${response.status} ${response.statusText}`, {
      status: response.status,
      code: 'HTTP',
    })
  }

  return response.json() as Promise<T>
}
