import searchIcon from '../../assets/search_icon.svg'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Поиск' }: SearchBarProps) {
  return (
    <label className="search-bar" aria-label="Поиск">
      <img src={searchIcon} className="search-bar__icon" alt="" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
      />
    </label>
  )
}
