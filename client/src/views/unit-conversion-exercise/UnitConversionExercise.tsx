import * as React from 'react'
import {
  resources,
  SupportedLanguages,
} from 'services/translation/translations'
import { getI18n, useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Box, Button, Paper, Typography, TextField } from '@mui/material'
import { CreateExerciseResponse, createExercise, checkExercise } from 'api'
import { useSnackbar } from 'notistack'

const DIGIT_REGEX = /^\s*(\d+|\d+\.\d+|\d+,\d+)\s*$/

const SUPERSCRIPT = Object.freeze({
  two: 0x00b2,
  three: 0x00b3,
})

const UnitConversionExercise = () => {
  const [input, setInput] = React.useState<string>('')
  const [inputError, setInputError] = React.useState<boolean>(false)
  const [exerciseDetails, setExerciseDetails] = React.useState<
    CreateExerciseResponse | undefined
  >(undefined)
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const unitType = React.useMemo(() => {
    const language = getI18n().language as SupportedLanguages
    const translations =
      resources[language].translation.translatedPaths.unitConversionExercise
    const unit = Object.entries(translations).find(
      ([_key, value]) => value === pathname
    )
    if (!unit) {
      throw new Error('Unit type was not found')
    }
    return unit[0]
  }, [pathname])

  const validateInput = (text: string): boolean => DIGIT_REGEX.test(text)

  const submitAnswer = async (exerciseId: number, answer: string) => {
    if (validateInput(answer)) {
      const formattedAnswer = answer.trim().replace(',', '.')
      const numericAnswer = Number(formattedAnswer)
      checkIfAnswerIsCorrect(exerciseId, numericAnswer)
      setInputError(false)
    } else {
      enqueueSnackbar(t('views.unitConversionExercise.common.wrongFormat'), {
        variant: 'error',
      })
      setInputError(true)
    }
  }

  const newExercise = React.useCallback(async () => {
    const details = await createExercise(unitType)
    if (details) {
      setExerciseDetails(details)
      setInput('')
    }
  }, [unitType, setExerciseDetails, setInput])

  const checkIfAnswerIsCorrect = async (
    exerciseId: number,
    convertedValue: number
  ) => {
    const details = await checkExercise(exerciseId, convertedValue)
    if (details && details.isCorrect === true) {
      newExercise()
      enqueueSnackbar(t('views.unitConversionExercise.common.correctAnswer'), {
        variant: 'success',
      })
    } else {
      enqueueSnackbar(t('views.unitConversionExercise.common.wrongAnswer'), {
        variant: 'warning',
      })
    }
  }

  React.useEffect(() => {
    if (exerciseDetails === undefined) {
      newExercise()
    }
  }, [exerciseDetails, newExercise])

  const getFormattedExerciseDetails = React.useCallback((): string => {
    if (exerciseDetails) {
      const valueToConvert = exerciseDetails.valueToConvert
        .toString()
        .replace('.', ',')
      const fromUnit = exerciseDetails.fromUnit
        .replace('^2', String.fromCharCode(SUPERSCRIPT['two']))
        .replace('^3', String.fromCharCode(SUPERSCRIPT['three']))
      const toUnit = exerciseDetails.toUnit
        .replace('^2', String.fromCharCode(SUPERSCRIPT['two']))
        .replace('^3', String.fromCharCode(SUPERSCRIPT['three']))
      return `${valueToConvert} ${fromUnit} (${toUnit})`
    }
    return ''
  }, [exerciseDetails])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '80vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          padding: 8,
          gap: 4,
        }}
      >
        <Typography variant="h2">
          {t(`views.unitConversionExercise.${unitType}.title`)}
        </Typography>
        <Typography variant="body1">
          {t(`views.unitConversionExercise.${unitType}.info`)}
        </Typography>
        {exerciseDetails && (
          <Typography variant="body1" fontWeight={600}>
            {getFormattedExerciseDetails()}
          </Typography>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (exerciseDetails) {
              submitAnswer(exerciseDetails.id, input)
            }
          }}
        >
          <TextField
            autoFocus
            fullWidth
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            variant="outlined"
            error={inputError}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            <Button variant="outlined" type="submit">
              {t('views.unitConversionExercise.common.checkAnswer')}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default UnitConversionExercise
