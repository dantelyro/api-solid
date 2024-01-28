import { makeSearchGymService } from '@/services/factories/make-search-gyms'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const searchGymsBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { page, query } = searchGymsBodySchema.parse(request.query)

  const createGymService = makeSearchGymService()

  const { gyms } = await createGymService.execute({ page, query })

  return await reply.status(200).send({ gyms })
}
