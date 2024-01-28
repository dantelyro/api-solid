import { makeCreateGymService } from '@/services/factories/make-create-gym'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const createGymsBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { title, description, latitude, longitude, phone } = createGymsBodySchema.parse(request.body)

  const createGymService = makeCreateGymService()

  await createGymService.execute({ title, description, latitude, longitude, phone })

  return await reply.status(201).send()
}
