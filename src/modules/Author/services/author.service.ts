import prisma from '@/db/connection'
import type { IAuthorResponse } from '@/@types/types.d'

export const findAuthorById = async (id: number): Promise<IAuthorResponse | null> => {
  const authorFound = await prisma.author.findUnique({
    where: {
      id
    }
  })

  return authorFound
}

export const getAllAuthors = async (): Promise<IAuthorResponse[] | null> => {
  const AuthorsFound = await prisma.author.findMany()

  return AuthorsFound
}
