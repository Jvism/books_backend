import { Router } from 'express'
import { getAuthorController, getAuthorsController } from './controllers/author.controller'

const router = Router()

router.get('/', getAuthorsController)
router.get('/:id', getAuthorController)

export default router
