export const sanitizeString = (str: string | undefined | null): string | null => {
  const s = str?.trim()
  if (s === undefined || s === null || s === '') {
    return null
  } else {
    return s
  }
}

export const sanitizeNumberString = (str: string | undefined | null, positive: boolean = true): number | null => {
  const s = str?.trim()
  if (s === undefined || s === null || s === '') {
    return null
  } else {
    const n = parseInt(s)
    if (isNaN(n) || (positive && n < 1)) {
      return null
    } else {
      return n
    }
  }
}
