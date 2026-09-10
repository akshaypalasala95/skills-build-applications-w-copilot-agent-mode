const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function getCollection(resourceOrEndpoint) {
  const endpoint = resourceOrEndpoint.startsWith('http')
    ? resourceOrEndpoint
    : `${apiBaseUrl}/api/${resourceOrEndpoint}/`
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Could not load ${resourceOrEndpoint}.`)
  return getItems(await response.json())
}