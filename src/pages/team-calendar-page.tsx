import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../shared/ui/breadcrumbs'

export function TeamCalendarPage() {
  const { teamId } = useParams()

  return (
    <section>
      <Breadcrumbs items={[{ label: 'Команды', to: '/teams' }, { label: 'Календарь команды' }]} />
      <h1>Календарь команды</h1>
      <p>Команда ID: {teamId}</p>
    </section>
  )
}
