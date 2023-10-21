import { Router } from 'express'
import { getUserController, getUsersController, createUserController, updateUserController, deleteUserController } from './controllers/user.controller'
import authHandler from '@/middleware/auth'

const router = Router()

router.post('/', createUserController)
router.use(authHandler) // After this line authentication is required
router.get('/', getUsersController)
router.get('/:id', getUserController)
router.put('/:id', updateUserController)
router.delete('/:id', deleteUserController)

export default router
