import prisma from '@/db/connection'
import type { User } from '@prisma/client'

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user
}
