import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerService: RegisterService

beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository()
  registerService = new RegisterService(inMemoryUsersRepository)
})

describe('users registration', () => {
  it('should hash password upon registration', async () => {
    const user = await registerService.createNewUser({
      email: 'gabriel@gmail.com',
      name: 'gabriel',
      password: '1234567'
    })

    const test = await compare('1234567', user.password_hash)

    expect(test).toBe(true)
  })

  it('should throw an erro if email already exists', async () => {
    const email = 'gabriel@gmail.com'

    await registerService.createNewUser({
      email,
      name: 'gabriel',
      password: '1234567'
    })

    expect(async () => await registerService.createNewUser({
      email,
      name: 'gabriel',
      password: '1234567'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
