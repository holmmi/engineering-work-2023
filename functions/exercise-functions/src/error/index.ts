import { Response } from '@google-cloud/functions-framework'

export type Error = {
  code: number
  message: string
}

const HTTP_BAD_REQUEST = 400
const HTTP_UNAUTHORIZED = 401
const HTTP_INTERNAL_SERVER_ERROR = 500

type ErrorFunction = (message?: string) => Promise<Error>

export const internalServerError: ErrorFunction = () =>
  Promise.reject({
    code: HTTP_INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  })

const getBadRequestBody = (message: string): Error => ({
  code: HTTP_BAD_REQUEST,
  message,
})

const getUnauthorizedBody = (): Error => ({
  code: HTTP_UNAUTHORIZED,
  message: 'Unauthorized',
})

export const badRequest: ErrorFunction = (message: string = 'Bad request') =>
  Promise.reject(getBadRequestBody(message))

export const sendError = (error: unknown, res: Response) => {
  const { code, message } = error as Error
  res.status(code).json(message)
}

export const sendInternalServerError = (res: Response) =>
  res.sendStatus(HTTP_INTERNAL_SERVER_ERROR)

export const unauthorized: ErrorFunction = () =>
  Promise.reject(getUnauthorizedBody)
