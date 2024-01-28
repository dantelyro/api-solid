import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate (request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticate = makeAuthenticateService()

    const { user } = await authenticate.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      })

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          expiresIn: '7d',
          sub: user.id
        }
      })

    return await reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({
        token
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
