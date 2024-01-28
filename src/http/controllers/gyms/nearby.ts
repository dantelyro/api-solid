import { makeGetNearbyGymService } from '@/services/factories/make-get-nearby-gyms'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const nearbyGymsBodySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { userLatitude, userLongitude } = nearbyGymsBodySchema.parse(request.query)

  const createGymService = makeGetNearbyGymService()

  const { gyms } = await createGymService.execute({ userLatitude, userLongitude })

  return await reply.status(200).send({ gyms })
}
