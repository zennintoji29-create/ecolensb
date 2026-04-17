export type PlasticType = 'PET' | 'HDPE' | 'PVC' | 'LDPE' | 'PP' | 'PS' | 'Other';
export type RecyclabilityLabel = 'Widely Recyclable' | 'Check Locally' | 'Rarely Recyclable' | 'Not Recyclable';
export interface EcoGuidance {
    disposalInstructions: string[];
    environmentalImpact: string;
    recyclabilityLabel: RecyclabilityLabel;
    decompositionYears: string;
}
export interface PredictionResult {
    plasticType: PlasticType;
    confidenceScore: number;
    biodegradableProbability: number;
    rawScores: number[];
}
export interface ScanResponseDTO {
    scanId: string;
    plasticType: PlasticType;
    confidenceScore: number;
    biodegradableProbability: number;
    recyclabilityLabel: RecyclabilityLabel;
    guidance: EcoGuidance;
}
export interface ScanHistoryRecord {
    id: string;
    plasticType: PlasticType;
    confidenceScore: number;
    biodegradableProbability: number;
    recyclabilityLabel: RecyclabilityLabel;
    scannedAt: string;
}
export interface ScanHistoryStats {
    totalScans: number;
    mostCommonPlastic: PlasticType | null;
    averageConfidence: number;
    byPlasticType: Record<PlasticType, number>;
}
//# sourceMappingURL=scan.types.d.ts.map