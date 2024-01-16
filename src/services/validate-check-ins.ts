import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-Ins-repositories'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInServiceRequest {
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor (
    private readonly checkInsRepository: CheckInsRepository) {}

  async execute ({ checkInId }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff((checkIn.validated_at, 'minutes'))

    if (differenceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    this.checkInsRepository.update(checkIn)

    return {
      checkIn
    }
  }
}
