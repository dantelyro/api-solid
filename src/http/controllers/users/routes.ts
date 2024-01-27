import { type FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { jwtVerify } from '../../middlewares/verify-jwt'

export async function userRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.post('/me', { onRequest: [jwtVerify] }, profile)
}
