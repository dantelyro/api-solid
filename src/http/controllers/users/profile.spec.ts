import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
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

    const { token } = auth.body

    const profile = await request(app.server)
      .post('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profile.statusCode).toEqual(200)
    expect(profile.body.user).toEqual(
      expect.objectContaining({
        email: 'john@email.com'
      })
    )
  })
})
