import { PrismaGymRepository } from '@/repositories/prisma-repositories/prisma-gym-repository'
import { CreateGymService } from '../create-gym'

export function makeCreateGymService (): CreateGymService {
  const gymRepository = new PrismaGymRepository()
  const service = new CreateGymService(gymRepository)

  return service
}
