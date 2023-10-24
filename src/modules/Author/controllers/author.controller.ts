import { IAuthorResponse } from '@/@types/types'
import type { NextFunction, Request, Response } from 'express'
import { findAuthorById, getAllAuthors } from '../services/author.service'

export const getAuthorsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorsFound: IAuthorResponse[] | null = await getAllAuthors()
    if (!authorsFound) {
      res.status(404).json({ message: 'Users not found' })
    } else {
      res.json(authorsFound)
    }
  } catch (error) {
    next(error)
  }
}

export const getAuthorController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params || null

    if (!id) {
      res.status(400).json({ message: 'Missing id' })
    }

    const authorFound: IAuthorResponse | null = await findAuthorById(Number(id))
    if (!authorFound) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.json(authorFound)
    }
  } catch (error) {
    next(error)
  }
}
