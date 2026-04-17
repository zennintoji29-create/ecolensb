import { Request, Response, NextFunction } from 'express';
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
export declare function scan(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=scan.controller.d.ts.map