import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import { env } from './config/env'
import { swaggerSpec } from './docs/swagger'
import router from './routes'
import { errorHandler } from './middleware/error.middleware'
import { logger } from './utils/logger'

export function createApp(): Express {
  const app: Express = express()

  // ── Security ────────────────────────────────────────────────────────────────
  app.use(helmet())
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  )

  // ── Rate limiting ────────────────────────────────────────────────────────────
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: { code: 'RATE_LIMITED', message: 'Too many requests, please try again later.' },
    },
  })
  app.use(limiter)

  // ── Body parsing ─────────────────────────────────────────────────────────────
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true }))

  // ── Request logging ──────────────────────────────────────────────────────────
  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`, {
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    next()
  })

  // ── Swagger UI ───────────────────────────────────────────────────────────────
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'EcoLens AI — API Docs',
    })
  )

  // ── Routes ───────────────────────────────────────────────────────────────────
  app.use('/api/v1', router)

  // ── 404 fallback ─────────────────────────────────────────────────────────────
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'The requested endpoint does not exist.' },
    })
  })

  // ── Global error handler (must be last) ──────────────────────────────────────
  app.use(errorHandler)

  return app
}
