import { ICategoryResponse } from '@/@types/types'
import type { NextFunction, Request, Response } from 'express'
import { findCategoryById, getAllCategories } from '../services/category.service'

export const getCategoriesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categoriesFound: ICategoryResponse[] | null = await getAllCategories()
    if (!categoriesFound) {
      res.status(404).json({ message: 'Users not found' })
    } else {
      res.json(categoriesFound)
    }
  } catch (error) {
    next(error)
  }
}

export const getCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params || null

    if (!id) {
      res.status(400).json({ message: 'Missing id' })
    }

    const categoryFound: ICategoryResponse | null = await findCategoryById(Number(id))
    if (!categoryFound) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.json(categoryFound)
    }
  } catch (error) {
    next(error)
  }
}
