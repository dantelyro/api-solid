import { hash } from 'bcryptjs'
import { type User } from '@prisma/client'
import { type UserRepository } from '@/repositories/user-repositories'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface user {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor (private readonly userRepository: UserRepository) {}

  async createNewUser ({ name, email, password }: user): Promise<User> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash
    })

    return user
  }
}
