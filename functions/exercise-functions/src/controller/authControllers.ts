import { HttpFunction } from '@google-cloud/functions-framework'
import {
  middlewareExecutor,
  validateGetTokenRequest,
  validateRefreshRequest,
} from '../middleware'
import { sendError, sendInternalServerError } from '../error'
import { addUser } from '../database/user'
import { authClient, getUserRefreshClient } from '../authentication'

export const tokenController: HttpFunction = async (req, res) => {
  try {
    await middlewareExecutor([validateGetTokenRequest(req, res)])
  } catch (error) {
    sendError(error, res)
  }
  const code = req.body['code'] as string
  try {
    const tokenResponse = await authClient.getToken(code)
    const { access_token: accessToken } = tokenResponse.tokens
    if (accessToken) {
      const userInfo = await authClient.getTokenInfo(accessToken)
      const { sub: userId, email } = userInfo
      if (userId && email) {
        // Does not add user if user's id exists in database
        await addUser(userId, email)
      }
    }
    res.json(tokenResponse.tokens)
  } catch (error) {
    console.error(error)
    sendInternalServerError(res)
  }
}

export const refreshController: HttpFunction = async (req, res) => {
  try {
    await middlewareExecutor([validateRefreshRequest(req, res)])
  } catch (error) {
    sendError(error, res)
  }
  const refreshToken = req.body['refreshToken'] as string
  try {
    const refreshClient = getUserRefreshClient(refreshToken)
    const tokenResponse = await refreshClient.refreshAccessToken()
    res.json(tokenResponse.credentials)
  } catch (error) {
    console.error(error)
    sendInternalServerError(res)
  }
}
