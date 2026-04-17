import { Request, Response } from 'express'

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
export function health(_req: Request, res: Response): void {
  res.json({
    status: 'ok',
    model: 'loaded',
    timestamp: new Date().toISOString(),
  })
}
