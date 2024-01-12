import { type Prisma, type User } from '@prisma/client'
import { type UserRepository } from '../user-repositories'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async findById (id: string): Promise<User | null> {
    const user = this.items.find(user => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create (data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      email: data.email,
      name: 'user-1',
      password_hash: data.password_hash,
      created_at: new Date(),
      id: randomUUID()
    }

    this.items.push(user)

    return user
  }
}
