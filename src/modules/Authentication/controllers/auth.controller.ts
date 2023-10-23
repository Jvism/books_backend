import { compare } from 'bcrypt'
import { findUserByEmail } from '../services/auth.service'
import { createToken, verifyToken } from '@/helpers/jwt.handle'
import { serializedCookie } from '@/helpers/cookie.handle'
import type { NextFunction, Request, Response } from 'express'
import type { loginData, tokenData } from '@/@types/types.d'
import type { User } from '@prisma/client'

export const loginUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password }: loginData = req.body

    if (!email || !password) {
      res.status(400).json({
        message: 'Email and password are required'
      })
      return
    }

    const user: User | null = await findUserByEmail(email)

    if (!user) {
      res.status(404).json({
        message: 'User not found'
      })
      return
    }

    const logged = await compare(password, user.password)
    if (logged) {
      const token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name || '',
        lastname: user.lastname || '',
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
      })
      res.setHeader('Set-Cookie', serializedCookie({ name: 'authToken', value: token }))
      res.json('Login succesfully')
    } else {
      res.status(401).json({
        message: 'Invalid email or password'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const verifyAuthController = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { authToken } = req.cookies || ''

    if (!authToken) {
      res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const authenticated: tokenData = verifyToken(authToken)

    if (!authenticated) {
      res.status(401).json({
        message: 'Unauthorized'
      })
    } else {
      res.json({
        message: 'Authorized'
      })
    }
  } catch (error) {
    next(error)
  }
}
