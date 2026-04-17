"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = health;
/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 model:
 *                   type: string
 *                   example: loaded
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
function health(_req, res) {
    res.json({
        status: 'ok',
        model: 'loaded',
        timestamp: new Date().toISOString(),
    });
}
//# sourceMappingURL=health.controller.js.map