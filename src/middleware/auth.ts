import type { NextFunction, Response, Request } from 'express'
import { verifyToken } from '@/helpers/jwt.handle'
import { type tokenData } from '@/@types/types.d'

const authHandler = (req: Request, res: Response, next: NextFunction): void => {
  const { authToken } = req.cookies || {}

  if (!authToken) {
    res.status(401).json({
      message: 'Token not provider'
    })
    return
  }

  if (!process.env.SECRET_JWT) {
    throw new Error('JWT secret is not define')
  }

  const tokenData: tokenData = verifyToken(authToken)

  if (!tokenData) {
    res.json({
      message: 'Invalid token'
    })
  } else {
    next()
  }
}

export default authHandler
