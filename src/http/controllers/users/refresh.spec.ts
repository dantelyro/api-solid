import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const cookie = auth.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/refresh/token')
      .set('Cookie', cookie)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})
