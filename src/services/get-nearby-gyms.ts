import { type Gym } from '@prisma/client'
import { type GymsRepository } from '@/repositories/gyms-repository'

interface NearbyGymServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface NearbyGymServiceResponse {
  gyms: Gym[]
}

export class NearbyGymService {
  constructor (private readonly gymRepository: GymsRepository) {}

  async execute ({ userLatitude, userLongitude }: NearbyGymServiceRequest): Promise<NearbyGymServiceResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms
    }
  }
}
