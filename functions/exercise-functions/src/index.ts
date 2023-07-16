import * as dotenv from 'dotenv'
dotenv.config()
import * as functions from '@google-cloud/functions-framework'
import {
  createExerciseController,
  checkExercise,
} from './controller/exerciseControllers'
import {
  getUserDetailsController,
  updateNickController,
} from './controller/userControllers'
import {
  tokenController,
  refreshController,
} from './controller/authControllers'

// Exercise controllers
functions.http('create-exercise', createExerciseController)
functions.http('check-exercise', checkExercise)
// User controller
functions.http('user', getUserDetailsController)
functions.http('update-nick', updateNickController)
// Auth controllers
functions.http('token', tokenController)
functions.http('refresh', refreshController)
