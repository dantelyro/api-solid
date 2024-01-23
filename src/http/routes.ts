import { type FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { jwtVerify } from './middlewares/verify-jwt'

export function appRoutes (app: FastifyInstance): void {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.post('/profile', { onRequest: [jwtVerify] }, profile)
}
