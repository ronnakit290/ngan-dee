export const initialsOf = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  return parts.slice(0, 2).map((part) => part[0]).join('')
}

export const firstNameOf = (name = '') => String(name).trim().split(/\s+/)[0] || ''

export const thaiDateLong = (date = new Date()) =>
  new Intl.DateTimeFormat('th-TH', { dateStyle: 'long' }).format(date)

export const thaiNumber = (value) =>
  new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 }).format(value)

export const roleLabel = (value) => {
  const labels = {
    organizer: 'ผู้จัดงาน',
    owner: 'เจ้าของพื้นที่',
    visitor: 'ผู้เข้าชมงาน',
  }
  return labels[value] || 'สมาชิก'
}
