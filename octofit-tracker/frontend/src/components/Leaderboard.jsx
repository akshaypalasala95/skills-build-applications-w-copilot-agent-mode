import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getCollection(leaderboardEndpoint).then(setLeaders).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Team momentum</p><h1>Leaderboard</h1></div><span className="count-badge">{leaders.length} athletes</span></div><ResourceState {...state}><div className="leaderboard-list">{leaders.map((entry, index) => <article className="leader-row" key={entry.user?._id || entry._id}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><div className="leader-identity"><strong>{entry.user?.displayName || entry.user?.username || 'Unknown athlete'}</strong><span>{entry.activities || 0} activities</span></div><strong className="leader-points">{entry.points || 0}<small> pts</small></strong></article>)}</div></ResourceState></section>
}