import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import { CATEGORIES } from '../data'
import EmptyState from '../components/EmptyState'

// One form for both creating a new post and editing an existing one
export default function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { posts, addPost, updatePost } = useStore()
  const existing = id ? posts.find((p) => p.id === id) : null

  const [form, setForm] = useState({
    title: existing?.title ?? '',
    author: existing?.author ?? '',
    category: existing?.category ?? CATEGORIES[0],
    body: existing?.body ?? '',
  })
  const [errors, setErrors] = useState({})

  if (id && !existing) {
    return (
      <EmptyState title="Post not available" text="We couldn't find the post you want to edit.">
        <Link className="btn" to="/">Back to all posts</Link>
      </EmptyState>
    )
  }

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const found = {}
    if (form.title.trim().length < 5) found.title = 'Title should be at least 5 characters.'
    if (form.body.trim().split(/\s+/).length < 20) found.body = 'Write at least 20 words.'
    return found
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) return

    const data = {
      title: form.title.trim(),
      author: form.author.trim() || 'Anonymous',
      category: form.category,
      body: form.body.trim(),
    }
    let postId = id
    if (existing) updatePost(existing.id, data)
    else postId = addPost(data)
    navigate(`/post/${postId}`)
  }

  return (
    <div className="article">
      <h1>{existing ? 'Edit post' : 'Write a post'}</h1>
      <form onSubmit={handleSubmit} className="form" noValidate>
        <label>
          Title
          <input value={form.title} onChange={set('title')} />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>
        <div className="row">
          <label>
            Author
            <input value={form.author} onChange={set('author')} placeholder="Anonymous" />
          </label>
          <label>
            Category
            <select value={form.category} onChange={set('category')}>
              {[...new Set([...CATEGORIES, form.category])].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <label>
          Content
          <textarea rows="12" value={form.body} onChange={set('body')} placeholder="Leave a blank line between paragraphs." />
          {errors.body && <span className="error">{errors.body}</span>}
        </label>
        <div className="row-actions">
          <button className="btn">{existing ? 'Save changes' : 'Publish'}</button>
          <Link className="btn btn-ghost" to={existing ? `/post/${existing.id}` : '/'}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}
