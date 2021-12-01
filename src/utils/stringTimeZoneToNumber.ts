export const stringTimeZoneToNumber = (timeZone: string) => {
  const [h, m] = timeZone.split(':').map((i) => Number(i))

  const offset = h * 60 + m

  return offset
}