import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { UsersCheckInsHystoryService } from './get-users-check-ins-hystory'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'

let sut: UsersCheckInsHystoryService
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

beforeEach(async () => {
  inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
  sut = new UsersCheckInsHystoryService(inMemoryCheckInsRepository)

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('fetch checkIn user history', () => {
  it('should be able to fetch check-ins history', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-2',
      user_id: 'user-1'
    })

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-1' }),
      expect.objectContaining({ gym_id: 'gym-2' })
    ])
  })

  it('should be able to fetch a paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-1'
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ])
  })
})
