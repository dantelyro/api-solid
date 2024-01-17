import { PrismaUserRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { RegisterService } from '../register'

export function makeRegisterService (): RegisterService {
  const userRepository = new PrismaUserRepository()
  const registerService = new RegisterService(userRepository)

  return registerService
}
