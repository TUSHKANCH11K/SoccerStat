import { apiRequest } from './http'
import type { CompetitionsResponse } from '../types/competition'

export async function getCompetitions(): Promise<CompetitionsResponse> {
  return apiRequest<CompetitionsResponse>('/competitions')
}
