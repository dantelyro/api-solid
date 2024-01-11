import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error copy'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const registerService = makeAuthenticateService()
    await registerService.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(409).send({ message: error.message })
    }
  }

  return await reply.status(201).send()
}
