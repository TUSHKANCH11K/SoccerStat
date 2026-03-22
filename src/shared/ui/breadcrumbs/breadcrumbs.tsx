import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './breadcrumbs.module.css'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: string
}

export function Breadcrumbs({ items, separator = '>' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className={styles['breadcrumbs']}    >
      <ol className={styles['breadcrumbs__list']}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className={styles['breadcrumbs__item']}>
                {item.to && !isLast ? (
                  <Link to={item.to} className={styles['breadcrumbs__link']}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles['breadcrumbs__current']} aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && <li className={styles['breadcrumbs__separator']}>{separator}</li>}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
