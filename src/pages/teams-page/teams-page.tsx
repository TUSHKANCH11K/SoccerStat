import { useEffect, useMemo, useState } from 'react'
import fifaLogo from '../assets/fifa_logo.svg'
import { CatalogPageTemplate } from '../catalog-page-template/catalog-page-template'
import { getTeams } from '../../shared/api/teams-service'
import { resolveApiErrorMessage } from '../../shared/lib/api-error'
import type { Team } from '../../shared/types/team'
import { ErrorMessage } from '../../shared/ui/error-message/error-message'
import { Loader } from '../../shared/ui/loader/loader'

const PAGE_SIZE = 8

export function TeamsPage() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    let isMounted = true

    const loadTeams = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await getTeams()

        if (!isMounted) {
          return
        }

        setTeams(response.teams)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setError(resolveApiErrorMessage(loadError, 'Не удалось загрузить список команд.'))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredTeams = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return teams
    }

    return teams.filter((team) => {
      const searchable = `${team.name} ${team.area.name}`.toLowerCase()
      return searchable.includes(normalized)
    })
  }, [teams, query])

  const safePage = Math.min(page, Math.max(1, Math.ceil(filteredTeams.length / PAGE_SIZE)))
  const startIndex = (safePage - 1) * PAGE_SIZE
  const pageItems = filteredTeams.slice(startIndex, startIndex + PAGE_SIZE)

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (isLoading) {
    return <Loader label="Загружаем список команд..." />
  }

  return (
    <CatalogPageTemplate
      variant="team"
      searchValue={query}
      onSearchChange={handleQueryChange}
      items={pageItems.map((team) => ({
        id: team.id,
        name: team.name,
        imageUrl: team.crest,
        fallbackImageUrl: fifaLogo,
        linkTo: `/teams/${team.id}/matches`,
      }))}
      emptyText={query ? 'Ничего не найдено' : 'Список команд пуст.'}
      count={filteredTeams.length}
      pageSize={PAGE_SIZE}
      currentPage={safePage}
      onPageChange={setPage}
    />
  )
}
