import { Pagination, SearchBar } from '@/shared/ui'
import styles from './ui/catalog-card/catalog-card.module.css'
import { CatalogCard, type CatalogCardItem } from './ui/catalog-card'

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
          <li
            key={item.id}
            className={styles['catalog-card'] + ' ' + styles[`catalog-card--${variant}`]}
          >
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
