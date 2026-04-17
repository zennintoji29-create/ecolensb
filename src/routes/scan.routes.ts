import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { uploadMiddleware } from '../middleware/upload.middleware'
import * as scanController from '../controllers/scan.controller'

const router: Router = Router()

router.post('/', authMiddleware, uploadMiddleware, scanController.scan)

export default router
