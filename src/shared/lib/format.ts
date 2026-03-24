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
  const fullTime = formatPart(match.score.fullTime.home, match.score.fullTime.away)
  const extraTime =
    match.score.extraTime && hasNonNullScore(match.score.extraTime.home, match.score.extraTime.away)
      ? `(${formatPart(match.score.extraTime.home, match.score.extraTime.away)})`
      : ''
  const penalties =
    match.score.penalties && hasNonNullScore(match.score.penalties.home, match.score.penalties.away)
      ? `(${formatPart(match.score.penalties.home, match.score.penalties.away)})`
      : ''

  return `${fullTime}${extraTime}${penalties}`
}
