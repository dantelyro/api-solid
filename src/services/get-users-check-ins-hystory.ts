import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-Ins-repositories'

interface UsersCheckInsHystoryRequest {
  userId: string
  page: number
}

interface UsersCheckInsHystoryResponse {
  checkIns: CheckIn[]
}

export class UsersCheckInsHystoryService {
  constructor (private readonly checkInsRepository: CheckInsRepository) {}

  async execute ({ userId, page }: UsersCheckInsHystoryRequest): Promise<UsersCheckInsHystoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
