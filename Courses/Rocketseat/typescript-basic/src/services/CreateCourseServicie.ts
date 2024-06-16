/**
 * name = string
 *  duration = number
 * educator = string
 * */

interface ICourse {
  name: string
  duration?: number
  educator: string
}

class CreateCourseService {
  execute ({ name, duration = 8, educator }: ICourse): void {
    console.log(name, duration, educator)
  }
}

export default new CreateCourseService()
