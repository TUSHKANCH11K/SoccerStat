export interface CompetitionArea {
  id: number
  name: string
  code?: string
  flag?: string | null
}

export interface Competition {
  id: number
  name: string
  code: string
  type: string
  emblem?: string | null
  area: CompetitionArea
}

export interface CompetitionsResponse {
  count: number
  competitions: Competition[]
}
