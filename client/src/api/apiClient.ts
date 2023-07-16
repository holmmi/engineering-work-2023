import axios, { CreateAxiosDefaults } from 'axios'
import { UserToken } from '../provider/AuthProvider'

const TOKENS = 'tokens'

export const getApiClient = () => {
  const config: CreateAxiosDefaults = {}
  const tokens = window.localStorage.getItem(TOKENS)
  if (tokens) {
    try {
      const userToken = JSON.parse(tokens) as UserToken
      config.headers = { Authorization: `Bearer ${userToken.id_token}` }
    } catch (error) {
      throw new Error('Failed to parse tokens')
    }
  }
  const apiClient = axios.create(config)
  apiClient.interceptors.response.use(undefined, (error) => {
    if (axios.isAxiosError(error)) {
      // Show toaster
      throw error
    }
  })
  return apiClient
}
