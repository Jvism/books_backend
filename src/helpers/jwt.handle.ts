import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { tokenData } from '@/@types/types'

// Archivo encargado de realizar las acciones de Json Web Token, como generar o verificar un token

export const createToken = (dataToken: tokenData): string => {
  if (!process.env.SECRET_JWT) {
    throw new Error('JWT secret is not define')
  }

  const token = jwt.sign(dataToken, process.env.SECRET_JWT)

  return token
}

export const verifyToken = (authToken: string): tokenData => {
  if (!process.env.SECRET_JWT) {
    throw new Error('JWT secret is not define')
  }
  const authObject: JwtPayload | string | undefined = jwt.verify(authToken, process.env.SECRET_JWT)

  if (!authObject || typeof authObject === 'string') {
    throw new Error('Invalid token')
  }

  return {
    id: authObject.id,
    username: authObject.username,
    email: authObject.email,
    name: authObject.name,
    lastname: authObject.lastname,
    exp: authObject.exp || -1
  }
}
