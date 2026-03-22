export class ApiRequestError extends Error {
  status?: number
  code: 'HTTP' | 'NETWORK'

  constructor(message: string, options: { status?: number; code: 'HTTP' | 'NETWORK' }) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = options.status
    this.code = options.code
  }
}

export function resolveApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof ApiRequestError) {
    if (error.code === 'NETWORK') {
      return 'Ошибка сети. Проверьте подключение к интернету и попробуйте снова.'
    }

    if (error.status === 429) {
      return 'Превышен лимит запросов к API (429). Подождите немного и повторите попытку.'
    }

    if (error.status && error.status >= 500) {
      return 'Ошибка сервера API. Попробуйте позже.'
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallbackMessage
}
