import { useParams } from 'react-router-dom'

export function TeamCalendarPage() {
  const { teamId } = useParams()

  return (
    <section>
      <h1>Календарь команды</h1>
      <p>Команда ID: {teamId}</p>
    </section>
  )
}
