import { createContext, useContext, useEffect, useState } from 'react'
import { seed } from './data'
import { newId } from './utils'

const StoreContext = createContext(null)

// Reads a JSON value from localStorage, falling back if it's missing or corrupted
function load(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

// Keeps a piece of state in sync with localStorage
function usePersistedState(key, fallback) {
  const [value, setValue] = useState(() => load(key, fallback))
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or blocked - the app still works for this session */
    }
  }, [key, value])
  return [value, setValue]
}

export function StoreProvider({ children }) {
  const [posts, setPosts] = usePersistedState('fn-posts', seed)
  const [liked, setLiked] = usePersistedState('fn-liked', [])
  const [saved, setSaved] = usePersistedState('fn-saved', [])
  const [theme, setTheme] = usePersistedState(
    'fn-theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleIn = (setter, id) =>
    setter((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))

  const addPost = (data) => {
    const post = { ...data, id: newId(), date: new Date().toISOString().slice(0, 10), likes: 0, comments: [] }
    setPosts((list) => [post, ...list])
    return post.id
  }

  const updatePost = (id, data) =>
    setPosts((list) => list.map((p) => (p.id === id ? { ...p, ...data } : p)))

  const deletePost = (id) => {
    setPosts((list) => list.filter((p) => p.id !== id))
    setLiked((l) => l.filter((x) => x !== id))
    setSaved((l) => l.filter((x) => x !== id))
  }

  const toggleLike = (id) => {
    const delta = liked.includes(id) ? -1 : 1
    toggleIn(setLiked, id)
    setPosts((list) => list.map((p) => (p.id === id ? { ...p, likes: Math.max(0, p.likes + delta) } : p)))
  }

  const addComment = (id, name, text) => {
    const comment = { id: newId(), name, text, date: new Date().toISOString().slice(0, 10) }
    setPosts((list) => list.map((p) => (p.id === id ? { ...p, comments: [...p.comments, comment] } : p)))
  }

  const value = {
    posts, liked, saved, theme,
    addPost, updatePost, deletePost, addComment, toggleLike,
    toggleSave: (id) => toggleIn(setSaved, id),
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
