import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateService

beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository()
  sut = new AuthenticateService(inMemoryUsersRepository)
})

describe('Authenticate Service', () => {
  it('should be able to authenticate', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const test = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(test).toBeDefined()
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(async () => await sut.execute({
      email: 'gabriel@gmail.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    expect(async () => await sut.execute({
      email: 'johndoe@example.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
