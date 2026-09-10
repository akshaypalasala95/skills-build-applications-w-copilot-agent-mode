import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { getCollection(workoutsEndpoint).then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your next session</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div><ResourceState {...state}><div className="card-grid workout-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id}><div className="workout-meta"><span className="level-tag">{workout.fitnessLevel}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><span className="muted-label capitalize">{workout.activityType}</span></article>)}</div></ResourceState></section>
}