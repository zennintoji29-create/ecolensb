import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import * as historyController from '../controllers/history.controller'

const router: Router = Router()

router.get('/', authMiddleware, historyController.getHistory)
router.get('/stats', authMiddleware, historyController.getStats)

export default router
