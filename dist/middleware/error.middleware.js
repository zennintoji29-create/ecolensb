"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const errors_1 = require("../types/errors");
const logger_1 = require("../utils/logger");
const multer_1 = require("multer");
function errorHandler(err, _req, res, _next) {
    // Multer errors
    if (err instanceof multer_1.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({
                success: false,
                error: { code: 'FILE_TOO_LARGE', message: 'File must be under 5MB' },
            });
            return;
        }
        res.status(400).json({
            success: false,
            error: { code: 'UPLOAD_ERROR', message: err.message },
        });
        return;
    }
    // Operational errors (AppError)
    if (err instanceof errors_1.AppError && err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            error: { code: err.code, message: err.message },
        });
        return;
    }
    // Unknown errors — log full stack, return generic message
    logger_1.logger.error('Unhandled error', { error: err.message, stack: err.stack });
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred. Please try again.',
        },
    });
}
//# sourceMappingURL=error.middleware.js.map