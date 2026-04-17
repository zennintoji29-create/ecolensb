import { env } from './config/env'
import { createApp } from './app'
import { loadModel } from './services/ai.service'
import { logger } from './utils/logger'

async function bootstrap() {
  try {
    // Load AI model before accepting requests
    logger.info('Loading AI model...')
    await loadModel()

    const app = createApp()

    app.listen(env.PORT, () => {
      logger.info(`🌱 EcoLens AI server running`, {
        port: env.PORT,
        env: env.NODE_ENV,
        docs: `http://localhost:${env.PORT}/api/docs`,
      })
    })

    // ── Anti-cold-start self-ping (Render.com free tier) ──────────────────────
    if (env.NODE_ENV === 'production' && env.RENDER_EXTERNAL_URL) {
      const PING_INTERVAL = 12 * 60 * 1000 // 12 minutes
      setInterval(async () => {
        try {
          await fetch(`${env.RENDER_EXTERNAL_URL}/api/v1/health`)
          logger.info('Self-ping successful')
        } catch (err) {
          logger.warn('Self-ping failed', { error: (err as Error).message })
        }
      }, PING_INTERVAL)
      logger.info('Anti-cold-start self-ping enabled', { interval: '12 min' })
    }
  } catch (err) {
    logger.error('Fatal startup error', { error: (err as Error).message })
    process.exit(1)
  }
}

bootstrap()
