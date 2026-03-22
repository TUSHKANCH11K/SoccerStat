import { Outlet } from 'react-router-dom'
import { Header } from '@/shared/ui'
import styles from './layout.module.css'

export function Layout() {
  return (
    <div className={styles['app-shell']}>
      <Header />
      <main className={styles['app-main']}>
        <Outlet />
      </main>
    </div>
  )
}
