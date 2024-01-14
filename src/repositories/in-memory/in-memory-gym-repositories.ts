import { Prisma, type Gym } from '@prisma/client'
import { type GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById (id: string): Promise<Gym | null> {
    const gym = this.items.find(gym => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create (data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Prisma.Decimal(String(data.latitude)),
      longitude: new Prisma.Decimal(String(data.longitude)),
      phone: data.phone ?? null,
      title: data.title
    }

    this.items.push(gym)

    return gym
  }

  async findMany (query: string, page: number): Promise<Gym[]> {
    const gyms = this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, 40)

    return gyms
  }
}
