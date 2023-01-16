import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { logcatch } from './logger';

export const isValid = (schemas: { body?: ObjectSchema; params?: ObjectSchema }) => (req: Request, res: Response, next: NextFunction) => {
  let error = false

  // body validation
  if (schemas.body) {
    const { error: bodyError, value: bodyValue } = schemas.body.validate(req.body.data)
    if (bodyError) {
      error = true
      logcatch(bodyError,"bodyError")
    } else {
      req.body.data = bodyValue
    }
  }

  // params validation
  if (schemas.params) {
    const { error: paramsError, value: paramsValue } = schemas.params.validate(req.params)
    if (paramsError) {
      error = true
      logcatch(paramsError,"paramsError")
    } else {
      req.params = paramsValue
    }
  }

  if (error) {
    res.sendStatus(400) // bad Request
  } else {
    next()
  }
}
