import { Request } from 'express'

// Extend Express Request to carry authenticated user ID
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email?: string
      }
    }
  }
}

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
  }
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
