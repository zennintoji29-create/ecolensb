import { supabaseAdmin } from '../config/supabase'
import { AppError } from '../types/errors'
import { logger } from '../utils/logger'
import {
  ScanHistoryRecord,
  ScanHistoryStats,
  PlasticType,
  RecyclabilityLabel,
} from '../types/scan.types'

const TABLE = 'scan_history'

interface SaveScanPayload {
  plasticType: PlasticType
  confidenceScore: number
  biodegradableProbability: number
  recyclabilityLabel: RecyclabilityLabel
}

export async function saveScan(
  userId: string,
  payload: SaveScanPayload
): Promise<string> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .insert({
      user_id: userId,
      plastic_type: payload.plasticType,
      confidence_score: payload.confidenceScore,
      biodegradable_prob: payload.biodegradableProbability,
      recyclability_label: payload.recyclabilityLabel,
    })
    .select('id')
    .single()

  if (error) {
    logger.error('Failed to save scan to DB', { error: error.message, userId })
    throw new AppError('Failed to save scan record', 500, 'DB_ERROR')
  }

  return data.id
}

export async function getUserHistory(
  userId: string,
  page: number,
  limit: number
): Promise<{ scans: ScanHistoryRecord[]; total: number }> {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabaseAdmin
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('scanned_at', { ascending: false })
    .range(from, to)

  if (error) {
    logger.error('Failed to fetch scan history', { error: error.message, userId })
    throw new AppError('Failed to fetch scan history', 500, 'DB_ERROR')
  }

  const scans: ScanHistoryRecord[] = (data ?? []).map((row) => ({
    id: row.id,
    plasticType: row.plastic_type as PlasticType,
    confidenceScore: row.confidence_score,
    biodegradableProbability: row.biodegradable_prob,
    recyclabilityLabel: row.recyclability_label as RecyclabilityLabel,
    scannedAt: row.scanned_at,
  }))

  return { scans, total: count ?? 0 }
}

export async function getUserStats(userId: string): Promise<ScanHistoryStats> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select('plastic_type, confidence_score')
    .eq('user_id', userId)

  if (error) {
    logger.error('Failed to fetch scan stats', { error: error.message, userId })
    throw new AppError('Failed to fetch scan statistics', 500, 'DB_ERROR')
  }

  const rows = data ?? []
  const totalScans = rows.length

  const plasticTypes: PlasticType[] = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other']
  const byPlasticType = plasticTypes.reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as Record<PlasticType, number>
  )

  let totalConfidence = 0
  rows.forEach((row) => {
    const type = row.plastic_type as PlasticType
    if (byPlasticType[type] !== undefined) byPlasticType[type]++
    totalConfidence += row.confidence_score
  })

  const mostCommonPlastic =
    totalScans > 0
      ? (Object.entries(byPlasticType).sort(([, a], [, b]) => b - a)[0][0] as PlasticType)
      : null

  return {
    totalScans,
    mostCommonPlastic,
    averageConfidence: totalScans > 0 ? parseFloat((totalConfidence / totalScans).toFixed(3)) : 0,
    byPlasticType,
  }
}
