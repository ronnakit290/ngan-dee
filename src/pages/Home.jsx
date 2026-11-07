import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  Landmark,
  MapPin,
  Music2,
  Palette,
  PartyPopper,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  UtensilsCrossed,
} from 'lucide-react'
import EventCard from '../components/EventCard'
import SpaceCard from '../components/SpaceCard'
import Reveal from '../components/Reveal'
import { categories, events, featuredEvents, provinces, thaiMonthsShort } from '../data/events'
import { spaces } from '../data/spaces'
import { asset } from '../lib/asset'

const categoryIcons = {
  งานวัด: Landmark,
  งานประจำปี: CalendarDays,
  เทศกาล: PartyPopper,
  คอนเสิร์ต: Music2,
  ตลาดนัด: Store,
  งานแสดงสินค้า: ShoppingBag,
  ศิลปะ: Palette,
  อาหาร: UtensilsCrossed,
}

const testimonials = [
  {
    quote: 'หา booth ในงานวัดได้ในสองวัน และทีมงานช่วยประสานกับผู้จัดให้ทุกอย่าง ง่ายกว่าที่คิดมาก',
    name: 'พิมพ์ชนก ว.',
    role: 'เจ้าของร้านงานคราฟต์',
    initials: 'พว',
  },
  {
    quote: 'ลงประกาศพื้นที่ฮอลล์ของเรา แล้วมีดีลเข้ามาภายในสัปดาห์เดียว ตอนนี้ใช้บริการทุกฤดูกาล',
    name: 'ณัฐพล ส.',
    role: 'ผู้จัดการ The White Loft',
    initials: 'ณส',
  },
  {
    quote: 'ชอบที่ข้อมูลงานคัดมาแล้ว มีทั้งงานเล็กในชุมชนและเทศกาลใหญ่ ใช้ง่ายและสวยมาก',
    name: 'อารียา ท.',
    role: 'นักท่องเที่ยวสายงานเทศกาล',
    initials: 'อท',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [province, setProvince] = useState('ทุกจังหวัด')
  const [spaceMode, setSpaceMode] = useState('rent')

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => new Date(a.start) - new Date(b.start)),
    [],
  )
  const upcoming = sortedEvents.slice(0, 5)
  const homeSpaces = spaces.filter((space) => space.mode === spaceMode).slice(0, 4)

  function handleSearch(event) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (province !== 'ทุกจังหวัด') params.set('province', province)
    navigate(`/events${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__line" aria-hidden="true" />
              EVENT DIRECTORY · 2569–2570
            </p>
            <h1>
              ไปงาน<span className="text-red">ดี ๆ</span>
              <br />
              ที่ใช่สำหรับคุณ
            </h1>
            <p className="hero__lead">
              รวมงานวัด งานประจำปี เทศกาล และคอนเสิร์ตทั่วไทย
              พร้อมพื้นที่จัดงานและบูธให้เช่าหรือซื้อขายในที่เดียว
            </p>

            <form className="search-panel" onSubmit={handleSearch} role="search" aria-label="ค้นหางานอีเวนต์">
              <div className="search-panel__field search-panel__field--grow">
                <label className="sr-only" htmlFor="hero-search">
                  ค้นหางาน
                </label>
                <Search size={19} aria-hidden="true" />
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ค้นหาชื่องาน เทศกาล หรือสถานที่"
                />
              </div>
              <div className="search-panel__divider" aria-hidden="true" />
              <div className="search-panel__field">
                <label className="sr-only" htmlFor="hero-province">
                  จังหวัด
                </label>
                <MapPin size={18} aria-hidden="true" />
                <select
                  id="hero-province"
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                >
                  {provinces.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn--primary search-panel__submit">
                ค้นหางาน <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>

            <div className="hero__quick" aria-label="หมวดหมู่ยอดนิยม">
              <span>ยอดนิยม:</span>
              {['งานวัด', 'เทศกาล', 'คอนเสิร์ต', 'ตลาดนัด'].map((item) => (
                <Link key={item} to={`/events?cat=${encodeURIComponent(item)}`} className="hero__quick-link">
                  {item}
                </Link>
              ))}
            </div>

            <dl className="hero__stats">
              <div>
                <dt>งานในระบบ</dt>
                <dd>860<span>+</span></dd>
              </div>
              <div>
                <dt>พื้นที่และบูธ</dt>
                <dd>320<span>+</span></dd>
              </div>
              <div>
                <dt>ผู้เข้าชมต่อปี</dt>
                <dd>1.2<span>ล้าน</span></dd>
              </div>
            </dl>
          </div>

          <div className="hero__visual">
            <div className="hero__blob" aria-hidden="true" />
            <figure className="hero__main">
              <img
                src={asset('/images/hero-main.webp')}
                alt="บรรยากาศคอนเสิร์ตกลางแจ้งพร้อมแสงสีและผู้ชม"
                width="1600"
                height="1200"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
            <figure className="hero__side">
              <img
                src={asset('/images/hero-side.webp')}
                alt="พระเจดีย์ทองคำของวัดไทยท่ามกลางท้องฟ้าสีฟ้า"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="hero__badge">
              <strong>24</strong>
              <span>งาน<br />สัปดาห์นี้</span>
            </div>
            <div className="hero__tag">
              <span className="hero__tag-dot" aria-hidden="true" />
              อัปเดตทุกวัน
            </div>
          </div>
        </div>
      </section>

      <section className="section section--categories">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--blue">เลือกตามใจ</p>
              <h2>งานแบบไหนที่คุณตามหา</h2>
            </div>
            <Link to="/events" className="link-arrow">
              ดูงานทั้งหมด <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="category-grid">
            {categories.slice(1).map((category) => {
              const Icon = categoryIcons[category.name] || Sparkles
              const count = events.filter((event) => event.category === category.name).length
              return (
                <Link
                  key={category.name}
                  to={`/events?cat=${encodeURIComponent(category.name)}`}
                  className="category-tile"
                >
                  <span className="category-tile__icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="category-tile__label">{category.name}</span>
                  <span className="category-tile__count">{count} งาน</span>
                  <ArrowUpRight className="category-tile__arrow" size={16} aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--red">คัดมาแล้ว</p>
              <h2>งานแนะนำประจำสัปดาห์</h2>
              <p className="section-head__text">
                งานที่ทีมงานคัดเลือกจากความน่าสนใจ บรรยากาศ และการเดินทางที่สะดวก
              </p>
            </div>
            <Link to="/events" className="btn btn--outline btn--sm">
              ดูงานทั้งหมด <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="event-grid">
            {featuredEvents.slice(0, 3).map((event, index) => (
              <Reveal key={event.slug} delay={index * 70}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <Reveal>
            <div className="blueband">
              <div className="blueband__pattern" aria-hidden="true" />
              <div className="blueband__copy">
                <p className="eyebrow eyebrow--light">สำหรับเจ้าของพื้นที่</p>
                <h2>
                  มีพื้นที่ว่าง?
                  <br />
                  ปล่อยเช่าหรือขายได้เลย
                </h2>
                <p>
                  ลงประกาศฮอลล์ บูธ ลานกลางแจ้ง หรือสตูดิโอของคุณ
                  ให้ผู้จัดงานทั่วประเทศค้นพบได้ในไม่กี่นาที
                </p>
                <ul className="blueband__list">
                  <li>
                    <Check size={16} aria-hidden="true" /> ลงประกาศฟรี ไม่มีค่า commission
                  </li>
                  <li>
                    <Check size={16} aria-hidden="true" /> ระบบติดต่อสอบถามในตัว
                  </li>
                  <li>
                    <Check size={16} aria-hidden="true" /> เข้าถึงผู้จัดงาน 4,000+ ราย
                  </li>
                </ul>
                <div className="blueband__actions">
                  <Link to="/post?tab=space" className="btn btn--white">
                    ลงประกาศพื้นที่ <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <Link to="/spaces" className="blueband__link">
                    ดูพื้นที่ทั้งหมด <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="blueband__visual">
                <img
                  src={asset('/images/space-loft.webp')}
                  alt="ฮอลล์สีขาวเพดานสูงสำหรับจัดงาน"
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
                <div className="blueband__float">
                  <span className="blueband__float-icon">
                    <Building2 size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>320+</strong>
                    <span>พื้นที่ใน 45 จังหวัด</span>
                  </div>
                </div>
                <div className="blueband__square" aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--blue">พื้นที่และบูธ</p>
              <h2>พื้นที่ที่ใช่ สำหรับงานของคุณ</h2>
              <p className="section-head__text">
                ฮอลล์ สตูดิโอ ลานกลางแจ้ง และบูธคัดสรร พร้อมข้อมูลครบก่อนตัดสินใจ
              </p>
            </div>
            <div className="segmented" role="group" aria-label="เลือกประเภทการประกาศ">
              <button
                type="button"
                className={spaceMode === 'rent' ? 'is-active' : ''}
                onClick={() => setSpaceMode('rent')}
                aria-pressed={spaceMode === 'rent'}
              >
                ให้เช่า
              </button>
              <button
                type="button"
                className={spaceMode === 'sell' ? 'is-active' : ''}
                onClick={() => setSpaceMode('sell')}
                aria-pressed={spaceMode === 'sell'}
              >
                ซื้อขาย
              </button>
            </div>
          </div>

          <div className="space-grid">
            {homeSpaces.map((space, index) => (
              <Reveal key={space.slug} delay={index * 60}>
                <SpaceCard space={space} />
              </Reveal>
            ))}
          </div>

          <div className="section-foot">
            <Link to="/spaces" className="btn btn--outline">
              ดูพื้นที่ทั้งหมด <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--red">ปฏิทินงาน</p>
              <h2>งานที่กำลังจะมาถึง</h2>
            </div>
            <Link to="/events" className="link-arrow">
              เปิดปฏิทินทั้งหมด <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <ol className="upcoming-list">
            {upcoming.map((event) => (
                <li key={event.slug}>
                  <Link to={`/events/${event.slug}`} className="upcoming-row">
                    <span className="upcoming-row__date" aria-hidden="true">
                      <strong>{new Date(event.start).getDate()}</strong>
                      <span>{thaiMonthsShort[new Date(event.start).getMonth()]}</span>
                    </span>
                    <span className="upcoming-row__main">
                      <span className="upcoming-row__cat">{event.category}</span>
                      <strong>{event.title}</strong>
                      <span className="upcoming-row__meta">
                        <MapPin size={14} aria-hidden="true" /> {event.venue} · {event.province}
                      </span>
                    </span>
                    <span className="upcoming-row__time">{event.time}</span>
                    <span className="upcoming-row__price">{event.price}</span>
                    <span className="upcoming-row__arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <div>
              <p className="eyebrow eyebrow--blue">ใช้งานง่าย</p>
              <h2>ค้นพบงานและพื้นที่ใน 3 ขั้นตอน</h2>
            </div>
          </div>

          <div className="steps">
            {[
              {
                title: 'ค้นหางานที่ใช่',
                text: 'กรองตามประเภท จังหวัด และช่วงเวลา แล้วบันทึกงานที่สนใจไว้ดูภายหลัง',
              },
              {
                title: 'เลือกพื้นที่หรือบูธ',
                text: 'เปรียบเทียบขนาด ราคา และสิ่งอำนวยความสะดวก พร้อมส่งคำขอจองได้ทันที',
              },
              {
                title: 'ลงประกาศของคุณ',
                text: 'มีงานหรือพื้นที่ว่าง? ลงประกาศฟรีและให้ผู้ที่ใช่ค้นพบคุณ',
              },
            ].map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <article className="step">
                  <span className="step__num">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {index < 2 && <span className="step__connector" aria-hidden="true" />}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--red">เสียงจากผู้ใช้งาน</p>
              <h2>คนจัดงานและคนเที่ยวงานพูดถึงเราอย่างไร</h2>
            </div>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 70}>
                <figure className="testimonial">
                  <div className="testimonial__stars" aria-label="คะแนน 5 จาก 5">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} size={15} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption>
                    <span className="testimonial__avatar" aria-hidden="true">{item.initials}</span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.role}</small>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta">
              <div className="cta__copy">
                <p className="eyebrow eyebrow--red">เริ่มต้นวันนี้</p>
                <h2>
                  งานดี ๆ รอคุณอยู่<br />
                  <span className="text-blue">หรือเปล่า?</span>
                </h2>
                <p>ค้นหางานถัดไป หรือลงประกาศงานและพื้นที่ของคุณได้ฟรี</p>
              </div>
              <div className="cta__actions">
                <Link to="/events" className="btn btn--primary">
                  ค้นหางาน <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link to="/post" className="btn btn--outline">
                  ลงประกาศฟรี <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <span className="cta__shape cta__shape--red" aria-hidden="true" />
              <span className="cta__shape cta__shape--blue" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
