import { PrismaCheckInRepository } from '@/repositories/prisma-repositories/prisma-check-in-repository'
import { PrismaGymRepository } from '@/repositories/prisma-repositories/prisma-gym-repository'
import { CheckInService } from '../check-in'

export function makeCheckIn (): any {
  const gymRepository = new PrismaGymRepository()
  const checkInRepository = new PrismaCheckInRepository()
  const service = new CheckInService(checkInRepository, gymRepository)

  return service
}
