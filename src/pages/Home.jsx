import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import PostCard from '../components/PostCard'
import EmptyState from '../components/EmptyState'

export default function Home() {
  const { posts, saved } = useStore()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')
  const [onlySaved, setOnlySaved] = useState(false)

  const categories = ['All', ...new Set(posts.map((p) => p.category))]
  const activeCategory = categories.includes(category) ? category : 'All'

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return posts
      .filter((p) => activeCategory === 'All' || p.category === activeCategory)
      .filter((p) => !onlySaved || saved.includes(p.id))
      .filter((p) => !term || `${p.title} ${p.body} ${p.author}`.toLowerCase().includes(term))
      .sort((a, b) => (sort === 'liked' ? b.likes - a.likes : new Date(b.date) - new Date(a.date)))
  }, [posts, saved, query, activeCategory, sort, onlySaved])

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
    setOnlySaved(false)
  }

  return (
    <>
      <section className="intro">
        <h1>Notes on code, design and everyday work</h1>
        <p>Read what others have written, or add your own post.</p>
      </section>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by title, author or text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search posts"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort posts">
          <option value="newest">Newest first</option>
          <option value="liked">Most liked</option>
        </select>
      </div>

      <div className="filters">
        {categories.map((c) => (
          <button key={c} className={`filter ${c === activeCategory ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
        <button className={`filter ${onlySaved ? 'active' : ''}`} onClick={() => setOnlySaved(!onlySaved)}>
          Bookmarked ({saved.length})
        </button>
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No posts found"
          text={posts.length === 0 ? "There aren't any posts yet." : 'Nothing matches your search or filters.'}
        >
          {posts.length === 0 ? (
            <Link className="btn" to="/new">Write the first post</Link>
          ) : (
            <button className="btn" onClick={clearFilters}>Clear filters</button>
          )}
        </EmptyState>
      ) : (
        <div className="grid">
          {results.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </>
  )
}
