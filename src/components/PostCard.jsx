import { Link } from 'react-router-dom'
import { LikeButton, SaveButton } from './ActionButtons'
import { excerpt, formatDate, readTime } from '../utils'

export default function PostCard({ post }) {
  return (
    <article className="card">
      <span className="tag">{post.category}</span>
      <h2 className="card-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="card-text">{excerpt(post.body)}</p>
      <p className="meta">
        {post.author}, {formatDate(post.date)}, {readTime(post.body)} min read
      </p>
      <div className="card-actions">
        <LikeButton id={post.id} count={post.likes} />
        <SaveButton id={post.id} />
        <span className="meta">{post.comments.length} comments</span>
      </div>
    </article>
  )
}
