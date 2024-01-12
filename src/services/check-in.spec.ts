import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repositories'
import { Decimal } from '@prisma/client/runtime/library'

let checkInService: CheckInService
let inMemoryGymsRepository: InMemoryGymsRepository
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

beforeEach(() => {
  inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
  inMemoryGymsRepository = new InMemoryGymsRepository()
  checkInService = new CheckInService(inMemoryCheckInsRepository, inMemoryGymsRepository)

  inMemoryGymsRepository.items.push({
    id: 'gym-1',
    description: '',
    latitude: new Decimal(-29.3879481),
    longitude: new Decimal(-51.1230879),
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
    const { checkIn } = await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0, 0))

    await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    await expect(async () => await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0, 0))

    await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0, 0))

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.3879481,
      userLongitude: -51.1230879
    })

    expect(checkIn).toBeDefined()
  })

  it('should not be able to checkIn away from the gym', async () => {
    inMemoryGymsRepository.items.push({
      id: 'gym-2',
      description: '',
      latitude: new Decimal(-29.3879481),
      longitude: new Decimal(-51.1230879),
      phone: '',
      title: ''
    })

    await expect(async () => await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -29.4879481,
      userLongitude: -51.1230879
    })).rejects.toBeInstanceOf(Error)
  })
})
