import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCompetitionMatches } from '../shared/api/competition-matches-service'
import { Breadcrumbs } from '../shared/ui/breadcrumbs'
import { DateRangePicker } from '../shared/ui/date-range-picker'
import { ErrorMessage } from '../shared/ui/error-message'
import { Loader } from '../shared/ui/loader'
import { Pagination } from '../shared/ui/pagination'
import type { CompetitionMatch } from '../shared/types/match'

const PAGE_SIZE = 10

function formatDate(utcDate: string): string {
  return new Date(utcDate).toLocaleDateString('ru-RU')
}

function formatTime(utcDate: string): string {
  return new Date(utcDate).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatPart(home: number | null | undefined, away: number | null | undefined): string {
  return `${home ?? '-'}:${away ?? '-'}`
}

function formatScore(match: CompetitionMatch): string {
  const fullTime = formatPart(match.score.fullTime.homeTeam, match.score.fullTime.awayTeam)
  const extraTime = match.score.extraTime
    ? `(${formatPart(match.score.extraTime.homeTeam, match.score.extraTime.awayTeam)})`
    : ''
  const penalties = match.score.penalties
    ? `(${formatPart(match.score.penalties.homeTeam, match.score.penalties.awayTeam)})`
    : ''

  return `${fullTime}${extraTime}${penalties}`
}

const STATUS_LABELS: Record<string, string> = {
  SCHEDULED: 'Запланирован',
  TIMED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершён',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELED: 'Отменён',
}

function localizeMatchStatus(status: string): string {
  return STATUS_LABELS[status] ?? status
}

export function LeagueCalendarPage() {
  const { leagueId } = useParams()
  const [range, setRange] = useState({ from: '', to: '' })
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<CompetitionMatch[]>([])
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
        setTotalCount(response.count)
      } catch (loadError) {
        if (!isMounted) {
          return
        }
        setError(
          loadError instanceof Error ? loadError.message : 'Не удалось загрузить матчи лиги.',
        )
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
  }, [hasInvalidRange, leagueId, range.from, range.to])

  const safePage = Math.min(page, Math.max(1, Math.ceil(totalCount / PAGE_SIZE)))
  const visibleMatches = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE
    return matches.slice(startIndex, startIndex + PAGE_SIZE)
  }, [matches, safePage])

  const handleRangeChange = (nextRange: { from: string; to: string }) => {
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
      <Breadcrumbs items={[{ label: 'Лиги', to: '/leagues' }, { label: 'Календарь лиги' }]} />
      <h1>Календарь лиги</h1>
      <p>Лига ID: {leagueId}</p>
      <DateRangePicker value={range} onChange={handleRangeChange} />
      {hasInvalidRange && <ErrorMessage message="Дата «с» не может быть позже даты «по»." />}
      {hasPartialRange && (
        <ErrorMessage message="Для фильтрации по дате заполните оба поля: «с» и «по»." />
      )}

      <div className="matches-table-wrap">
        <table className="matches-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Время</th>
              <th>Статус</th>
              <th>Команда А — Б</th>
              <th>Счёт</th>
            </tr>
          </thead>
          <tbody>
            {visibleMatches.map((match) => (
              <tr key={match.id}>
                <td>{formatDate(match.utcDate)}</td>
                <td>{formatTime(match.utcDate)}</td>
                <td>{localizeMatchStatus(match.status)}</td>
                <td>
                  {match.homeTeam.name} — {match.awayTeam.name}
                </td>
                <td>{formatScore(match)}</td>
              </tr>
            ))}
            {visibleMatches.length === 0 && (
              <tr>
                <td colSpan={5} className="matches-table__empty">
                  Матчи не найдены.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        count={totalCount}
        pageSize={PAGE_SIZE}
        currentPage={safePage}
        onPageChange={setPage}
      />
    </section>
  )
}
