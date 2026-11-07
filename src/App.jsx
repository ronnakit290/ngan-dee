import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Spaces from './pages/Spaces'
import SpaceDetail from './pages/SpaceDetail'
import Post from './pages/Post'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Help from './pages/Help'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/Overview'
import MyEvents from './pages/dashboard/MyEvents'
import MySpaces from './pages/dashboard/MySpaces'
import Inquiries from './pages/dashboard/Inquiries'
import Favorites from './pages/dashboard/Favorites'
import Settings from './pages/dashboard/Settings'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const bare =
    pathname.startsWith('/dashboard') ||
    ['/login', '/register', '/forgot-password'].includes(pathname)

  return (
    <>
      <a className="skip-link" href="#main">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <ScrollToTop />
      {!bare && <Navbar />}
      <main id="main" className={bare ? 'main--bare' : undefined}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/spaces/:slug" element={<SpaceDetail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={(
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            )}
          >
            <Route index element={<DashboardHome />} />
            <Route path="events" element={<MyEvents />} />
            <Route path="spaces" element={<MySpaces />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!bare && <Footer />}
    </>
  )
}
