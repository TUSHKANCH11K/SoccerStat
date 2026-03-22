import styles from './date-range-picker.module.css'

interface DateRangeValue {
  from: string
  to: string
}

interface DateRangePickerProps {
  value: DateRangeValue
  onChange: (nextValue: DateRangeValue) => void
  labelFrom?: string
  labelTo?: string
  inline?: boolean
}

export function DateRangePicker({
  value,
  onChange,
  labelFrom = 'Матчи с',
  labelTo = 'по',
  inline = false,
}: DateRangePickerProps) {
  if (inline) {
    return (
      <div className={styles['date-range'] + ' ' + styles['date-range--inline']} aria-label="Фильтр по дате">
        <span className={styles['date-range__text']}>{labelFrom}</span>

        <div className={styles['date-range__input-wrap'] + ' ' + styles['date-range__input-wrap--inline']}>
          <input
            type="date"
            value={value.from}
            max={value.to || undefined}
            onChange={(event) => onChange({ ...value, from: event.target.value })}
            className={styles['date-range__input']}
          />
          <span className={styles['date-range__icon']} aria-hidden="true">
            
          </span>
        </div>

        <span className={styles['date-range__text']}>{labelTo}</span>

        <div className={styles['date-range__input-wrap'] + ' ' + styles['date-range__input-wrap--inline']}>
          <input
            type="date"
            value={value.to}
            min={value.from || undefined}
            onChange={(event) => onChange({ ...value, to: event.target.value })}
            className={styles['date-range__input']}
          />
          <span className={styles['date-range__icon']} aria-hidden="true">
            
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles['date-range']} aria-label="Фильтр по дате">
      <label className={styles['date-range__field']}>
        <span className={styles['date-range__label']}>{labelFrom}</span>
        <div className={styles['date-range__input-wrap']}>
          <input
            type="date"
            value={value.from}
            max={value.to || undefined}
            onChange={(event) => onChange({ ...value, from: event.target.value })}
            className={styles['date-range__input']}
          />
          <span className={styles['date-range__icon']} aria-hidden="true">
            
          </span>
        </div>
      </label>

      <label className={styles['date-range__field']}>
        <span className={styles['date-range__label']}>{labelTo}</span>
        <div className={styles['date-range__input-wrap']}>
          <input
            type="date"
            value={value.to}
            min={value.from || undefined}
            onChange={(event) => onChange({ ...value, to: event.target.value })}
            className={styles['date-range__input']}
          />
          <span className={styles['date-range__icon']} aria-hidden="true">
            
          </span>
        </div>
      </label>
    </div>
  )
}
