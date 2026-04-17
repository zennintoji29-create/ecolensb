import { Router } from 'express'
import scanRoutes from './scan.routes'
import historyRoutes from './history.routes'
import healthRoutes from './health.routes'

const router: Router = Router()

router.use('/scan', scanRoutes)
router.use('/history', historyRoutes)
router.use('/health', healthRoutes)

export default router
