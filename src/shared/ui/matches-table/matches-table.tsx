import { localizeMatchStatus } from '@/shared/consts'
import styles from './matches-table.module.css'
import { formatScore, formatUtcDateToLocal, formatUtcTimeToLocal } from '@/shared/lib'
import type { CompetitionMatch } from '@/shared/types/match'

interface MatchesTableProps {
  visibleMatches: CompetitionMatch[]
  range: {
    from: string
    to: string
  }
}

export function MatchesTable({ visibleMatches, range }: MatchesTableProps) {
  return (
    <div className={styles['matches-table-wrap']}>
      <table className={styles['matches-table']}>
        <colgroup>
          <col
            className={styles['matches-table__col'] + ' ' + styles['matches-table__col--date']}
          />
          <col
            className={styles['matches-table__col'] + ' ' + styles['matches-table__col--time']}
          />
          <col
            className={styles['matches-table__col'] + ' ' + styles['matches-table__col--status']}
          />
          <col
            className={styles['matches-table__col'] + ' ' + styles['matches-table__col--teams']}
          />
          <col
            className={styles['matches-table__col'] + ' ' + styles['matches-table__col--score']}
          />
        </colgroup>
        <tbody>
          {visibleMatches.map((match) => (
            <tr key={match.id}>
              <td
                className={
                  styles['matches-table__cell'] + ' ' + styles['matches-table__cell--date']
                }
              >
                {formatUtcDateToLocal(match.utcDate)}
              </td>
              <td
                className={
                  styles['matches-table__cell'] + ' ' + styles['matches-table__cell--time']
                }
              >
                {formatUtcTimeToLocal(match.utcDate)}
              </td>
              <td
                className={
                  styles['matches-table__cell'] + ' ' + styles['matches-table__cell--status']
                }
              >
                {localizeMatchStatus(match.status)}
              </td>
              <td
                className={
                  styles['matches-table__cell'] + ' ' + styles['matches-table__cell--teams']
                }
              >
                {match.homeTeam.name} — {match.awayTeam.name}
              </td>
              <td
                className={
                  styles['matches-table__cell'] + ' ' + styles['matches-table__cell--score']
                }
              >
                {formatScore(match)}
              </td>
            </tr>
          ))}
          {visibleMatches.length === 0 && (
            <tr>
              <td colSpan={5} className={styles['matches-table__empty']}>
                {range.from || range.to ? 'Нет матчей в выбранном периоде.' : 'Список матчей пуст.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
