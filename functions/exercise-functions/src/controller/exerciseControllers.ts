import { HttpFunction } from '@google-cloud/functions-framework'
import {
  middlewareExecutor,
  validateAuthenticatedUsersHeader,
  validateNewExerciseRequest,
  validateCheckExerciseRequest,
} from '../middleware'
import { getUserId } from '../authentication'
import { sendError } from '../error'
import { UnitName, createUnitConversion, isAnswerCorrect } from '../unit/units'
import {
  addUnitConversionExercise,
  getUnitConversionExerciseDetails,
  DatabaseUnitConversion,
  addUnitConversionExerciseAnswer,
} from '../database/unitConversion'

export const createExerciseController: HttpFunction = async (req, res) => {
  try {
    await middlewareExecutor([
      validateAuthenticatedUsersHeader(req, res),
      validateNewExerciseRequest(req, res),
    ])
    const userId = (await getUserId(req)) as string
    const unitName = req.body['unitName'] as UnitName
    const unitConversion = createUnitConversion(unitName)
    res.send(await addUnitConversionExercise(userId, unitConversion))
  } catch (error) {
    sendError(error, res)
  }
}

export const checkExercise: HttpFunction = async (req, res) => {
  try {
    await middlewareExecutor([
      validateAuthenticatedUsersHeader(req, res),
      validateCheckExerciseRequest(req, res),
    ])
    const userId = (await getUserId(req)) as string
    const exerciseId = req.body['id'] as number
    const answer = req.body['convertedValue'] as number
    const { id, ...restDetails } = (await getUnitConversionExerciseDetails(
      exerciseId
    )) as DatabaseUnitConversion
    const isCorrect = isAnswerCorrect(answer, restDetails)
    await addUnitConversionExerciseAnswer(userId, exerciseId, isCorrect, answer)
    res.send({ isCorrect })
  } catch (error) {
    sendError(error, res)
  }
}
