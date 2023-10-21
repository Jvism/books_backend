import { serialize } from 'cookie'

interface cookieData {
  name: string
  value: string
}

export const serializedCookie = ({ name, value }: cookieData): string => {
  const serialized = serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_SERVER === 'Prod',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: '/'
  })

  return serialized
}
