import type { CompetitionMatch } from '../types/match'

function formatPart(home: number | null | undefined, away: number | null | undefined): string {
  return `${home ?? '-'}:${away ?? '-'}`
}

function hasNonNullScore(
  home: number | null | undefined,
  away: number | null | undefined,
): boolean {
  return home !== null && home !== undefined && away !== null && away !== undefined
}

export function formatScore(match: CompetitionMatch): string {
  const fullTime = formatPart(match.score.fullTime.homeTeam, match.score.fullTime.awayTeam)
  const extraTime =
    match.score.extraTime &&
    hasNonNullScore(match.score.extraTime.homeTeam, match.score.extraTime.awayTeam)
      ? `(${formatPart(match.score.extraTime.homeTeam, match.score.extraTime.awayTeam)})`
      : ''
  const penalties =
    match.score.penalties &&
    hasNonNullScore(match.score.penalties.homeTeam, match.score.penalties.awayTeam)
      ? `(${formatPart(match.score.penalties.homeTeam, match.score.penalties.awayTeam)})`
      : ''

  return `${fullTime}${extraTime}${penalties}`
}
