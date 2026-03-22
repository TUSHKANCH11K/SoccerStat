export function formatUtcDateToLocal(utcDate: string): string {
  return new Date(utcDate).toLocaleDateString('ru-RU')
}

export function formatUtcTimeToLocal(utcDate: string): string {
  return new Date(utcDate)
    .toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(':', '.')
}
