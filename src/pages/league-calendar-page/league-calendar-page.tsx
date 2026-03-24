import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCompetitionMatches } from '@/shared/api/competition-matches-service'
import { Breadcrumbs, DateRangePicker, ErrorMessage, Loader, Pagination } from '@/shared/ui'
import type { CompetitionMatch } from '@/shared/types/match'
import { CALENDAR_PAGE_SIZE } from '@/shared/consts'
import { resolveApiErrorMessage } from '@/shared/lib'
import { MatchesTable } from '@/shared/ui/matches-table'

export function LeagueCalendarPage() {
  const { leagueId } = useParams()
  const [range, setRange] = useState({ from: '', to: '' })
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<CompetitionMatch[]>([])
  const [leagueName, setLeagueName] = useState('Лига')
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const hasInvalidRange = Boolean(range.from && range.to && range.from > range.to)
  const hasPartialRange = Boolean((range.from && !range.to) || (!range.from && range.to))

  useEffect(() => {
    const competitionId = Number(leagueId)

    if (!leagueId || Number.isNaN(competitionId)) {
      setError('Некорректный идентификатор лиги.')
      setIsLoading(false)
      return
    }

    if (hasPartialRange) {
      return
    }

    let isMounted = true

    const loadMatches = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const params =
          range.from && range.to && !hasInvalidRange
            ? { dateFrom: range.from, dateTo: range.to }
            : undefined

        const response = await getCompetitionMatches(competitionId, params)
        if (!isMounted) {
          return
        }
        setMatches(response.matches)
        setLeagueName(response.competition.name || 'Лига')
        setTotalCount(response.resultSet?.count || response.matches.length)
      } catch (loadError) {
        if (!isMounted) {
          return
        }
        setError(resolveApiErrorMessage(loadError, 'Не удалось загрузить матчи лиги.'))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadMatches()

    return () => {
      isMounted = false
    }
  }, [hasInvalidRange, leagueId, range.from, range.to, hasPartialRange])

  const safePage = Math.min(page, Math.max(1, Math.ceil(totalCount / CALENDAR_PAGE_SIZE)))
  const visibleMatches = useMemo(() => {
    const startIndex = (safePage - 1) * CALENDAR_PAGE_SIZE
    return matches.slice(startIndex, startIndex + CALENDAR_PAGE_SIZE)
  }, [matches, safePage])

  const handleRangeChange = (nextRange: { from: string; to: string }) => {
    setError(null)
    setRange(nextRange)
    setPage(1)
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (isLoading) {
    return <Loader label="Загружаем календарь лиги..." />
  }

  return (
    <section>
      <Breadcrumbs
        items={[{ label: 'Лиги', to: '/leagues' }, { label: leagueName }]}
        separator=">"
      />
      <DateRangePicker value={range} onChange={handleRangeChange} inline />
      {hasInvalidRange && <ErrorMessage message="Дата «с» не может быть позже даты «по»." />}
      {hasPartialRange && (
        <ErrorMessage message="Для фильтрации по дате заполните оба поля: «с» и «по»." />
      )}

      <MatchesTable visibleMatches={visibleMatches} range={range} />

      <Pagination
        count={totalCount}
        pageSize={CALENDAR_PAGE_SIZE}
        currentPage={safePage}
        onPageChange={setPage}
      />
    </section>
  )
}
