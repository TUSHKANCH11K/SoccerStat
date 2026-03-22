import './pagination.css'

interface PaginationProps {
  count: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

function getPageItems(totalPages: number, currentPage: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages]
}

export function Pagination({ count, pageSize, currentPage, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(count / pageSize))
  const pageItems = getPageItems(totalPages, currentPage)

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <nav className="pagination" aria-label="Пагинация">
      <button
        type="button"
        className="pagination__button pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        aria-label="Предыдущая страница"
      >
        {'<'}
      </button>

      <ul className="pagination__list">
        {pageItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`} className="pagination__ellipsis" aria-hidden="true">
                …
              </li>
            )
          }

          const isActive = item === currentPage

          return (
            <li key={item}>
              <button
                type="button"
                className={
                  isActive ? 'pagination__button pagination__button--active' : 'pagination__button'
                }
                onClick={() => onPageChange(item)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="pagination__button pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="Следующая страница"
      >
        {'>'}
      </button>
    </nav>
  )
}
