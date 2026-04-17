import { Request, Response, NextFunction } from 'express'
import * as historyService from '../services/history.service'
import { AppError } from '../types/errors'

/**
 * @swagger
 * /api/v1/history:
 *   get:
 *     summary: Get user's scan history
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 50
 *     responses:
 *       200:
 *         description: Paginated scan history
 *       401:
 *         description: Unauthorized
 */
export async function getHistory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED')

    const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10))
    const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? '20'), 10)))

    const { scans, total } = await historyService.getUserHistory(req.user.id, page, limit)

    res.json({
      success: true,
      data: {
        scans,
        pagination: {
          page,
          limit,
          total,
          hasMore: page * limit < total,
        },
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * @swagger
 * /api/v1/history/stats:
 *   get:
 *     summary: Get user's scan statistics
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Scan statistics
 *       401:
 *         description: Unauthorized
 */
export async function getStats(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED')

    const stats = await historyService.getUserStats(req.user.id)
    res.json({ success: true, data: stats })
  } catch (err) {
    next(err)
  }
}
