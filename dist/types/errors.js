"use strict";
// ─── AppError ───────────────────────────────────────────────────────────────
// All intentional errors thrown in services/controllers must use this class.
// The global error handler inspects instanceof AppError to decide response shape.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=errors.js.map