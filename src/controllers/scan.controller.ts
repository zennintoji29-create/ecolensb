import { Request, Response, NextFunction } from 'express'
import * as scanService from '../services/scan.service'
import { AppError } from '../types/errors'

/**
 * @swagger
 * /api/v1/scan:
 *   post:
 *     summary: Analyze a plastic item image
 *     tags: [Scan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: JPEG, PNG, or WebP image (max 5MB)
 *     responses:
 *       200:
 *         description: Successful prediction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScanResponse'
 *       400:
 *         description: Invalid or missing image
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export async function scan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      throw new AppError('No image file provided', 400, 'MISSING_FILE')
    }
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED')
    }

    const result = await scanService.processScan(req.user.id, req.file.buffer)
    res.json({ success: true, data: result })
  } catch (err) {
    next(err)
  }
}
