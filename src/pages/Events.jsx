import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Heart, MapPin, Search, SlidersHorizontal, X } from 'lucide-react'
import CategoryChips from '../components/CategoryChips'
import EventCard from '../components/EventCard'
import { events, provinces } from '../data/events'
import { useFavorites } from '../context/FavoritesContext'

const sortOptions = [
  { value: 'soon', label: 'ใกล้ถึงก่อน' },
  { value: 'price-low', label: 'ราคาต่ำ–สูง' },
  { value: 'name', label: 'ชื่อ ก–ฮ' },
]

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { favorites, isFavorite } = useFavorites()
  const category = searchParams.get('cat') || 'ทั้งหมด'
  const province = searchParams.get('province') || 'ทุกจังหวัด'
  const query = searchParams.get('q') || ''
  const savedOnly = searchParams.get('saved') === '1'
  const [searchInput, setSearchInput] = useState(query)
  const [sort, setSort] = useState('soon')

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  function updateParams(patch) {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === 'ทั้งหมด' || value === 'ทุกจังหวัด') next.delete(key)
      else next.set(key, value)
    })
    setSearchParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const list = events.filter((event) => {
      if (category !== 'ทั้งหมด' && event.category !== category) return false
      if (province !== 'ทุกจังหวัด' && event.province !== province) return false
      if (savedOnly && !isFavorite(event.slug)) return false
      if (!needle) return true
      return [event.title, event.venue, event.province, event.category, event.tagline]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
    return list.sort((a, b) => {
      if (sort === 'price-low') return a.priceValue - b.priceValue
      if (sort === 'name') return a.title.localeCompare(b.title, 'th')
      return new Date(a.start) - new Date(b.start)
    })
  }, [category, province, query, savedOnly, sort, favorites, isFavorite])

  const hasFilters = category !== 'ทั้งหมด' || province !== 'ทุกจังหวัด' || query || savedOnly

  function clearFilters() {
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  return (
    <>
      <section className="page-head">
        <div className="container page-head__inner">
          <div>
            <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
              <Link to="/">หน้าหลัก</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">งานอีเวนต์</span>
            </nav>
            <p className="eyebrow eyebrow--red">EVENT DIRECTORY · 2569–2570</p>
            <h1>งานอีเวนต์ทั่วไทย</h1>
            <p className="page-head__lead">
              งานวัด งานประจำปี เทศกาล คอนเสิร์ต และตลาดนัด
              คัดสรรและอัปเดตทุกสัปดาห์
            </p>
          </div>
          <div className="page-head__aside">
            <p><strong>{events.length}</strong> งานที่คัดสรร</p>
            <p><strong>{provinces.length - 1}</strong> จังหวัดในประกาศนี้</p>
            <p><strong>{favorites.length}</strong> งานที่บันทึก</p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="filter-bar">
            <form
              className="filter-search"
              role="search"
              onSubmit={(event) => {
                event.preventDefault()
                updateParams({ q: searchInput.trim() })
              }}
            >
              <label className="sr-only" htmlFor="events-search">ค้นหางาน</label>
              <Search size={18} aria-hidden="true" />
              <input
                id="events-search"
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="ค้นหาชื่องาน สถานที่ หรือจังหวัด"
              />
              {searchInput && (
                <button type="button" className="filter-search__clear" onClick={() => { setSearchInput(''); updateParams({ q: '' }) }} aria-label="ล้างคำค้นหา">
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </form>

            <div className="filter-select">
              <label className="sr-only" htmlFor="events-province">จังหวัด</label>
              <MapPin size={17} aria-hidden="true" />
              <select
                id="events-province"
                value={province}
                onChange={(event) => updateParams({ province: event.target.value })}
              >
                {provinces.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="filter-select">
              <label className="sr-only" htmlFor="events-sort">เรียงลำดับ</label>
              <SlidersHorizontal size={17} aria-hidden="true" />
              <select id="events-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className={`filter-saved ${savedOnly ? 'is-active' : ''}`}
              onClick={() => updateParams({ saved: savedOnly ? '' : '1' })}
              aria-pressed={savedOnly}
            >
              <Heart size={17} aria-hidden="true" fill={savedOnly ? 'currentColor' : 'none'} />
              บันทึกไว้ {favorites.length > 0 && `(${favorites.length})`}
            </button>
          </div>

          <div className="filter-chips">
            <CategoryChips
              value={category}
              onChange={(value) => updateParams({ cat: value })}
            />
          </div>

          <div className="results-bar">
            <p role="status">
              พบ <strong>{filtered.length}</strong> งาน
              {query && <> สำหรับ &ldquo;{query}&rdquo;</>}
              {savedOnly && ' ในรายการที่บันทึกไว้'}
            </p>
            {hasFilters && (
              <button type="button" className="results-bar__clear" onClick={clearFilters}>
                <X size={14} aria-hidden="true" /> ล้างตัวกรอง
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="event-grid">
              {filtered.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon"><Search size={26} aria-hidden="true" /></span>
              <h2>ยังไม่พบงานที่ตรงกับเงื่อนไข</h2>
              <p>ลองเปลี่ยนหมวดหมู่ จังหวัด หรือล้างตัวกรองเพื่อดูงานทั้งหมด</p>
              <button type="button" className="btn btn--primary" onClick={clearFilters}>
                ดูงานทั้งหมด <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
