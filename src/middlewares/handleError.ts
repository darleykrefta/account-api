import { NextFunction, Request, Response } from 'express'
import { GenericError } from '../helpers/GenericErrors'

export const handleErrors = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response<Error, Record<string, Error>> => {
  if (err instanceof GenericError) {
    return res.status(err.getCode()).json({
      code: err.getCode(),
      status: 'error',
      errors: [{ message: err.message }]
    })
  }

  return res.status(500).json({
    code: 500,
    status: 'error',
    errors: [{ message: err.message }]
  })
}
