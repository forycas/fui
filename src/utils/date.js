import dayjs from 'dayjs'

// https://day.js.org/docs/en/display/format
export function formatDate (date = new Date(), format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export function parseDate (date) {
  return dayjs(date).toDate()
}
