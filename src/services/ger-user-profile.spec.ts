import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './ger-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let getUserProfile: GetUserProfileService

beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository()
  getUserProfile = new GetUserProfileService(inMemoryUsersRepository)
})

describe('getUserProfile Service', () => {
  it('should be able to get User Profile', async () => {
    const newUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const test = await getUserProfile.execute({
      userId: newUser.id
    })

    expect(test).toBeDefined()
  })

  it('should not be able to get User Profile without id', async () => {
    expect(async () => await getUserProfile.execute({
      userId: 'non-existent-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
