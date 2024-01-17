import { type CheckIn, type Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { type CheckInsRepository } from '../check-Ins-repository'
import dayjs from 'dayjs'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById (id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find(checkIn => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDate = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const isOnSameDate = checkInDate.isAfter(startOfTheDate) && checkInDate.isBefore(endOfTheDate)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

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

  async findManyByUserId (userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = this.items
      .filter((user) => user.user_id === userId)
      .slice((page - 1) * 20, 40)

    return checkIns
  }

  async update (checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
      return this.items[checkInIndex]
    }

    throw new ResourceNotFoundError()
  }
}
