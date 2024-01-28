import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { type FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser (app: FastifyInstance, isAdmin = false): Promise<{ token: string }> {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER'
    }
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
