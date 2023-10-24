import prisma from '@/db/connection'
import type { ICategoryResponse } from '@/@types/types.d'

export const findCategoryById = async (id: number): Promise<ICategoryResponse | null> => {
  const categoryFound = await prisma.category.findUnique({
    where: {
      id
    }
  })

  return categoryFound
}

export const getAllCategories = async (): Promise<ICategoryResponse[] | null> => {
  const categoriesFound = await prisma.category.findMany()

  return categoriesFound
}
