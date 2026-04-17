import multer from 'multer'
import { RequestHandler } from 'express'
import { AppError } from '../types/errors'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new AppError('Only JPEG, PNG, and WebP images are accepted', 400, 'INVALID_FILE_TYPE'))
    }
  },
})

export const uploadMiddleware: RequestHandler = upload.single('image')
