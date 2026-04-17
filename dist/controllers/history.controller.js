"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = getHistory;
exports.getStats = getStats;
const historyService = __importStar(require("../services/history.service"));
const errors_1 = require("../types/errors");
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
async function getHistory(req, res, next) {
    try {
        if (!req.user)
            throw new errors_1.AppError('Authentication required', 401, 'UNAUTHORIZED');
        const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10));
        const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? '20'), 10)));
        const { scans, total } = await historyService.getUserHistory(req.user.id, page, limit);
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
        });
    }
    catch (err) {
        next(err);
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
async function getStats(req, res, next) {
    try {
        if (!req.user)
            throw new errors_1.AppError('Authentication required', 401, 'UNAUTHORIZED');
        const stats = await historyService.getUserStats(req.user.id);
        res.json({ success: true, data: stats });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=history.controller.js.map