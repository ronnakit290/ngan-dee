import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { seedEvents, seedInquiries, seedSpaces } from '../data/dashboard'

const STORAGE_KEY = 'ngan-dee:workspace'
const WorkspaceContext = createContext(null)

const seed = () => ({
  events: seedEvents.map((item) => ({ ...item })),
  spaces: seedSpaces.map((item) => ({ ...item })),
  inquiries: seedInquiries.map((item) => ({ ...item })),
})

function readWorkspace() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seed()
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.events) || !Array.isArray(parsed.spaces) || !Array.isArray(parsed.inquiries)) {
      return seed()
    }
    return parsed
  } catch {
    return seed()
  }
}

export function WorkspaceProvider({ children }) {
  const [workspace, setWorkspace] = useState(readWorkspace)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace))
    } catch {
      // Workspace still works for the session when storage is unavailable.
    }
  }, [workspace])

  const toggleEventStatus = useCallback((id) => {
    setWorkspace((current) => ({
      ...current,
      events: current.events.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'published' ? 'draft' : 'published' }
          : item,
      ),
    }))
  }, [])

  const deleteEvent = useCallback((id) => {
    setWorkspace((current) => ({
      ...current,
      events: current.events.filter((item) => item.id !== id),
    }))
  }, [])

  const toggleSpaceStatus = useCallback((id) => {
    setWorkspace((current) => ({
      ...current,
      spaces: current.spaces.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'published' ? 'draft' : 'published' }
          : item,
      ),
    }))
  }, [])

  const deleteSpace = useCallback((id) => {
    setWorkspace((current) => ({
      ...current,
      spaces: current.spaces.filter((item) => item.id !== id),
    }))
  }, [])

  const updateInquiryStatus = useCallback((id, status) => {
    setWorkspace((current) => ({
      ...current,
      inquiries: current.inquiries.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    }))
  }, [])

  const resetWorkspace = useCallback(() => {
    setWorkspace(seed())
  }, [])

  const value = useMemo(
    () => ({
      ...workspace,
      toggleEventStatus,
      deleteEvent,
      toggleSpaceStatus,
      deleteSpace,
      updateInquiryStatus,
      resetWorkspace,
    }),
    [
      workspace,
      toggleEventStatus,
      deleteEvent,
      toggleSpaceStatus,
      deleteSpace,
      updateInquiryStatus,
      resetWorkspace,
    ],
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) throw new Error('useWorkspace must be used inside WorkspaceProvider')
  return context
}
