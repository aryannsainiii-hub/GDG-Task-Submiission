import { useStore } from '../store'

// Like and bookmark buttons, shared by the post card and the post page
export function LikeButton({ id, count }) {
  const { liked, toggleLike } = useStore()
  const active = liked.includes(id)
  return (
    <button
      className={`chip-btn ${active ? 'active pop' : ''}`}
      onClick={() => toggleLike(id)}
      aria-pressed={active}
      aria-label={active ? 'Unlike post' : 'Like post'}
    >
      {active ? '♥' : '♡'} {count}
    </button>
  )
}

export function SaveButton({ id, label = false }) {
  const { saved, toggleSave } = useStore()
  const active = saved.includes(id)
  return (
    <button
      className={`chip-btn ${active ? 'active' : ''}`}
      onClick={() => toggleSave(id)}
      aria-pressed={active}
      aria-label={active ? 'Remove bookmark' : 'Bookmark post'}
    >
      {active ? '★' : '☆'}{label && (active ? ' Saved' : ' Save')}
    </button>
  )
}
