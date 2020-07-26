import express, { Application, Request, Response } from 'express'

const server: Application = express()
const PORT = 3333

server.get('/', (req: Request, res: Response) => {
  const environment = process.env.NODE_ENV
  res.json({ working: true, environment })
})

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
