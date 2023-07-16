import { Request } from '@google-cloud/functions-framework'
import { authClient } from './authClient'
import { unauthorized, Error } from '../error'

const AUTHORIZATION_HEADER = 'Authorization'

export const getUserId = async (req: Request): Promise<string | Error> => {
  const bearer = req.headers[AUTHORIZATION_HEADER.toLowerCase()]
  let userId
  if (bearer) {
    const idToken = bearer.slice(7) as string
    const loginTicket = await authClient.verifyIdToken({ idToken })
    userId = loginTicket.getPayload()?.sub
  }
  if (!userId) {
    return unauthorized()
  }
  return userId
}
