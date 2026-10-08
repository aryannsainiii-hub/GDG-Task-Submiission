# Fieldnotes - Blog Management Platform

A frontend-only blog platform built with React. You can browse posts, read them, search and filter, write new posts, edit or delete them, like and bookmark posts, and leave comments.

**Live demo:** -  https://gdg-ten-beta.vercel.app/

## Features

- Browse posts as cards with category, author, date, reading time, likes and comment count
- Read a full post on its own page
- Search by title, author or text, filter by category, sort by newest or most liked
- Create, edit and delete posts (with form validation and a delete confirmation)
- Likes, bookmarks and comments
- Dark and light mode (follows the system setting by default, remembers your choice)
- Handles empty states: no search results, no posts, post not found, unknown page
- Responsive from phones to desktops
- Everything is saved in the browser, so changes survive a refresh

## Tech stack

- React 18 with hooks and Context
- React Router 6 (`HashRouter`, so refreshing works on any static host)
- Vite
- Plain CSS with CSS variables for theming

## Setup

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build in /dist
npm run preview   # preview the production build
```

## Data sourcee

There is no backend or external API. Six sample posts in `src/data.js` are loaded on the first visit and then stored in `localStorage`. To reset, clear the site data in your browser.

## Project structure

```
src/
  components/   Header, PostCard, like/bookmark buttons, EmptyState
  pages/        Home, Post, Editor (create and edit share one form)
  store.jsx     App state (posts, likes, bookmarks, theme) saved to localStorage
  data.js       Sample posts
  utils.js      Small helpers (reading time, date format)
```

## Challenges and how I solved them

- **No backend:** I kept all state in one Context provider and wrote a small `usePersistedState` hook that mirrors state to `localStorage`, with a safe fallback if the stored data is missing or broken.
- **Clickable cards with buttons inside:** Nesting buttons inside a link is invalid HTML. The title is the link and a CSS pseudo-element stretches it over the card, while the like and bookmark buttons sit above it.
- **One form for create and edit:** The `Editor` page reads the route param. If a post id is present it pre-fills the form, otherwise it starts empty.
- **Deploying a single page app:** Using `HashRouter` and `base: './'` means the build works on GitHub Pages, Netlify and Vercel without extra server rules.
- **Stale filters after deleting posts:** If the selected category disappears, the filter falls back to "All" instead of showing an empty page.

## Deploying

Run `npm run build` and upload the `dist` folder to Netlify, Vercel or GitHub Pages.
