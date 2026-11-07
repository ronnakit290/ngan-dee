import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  MessageSquare,
  Plus,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { useWorkspace } from '../../context/WorkspaceContext'
import { chartSeries, activities } from '../../data/dashboard'
import { firstNameOf, thaiDateLong, thaiNumber } from '../../lib/format'
import { asset } from '../../lib/asset'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'สวัสดีตอนเช้า'
  if (hour < 17) return 'สวัสดีตอนบ่าย'
  return 'สวัสดีตอนเย็น'
}

function smoothPath(points) {
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`
    const previous = points[index - 1]
    const controlX = (previous.x + point.x) / 2
    return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`
  }, '')
}

function AreaChart({ values }) {
  const gradientId = useId().replace(/:/g, '')
  const width = 600
  const height = 210
  const padX = 14
  const padY = 22
  const max = Math.max(...values) * 1.06
  const min = Math.min(...values) * 0.9
  const span = max - min || 1
  const points = values.map((value, index) => ({
    x: padX + (index / Math.max(values.length - 1, 1)) * (width - padX * 2),
    y: height - padY - ((value - min) / span) * (height - padY * 2),
  }))
  const line = smoothPath(points)
  const area = `${line} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`
  const last = points[points.length - 1]

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`กราฟผู้เข้าชม ${values.length} ช่วงข้อมูล`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b48d6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1b48d6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
        <line
          key={ratio}
          x1="0"
          x2={width}
          y1={height * ratio}
          y2={height * ratio}
          stroke="#e5e8f0"
          strokeWidth="1"
          strokeDasharray="4 6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke="#1b48d6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={last.x}
        x2={last.x}
        y1={last.y}
        y2={height}
        stroke="#1b48d6"
        strokeOpacity="0.25"
        strokeDasharray="4 5"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last.x} cy={last.y} r="5" fill="#fff" stroke="#1b48d6" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      <circle cx={last.x} cy={last.y} r="2" fill="#d32f2f" />
    </svg>
  )
}

function StatCard({ icon: Icon, label, value, meta, tone = 'blue', trend }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <span className="stat-card__icon">
          <Icon size={20} aria-hidden="true" />
        </span>
        {trend ? (
          <span className="stat-card__trend">
            <TrendingUp size={13} aria-hidden="true" /> {trend}
          </span>
        ) : null}
      </div>
      <p className="stat-card__label">{label}</p>
      <strong className="stat-card__value">{value}</strong>
      <p className="stat-card__meta">{meta}</p>
    </article>
  )
}

export default function DashboardHome() {
  const { user } = useAuth()
  const { events, spaces, inquiries } = useWorkspace()
  const [range, setRange] = useState('7d')
  const series = chartSeries[range]

  const totalViews = [...events, ...spaces].reduce((sum, item) => sum + item.views, 0)
  const publishedEvents = events.filter((item) => item.status === 'published').length
  const newInquiries = inquiries.filter((item) => item.status === 'new').length
  const upcoming = events.filter((item) => item.status !== 'draft').slice(0, 3)
  const recentInquiries = inquiries.slice(0, 4)

  return (
    <div className="dash-page">
      <div className="dash-head">
        <div>
          <p className="eyebrow eyebrow--red">ภาพรวม Workspace</p>
          <h1>{greeting()}, {firstNameOf(user?.name)}</h1>
          <p className="dash-head__sub">
            {thaiDateLong()} · นี่คือภาพรวมงานและพื้นที่ของคุณในสัปดาห์นี้
          </p>
        </div>
        <div className="dash-head__actions">
          <Link to="/" className="btn btn--outline btn--sm">
            <ArrowUpRight size={16} aria-hidden="true" /> ดูหน้าสาธารณะ
          </Link>
          <Link to="/post" className="btn btn--primary btn--sm">
            <Plus size={17} aria-hidden="true" /> ลงประกาศใหม่
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={Eye}
          label="ผู้เข้าชมประกาศ"
          value={thaiNumber(totalViews)}
          meta="จากงานและพื้นที่ทั้งหมด"
          tone="blue"
          trend="+18.2%"
        />
        <StatCard
          icon={MessageSquare}
          label="ข้อความสอบถาม"
          value={thaiNumber(inquiries.length)}
          meta={`${newInquiries} รายการใหม่รอตอบกลับ`}
          tone="red"
        />
        <StatCard
          icon={CalendarDays}
          label="ประกาศที่เผยแพร่"
          value={thaiNumber(publishedEvents)}
          meta={`จากทั้งหมด ${events.length} รายการ`}
          tone="green"
        />
        <StatCard
          icon={Wallet}
          label="รายได้ประมาณการ"
          value="฿128,500"
          meta="จากบูธและพื้นที่ที่ปิดดีล"
          tone="amber"
          trend="+12.5%"
        />
      </div>

      <div className="dash-grid dash-grid--chart">
        <section className="panel chart-panel" aria-labelledby="chart-title">
          <div className="panel__head">
            <div>
              <h2 id="chart-title">ภาพรวมผู้เข้าชม</h2>
              <p>ยอดดูประกาศงานและพื้นที่ของคุณ</p>
            </div>
            <div className="chart-tabs" role="group" aria-label="ช่วงเวลาของกราฟ">
              {Object.entries(chartSeries).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  className={range === key ? 'is-active' : ''}
                  onClick={() => setRange(key)}
                  aria-pressed={range === key}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-summary">
            <strong>{series.total}</strong>
            <span className="chart-summary__delta">
              <TrendingUp size={14} aria-hidden="true" /> {series.delta} เทียบช่วงก่อนหน้า
            </span>
          </div>

          <AreaChart values={series.values} />

          <div className="chart-labels">
            {series.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </section>

        <section className="panel quick-panel" aria-labelledby="quick-title">
          <div className="panel__head">
            <div>
              <h2 id="quick-title">ทางลัด</h2>
              <p>จัดการงานของคุณได้เร็วขึ้น</p>
            </div>
          </div>

          <div className="quick-links">
            <Link to="/post">
              <span className="quick-links__icon quick-links__icon--red">
                <Plus size={17} aria-hidden="true" />
              </span>
              <span>ลงประกาศงานใหม่</span>
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/post?tab=space">
              <span className="quick-links__icon quick-links__icon--blue">
                <Building2 size={17} aria-hidden="true" />
              </span>
              <span>เพิ่มพื้นที่ / บูธ</span>
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/dashboard/inquiries">
              <span className="quick-links__icon quick-links__icon--amber">
                <MessageSquare size={17} aria-hidden="true" />
              </span>
              <span>ข้อความใหม่</span>
              <span className="quick-links__count">{newInquiries}</span>
            </Link>
          </div>

          <div className="upgrade-card">
            <span className="upgrade-card__icon"><Sparkles size={18} aria-hidden="true" /></span>
            <h3>อัปเกรดเป็นโปร</h3>
            <p>ปลดล็อกประกาศไม่จำกัด สถิติเชิงลึก และป้ายยืนยันผู้จัดงาน</p>
            <Link to="/pricing" className="upgrade-card__link">
              ดูแพ็กเกจทั้งหมด <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>

      <div className="dash-grid dash-grid--two">
        <section className="panel" aria-labelledby="recent-inq-title">
          <div className="panel__head">
            <div>
              <h2 id="recent-inq-title">ข้อความล่าสุด</h2>
              <p>ผู้สนใจงานและพื้นที่ของคุณ</p>
            </div>
            <Link to="/dashboard/inquiries" className="panel__link">
              ดูทั้งหมด <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mini-inq-list">
            {recentInquiries.map((item) => (
              <Link
                key={item.id}
                to={`/dashboard/inquiries?open=${item.id}`}
                className="mini-inq"
              >
                <span className="mini-inq__avatar" aria-hidden="true">{item.initials}</span>
                <span className="mini-inq__main">
                  <strong>{item.name}</strong>
                  <span>{item.item}</span>
                </span>
                <StatusBadge status={item.status} />
                <time>{item.date}</time>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel" aria-labelledby="upcoming-title">
          <div className="panel__head">
            <div>
              <h2 id="upcoming-title">งานที่กำลังจะมาถึง</h2>
              <p>ประกาศที่เผยแพร่และรอตรวจ</p>
            </div>
            <Link to="/dashboard/events" className="panel__link">
              จัดการ <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="up-event-list">
            {upcoming.map((event) => (
              <Link key={event.id} to="/dashboard/events" className="up-event">
                <img src={asset(event.image)} alt="" width="56" height="56" loading="lazy" />
                <span className="up-event__main">
                  <strong>{event.title}</strong>
                  <span><CalendarDays size={13} aria-hidden="true" /> {event.dateLabel}</span>
                </span>
                <StatusBadge status={event.status} />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="dash-grid dash-grid--two">
        <section className="panel" aria-labelledby="activity-title">
          <div className="panel__head">
            <div>
              <h2 id="activity-title">กิจกรรมล่าสุด</h2>
              <p>ความเคลื่อนไหวใน Workspace ของคุณ</p>
            </div>
          </div>
          <ol className="activity-list">
            {activities.map((item) => (
              <li key={item.id}>
                <span className={`activity-list__dot activity-list__dot--${item.tone}`} aria-hidden="true" />
                <div>
                  <p>{item.text}</p>
                  <time><Clock size={12} aria-hidden="true" /> {item.time}</time>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel tips-panel" aria-labelledby="tips-title">
          <span className="tips-panel__icon"><CheckCircle2 size={20} aria-hidden="true" /></span>
          <h2 id="tips-title">เพิ่มยอดเข้าชมประกาศ</h2>
          <p>ประกาศที่มีรูปคุณภาพและข้อมูลครบมีผู้สอบถามมากกว่าถึง 2 เท่า</p>
          <ul>
            <li>ใส่รูปแนวนอน 1600×900 px</li>
            <li>ระบุไฮไลต์และราคาให้ชัดเจน</li>
            <li>ตอบกลับภายใน 1 วันทำการ</li>
          </ul>
          <Link to="/help" className="panel__link">
            ดูคำแนะนำทั้งหมด <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </section>
      </div>

      <p className="dash-page__note">
        ข้อมูลในแดชบอร์ดนี้เป็นข้อมูลจำลองเพื่อการสาธิต — การเปลี่ยนแปลงจะถูกเก็บไว้ในเบราว์เซอร์ของคุณ
      </p>
    </div>
  )
}
