export const sortData = (data: Record<string, number>) => {
  const keys = Object.keys(data ?? {})
  return keys.sort((a, b) => a.localeCompare(b))
}
