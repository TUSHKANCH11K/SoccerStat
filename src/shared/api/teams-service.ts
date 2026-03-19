import { apiRequest } from './http'
import type { TeamsResponse } from '../types/team'

export async function getTeams(): Promise<TeamsResponse> {
  return apiRequest<TeamsResponse>('/teams')
}
