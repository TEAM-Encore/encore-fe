/**
 * 날짜 포맷팅 (YYYY-MM-DD → YYYY.MM.DD)
 */
export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return dateStr.replace(/-/g, '.')
}

/**
 * 좌석 정보 포맷팅
 * @example formatSeatInfo({ floor: 3, zone: 'A', col: '5', number: '12' }) // "3층 A구역 5열 12번"
 */
export function formatSeatInfo(ticket: {
  floor?: number
  zone?: string
  col?: string
  number?: string
}): string {
  const parts: string[] = []
  if (ticket.floor) parts.push(`${ticket.floor}층`)
  if (ticket.zone) parts.push(`${ticket.zone}구역`)
  if (ticket.col) parts.push(`${ticket.col}열`)
  if (ticket.number) parts.push(`${ticket.number}번`)
  return parts.join(' ') || '좌석 정보 없음'
}

/**
 * 배우 이름 목록 포맷팅
 * @example formatActorNames([{ name: '김철수' }, { name: '이영희' }]) // "김철수 이영희"
 */
export function formatActorNames(actors?: { name?: string }[]): string {
  if (!actors || actors.length === 0) return ''
  return actors
    .map((a) => a.name)
    .filter(Boolean)
    .join(' ')
}
