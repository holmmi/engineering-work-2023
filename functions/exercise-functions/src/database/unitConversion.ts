import { pool } from './pool'
import { UnitConversion } from '../unit/units'
import { Error } from '../error'
import { logErrorAndReject } from './error'

export type DatabaseUnitConversion = UnitConversion & {
  id: number
}

export const addUnitConversionExercise = async (
  userId: string,
  unitConversion: UnitConversion
): Promise<DatabaseUnitConversion | Error> => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO unit_conversion_exercise (user_id, unit_name, from_unit, to_unit, value_to_convert) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        userId,
        unitConversion.unitName,
        unitConversion.fromUnit,
        unitConversion.toUnit,
        unitConversion.valueToConvert,
      ]
    )
    return {
      id: rows[0]['id'] as number,
      unitName: unitConversion.unitName,
      fromUnit: unitConversion.fromUnit,
      toUnit: unitConversion.toUnit,
      valueToConvert: unitConversion.valueToConvert,
    }
  } catch (error) {
    return logErrorAndReject(error)
  }
}

export const addUnitConversionExerciseAnswer = async (
  userId: string,
  exerciseId: number,
  isCorrect: boolean,
  convertedValue: number
) => {
  try {
    await pool.query(
      'INSERT INTO unit_conversion_exercise_answer (user_id, exercise_id, is_correct, converted_value) VALUES ($1, $2, $3, $4)',
      [userId, exerciseId, isCorrect, convertedValue]
    )
  } catch (error) {
    return logErrorAndReject(error)
  }
}

export const getUnitConversionExerciseDetails = async (
  exerciseId: number
): Promise<DatabaseUnitConversion | Error> => {
  try {
    const result = await pool.query(
      'SELECT * FROM unit_conversion_exercise WHERE id = $1',
      [exerciseId]
    )
    const exerciseDetails = result.rows[0]
    return {
      id: exerciseDetails['id'],
      unitName: exerciseDetails['unit_name'],
      fromUnit: exerciseDetails['from_unit'],
      toUnit: exerciseDetails['to_unit'],
      valueToConvert: exerciseDetails['value_to_convert'],
    }
  } catch (error) {
    return logErrorAndReject(error)
  }
}
