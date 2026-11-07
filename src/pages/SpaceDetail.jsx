import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  MapPin,
  Maximize2,
  Star,
  Users,
} from 'lucide-react'
import InquiryForm from '../components/InquiryForm'
import Modal from '../components/Modal'
import SpaceCard from '../components/SpaceCard'
import { formatPrice, getSpace, spaces } from '../data/spaces'
import { asset } from '../lib/asset'

export default function SpaceDetail() {
  const { slug } = useParams()
  const space = getSpace(slug)
  const [inquiryOpen, setInquiryOpen] = useState(false)

  if (!space) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h1>ไม่พบพื้นที่ที่คุณกำลังมองหา</h1>
          <p>ประกาศนี้อาจถูกนำออกแล้ว หรือลิงก์อาจไม่ถูกต้อง</p>
          <Link to="/spaces" className="btn btn--primary">
            ดูพื้นที่ทั้งหมด <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    )
  }

  const isSale = space.mode === 'sell'
  const similar = spaces
    .filter((item) => item.slug !== space.slug && (item.type === space.type || item.mode === space.mode))
    .slice(0, 3)

  return (
    <>
      <section className="detail-head">
        <div className="container">
          <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
            <Link to="/">หน้าหลัก</Link>
            <span aria-hidden="true">/</span>
            <Link to="/spaces">พื้นที่และบูธ</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{space.name}</span>
          </nav>

          <div className="detail-head__top">
            <div>
              <div className="badge-row">
                <span className={`badge ${isSale ? 'badge--sale' : 'badge--rent'}`}>{isSale ? 'ขาย' : 'ให้เช่า'}</span>
                <span className="badge badge--category">{space.type}</span>
                <span className="badge badge--soft">ว่าง: {space.available}</span>
              </div>
              <h1>{space.name}</h1>
              <p className="detail-head__tagline">{space.tagline}</p>
              <div className="detail-head__meta">
                <span><MapPin size={16} aria-hidden="true" /> {space.address}</span>
                <span className="rating"><Star size={15} fill="currentColor" aria-hidden="true" /> {space.rating} ({space.reviews} รีวิว)</span>
              </div>
            </div>
            <div className="detail-head__actions">
              <button type="button" className="btn btn--primary btn--sm" onClick={() => setInquiryOpen(true)}>
                {isSale ? 'สอบถามผู้ขาย' : 'จองพื้นที่'} <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-hero">
        <div className="container">
          <figure className="detail-hero__media detail-hero__media--space">
            <img
              src={asset(space.image)}
              alt={space.imageAlt}
              width="1600"
              height="900"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="detail-hero__caption">
              <span>{isSale ? 'ขาย' : 'ให้เช่า'}</span>
              <strong>฿{formatPrice(space.price)} {isSale ? '' : `/ ${space.unit}`}</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container detail-layout">
          <div className="detail-content">
            <section className="detail-block" aria-labelledby="facts-title">
              <h2 id="facts-title">ภาพรวมพื้นที่</h2>
              <div className="fact-grid">
                <div className="fact">
                  <Maximize2 size={19} aria-hidden="true" />
                  <span>ขนาดพื้นที่</span>
                  <strong>{space.area}</strong>
                </div>
                <div className="fact">
                  <Users size={19} aria-hidden="true" />
                  <span>รองรับ</span>
                  <strong>{space.capacity}</strong>
                </div>
                <div className="fact">
                  <CalendarCheck size={19} aria-hidden="true" />
                  <span>สถานะ</span>
                  <strong>ว่าง</strong>
                </div>
                <div className="fact">
                  <BadgeCheck size={19} aria-hidden="true" />
                  <span>ประเภท</span>
                  <strong>{space.type}</strong>
                </div>
              </div>
            </section>

            <section className="prose-block" aria-labelledby="space-about">
              <p className="eyebrow eyebrow--blue">เกี่ยวกับพื้นที่</p>
              <h2 id="space-about">รายละเอียด</h2>
              {space.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section className="detail-block" aria-labelledby="amenities-title">
              <h2 id="amenities-title">สิ่งอำนวยความสะดวก</h2>
              <ul className="amenity-grid">
                {space.amenities.map((amenity) => (
                  <li key={amenity}>
                    <Check size={15} aria-hidden="true" /> {amenity}
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail-block" aria-labelledby="space-location">
              <h2 id="space-location">ทำเลที่ตั้ง</h2>
              <div className="map-card">
                <div className="map-card__art map-card__art--blue" aria-hidden="true">
                  <span className="map-card__pin"><MapPin size={22} /></span>
                </div>
                <div className="map-card__info">
                  <p><MapPin size={16} aria-hidden="true" /> {space.address}</p>
                  <a
                    className="link-arrow"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(space.address)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    เปิดใน Google Maps <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            <section className="detail-block" aria-labelledby="host-title">
              <h2 id="host-title">ผู้ประกาศ</h2>
              <div className="host-card">
                <span className="host-card__avatar" aria-hidden="true">{space.host.slice(0, 1)}</span>
                <div>
                  <strong>{space.host}</strong>
                  <p><BadgeCheck size={14} aria-hidden="true" /> ยืนยันตัวตนแล้ว · ตอบกลับภายใน 1 วัน</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="detail-aside">
            <div className="booking-card">
              <p className="booking-card__label">{isSale ? 'ราคาขาย' : 'ค่าเช่า'}</p>
              <p className="booking-card__price">
                ฿{formatPrice(space.price)}
                {!isSale && <span>/ {space.unit}</span>}
              </p>
              <dl className="booking-card__list">
                <div>
                  <dt><Maximize2 size={16} aria-hidden="true" /> ขนาด</dt>
                  <dd>{space.area}</dd>
                </div>
                <div>
                  <dt><Users size={16} aria-hidden="true" /> รองรับ</dt>
                  <dd>{space.capacity}</dd>
                </div>
                <div>
                  <dt><CalendarCheck size={16} aria-hidden="true" /> ว่าง</dt>
                  <dd>{space.available}</dd>
                </div>
              </dl>
              <button type="button" className="btn btn--primary btn--block" onClick={() => setInquiryOpen(true)}>
                {isSale ? 'สอบถามผู้ขาย' : 'จองพื้นที่นี้'} <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <button type="button" className="btn btn--outline btn--block" onClick={() => setInquiryOpen(true)}>
                นัดชมสถานที่
              </button>
              <p className="booking-card__note">
                ไม่มีค่าใช้จ่ายในการสอบถาม · ไม่มีการชำระเงินในตัวอย่างนี้
              </p>
            </div>

            <Link to="/spaces" className="back-link">
              <ArrowLeft size={16} aria-hidden="true" /> กลับไปหน้าพื้นที่ทั้งหมด
            </Link>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow eyebrow--blue">ใกล้เคียง</p>
                <h2>พื้นที่ที่คุณอาจสนใจ</h2>
              </div>
              <Link to="/spaces" className="link-arrow">
                ดูพื้นที่ทั้งหมด <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="space-grid space-grid--thirds">
              {similar.map((item) => (
                <SpaceCard key={item.slug} space={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Modal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        title={isSale ? 'สอบถามผู้ขาย' : 'จองพื้นที่'}
        subtitle={`${space.name} · ${space.district}, ${space.province}`}
      >
        <InquiryForm kind="space" itemName={space.name} />
      </Modal>
    </>
  )
}
