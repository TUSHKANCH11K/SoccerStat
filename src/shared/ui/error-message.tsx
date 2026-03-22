import './error-message.css'

type ErrorVariant = 'default' | 'rate-limit'

interface ErrorMessageProps {
  message?: string
  variant?: ErrorVariant
}

const RATE_LIMIT_MESSAGE =
  'Превышен лимит запросов к API. Попробуйте позже или проверьте корректность токена.'

export function ErrorMessage({ message, variant = 'default' }: ErrorMessageProps) {
  const content = variant === 'rate-limit' ? RATE_LIMIT_MESSAGE : (message ?? 'Произошла ошибка.')

  return (
    <div className="error-message" role="alert" aria-live="assertive">
      {content}
    </div>
  )
}
