import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { CheckInService } from './check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let checkInService: CheckInService

beforeEach(() => {
  inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
  checkInService = new CheckInService(inMemoryCheckInsRepository)

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('checkInService Service', () => {
  it('should be able to create a check in', async () => {
    const { checkIn } = await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0, 0))

    await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })

    expect(async () => await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0, 0))

    await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0, 0))

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })

    expect(checkIn).toBeDefined()
  })
})
