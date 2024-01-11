import { type Gym } from '@prisma/client'
import { type GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gym: Gym[] = []

  async findById (id: string): Promise<Gym | null> {
    const gym = this.gym.find(gyms => gyms.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
