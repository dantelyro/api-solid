import { PrismaGymRepository } from '@/repositories/prisma-repositories/prisma-gym-repository'
import { NearbyGymService } from '../get-nearby-gyms'

export function makeCheckIn (): any {
  const gymRepository = new PrismaGymRepository()
  const service = new NearbyGymService(gymRepository)

  return service
}
