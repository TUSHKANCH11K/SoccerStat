import { apiRequest } from './http'
import type { CompetitionMatchesResponse, MatchDateFilterParams } from '../types/match'

function buildDateQuery(params?: MatchDateFilterParams): string {
  if (!params) {
    return ''
  }

  const searchParams = new URLSearchParams()

  if (params.dateFrom) {
    searchParams.set('dateFrom', params.dateFrom)
  }

  if (params.dateTo) {
    searchParams.set('dateTo', params.dateTo)
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export async function getCompetitionMatches(
  competitionId: number,
  params?: MatchDateFilterParams,
): Promise<CompetitionMatchesResponse> {
  const query = buildDateQuery(params)
  return apiRequest<CompetitionMatchesResponse>(`/competitions/${competitionId}/matches${query}`)
}
