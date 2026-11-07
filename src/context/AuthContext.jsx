import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { demoAccount } from '../data/dashboard'

const SESSION_KEY = 'ngan-dee:auth:session'
const ACCOUNTS_KEY = 'ngan-dee:auth:accounts'
const AuthContext = createContext(null)

const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const seedAccounts = [demoAccount]

function readJson(storage, key, fallback) {
  try {
    const raw = storage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function readAccounts() {
  const accounts = readJson(window.localStorage, ACCOUNTS_KEY, null)
  if (!Array.isArray(accounts) || accounts.length === 0) return seedAccounts.map((account) => ({ ...account }))
  return accounts
}

function readSession() {
  const persistent = readJson(window.localStorage, SESSION_KEY, null)
  if (persistent) return persistent
  return readJson(window.sessionStorage, SESSION_KEY, null)
}

function writeJson(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable in private mode; auth still works for the session.
  }
}

const withoutPassword = ({ password, ...account }) => account

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem(SESSION_KEY)
      window.sessionStorage.removeItem(SESSION_KEY)
    }
  }, [user])

  const login = useCallback(async ({ email, password, remember = true }) => {
    await delay(650)
    const normalized = String(email).trim().toLowerCase()
    const accounts = readAccounts()
    const account = accounts.find((item) => item.email.toLowerCase() === normalized)
    if (!account || account.password !== password) {
      throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง')
    }
    const nextUser = withoutPassword(account)
    setUser(nextUser)
    if (remember) {
      writeJson(window.localStorage, SESSION_KEY, nextUser)
      window.sessionStorage.removeItem(SESSION_KEY)
    } else {
      writeJson(window.sessionStorage, SESSION_KEY, nextUser)
      window.localStorage.removeItem(SESSION_KEY)
    }
    return nextUser
  }, [])

  const register = useCallback(async ({ name, email, password, role }) => {
    await delay(750)
    const normalized = String(email).trim().toLowerCase()
    const accounts = readAccounts()
    if (accounts.some((item) => item.email.toLowerCase() === normalized)) {
      throw new Error('อีเมลนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบหรือใช้อีเมลอื่น')
    }
    const account = {
      id: `acc-${Date.now()}`,
      name: String(name).trim(),
      email: normalized,
      password,
      role,
      organization: '',
      phone: '',
      bio: '',
    }
    const nextAccounts = [...accounts, account]
    writeJson(window.localStorage, ACCOUNTS_KEY, nextAccounts)
    const nextUser = withoutPassword(account)
    setUser(nextUser)
    writeJson(window.localStorage, SESSION_KEY, nextUser)
    window.sessionStorage.removeItem(SESSION_KEY)
    return nextUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    window.localStorage.removeItem(SESSION_KEY)
    window.sessionStorage.removeItem(SESSION_KEY)
  }, [])

  const updateProfile = useCallback((patch) => {
    setUser((current) => {
      if (!current) return current
      const nextUser = { ...current, ...patch, email: current.email }
      writeJson(window.localStorage, SESSION_KEY, nextUser)
      const accounts = readAccounts()
      const nextAccounts = accounts.map((account) =>
        account.email.toLowerCase() === current.email.toLowerCase()
          ? { ...account, ...patch, email: account.email }
          : account,
      )
      writeJson(window.localStorage, ACCOUNTS_KEY, nextAccounts)
      return nextUser
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      updateProfile,
    }),
    [user, login, register, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
