export interface MatchTeam {
  id: number
  name: string
  shortName?: string
  tla?: string
  crest?: string
}

export interface MatchScoreTime {
  home: number | null
  away: number | null
}

export interface MatchScore {
  winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null
  duration: string
  fullTime: MatchScoreTime
  halfTime?: MatchScoreTime
  extraTime?: MatchScoreTime
  penalties?: MatchScoreTime
}

export interface CompetitionMatch {
  id: number
  utcDate: string
  status: string
  matchday?: number
  stage?: string
  group?: string | null
  homeTeam: MatchTeam
  awayTeam: MatchTeam
  score: MatchScore
}

export interface CompetitionMatchesResponse {
  resultSet?: {
    count: number
  }
  competition: {
    id: number
    name: string
    code?: string
    type?: string
    emblem?: string | null
  }
  matches: CompetitionMatch[]
}

export interface MatchDateFilterParams {
  dateFrom?: string
  dateTo?: string
}
