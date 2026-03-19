import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../shared/ui/breadcrumbs'
import { DateRangePicker } from '../shared/ui/date-range-picker'

const LEAGUE_MATCH_DATES = [
  '2026-02-11',
  '2026-02-15',
  '2026-02-21',
  '2026-03-02',
  '2026-03-06',
  '2026-03-19',
  '2026-04-01',
]

export function LeagueCalendarPage() {
  const { leagueId } = useParams()
  const [range, setRange] = useState({ from: '', to: '' })

  const filteredDates = useMemo(() => {
    return LEAGUE_MATCH_DATES.filter((date) => {
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
      <Breadcrumbs items={[{ label: 'Лиги', to: '/leagues' }, { label: 'Календарь лиги' }]} />
      <h1>Календарь лиги</h1>
      <p>Лига ID: {leagueId}</p>
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
