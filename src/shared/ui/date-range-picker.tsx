import searchIcon from '../../assets/search_icon.svg'

interface DateRangeValue {
  from: string
  to: string
}

interface DateRangePickerProps {
  value: DateRangeValue
  onChange: (nextValue: DateRangeValue) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="date-range" aria-label="Фильтр по дате">
      <label className="date-range__field">
        <span className="date-range__label">Матчи с</span>
        <div className="date-range__input-wrap">
          <img src={searchIcon} className="date-range__icon" alt="" aria-hidden="true" />
          <input
            type="date"
            value={value.from}
            max={value.to || undefined}
            onChange={(event) => onChange({ ...value, from: event.target.value })}
            className="date-range__input"
          />
        </div>
      </label>

      <label className="date-range__field">
        <span className="date-range__label">по</span>
        <div className="date-range__input-wrap">
          <img src={searchIcon} className="date-range__icon" alt="" aria-hidden="true" />
          <input
            type="date"
            value={value.to}
            min={value.from || undefined}
            onChange={(event) => onChange({ ...value, to: event.target.value })}
            className="date-range__input"
          />
        </div>
      </label>
    </div>
  )
}
