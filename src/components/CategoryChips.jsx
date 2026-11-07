import {
  CalendarDays,
  Landmark,
  Music2,
  Palette,
  PartyPopper,
  ShoppingBag,
  Sparkles,
  Store,
  UtensilsCrossed,
} from 'lucide-react'
import { categories } from '../data/events'

const iconMap = {
  Sparkles,
  Landmark,
  CalendarDays,
  PartyPopper,
  Music2,
  Store,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
}

export default function CategoryChips({ value = 'ทั้งหมด', onChange, items = categories, label = 'หมวดหมู่งาน' }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {items.map((item) => {
        const Icon = iconMap[item.icon] || Sparkles
        const active = value === item.name
        return (
          <button
            key={item.name}
            type="button"
            className={`chip ${active ? 'is-active' : ''}`}
            onClick={() => onChange(item.name)}
            aria-pressed={active}
          >
            <Icon size={15} aria-hidden="true" />
            {item.name}
          </button>
        )
      })}
    </div>
  )
}
