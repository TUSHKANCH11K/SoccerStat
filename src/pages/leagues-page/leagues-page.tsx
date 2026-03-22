import { useEffect, useMemo, useState } from 'react'
import fifaLogo from '@/assets/fifa_logo.svg'
import { CatalogPageTemplate } from '../catalog-page-template'
import { getCompetitions } from '@/shared/api/competitions-service'
import { resolveApiErrorMessage } from '@/shared/lib'
import type { Competition } from '@/shared/types/competition'
import { ErrorMessage, Loader } from '@/shared/ui'
import { LIST_PAGE_SIZE } from '@/shared/consts'

export function LeaguesPage() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [leagues, setLeagues] = useState<Competition[]>([])

  useEffect(() => {
    let isMounted = true

    const loadCompetitions = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await getCompetitions()

        if (!isMounted) {
          return
        }

        setLeagues(response.competitions)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setError(resolveApiErrorMessage(loadError, 'Не удалось загрузить список лиг.'))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadCompetitions()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredLeagues = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return leagues
    }

    return leagues.filter((league) => {
      const searchable = `${league.name} ${league.area.name}`.toLowerCase()
      return searchable.includes(normalized)
    })
  }, [leagues, query])

  const safePage = Math.min(page, Math.max(1, Math.ceil(filteredLeagues.length / LIST_PAGE_SIZE)))
  const startIndex = (safePage - 1) * LIST_PAGE_SIZE
  const pageItems = filteredLeagues.slice(startIndex, startIndex + LIST_PAGE_SIZE)

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (isLoading) {
    return <Loader label="Загружаем список лиг..." />
  }

  return (
    <CatalogPageTemplate
      variant="league"
      searchValue={query}
      onSearchChange={handleQueryChange}
      items={pageItems.map((league) => ({
        id: league.id,
        name: league.name,
        subtitle: league.area.name,
        imageUrl: league.emblem,
        fallbackImageUrl: fifaLogo,
        linkTo: `/leagues/${league.id}/matches`,
      }))}
      emptyText={query ? 'Ничего не найдено' : 'Список лиг пуст.'}
      count={filteredLeagues.length}
      pageSize={LIST_PAGE_SIZE}
      currentPage={safePage}
      onPageChange={setPage}
    />
  )
}
