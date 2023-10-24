import prisma from '@/db/connection'
import type { IBookResponse } from '@/@types/types.d'

export const findBookById = async (id: number): Promise<IBookResponse | null> => {
  const bookFound = await prisma.book.findUnique({
    where: {
      id
    }
  })

  return bookFound
}

export const getAllBooks = async (): Promise<IBookResponse[] | null> => {
  const booksFound = await prisma.book.findMany()

  return booksFound
}
