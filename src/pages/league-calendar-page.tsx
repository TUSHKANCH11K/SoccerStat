import { useParams } from 'react-router-dom'

export function LeagueCalendarPage() {
  const { leagueId } = useParams()

  return (
    <section>
      <h1>Календарь лиги</h1>
      <p>Лига ID: {leagueId}</p>
    </section>
  )
}
