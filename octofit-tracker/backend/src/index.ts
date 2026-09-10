import express from 'express'
import { connectDatabase } from './config/database.js'
import apiRouter from './routes.js'

const app = express()
const port = Number(process.env.PORT || 8000)
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN || '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api', apiRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(400).json({ error: 'Request could not be completed' })
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`)
      console.log(`OctoFit Tracker API base URL: ${apiBaseUrl}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error)
    process.exitCode = 1
  })

export default app