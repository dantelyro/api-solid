import { type Gym } from '@prisma/client'
import { type GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CretateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor (private readonly gymRepository: GymsRepository) {}

  async execute ({ description, latitude, longitude, phone, title }: CreateGymServiceRequest): Promise<CretateGymServiceResponse> {
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
