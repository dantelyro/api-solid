import { type CheckIn, type Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { type CheckInsRepository } from '../check-Ins-repositories'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | undefined> {
    const startOfTheDate = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const isOnSameDate = checkInDate.isAfter(startOfTheDate) && checkInDate.isBefore(endOfTheDate)

      console.log(isOnSameDate)

      return checkIn.user_id === userId && isOnSameDate
    })

    return checkInOnSameDate
  }

  async create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.items.push(checkIn)

    return checkIn
  }
}
