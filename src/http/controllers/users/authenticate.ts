import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  let token

  try {
    const authenticate = makeAuthenticateService()

    const { user } = await authenticate.execute({
      email,
      password
    })

    token = await reply.jwtSign({}, { sign: { sub: user.id } })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(409).send({ message: error.message })
    }
  }

  return await reply.status(200).send({
    token
  })
}
