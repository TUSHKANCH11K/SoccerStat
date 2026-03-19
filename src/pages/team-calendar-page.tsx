import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../shared/ui/breadcrumbs'
import { DateRangePicker } from '../shared/ui/date-range-picker'

const TEAM_MATCH_DATES = [
  '2026-01-30',
  '2026-02-09',
  '2026-02-18',
  '2026-03-01',
  '2026-03-12',
  '2026-03-20',
  '2026-04-05',
]

export function TeamCalendarPage() {
  const { teamId } = useParams()
  const [range, setRange] = useState({ from: '', to: '' })

  const filteredDates = useMemo(() => {
    return TEAM_MATCH_DATES.filter((date) => {
      if (range.from && date < range.from) {
        return false
      }
      if (range.to && date > range.to) {
        return false
      }
      return true
    })
  }, [range])

  return (
    <section>
      <Breadcrumbs items={[{ label: 'Команды', to: '/teams' }, { label: 'Календарь команды' }]} />
      <h1>Календарь команды</h1>
      <p>Команда ID: {teamId}</p>
      <DateRangePicker value={range} onChange={setRange} />
      <ul className="entity-list">
        {filteredDates.map((date) => (
          <li key={date} className="entity-list__item">
            Матч: {date}
          </li>
        ))}
        {filteredDates.length === 0 && (
          <li className="entity-list__empty">Нет матчей в выбранном периоде</li>
        )}
      </ul>
    </section>
  )
}
