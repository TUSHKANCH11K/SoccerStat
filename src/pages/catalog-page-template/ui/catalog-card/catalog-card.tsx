import { Link } from 'react-router-dom'
import styles from './catalog-card.module.css'

export interface CatalogCardItem {
  id: number
  name: string
  subtitle?: string
  imageUrl?: string | null
  fallbackImageUrl: string
  linkTo?: string
}

export function CatalogCard({ item }: { item: CatalogCardItem }) {
  const content = (
    <>
      <img
        src={item.imageUrl || item.fallbackImageUrl}
        alt={item.name}
        className={styles['catalog-card__logo']}
      />
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
