import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './team-calendar-page.module.css'
import { Breadcrumbs, DateRangePicker, ErrorMessage, Loader, Pagination } from '@/shared/ui'
import type { CompetitionMatch } from '@/shared/types/match'
import { CALENDAR_PAGE_SIZE } from '@/shared/consts'
import { resolveApiErrorMessage } from '@/shared/lib'
import { getTeamById, getTeamMatches } from '@/shared/api/team-matches-service'
import { MatchesTable } from '@/shared/ui/matches-table'

export function TeamCalendarPage() {
  const { teamId } = useParams()
  const [range, setRange] = useState({ from: '', to: '' })
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<CompetitionMatch[]>([])
  const [teamName, setTeamName] = useState('Команда')
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const hasInvalidRange = Boolean(range.from && range.to && range.from > range.to)
  const hasPartialRange = Boolean((range.from && !range.to) || (!range.from && range.to))

  useEffect(() => {
    const parsedTeamId = Number(teamId)

    if (!teamId || Number.isNaN(parsedTeamId)) {
      setError('Некорректный идентификатор команды.')
      setIsLoading(false)
      return
    }

    let isMounted = true

    const loadTeamCalendar = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [teamResponse, matchesResponse] = await Promise.all([
          getTeamById(parsedTeamId),
          getTeamMatches(
            parsedTeamId,
            range.from && range.to && !hasInvalidRange
              ? { dateFrom: range.from, dateTo: range.to }
              : undefined,
          ),
        ])

        if (!isMounted) {
          return
        }

        setTeamName(teamResponse.name || 'Команда')
        setMatches(matchesResponse.matches)
        setTotalCount(matchesResponse.count)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setError(resolveApiErrorMessage(loadError, 'Не удалось загрузить матчи команды.'))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadTeamCalendar()

    return () => {
      isMounted = false
    }
  }, [hasInvalidRange, range.from, range.to, teamId])

  const safePage = Math.min(page, Math.max(1, Math.ceil(totalCount / CALENDAR_PAGE_SIZE)))
  const visibleMatches = useMemo(() => {
    const startIndex = (safePage - 1) * CALENDAR_PAGE_SIZE
    return matches.slice(startIndex, startIndex + CALENDAR_PAGE_SIZE)
  }, [matches, safePage])

  const handleRangeChange = (nextRange: { from: string; to: string }) => {
    setRange(nextRange)
    setPage(1)
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (isLoading) {
    return <Loader label="Загружаем календарь команды..." />
  }

  return (
    <section className={styles['team-calendar-page']}>
      <Breadcrumbs
        items={[{ label: 'Команды', to: '/teams' }, { label: teamName }]}
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
