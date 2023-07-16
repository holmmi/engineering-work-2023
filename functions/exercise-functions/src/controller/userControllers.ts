import { HttpFunction } from '@google-cloud/functions-framework'
import { getUserById, updateNickNameById } from '../database/user'
import {
  middlewareExecutor,
  validateGetUserRequest,
  validateUpdateNickRequest,
  validateAuthenticatedUsersHeader,
} from '../middleware'
import { sendError } from '../error'
import { getUserId } from '../authentication'

export const getUserDetailsController: HttpFunction = async (req, res) => {
  try {
    await middlewareExecutor([
      validateAuthenticatedUsersHeader(req, res),
      validateGetUserRequest(req, res),
    ])
    const userId = (await getUserId(req)) as string
    res.json(await getUserById(userId))
  } catch (error) {
    sendError(error, res)
  }
}

export const updateNickController: HttpFunction = async (req, res) => {
  try {
    await middlewareExecutor([
      validateAuthenticatedUsersHeader(req, res),
      validateUpdateNickRequest(req, res),
    ])
    const nickName = req.body['nickName'] as string
    const userId = (await getUserId(req)) as string
    await updateNickNameById(userId, nickName)
    res.sendStatus(200)
  } catch (error) {
    sendError(error, res)
  }
}
