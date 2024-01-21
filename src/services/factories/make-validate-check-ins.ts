import { PrismaCheckInRepository } from '@/repositories/prisma-repositories/prisma-check-in-repository'
import { ValidateCheckInService } from '../validate-check-ins'

export function makeCheckIn (): any {
  const checkInRepository = new PrismaCheckInRepository()
  const service = new ValidateCheckInService(checkInRepository)

  return service
}
