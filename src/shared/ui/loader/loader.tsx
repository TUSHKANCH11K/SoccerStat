import styles from './loader.module.css'

interface LoaderProps {
  label?: string
}

export function Loader({ label = 'Загрузка данных...' }: LoaderProps) {
  return (
    <div className={styles['loader']} role="status" aria-live="polite">
      <span className={styles['loader__spinner']} aria-hidden="true" />
      <span className={styles['loader__label']}>{label}</span>
    </div>
  )
}
