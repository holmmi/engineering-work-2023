import { HttpFunction } from '@google-cloud/functions-framework'
import { badRequest, internalServerError } from '../../error'
import {
  body,
  header,
  ValidationChain,
  CustomValidator,
} from 'express-validator'
import { checkIfNickNameIsAvailable } from '../../database/user'

export const validateNewExerciseRequest: HttpFunction = async (req, _res) => {
  const validation: ValidationChain = body('unitName').isString()
  const result = await validation.run(req)
  if (req.method === 'POST' && req.is('json') && result.isEmpty())
    return Promise.resolve()
  return badRequest()
}

export const validateCheckExerciseRequest: HttpFunction = (req, _res) => {
  const validations: ValidationChain[] = [
    body('id').isNumeric(),
    body('convertedValue').isNumeric(),
  ]
  if (
    req.method === 'POST' &&
    req.is('json') &&
    validations.every(async (validation) =>
      (await validation.run(req)).isEmpty()
    )
  ) {
    return Promise.resolve()
  }
  return badRequest()
}

export const validateGetUserRequest: HttpFunction = (req, _res) => {
  if (req.method === 'GET') return Promise.resolve()
  return badRequest()
}

const MIN_NICK_NAME_LENGTH = 3
const MAX_NICK_NAME_LENGTH = 24

export const validateUpdateNickRequest: HttpFunction = async (req, _res) => {
  let isInternalServerError = false
  const validateNickNameIsNotReserved: CustomValidator = async (input) => {
    let result
    try {
      result = await checkIfNickNameIsAvailable(input as string)
    } catch (error) {
      isInternalServerError = true
    }
    return result ? Promise.resolve() : Promise.reject()
  }

  if (req.method === 'PATCH' && req.is('json')) {
    const validation: ValidationChain = body('nickName')
      .isString()
      .bail()
      .isLength({ min: MIN_NICK_NAME_LENGTH, max: MAX_NICK_NAME_LENGTH })
      .bail()
      .isAlphanumeric()
      .bail()
      .custom(validateNickNameIsNotReserved)
      .withMessage('common.validations.nickNameIsReserved')

    const validationResult = await validation.run(req)

    if (isInternalServerError) return internalServerError()

    if (validationResult.isEmpty()) {
      return Promise.resolve()
    } else {
      return badRequest(validationResult.array()[0]['msg'])
    }
  }
  return badRequest()
}

export const validateGetTokenRequest: HttpFunction = async (req, _res) => {
  if (req.method === 'POST' && req.is('json')) {
    const validation: ValidationChain = body('code').isString().not().isEmpty()
    const validationResult = await validation.run(req)

    if (validationResult.isEmpty()) {
      return Promise.resolve()
    }
    return badRequest()
  }
  return badRequest()
}

export const validateRefreshRequest: HttpFunction = async (req, _res) => {
  if (req.method === 'POST' && req.is('json')) {
    const validation: ValidationChain = body('refreshToken')
      .isString()
      .not()
      .isEmpty()
    const validationResult = await validation.run(req)

    if (validationResult.isEmpty()) {
      return Promise.resolve()
    }
    return badRequest()
  }
  return badRequest()
}

const AUTHORIZATION_HEADER = 'Authorization'

export const validateAuthenticatedUsersHeader: HttpFunction = async (
  req,
  _res
) => {
  const validation: ValidationChain = header(AUTHORIZATION_HEADER)
    .exists()
    .custom((value) => (value as string).startsWith('Bearer'))
  const result = await validation.run(req)
  result.isEmpty() ? Promise.resolve() : badRequest()
}
