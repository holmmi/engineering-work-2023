import { pool } from './pool'
import { logErrorAndReject } from './error'
import { Error } from '../error'

type DatabaseUserDetails = {
  id: string
  email: string
  nickName?: string
  createdAt: string
}

const formatUserDetails = (databaseResult: any): DatabaseUserDetails => {
  return {
    id: databaseResult['id'],
    email: databaseResult['email'],
    nickName: databaseResult['nick_name'],
    createdAt: databaseResult['created_at'],
  }
}

export const getUserById = async (userId: string) => {
  try {
    const result = await pool.query(
      'SELECT * FROM user_account WHERE id = $1',
      [userId]
    )
    return result.rowCount > 0 ? formatUserDetails(result.rows[0]) : undefined
  } catch (error) {
    return logErrorAndReject(error)
  }
}

export const addUser = async (userId: string, email: string) => {
  try {
    await pool.query(
      'INSERT INTO user_account (id, email) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET email = $2',
      [userId, email]
    )
  } catch (error) {
    logErrorAndReject(error)
  }
}

export const updateNickNameById = async (
  userId: string,
  nickName: string
): Promise<DatabaseUserDetails | Error> => {
  try {
    await pool.query('UPDATE user_account SET nick_name = $1 WHERE id = $2', [
      nickName,
      userId,
    ])
    return formatUserDetails(await getUserById(userId))
  } catch (error) {
    return logErrorAndReject(error)
  }
}

export const checkIfNickNameIsAvailable = async (
  nickName: string
): Promise<boolean | Error> => {
  try {
    const result = await pool.query(
      'SELECT NULL FROM user_account WHERE nick_name = $1',
      [nickName]
    )
    return result.rowCount === 0
  } catch (error) {
    return logErrorAndReject(error)
  }
}
