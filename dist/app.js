"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const env_1 = require("./config/env");
const swagger_1 = require("./docs/swagger");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const logger_1 = require("./utils/logger");
function createApp() {
    const app = (0, express_1.default)();
    // ── Security ────────────────────────────────────────────────────────────────
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: env_1.env.CORS_ORIGIN,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }));
    // ── Rate limiting ────────────────────────────────────────────────────────────
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            success: false,
            error: { code: 'RATE_LIMITED', message: 'Too many requests, please try again later.' },
        },
    });
    app.use(limiter);
    // ── Body parsing ─────────────────────────────────────────────────────────────
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    // ── Request logging ──────────────────────────────────────────────────────────
    app.use((req, _res, next) => {
        logger_1.logger.info(`${req.method} ${req.path}`, {
            ip: req.ip,
            userAgent: req.get('user-agent'),
        });
        next();
    });
    // ── Swagger UI ───────────────────────────────────────────────────────────────
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'EcoLens AI — API Docs',
    }));
    // ── Routes ───────────────────────────────────────────────────────────────────
    app.use('/api/v1', routes_1.default);
    // ── 404 fallback ─────────────────────────────────────────────────────────────
    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            error: { code: 'NOT_FOUND', message: 'The requested endpoint does not exist.' },
        });
    });
    // ── Global error handler (must be last) ──────────────────────────────────────
    app.use(error_middleware_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map