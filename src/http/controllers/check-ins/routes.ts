import { type FastifyInstance } from 'fastify'
import { jwtVerify } from '../../middlewares/verify-jwt'

export async function gymsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', jwtVerify)
}
