export const CALENDAR_PAGE_SIZE = 10
export const LIST_PAGE_SIZE = 8

export const STATUS_LABELS: Record<string, string> = {
  SCHEDULED: 'Запланирован',
  TIMED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершён',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELED: 'Отменён',
}

export function localizeMatchStatus(status: string): string {
  return STATUS_LABELS[status] ?? status
}
