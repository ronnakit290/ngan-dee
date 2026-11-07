import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Heart, MapPin } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { asset } from '../lib/asset'

export default function EventCard({ event, compact = false }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(event.slug)

  return (
    <article className={`event-card ${compact ? 'event-card--compact' : ''}`}>
      <div className="event-card__media">
        <img
          src={asset(event.image)}
          alt={event.imageAlt}
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
        />
        <span className="badge badge--category">{event.category}</span>
        <button
          type="button"
          className={`fav-btn ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleFavorite(event.slug)}
          aria-label={saved ? `นำ ${event.title} ออกจากรายการบันทึก` : `บันทึก ${event.title}`}
          aria-pressed={saved}
        >
          <Heart size={18} aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="event-card__body">
        <p className="event-card__date">
          <CalendarDays size={14} aria-hidden="true" />
          {event.dateLabel}
        </p>
        <h3 className="event-card__title">
          <Link to={`/events/${event.slug}`} className="card-link">
            {event.title}
          </Link>
        </h3>
        <p className="event-card__venue">
          <MapPin size={14} aria-hidden="true" />
          {event.venue} · {event.province}
        </p>
        <div className="event-card__foot">
          <span className={`event-card__price ${event.priceValue === 0 ? 'is-free' : ''}`}>{event.price}</span>
          <span className="event-card__arrow" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </article>
  )
}
