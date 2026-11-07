import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Building2, MapPin, Search, X } from 'lucide-react'
import SpaceCard from '../components/SpaceCard'
import { spaceProvinces, spaces, spaceTypes } from '../data/spaces'

export default function Spaces() {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('mode') === 'sell' ? 'sell' : 'rent'
  const type = searchParams.get('type') || 'ทั้งหมด'
  const province = searchParams.get('province') || 'ทุกจังหวัด'
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)

  function updateParams(patch) {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      const fallback = key === 'mode' ? 'rent' : key === 'type' ? 'ทั้งหมด' : 'ทุกจังหวัด'
      if (!value || value === fallback) next.delete(key)
      else next.set(key, value)
    })
    setSearchParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return spaces.filter((space) => {
      if (space.mode !== mode) return false
      if (type !== 'ทั้งหมด' && space.type !== type) return false
      if (province !== 'ทุกจังหวัด' && space.province !== province) return false
      if (!needle) return true
      return [space.name, space.district, space.province, space.type, space.tagline]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [mode, type, province, query])

  const hasFilters = type !== 'ทั้งหมด' || province !== 'ทุกจังหวัด' || Boolean(query)

  return (
    <>
      <section className="page-head page-head--spaces">
        <div className="container page-head__inner">
          <div>
            <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
              <Link to="/">หน้าหลัก</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">พื้นที่และบูธ</span>
            </nav>
            <p className="eyebrow eyebrow--blue">SPACE MARKETPLACE</p>
            <h1>พื้นที่และบูธ<br />ให้เช่าหรือซื้อขาย</h1>
            <p className="page-head__lead">
              ฮอลล์สีขาว สตูดิโอ ลานกลางแจ้ง และบูธคุณภาพ
              พร้อมข้อมูลครบถ้วนก่อนตัดสินใจ
            </p>
          </div>
          <div className="page-head__aside page-head__aside--light">
            <Building2 size={22} aria-hidden="true" />
            <p><strong>{spaces.length}</strong> พื้นที่ในระบบ</p>
            <p><strong>45</strong> จังหวัด</p>
            <Link to="/post?tab=space" className="link-arrow">
              ลงประกาศพื้นที่ <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="space-toolbar">
            <div className="segmented segmented--lg" role="group" aria-label="เลือกประเภทการประกาศ">
              <button
                type="button"
                className={mode === 'rent' ? 'is-active' : ''}
                onClick={() => updateParams({ mode: 'rent' })}
                aria-pressed={mode === 'rent'}
              >
                ให้เช่า
              </button>
              <button
                type="button"
                className={mode === 'sell' ? 'is-active' : ''}
                onClick={() => updateParams({ mode: 'sell' })}
                aria-pressed={mode === 'sell'}
              >
                ซื้อขาย
              </button>
            </div>

            <form
              className="filter-search filter-search--space"
              role="search"
              onSubmit={(event) => {
                event.preventDefault()
                updateParams({ q: searchInput.trim() })
              }}
            >
              <label className="sr-only" htmlFor="spaces-search">ค้นหาพื้นที่</label>
              <Search size={18} aria-hidden="true" />
              <input
                id="spaces-search"
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="ค้นหาชื่อพื้นที่ ทำเล หรือประเภท"
              />
              {searchInput && (
                <button
                  type="button"
                  className="filter-search__clear"
                  onClick={() => { setSearchInput(''); updateParams({ q: '' }) }}
                  aria-label="ล้างคำค้นหา"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </form>

            <div className="filter-select">
              <label className="sr-only" htmlFor="spaces-province">จังหวัด</label>
              <MapPin size={17} aria-hidden="true" />
              <select
                id="spaces-province"
                value={province}
                onChange={(event) => updateParams({ province: event.target.value })}
              >
                {spaceProvinces.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="chips space-type-chips">
            {spaceTypes.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${type === item ? 'is-active' : ''}`}
                onClick={() => updateParams({ type: item })}
                aria-pressed={type === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="results-bar">
            <p role="status">
              พบ <strong>{filtered.length}</strong> พื้นที่{mode === 'rent' ? 'ให้เช่า' : 'สำหรับซื้อขาย'}
              {query && <> สำหรับ &ldquo;{query}&rdquo;</>}
            </p>
            {hasFilters && (
              <button
                type="button"
                className="results-bar__clear"
                onClick={() => {
                  setSearchInput('')
                  setSearchParams(new URLSearchParams({ mode: mode === 'sell' ? 'sell' : '' }), { replace: true })
                }}
              >
                <X size={14} aria-hidden="true" /> ล้างตัวกรอง
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="space-grid space-grid--thirds">
              {filtered.map((space) => (
                <SpaceCard key={space.slug} space={space} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon"><Search size={26} aria-hidden="true" /></span>
              <h2>ยังไม่พบพื้นที่ที่ตรงกับเงื่อนไข</h2>
              <p>ลองเปลี่ยนประเภท ทำเล หรือสลับระหว่าง &ldquo;ให้เช่า&rdquo; กับ &ldquo;ซื้อขาย&rdquo;</p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => { setSearchInput(''); setSearchParams(new URLSearchParams(), { replace: true }) }}
              >
                ดูพื้นที่ทั้งหมด <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}

          <div className="list-cta">
            <div>
              <p className="eyebrow eyebrow--red">มีพื้นที่ว่าง?</p>
              <h2>ปล่อยเช่าหรือขายพื้นที่ของคุณกับงานดี</h2>
              <p>ลงประกาศฟรี เข้าถึงผู้จัดงานกว่า 4,000 รายทั่วประเทศ</p>
            </div>
            <Link to="/post?tab=space" className="btn btn--primary">
              ลงประกาศพื้นที่ <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
