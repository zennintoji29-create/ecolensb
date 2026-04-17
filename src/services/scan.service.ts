import * as aiService from './ai.service'
import * as guidanceService from './guidance.service'
import * as historyService from './history.service'
import { ScanResponseDTO } from '../types/scan.types'
import { AppError } from '../types/errors'
import { logger } from '../utils/logger'

export async function processScan(
  userId: string,
  imageBuffer: Buffer
): Promise<ScanResponseDTO> {
  if (!imageBuffer || imageBuffer.length === 0) {
    throw new AppError('No image data received', 400, 'INVALID_FILE')
  }

  logger.info('Processing scan', { userId, bufferSize: imageBuffer.length })

  // 1. Run AI inference
  const prediction = await aiService.predict(imageBuffer)

  // 2. Get static eco guidance
  const guidance = guidanceService.getGuidance(prediction.plasticType)

  // 3. Persist metadata (no raw image stored)
  const scanId = await historyService.saveScan(userId, {
    plasticType: prediction.plasticType,
    confidenceScore: prediction.confidenceScore,
    biodegradableProbability: prediction.biodegradableProbability,
    recyclabilityLabel: guidance.recyclabilityLabel,
  })

  logger.info('Scan complete', {
    scanId,
    plasticType: prediction.plasticType,
    confidence: prediction.confidenceScore,
  })

  return {
    scanId,
    plasticType: prediction.plasticType,
    confidenceScore: prediction.confidenceScore,
    biodegradableProbability: prediction.biodegradableProbability,
    recyclabilityLabel: guidance.recyclabilityLabel,
    guidance,
  }
}
