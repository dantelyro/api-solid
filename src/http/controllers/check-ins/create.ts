import { makeCheckInService } from '@/services/factories/make-check-in'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInsBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)
  const { userLatitude, userLongitude } = createCheckInsBodySchema.parse(request.body)

  const checkInService = makeCheckInService()

  await checkInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude,
    userLongitude
  })

  return await reply.status(201).send()
}
