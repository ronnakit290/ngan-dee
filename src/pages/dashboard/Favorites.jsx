import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import EventCard from '../../components/EventCard'
import { useFavorites } from '../../context/FavoritesContext'
import { events } from '../../data/events'

export default function Favorites() {
  const { favorites } = useFavorites()
  const savedEvents = favorites
    .map((slug) => events.find((event) => event.slug === slug))
    .filter(Boolean)

  return (
    <div className="dash-page">
      <div className="dash-head">
        <div>
          <p className="eyebrow eyebrow--red">รายการโปรด</p>
          <h1>งานที่บันทึก</h1>
          <p className="dash-head__sub">
            {savedEvents.length
              ? `คุณบันทึกงานไว้ ${savedEvents.length} รายการ กลับมาดูได้ทุกเมื่อ`
              : 'กดไอคอนหัวใจบนงานที่สนใจ แล้วรายการจะมาอยู่ที่นี่'}
          </p>
        </div>
        <div className="dash-head__actions">
          <Link to="/events" className="btn btn--outline btn--sm">
            ค้นหางานเพิ่ม <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {savedEvents.length ? (
        <div className="event-grid">
          {savedEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state__icon"><Heart size={26} aria-hidden="true" /></span>
          <h2>ยังไม่มีงานที่บันทึกไว้</h2>
          <p>เมื่อเจองานที่ถูกใจ กดหัวใจบนการ์ดงาน เพื่อเก็บไว้ดูภายหลังได้ทันที</p>
          <Link to="/events" className="btn btn--primary">
            เริ่มค้นหางาน <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  )
}
