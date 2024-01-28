import { type FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser (app: FastifyInstance): Promise<{ token: string }> {
  await request(app.server)
    .post('/users')
    .send({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456'
    })

  const auth = await request(app.server)
    .post('/sessions')
    .send({
      email: 'john@email.com',
      password: '123456'
    })

  const token = auth.body.token

  return {
    token
  }
}
