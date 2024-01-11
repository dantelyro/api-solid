import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-Ins-repositories'
import { type GymsRepository } from '@/repositories/gyms-repository'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude?: number
  userLongitude?: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor (
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) {}

  async execute ({ gymId, userId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }
  }
}
