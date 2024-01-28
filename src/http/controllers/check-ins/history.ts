import { makeUsersCheckInHistotyService } from '@/services/factories/make-get-users-check-ins-history'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const CheckInHistotyBodySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = CheckInHistotyBodySchema.parse(request.query)

  const createGymService = makeUsersCheckInHistotyService()

  const { checkIns } = await createGymService.execute({ page, userId: request.user.sub })

  return await reply.status(200).send({ checkIns })
}
