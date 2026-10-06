export const readTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export const excerpt = (text, max = 140) => {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? clean.slice(0, max).trimEnd() + '...' : clean
}

export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
