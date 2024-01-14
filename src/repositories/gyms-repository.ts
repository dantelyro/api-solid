import { type Prisma, type Gym } from '@prisma/client'

export interface FindManyNearby {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearby): Promise<Gym[]>
}
