import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('nearby gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to nearby a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'some description',
        phone: '54999999999',
        latitude: -29.3879481,
        longitude: -51.1230879
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'some description',
        phone: '54999999999',
        latitude: -29.3879481,
        longitude: -52.1230879
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        userLatitude: -29.3879481,
        userLongitude: -51.1230879
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Typescript Gym'
      })
    ])
  })
})
