import { getApiClient } from './apiClient'

export type CreateExerciseResponse = {
  id: number
  unitName: string
  fromUnit: string
  toUnit: string
  valueToConvert: number
}

export type CheckExerciseResponse = {
  isCorrect: boolean
}

export const createExercise = async (unitName: string) => {
  try {
    return (
      await getApiClient().post<CreateExerciseResponse>(
        '/api/create-exercise',
        { unitName }
      )
    ).data
  } catch (error) {
    // Axios errors are handled globally
  }
}

export const checkExercise = async (
  exerciseId: number,
  convertedValue: number
) => {
  try {
    return (
      await getApiClient().post<CheckExerciseResponse>('/api/check-exercise', {
        id: exerciseId,
        convertedValue,
      })
    ).data
  } catch (error) {
    // Axios errors are handled globally
  }
}
