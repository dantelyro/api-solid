import { PrismaGymRepository } from '@/repositories/prisma-repositories/prisma-gym-repository'
import { CreateGymService } from '../create-gym'

export function makeCheckIn (): any {
  const gymRepository = new PrismaGymRepository()
  const service = new CreateGymService(gymRepository)

  return service
}
