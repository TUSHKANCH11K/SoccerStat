import { apiRequest } from './http'
import type { CompetitionMatch, MatchDateFilterParams } from '../types/match'
import type { Team } from '../types/team'

export interface TeamMatchesResponse {
  count: number
  filters?: {
    dateFrom?: string
    dateTo?: string
    permission?: string
  }
  resultSet?: {
    count: number
    competitions?: string
    first?: string
    last?: string
    played?: number
  }
  matches: CompetitionMatch[]
}

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

export async function getTeamById(teamId: number): Promise<Team> {
  return apiRequest<Team>(`/teams/${teamId}`)
}

export async function getTeamMatches(
  teamId: number,
  params?: MatchDateFilterParams,
): Promise<TeamMatchesResponse> {
  const query = buildDateQuery(params)
  return apiRequest<TeamMatchesResponse>(`/teams/${teamId}/matches${query}`)
}
