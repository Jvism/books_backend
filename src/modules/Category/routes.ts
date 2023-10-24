import { Router } from 'express'
import { getCategoryController, getCategoriesController } from './controllers/category.controller'

const router = Router()

router.get('/', getCategoriesController)
router.get('/:id', getCategoryController)

export default router
