import { useMemo, useState } from 'react'
import { Pagination } from '../shared/ui/pagination'
import { SearchBar } from '../shared/ui/search-bar'

const TEAMS = [
  'Manchester City',
  'Arsenal',
  'Liverpool',
  'Barcelona',
  'Real Madrid',
  'Bayern Munich',
  'Borussia Dortmund',
  'Inter',
  'Milan',
  'Paris Saint-Germain',
  'Ajax',
  'Benfica',
  'Al Nassr',
  'LA Galaxy',
]

const PAGE_SIZE = 6

export function TeamsPage() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const filteredTeams = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return TEAMS
    }

    return TEAMS.filter((team) => team.toLowerCase().includes(normalized))
  }, [query])

  const safePage = Math.min(page, Math.max(1, Math.ceil(filteredTeams.length / PAGE_SIZE)))
  const startIndex = (safePage - 1) * PAGE_SIZE
  const pageItems = filteredTeams.slice(startIndex, startIndex + PAGE_SIZE)

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <section>
      <h1>Команды</h1>
      <SearchBar value={query} onChange={handleQueryChange} placeholder="Поиск команды" />
      <ul className="entity-list">
        {pageItems.map((team) => (
          <li key={team} className="entity-list__item">
            {team}
          </li>
        ))}
        {pageItems.length === 0 && <li className="entity-list__empty">Ничего не найдено</li>}
      </ul>
      <Pagination
        count={filteredTeams.length}
        pageSize={PAGE_SIZE}
        currentPage={safePage}
        onPageChange={setPage}
      />
    </section>
  )
}
