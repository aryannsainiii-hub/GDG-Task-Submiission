import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import EmptyState from './components/EmptyState'
import Home from './pages/Home'
import Post from './pages/Post'
import Editor from './pages/Editor'

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/new" element={<Editor />} />
          <Route path="/edit/:id" element={<Editor />} />
          <Route
            path="*"
            element={
              <EmptyState title="Page not found" text="The page you're looking for doesn't exist.">
                <Link className="btn" to="/">Back to all posts</Link>
              </EmptyState>
            }
          />
        </Routes>
      </main>
      <footer className="footer">Fieldnotes - a small blog, saved in your browser.</footer>
    </>
  )
}
