import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className="breadcrumbs">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="breadcrumbs__item">
                {item.to && !isLast ? (
                  <Link to={item.to} className="breadcrumbs__link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumbs__current" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && <li className="breadcrumbs__separator">/</li>}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
