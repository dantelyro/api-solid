import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const { token } = await createAndAuthenticateUser(app)

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
