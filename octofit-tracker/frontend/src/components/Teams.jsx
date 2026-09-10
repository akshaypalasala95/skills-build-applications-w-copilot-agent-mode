import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { getCollection(teamsEndpoint).then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div><ResourceState {...state}><div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}><div className="card-mark">{team.name?.slice(0, 1)}</div><h2>{team.name}</h2><p>{team.description || 'A team building better habits together.'}</p><span className="muted-label">{team.members?.length || 0} members</span></article>)}</div></ResourceState></section>
}