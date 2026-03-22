import { Outlet } from 'react-router-dom'
import { Header } from '../shared/ui/header'
import './layout.css'

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
