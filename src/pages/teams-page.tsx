import { useMemo, useState } from 'react'
import fifaLogo from '../assets/fifa_logo.svg'
import { Pagination } from '../shared/ui/pagination'
import { SearchBar } from '../shared/ui/search-bar'

const TEAMS = [
  { name: 'Manchester City', logo: fifaLogo },
  { name: 'Arsenal', logo: fifaLogo },
  { name: 'Liverpool', logo: fifaLogo },
  { name: 'Barcelona', logo: fifaLogo },
  { name: 'Real Madrid', logo: fifaLogo },
  { name: 'Bayern Munich', logo: fifaLogo },
  { name: 'Borussia Dortmund', logo: fifaLogo },
  { name: 'Inter', logo: fifaLogo },
  { name: 'Milan', logo: fifaLogo },
  { name: 'Paris Saint-Germain', logo: fifaLogo },
  { name: 'Ajax', logo: fifaLogo },
  { name: 'Benfica', logo: fifaLogo },
  { name: 'Al Nassr', logo: fifaLogo },
  { name: 'LA Galaxy', logo: fifaLogo },
]

const PAGE_SIZE = 8

export function TeamsPage() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const filteredTeams = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return TEAMS
    }

    return TEAMS.filter((team) => team.name.toLowerCase().includes(normalized))
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
      <SearchBar value={query} onChange={handleQueryChange} placeholder="Search" />
      <ul className="team-grid">
        {pageItems.map((team) => (
          <li key={team.name} className="team-card">
            <img src={team.logo} alt={team.name} className="team-card__logo" />
            <h3 className="team-card__name">{team.name}</h3>
          </li>
        ))}
        {pageItems.length === 0 && <li className="team-grid__empty">Ничего не найдено</li>}
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
