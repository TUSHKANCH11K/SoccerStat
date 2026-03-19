import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/leagues', label: 'Лиги' },
  { to: '/teams', label: 'Команды' },
]

export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__container">
          <NavLink to="/" className="brand">
            SoccerStat
          </NavLink>
          <nav className="app-nav" aria-label="Основная навигация">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
