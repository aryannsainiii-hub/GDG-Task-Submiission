import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import { LikeButton, SaveButton } from '../components/ActionButtons'
import EmptyState from '../components/EmptyState'
import { formatDate, readTime } from '../utils'

export default function Post() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { posts, deletePost, addComment } = useStore()
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const post = posts.find((p) => p.id === id)

  if (!post) {
    return (
      <EmptyState title="Post not available" text="This post may have been deleted or the link is wrong.">
        <Link className="btn" to="/">Back to all posts</Link>
      </EmptyState>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Delete this post? This cannot be undone.')) {
      deletePost(post.id)
      navigate('/')
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addComment(post.id, name.trim() || 'Anonymous', text.trim())
    setText('')
  }

  return (
    <article className="article">
      <Link to="/" className="back">&larr; All posts</Link>
      <span className="tag">{post.category}</span>
      <h1>{post.title}</h1>
      <p className="meta">
        {post.author}, {formatDate(post.date)}, {readTime(post.body)} min read
      </p>

      <div className="article-actions">
        <LikeButton id={post.id} count={post.likes} />
        <SaveButton id={post.id} label />
        <span className="spacer" />
        <Link className="btn btn-ghost btn-small" to={`/edit/${post.id}`}>Edit</Link>
        <button className="btn btn-danger btn-small" onClick={handleDelete}>Delete</button>
      </div>

      <div className="body">
        {post.body.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <section className="comments">
        <h2>Comments ({post.comments.length})</h2>
        {post.comments.length === 0 && <p className="meta">No comments yet. Be the first to reply.</p>}
        <ul>
          {post.comments.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong> <span className="meta">{formatDate(c.date)}</span>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleComment} className="form">
          <input placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" />
          <textarea placeholder="Write a comment" rows="3" value={text} onChange={(e) => setText(e.target.value)} aria-label="Comment" />
          <button className="btn" disabled={!text.trim()}>Post comment</button>
        </form>
      </section>
    </article>
  )
}
