import type { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log(err)
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}
