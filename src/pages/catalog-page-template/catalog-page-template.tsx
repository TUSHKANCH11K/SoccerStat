import { Link } from 'react-router-dom'
import { Pagination } from '../../shared/ui/pagination/pagination'
import { SearchBar } from '../../shared/ui/search-bar/search-bar'
import styles from './catalog-page-template.module.css'

export interface CatalogCardItem {
  id: number
  name: string
  subtitle?: string
  imageUrl?: string | null
  fallbackImageUrl: string
  linkTo?: string
}

interface CatalogPageTemplateProps {
  variant: 'league' | 'team'
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  items: CatalogCardItem[]
  emptyText?: string
  count: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

function CatalogCard({ item }: { item: CatalogCardItem }) {
  const content = (
    <>
      <img src={item.imageUrl || item.fallbackImageUrl} alt={item.name} className={styles['catalog-card__logo']} />
      <h3 className={styles['catalog-card__name']}>{item.name}</h3>
      {item.subtitle && <p className={styles['catalog-card__subtitle']}>{item.subtitle}</p>}
    </>
  )

  if (item.linkTo) {
    return (
      <Link to={item.linkTo} className={styles['catalog-card__link']}>
        {content}
      </Link>
    )
  }

  return <div className={styles['catalog-card__body']}>{content}</div>
}

export function CatalogPageTemplate({
  variant,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search',
  items,
  emptyText = 'Ничего не найдено',
  count,
  pageSize,
  currentPage,
  onPageChange,
}: CatalogPageTemplateProps) {
  return (
    <section>
      <SearchBar value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />

      <ul className={styles['catalog-grid'] + ' ' + styles[`catalog-grid--${variant}`]}>
        {items.map((item) => (
          <li key={item.id} className={styles['catalog-card'] + ' ' + styles[`catalog-card--${variant}`]}>
            <CatalogCard item={item} />
          </li>
        ))}

        {items.length === 0 && <li className={styles['catalog-grid__empty']}>{emptyText}</li>}
      </ul>

      <Pagination
        count={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  )
}
