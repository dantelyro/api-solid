import { makeGetNearbyGymService } from '@/services/factories/make-get-nearby-gyms'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { userLatitude, userLongitude } = registerBodySchema.parse(request.body)

  const createGymService = makeGetNearbyGymService()

  const gyms = await createGymService.execute({ userLatitude, userLongitude })

  return await reply.status(200).send({ gyms })
}
