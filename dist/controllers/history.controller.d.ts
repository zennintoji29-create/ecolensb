import { Request, Response, NextFunction } from 'express';
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
export declare function getHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
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
export declare function getStats(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=history.controller.d.ts.map