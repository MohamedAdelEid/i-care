export const exportVisibleRowsToCsv = <T>(
  headers: string[],
  rows: T[],
  getRowValues: (row: T) => (string | number | null | undefined)[],
  filename = 'export.csv',
): void => {
  const escape = (value: string | number | null | undefined) => {
    const raw = value == null ? '' : String(value)
    if (/[",\n]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`
    return raw
  }

  const lines = [
    headers.map(escape).join(','),
    ...rows.map((row) => getRowValues(row).map(escape).join(',')),
  ]

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
