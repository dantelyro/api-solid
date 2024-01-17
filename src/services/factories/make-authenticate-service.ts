import { PrismaUserRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService (): AuthenticateService {
  const userRepository = new PrismaUserRepository()
  const authenticateService = new AuthenticateService(userRepository)

  return authenticateService
}
