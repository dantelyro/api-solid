import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { GymService } from './create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: GymService

beforeEach(() => {
  inMemoryGymsRepository = new InMemoryGymsRepository()
  sut = new GymService(inMemoryGymsRepository)
})

describe('gyms registration', () => {
  it('should be able to create a gym', async () => {
    const test = await sut.execute({
      description: 'TypesScript Gym',
      latitude: -29.3879481,
      longitude: -51.1230879,
      phone: '',
      title: ''
    })

    expect(test).toBeDefined()
  })
})
