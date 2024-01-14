import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repositories'
import { MaxNumbersOfCheckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let sut: CheckInService
let inMemoryGymsRepository: InMemoryGymsRepository
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

beforeEach(async () => {
  inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
  inMemoryGymsRepository = new InMemoryGymsRepository()
  sut = new CheckInService(inMemoryCheckInsRepository, inMemoryGymsRepository)

  await inMemoryGymsRepository.create({
    id: 'gym-1',
    description: 'TypesScript Gym',
    latitude: -29.3879481,
    longitude: -51.1230879,
    phone: '',
    title: ''
  })

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('checkInService Service', () => {
  it('should be able to create a check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    await expect(async () => await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    expect(checkIn).toBeDefined()
  })

  it('should not be able to checkIn away from the gym', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-1',
      description: 'TypesScript Gym',
      latitude: -29.3879481,
      longitude: -51.1230879,
      phone: '',
      title: ''
    })

    await expect(async () => await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.4879481,
      userLongitude: -51.1230879
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
