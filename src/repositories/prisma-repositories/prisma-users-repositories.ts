import { prisma } from '@/lib/prisma'
import { type User, type Prisma } from '@prisma/client'
import { type UserRepository } from '../user-repositories'

export class PrismaUserRepository implements UserRepository {
  async create ({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })
  }

  async findByEmail (email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async findById (id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}
