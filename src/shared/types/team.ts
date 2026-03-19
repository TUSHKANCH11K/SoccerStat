export interface TeamArea {
  id: number
  name: string
  code?: string
  flag?: string | null
}

export interface Team {
  id: number
  name: string
  shortName?: string
  tla?: string
  crest?: string
  address?: string
  website?: string
  founded?: number
  clubColors?: string
  venue?: string
  area: TeamArea
}

export interface TeamsResponse {
  count: number
  teams: Team[]
}
