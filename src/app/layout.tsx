import { Outlet } from 'react-router-dom'
import { Header } from '../shared/ui/header'

export function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
