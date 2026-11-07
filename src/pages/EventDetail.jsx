import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock,
  Heart,
  MapPin,
  Share2,
  Ticket,
  Users,
} from 'lucide-react'
import EventCard from '../components/EventCard'
import InquiryForm from '../components/InquiryForm'
import Modal from '../components/Modal'
import { events, getEvent } from '../data/events'
import { useFavorites } from '../context/FavoritesContext'
import { asset } from '../lib/asset'

export default function EventDetail() {
  const { slug } = useParams()
  const event = getEvent(slug)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!event) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h1>ไม่พบงานที่คุณกำลังมองหา</h1>
          <p>งานนี้อาจถูกนำออกแล้ว หรือลิงก์อาจไม่ถูกต้อง</p>
          <Link to="/events" className="btn btn--primary">
            ดูงานทั้งหมด <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    )
  }

  const saved = isFavorite(event.slug)
  const related = events
    .filter((item) => item.slug !== event.slug && (item.category === event.category || item.featured))
    .slice(0, 3)

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: event.title, text: event.tagline, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // Sharing was cancelled by the user.
    }
  }

  return (
    <>
      <section className="detail-head">
        <div className="container">
          <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
            <Link to="/">หน้าหลัก</Link>
            <span aria-hidden="true">/</span>
            <Link to="/events">งานอีเวนต์</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{event.title}</span>
          </nav>

          <div className="detail-head__top">
            <div>
              <span className="badge badge--category">{event.category}</span>
              <h1>{event.title}</h1>
              <p className="detail-head__tagline">{event.tagline}</p>
              <div className="detail-head__meta">
                <span><CalendarDays size={16} aria-hidden="true" /> {event.dateLabel}</span>
                <span><Clock size={16} aria-hidden="true" /> {event.time}</span>
                <span><MapPin size={16} aria-hidden="true" /> {event.venue} · {event.province}</span>
              </div>
            </div>
            <div className="detail-head__actions">
              <button type="button" className="btn btn--primary btn--sm" onClick={() => setInquiryOpen(true)}>
                จองบูธ / สอบถาม <ArrowUpRight size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`btn btn--outline btn--sm ${saved ? 'is-saved' : ''}`}
                onClick={() => toggleFavorite(event.slug)}
                aria-pressed={saved}
              >
                <Heart size={16} aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'บันทึกแล้ว' : 'บันทึกงาน'}
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={share}>
                <Share2 size={16} aria-hidden="true" /> {copied ? 'คัดลอกลิงก์แล้ว' : 'แชร์'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-hero">
        <div className="container">
          <figure className="detail-hero__media">
            <img
              src={asset(event.image)}
              alt={event.imageAlt}
              width="1600"
              height="900"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="detail-hero__caption">
              <span>{event.category}</span>
              <strong>{event.venue}</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container detail-layout">
          <div className="detail-content">
            <section className="prose-block" aria-labelledby="about-title">
              <p className="eyebrow eyebrow--red">เกี่ยวกับงาน</p>
              <h2 id="about-title">รายละเอียดงาน</h2>
              {event.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section className="detail-block" aria-labelledby="highlights-title">
              <h2 id="highlights-title">ไฮไลต์ของงาน</h2>
              <ul className="highlight-grid">
                {event.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="highlight-grid__icon"><Check size={15} aria-hidden="true" /></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail-block" aria-labelledby="schedule-title">
              <h2 id="schedule-title">กำหนดการ</h2>
              <ol className="schedule">
                {event.schedule.map((item) => (
                  <li key={`${item.time}-${item.title}`}>
                    <time>{item.time}</time>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="detail-block" aria-labelledby="booths-title">
              <div className="detail-block__head">
                <h2 id="booths-title">พื้นที่และบูธในงาน</h2>
                <span className="badge badge--soft">{event.stats.booths} บูธ</span>
              </div>
              <div className="booth-list">
                {event.booths.map((booth) => (
                  <div key={booth.name} className="booth-row">
                    <div>
                      <strong>{booth.name}</strong>
                      <p>{booth.size} · เหลือ {booth.left} ช่อง</p>
                    </div>
                    <span className="booth-row__price">{booth.price}</span>
                    <button type="button" className="btn btn--outline btn--sm" onClick={() => setInquiryOpen(true)}>
                      สอบถาม
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-block" aria-labelledby="map-title">
              <h2 id="map-title">สถานที่จัดงาน</h2>
              <div className="map-card">
                <div className="map-card__art" aria-hidden="true">
                  <span className="map-card__pin"><MapPin size={22} /></span>
                </div>
                <div className="map-card__info">
                  <p><MapPin size={16} aria-hidden="true" /> {event.address}</p>
                  <a
                    className="link-arrow"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue} ${event.province}`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    เปิดใน Google Maps <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>
          </div>

          <aside className="detail-aside">
            <div className="booking-card">
              <p className="booking-card__label">ค่าเข้าชม</p>
              <p className="booking-card__price">{event.price}</p>
              <dl className="booking-card__list">
                <div>
                  <dt><CalendarDays size={16} aria-hidden="true" /> วันที่</dt>
                  <dd>{event.dateLabel}</dd>
                </div>
                <div>
                  <dt><Clock size={16} aria-hidden="true" /> เวลา</dt>
                  <dd>{event.time}</dd>
                </div>
                <div>
                  <dt><Users size={16} aria-hidden="true" /> ผู้เข้าชม</dt>
                  <dd>{event.stats.visitors} คน</dd>
                </div>
                <div>
                  <dt><Ticket size={16} aria-hidden="true" /> บูธในงาน</dt>
                  <dd>{event.stats.booths} บูธ</dd>
                </div>
              </dl>
              <button type="button" className="btn btn--primary btn--block" onClick={() => setInquiryOpen(true)}>
                จองบูธ / สอบถาม <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`btn btn--outline btn--block ${saved ? 'is-saved' : ''}`}
                onClick={() => toggleFavorite(event.slug)}
                aria-pressed={saved}
              >
                <Heart size={16} aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'บันทึกแล้ว' : 'บันทึกงานนี้'}
              </button>
              <p className="booking-card__note">
                ยังไม่มีการชำระเงิน · ทีมงานจะติดต่อกลับเพื่อยืนยันรายละเอียด
              </p>
            </div>

            <div className="organizer-card">
              <p className="eyebrow">ผู้จัดงาน</p>
              <h3>{event.organizer}</h3>
              <p>ผู้จัดงานยืนยันตัวตนกับงานดีแล้ว</p>
              <Link to="/about#contact" className="link-arrow">
                ติดต่อทีมงาน <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <Link to="/events" className="back-link">
              <ArrowLeft size={16} aria-hidden="true" /> กลับไปหน้างานทั้งหมด
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow eyebrow--blue">ใกล้เคียง</p>
                <h2>งานที่คุณอาจสนใจ</h2>
              </div>
              <Link to="/events" className="link-arrow">
                ดูงานทั้งหมด <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="event-grid">
              {related.map((item) => (
                <EventCard key={item.slug} event={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Modal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        title="จองบูธในงาน"
        subtitle={`${event.title} · ${event.dateLabel}`}
      >
        <InquiryForm kind="event" itemName={event.title} />
      </Modal>
    </>
  )
}
