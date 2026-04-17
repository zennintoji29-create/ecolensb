// ─── Scan Types ─────────────────────────────────────────────────────────────

export type PlasticType = 'PET' | 'HDPE' | 'PVC' | 'LDPE' | 'PP' | 'PS' | 'Other'

export type RecyclabilityLabel =
  | 'Widely Recyclable'
  | 'Check Locally'
  | 'Rarely Recyclable'
  | 'Not Recyclable'

export interface EcoGuidance {
  disposalInstructions: string[]
  environmentalImpact: string
  recyclabilityLabel: RecyclabilityLabel
  decompositionYears: string
}

export interface PredictionResult {
  plasticType: PlasticType
  confidenceScore: number        // 0.0 – 1.0
  biodegradableProbability: number // 0.0 – 1.0
  rawScores: number[]            // length 7, one per class
}

export interface ScanResponseDTO {
  scanId: string
  plasticType: PlasticType
  confidenceScore: number
  biodegradableProbability: number
  recyclabilityLabel: RecyclabilityLabel
  guidance: EcoGuidance
}

export interface ScanHistoryRecord {
  id: string
  plasticType: PlasticType
  confidenceScore: number
  biodegradableProbability: number
  recyclabilityLabel: RecyclabilityLabel
  scannedAt: string
}

export interface ScanHistoryStats {
  totalScans: number
  mostCommonPlastic: PlasticType | null
  averageConfidence: number
  byPlasticType: Record<PlasticType, number>
}
