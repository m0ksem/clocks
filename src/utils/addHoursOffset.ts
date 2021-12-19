export const addHoursOffset = (date: Date, offset: number) => {
  const now = new Date();
  now.setTime(date.getTime() + offset * 1000 * 60);
  return now;
}