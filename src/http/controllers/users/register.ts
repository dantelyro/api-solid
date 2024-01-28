import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    await registerService.createNewUser({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({ message: error.message })
    }
  }

  return await reply.status(201).send()
}
