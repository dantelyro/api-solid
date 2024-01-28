import { makeValidateCheckInService } from '@/services/factories/make-validate-check-ins'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validateCheckIn (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const validateParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateParamsSchema.parse(request.params)

  const createGymService = makeValidateCheckInService()

  await createGymService.execute({ checkInId })

  return await reply.status(204).send()
}
