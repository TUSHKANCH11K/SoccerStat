import { useState } from 'react'
import { Pagination } from '../shared/ui/pagination'

export function TeamsPage() {
  const [page, setPage] = useState(1)

  return (
    <section>
      <h1>Команды</h1>
      <p>Здесь будет список команд.</p>
      <Pagination count={240} pageSize={12} currentPage={page} onPageChange={setPage} />
    </section>
  )
}
