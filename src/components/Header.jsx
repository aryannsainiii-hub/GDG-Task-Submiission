import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../store'

export default function Header() {
  const { theme, toggleTheme } = useStore()
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">Fieldnotes</Link>
        <nav className="nav">
          <NavLink to="/" end>Posts</NavLink>
          <Link to="/new" className="btn btn-small">Write a post</Link>
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </nav>
      </div>
    </header>
  )
}
