import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '◎' },
  { to: '/teams', label: 'Teams', icon: '◌' },
  { to: '/users', label: 'Members', icon: '◉' },
  { to: '/workouts', label: 'Workouts', icon: '✦' },
]

function Home() {
  return <section className="home-panel"><p className="eyebrow">Welcome back, athlete</p><h1>Small steps.<br /><em>Strong habits.</em></h1><p className="home-copy">Track the work, find your pace, and keep moving with your team.</p><NavLink className="primary-action" to="/activities">Open activity log <span>→</span></NavLink><div className="home-rule"><span>Octofit tracker</span><span>Consistency compounds</span></div></section>
}

function App() {
  return <div className="app-shell"><header className="topbar"><NavLink className="brand" to="/"><img src={logo} alt="Octofit" /><span>octofit<span className="brand-dot">.</span></span></NavLink><nav className="main-nav" aria-label="Main navigation">{navigation.map((item) => <NavLink key={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.to}><span>{item.icon}</span>{item.label}</NavLink>)}</nav><span className="status-pill"><span className="status-dot" />Live</span></header><main><Routes><Route path="/" element={<Home />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><footer><span>OCTOFIT / 2026</span><span>Move with intention.</span></footer></div>
}

export default App