import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import fifaLogo from '../../../assets/fifa_logo.svg'

const navItems = [
  { to: '/leagues', label: 'Лиги' },
  { to: '/teams', label: 'Команды' },
]

export function Header() {
  return (
    <header className={styles['app-header']}>
      <div className={styles['app-header__container']}>
        <NavLink to="/" className={styles['brand']}>
          <img src={fifaLogo} className={styles['brand__logo']} alt="FIFA" />
        </NavLink>

        <nav className={styles['app-nav']} aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? styles['nav-link--active'] : styles['nav-link'])}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
