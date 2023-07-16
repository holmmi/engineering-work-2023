import { HttpFunction } from '@google-cloud/functions-framework'

type MiddlewareExecutor = (
  middlewareFunctions: HttpFunction[]
) => Promise<unknown>

export const middlewareExecutor: MiddlewareExecutor = (middlewareFunctions) =>
  Promise.all(middlewareFunctions)
