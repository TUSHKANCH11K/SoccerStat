import { useMemo, useState } from 'react'
import { Pagination } from '../shared/ui/pagination'
import { SearchBar } from '../shared/ui/search-bar'

const LEAGUES = [
  'Premier League',
  'La Liga',
  'Bundesliga',
  'Serie A',
  'Ligue 1',
  'Eredivisie',
  'Primeira Liga',
  'Championship',
  'MLS',
  'Brasileirão Série A',
  'J1 League',
  'Saudi Pro League',
  'UEFA Champions League',
  'UEFA Europa League',
]

const PAGE_SIZE = 6

export function LeaguesPage() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const filteredLeagues = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return LEAGUES
    }

    return LEAGUES.filter((league) => league.toLowerCase().includes(normalized))
  }, [query])

  const safePage = Math.min(page, Math.max(1, Math.ceil(filteredLeagues.length / PAGE_SIZE)))
  const startIndex = (safePage - 1) * PAGE_SIZE
  const pageItems = filteredLeagues.slice(startIndex, startIndex + PAGE_SIZE)

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <section>
      <h1>Лиги</h1>
      <SearchBar value={query} onChange={handleQueryChange} placeholder="Поиск лиги" />
      <ul className="entity-list">
        {pageItems.map((league) => (
          <li key={league} className="entity-list__item">
            {league}
          </li>
        ))}
        {pageItems.length === 0 && <li className="entity-list__empty">Ничего не найдено</li>}
      </ul>
      <Pagination
        count={filteredLeagues.length}
        pageSize={PAGE_SIZE}
        currentPage={safePage}
        onPageChange={setPage}
      />
    </section>
  )
}
