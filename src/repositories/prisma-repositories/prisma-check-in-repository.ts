import { type CheckIn, type Prisma } from '@prisma/client'
import { type CheckInsRepository } from '../check-Ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInsRepository {
  async create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }

  async update (data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    })

    return checkIn
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDate = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDate.toDate(),
          lte: endOfTheDate.toDate()
        }
      }
    })

    return checkIn
  }

  async findManyByUserId (userId: string, page: number): Promise<CheckIn[]> {
    const CheckIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return CheckIns
  }

  async findById (id: string): Promise<CheckIn | null> {
    const CheckIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return CheckIn
  }
}
