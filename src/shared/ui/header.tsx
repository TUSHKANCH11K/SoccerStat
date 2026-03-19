import { NavLink } from 'react-router-dom'
import fifaLogo from '../../assets/fifa_logo.svg'

const navItems = [
  { to: '/leagues', label: 'Лиги' },
  { to: '/teams', label: 'Команды' },
]

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header__container">
        <NavLink to="/" className="brand">
          <img src={fifaLogo} className="brand__logo" alt="SoccerStat logo" />
          <span>SoccerStat</span>
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
  )
}
