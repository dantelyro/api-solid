import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { NearbyGymService } from './get-nearby-gyms'

let sut: NearbyGymService
let inMemoryGymsRepository: InMemoryGymsRepository

beforeEach(async () => {
  inMemoryGymsRepository = new InMemoryGymsRepository()
  sut = new NearbyGymService(inMemoryGymsRepository)

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('NearbyGymService', () => {
  it('should be able to seach for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: '',
      latitude: -29.3879481,
      longitude: -51.1230879,
      phone: ''
    })

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: '',
      latitude: -29.364533,
      longitude: -51.2269268,
      phone: ''
    })

    const { gyms } = await sut.execute({
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' })
    ])
  })
})
