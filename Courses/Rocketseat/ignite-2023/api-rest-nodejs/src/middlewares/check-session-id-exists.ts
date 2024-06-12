import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSesstionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId
  console.log(sessionId)

  if (!sessionId) {
    return reply.status(401).send({
      error: 'unauthorized',
    })
  }
}
