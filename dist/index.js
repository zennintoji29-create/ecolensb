"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = require("./app");
const ai_service_1 = require("./services/ai.service");
const logger_1 = require("./utils/logger");
async function bootstrap() {
    try {
        // Load AI model before accepting requests
        logger_1.logger.info('Loading AI model...');
        await (0, ai_service_1.loadModel)();
        const app = (0, app_1.createApp)();
        app.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`🌱 EcoLens AI server running`, {
                port: env_1.env.PORT,
                env: env_1.env.NODE_ENV,
                docs: `http://localhost:${env_1.env.PORT}/api/docs`,
            });
        });
        // ── Anti-cold-start self-ping (Render.com free tier) ──────────────────────
        if (env_1.env.NODE_ENV === 'production' && env_1.env.RENDER_EXTERNAL_URL) {
            const PING_INTERVAL = 12 * 60 * 1000; // 12 minutes
            setInterval(async () => {
                try {
                    await fetch(`${env_1.env.RENDER_EXTERNAL_URL}/api/v1/health`);
                    logger_1.logger.info('Self-ping successful');
                }
                catch (err) {
                    logger_1.logger.warn('Self-ping failed', { error: err.message });
                }
            }, PING_INTERVAL);
            logger_1.logger.info('Anti-cold-start self-ping enabled', { interval: '12 min' });
        }
    }
    catch (err) {
        logger_1.logger.error('Fatal startup error', { error: err.message });
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map