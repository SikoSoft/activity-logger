export function dateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}

export function dateTime(time: number): string {
  const date = new Date(time * 1000);
  return `${dateString(date)}T${String(date.getHours()).padStart(
    2,
    '0',
  )}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)}T${String(date.getHours()).padStart(
    2,
    '0',
  )}:${String(date.getMinutes()).padStart(2, '0')}`;
}
