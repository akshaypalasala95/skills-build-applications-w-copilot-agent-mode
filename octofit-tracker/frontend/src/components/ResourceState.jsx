export default function ResourceState({ loading, error, children }) {
  if (loading) return <p className="state-message">Loading data...</p>
  if (error) return <p className="state-message state-error">{error}</p>
  return children
}