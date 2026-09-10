import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { getCollection(usersEndpoint).then(setUsers).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">The community</p><h1>Members</h1></div><span className="count-badge">{users.length} members</span></div><ResourceState {...state}><div className="member-grid">{users.map((user) => <article className="member-card" key={user._id}><div className="avatar">{user.displayName?.slice(0, 1) || '?'}</div><div><h2>{user.displayName}</h2><p>@{user.username}</p><span className="level-tag">{user.fitnessLevel}</span></div></article>)}</div></ResourceState></section>
}