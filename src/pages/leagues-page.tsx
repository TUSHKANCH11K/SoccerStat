import { useMemo, useState } from 'react'
import fifaLogo from '../assets/fifa_logo.svg'
import { Pagination } from '../shared/ui/pagination'
import { SearchBar } from '../shared/ui/search-bar'

const LEAGUES = [
  { name: 'Premier League', country: 'England', logo: fifaLogo },
  { name: 'La Liga', country: 'Spain', logo: fifaLogo },
  { name: 'Bundesliga', country: 'Germany', logo: fifaLogo },
  { name: 'Serie A', country: 'Italy', logo: fifaLogo },
  { name: 'Ligue 1', country: 'France', logo: fifaLogo },
  { name: 'Eredivisie', country: 'Netherlands', logo: fifaLogo },
  { name: 'Primeira Liga', country: 'Portugal', logo: fifaLogo },
  { name: 'Championship', country: 'England', logo: fifaLogo },
  { name: 'MLS', country: 'United States', logo: fifaLogo },
  { name: 'Brasileirão Série A', country: 'Brazil', logo: fifaLogo },
  { name: 'J1 League', country: 'Japan', logo: fifaLogo },
  { name: 'Saudi Pro League', country: 'Saudi Arabia', logo: fifaLogo },
  { name: 'UEFA Champions League', country: 'Europe', logo: fifaLogo },
  { name: 'UEFA Europa League', country: 'Europe', logo: fifaLogo },
]

const PAGE_SIZE = 8

export function LeaguesPage() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const filteredLeagues = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return LEAGUES
    }

    return LEAGUES.filter((league) => {
      const searchable = `${league.name} ${league.country}`.toLowerCase()
      return searchable.includes(normalized)
    })
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
      <SearchBar value={query} onChange={handleQueryChange} placeholder="Search" />
      <ul className="league-grid">
        {pageItems.map((league) => (
          <li key={league.name} className="league-card">
            <img src={league.logo} alt={league.name} className="league-card__logo" />
            <h3 className="league-card__name">{league.name}</h3>
            <p className="league-card__country">{league.country}</p>
          </li>
        ))}
        {pageItems.length === 0 && <li className="league-grid__empty">Ничего не найдено</li>}
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
