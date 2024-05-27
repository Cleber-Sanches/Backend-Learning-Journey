import { type Request, type Response } from 'express'
import CreateCourseServicie from '../services/CreateCourseServicie'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createCourse (request: Request, response: Response) {
  CreateCourseServicie.execute({
    name: 'NodeJS',
    educator: 'Rafael'
  })

  return response.send()
}
