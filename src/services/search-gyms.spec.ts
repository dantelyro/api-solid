import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchGymsService } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repositories'

let sut: SearchGymsService
let inMemoryGymsRepository: InMemoryGymsRepository

beforeEach(async () => {
  inMemoryGymsRepository = new InMemoryGymsRepository()
  sut = new SearchGymsService(inMemoryGymsRepository)

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('SearchGymsService', () => {
  it('should be able to seach for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'TypesScript Gym',
      description: '',
      latitude: -29.3879481,
      longitude: -51.1230879,
      phone: ''
    })

    await inMemoryGymsRepository.create({
      title: 'Javascript Gym',
      description: '',
      latitude: -29.3879481,
      longitude: -51.1230879,
      phone: ''
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' })
    ])
  })

  it.skip('should be able to fetch a paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: '',
        latitude: -29.3879481,
        longitude: -51.1230879,
        phone: ''
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' })
    ])
  })
})
