import { useState } from 'react'
import { Pagination } from '../shared/ui/pagination'

export function LeaguesPage() {
  const [page, setPage] = useState(1)

  return (
    <section>
      <h1>Лиги</h1>
      <p>Здесь будет список лиг.</p>
      <Pagination count={120} pageSize={12} currentPage={page} onPageChange={setPage} />
    </section>
  )
}
