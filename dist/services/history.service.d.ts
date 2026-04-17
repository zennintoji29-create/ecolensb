import { ScanHistoryRecord, ScanHistoryStats, PlasticType, RecyclabilityLabel } from '../types/scan.types';
interface SaveScanPayload {
    plasticType: PlasticType;
    confidenceScore: number;
    biodegradableProbability: number;
    recyclabilityLabel: RecyclabilityLabel;
}
export declare function saveScan(userId: string, payload: SaveScanPayload): Promise<string>;
export declare function getUserHistory(userId: string, page: number, limit: number): Promise<{
    scans: ScanHistoryRecord[];
    total: number;
}>;
export declare function getUserStats(userId: string): Promise<ScanHistoryStats>;
export {};
//# sourceMappingURL=history.service.d.ts.map