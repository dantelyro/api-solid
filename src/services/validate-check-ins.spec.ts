import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { ValidateCheckInService } from './validate-check-ins'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let sut: ValidateCheckInService
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

beforeEach(async () => {
  inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
  sut = new ValidateCheckInService(inMemoryCheckInsRepository)

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Validate checkIn Service', () => {
  it('should be able to validate the check in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(async () => await sut.execute({
      checkInId: 'inexistent-check-in'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    vi.setSystemTime(new Date(2024, 0, 1, 13, 40))

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(async () => await sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
