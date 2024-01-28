import { type FastifyInstance } from 'fastify'
import { jwtVerify } from '../../middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { validateCheckIn } from './validate'

export async function checkInRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', jwtVerify)

  app.get('/check-ins/history', history)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)
}
