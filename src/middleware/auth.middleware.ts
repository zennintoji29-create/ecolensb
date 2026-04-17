import { Request, Response, NextFunction } from 'express'
import { supabaseAdmin } from '../config/supabase'
import { AppError } from '../types/errors'

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Missing or invalid Authorization header', 401, 'UNAUTHORIZED')
    }

    const token = authHeader.split(' ')[1]

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      throw new AppError('Invalid or expired token', 401, 'UNAUTHORIZED')
    }

    req.user = {
      id: user.id,
      email: user.email,
    }

    next()
  } catch (err) {
    next(err)
  }
}
