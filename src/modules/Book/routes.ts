import { Router } from 'express'
import { getBookController, getBooksController } from './controllers/book.controller'

const router = Router()

router.get('/', getBooksController)
router.get('/:id', getBookController)

export default router
