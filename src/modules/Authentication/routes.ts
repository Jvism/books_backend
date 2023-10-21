import { Router } from 'express'
import { loginUserController, verifyAuthController } from './controllers/auth.controller'

const router = Router()

router.post('/signin', loginUserController)
router.get('/verifytoken', verifyAuthController)

export default router
