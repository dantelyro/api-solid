import { PrismaCheckInRepository } from '@/repositories/prisma-repositories/prisma-check-in-repository'
import { UsersCheckInsHystoryService } from '../get-users-check-ins-hystory'

export function makeUsersCheckInHistotyService (): UsersCheckInsHystoryService {
  const checkInRepository = new PrismaCheckInRepository()
  const service = new UsersCheckInsHystoryService(checkInRepository)

  return service
}
