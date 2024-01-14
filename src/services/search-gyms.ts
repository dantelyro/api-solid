import { type Gym } from '@prisma/client'
import { type GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsServiceRequest {
  query: string
  page: number
}

interface SearchGymsServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor (private readonly gymRepository: GymsRepository) {}

  async execute ({ query, page }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
    const gyms = await this.gymRepository.findMany(query, page)

    return {
      gyms
    }
  }
}
