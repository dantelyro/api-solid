import { PrismaGymRepository } from '@/repositories/prisma-repositories/prisma-gym-repository'
import { SearchGymsService } from '../search-gyms'

export function makeSearchGymService (): SearchGymsService {
  const gymRepository = new PrismaGymRepository()
  const service = new SearchGymsService(gymRepository)

  return service
}
