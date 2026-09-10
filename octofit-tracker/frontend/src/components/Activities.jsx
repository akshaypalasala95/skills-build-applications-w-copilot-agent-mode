import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getCollection('activities').then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div><span className="count-badge">{activities.length} logged</span></div>
      <ResourceState {...state}>
        <div className="table-wrap"><table><thead><tr><th>Member</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead><tbody>
          {activities.map((activity) => <tr key={activity._id}><td><strong>{activity.user?.displayName || activity.user?.username || 'Unknown member'}</strong></td><td className="capitalize">{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceKilometers ?? '-'} km</td><td><span className="points">+{activity.points}</span></td></tr>)}
        </tbody></table></div>
      </ResourceState>
    </section>
  )
}