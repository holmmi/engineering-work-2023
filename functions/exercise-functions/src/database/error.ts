import { Error, internalServerError } from '../error'

export const logErrorAndReject = (error: unknown): Promise<Error> => {
  console.error(error)
  return internalServerError()
}
