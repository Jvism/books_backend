import { IBookResponse } from '@/@types/types'
import type { NextFunction, Request, Response } from 'express'
import { findBookById, getAllBooks } from '../services/book.service'

export const getBooksController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booksFound: IBookResponse[] | null = await getAllBooks()
    if (!booksFound) {
      res.status(404).json({ message: 'Users not found' })
    } else {
      res.json(booksFound)
    }
  } catch (error) {
    next(error)
  }
}

export const getBookController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params || null

    if (!id) {
      res.status(400).json({ message: 'Missing id' })
    }

    const bookFound: IBookResponse | null = await findBookById(Number(id))
    if (!bookFound) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.json(bookFound)
    }
  } catch (error) {
    next(error)
  }
}
