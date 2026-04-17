import { Request, Response, NextFunction } from 'express'
import { AppError } from '../types/errors'
import { logger } from '../utils/logger'
import { MulterError } from 'multer'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Multer errors
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        error: { code: 'FILE_TOO_LARGE', message: 'File must be under 5MB' },
      })
      return
    }
    res.status(400).json({
      success: false,
      error: { code: 'UPLOAD_ERROR', message: err.message },
    })
    return
  }

  // Operational errors (AppError)
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    })
    return
  }

  // Unknown errors — log full stack, return generic message
  logger.error('Unhandled error', { error: err.message, stack: err.stack })
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred. Please try again.',
    },
  })
}
