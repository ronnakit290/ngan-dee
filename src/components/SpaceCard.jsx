import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Maximize2, Users } from 'lucide-react'
import { formatPrice } from '../data/spaces'
import { asset } from '../lib/asset'

export default function SpaceCard({ space }) {
  const isSale = space.mode === 'sell'

  return (
    <article className="space-card">
      <div className="space-card__media">
        <img
          src={asset(space.image)}
          alt={space.imageAlt}
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
        />
        <div className="space-card__badges">
          <span className={`badge ${isSale ? 'badge--sale' : 'badge--rent'}`}>{isSale ? 'ขาย' : 'ให้เช่า'}</span>
          <span className="badge badge--category">{space.type}</span>
        </div>
      </div>

      <div className="space-card__body">
        <h3 className="space-card__title">
          <Link to={`/spaces/${space.slug}`} className="card-link">
            {space.name}
          </Link>
        </h3>
        <p className="space-card__location">
          <MapPin size={14} aria-hidden="true" />
          {space.district} · {space.province}
        </p>
        <div className="space-card__meta">
          <span>
            <Maximize2 size={14} aria-hidden="true" /> {space.area}
          </span>
          <span>
            <Users size={14} aria-hidden="true" /> {space.capacity}
          </span>
        </div>
        <div className="space-card__foot">
          <p className="space-card__price">
            <strong>฿{formatPrice(space.price)}</strong>
            <span>{isSale ? space.unit : `/ ${space.unit}`}</span>
          </p>
          <span className="space-card__arrow" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </article>
  )
}
