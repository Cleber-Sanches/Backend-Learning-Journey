import express from 'express'
import { createCourse } from './routes/routes'

const app = express()

app.get('/', createCourse, (request, response) => {
  return response.json({ message: 'Hello World' })
})

app.listen(3333)
