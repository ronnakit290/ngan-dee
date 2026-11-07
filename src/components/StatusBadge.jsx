import { statusMeta } from '../data/dashboard'

export default function StatusBadge({ status }) {
  const meta = statusMeta[status] || { label: status, tone: 'neutral' }
  return <span className={`status status--${meta.tone}`}>{meta.label}</span>
}
