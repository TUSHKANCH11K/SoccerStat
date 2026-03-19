interface LoaderProps {
  label?: string
}

export function Loader({ label = 'Загрузка данных...' }: LoaderProps) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  )
}
