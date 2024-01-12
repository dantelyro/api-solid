import { type Gym } from '@prisma/client'
import { type GymsRepository } from '@/repositories/gyms-repository'

interface GymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface GymServiceResponse {
  gym: Gym
}

export class GymService {
  constructor (private readonly gymRepository: GymsRepository) {}

  async execute ({ description, latitude, longitude, phone, title }: GymServiceRequest): Promise<GymServiceResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return {
      gym
    }
  }
}
