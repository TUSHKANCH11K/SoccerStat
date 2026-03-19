import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../shared/ui/breadcrumbs'

export function LeagueCalendarPage() {
  const { leagueId } = useParams()

  return (
    <section>
      <Breadcrumbs items={[{ label: 'Лиги', to: '/leagues' }, { label: 'Календарь лиги' }]} />
      <h1>Календарь лиги</h1>
      <p>Лига ID: {leagueId}</p>
    </section>
  )
}
