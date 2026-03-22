import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout'
import { LeagueCalendarPage, LeaguesPage, TeamCalendarPage, TeamsPage } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/leagues" replace /> },
      { path: 'leagues', element: <LeaguesPage /> },
      { path: 'leagues/:leagueId/matches', element: <LeagueCalendarPage /> },
      { path: 'teams', element: <TeamsPage /> },
      { path: 'teams/:teamId/matches', element: <TeamCalendarPage /> },
    ],
  },
])
