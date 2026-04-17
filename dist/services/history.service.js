"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveScan = saveScan;
exports.getUserHistory = getUserHistory;
exports.getUserStats = getUserStats;
const supabase_1 = require("../config/supabase");
const errors_1 = require("../types/errors");
const logger_1 = require("../utils/logger");
const TABLE = 'scan_history';
async function saveScan(userId, payload) {
    const { data, error } = await supabase_1.supabaseAdmin
        .from(TABLE)
        .insert({
        user_id: userId,
        plastic_type: payload.plasticType,
        confidence_score: payload.confidenceScore,
        biodegradable_prob: payload.biodegradableProbability,
        recyclability_label: payload.recyclabilityLabel,
    })
        .select('id')
        .single();
    if (error) {
        logger_1.logger.error('Failed to save scan to DB', { error: error.message, userId });
        throw new errors_1.AppError('Failed to save scan record', 500, 'DB_ERROR');
    }
    return data.id;
}
async function getUserHistory(userId, page, limit) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await supabase_1.supabaseAdmin
        .from(TABLE)
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('scanned_at', { ascending: false })
        .range(from, to);
    if (error) {
        logger_1.logger.error('Failed to fetch scan history', { error: error.message, userId });
        throw new errors_1.AppError('Failed to fetch scan history', 500, 'DB_ERROR');
    }
    const scans = (data ?? []).map((row) => ({
        id: row.id,
        plasticType: row.plastic_type,
        confidenceScore: row.confidence_score,
        biodegradableProbability: row.biodegradable_prob,
        recyclabilityLabel: row.recyclability_label,
        scannedAt: row.scanned_at,
    }));
    return { scans, total: count ?? 0 };
}
async function getUserStats(userId) {
    const { data, error } = await supabase_1.supabaseAdmin
        .from(TABLE)
        .select('plastic_type, confidence_score')
        .eq('user_id', userId);
    if (error) {
        logger_1.logger.error('Failed to fetch scan stats', { error: error.message, userId });
        throw new errors_1.AppError('Failed to fetch scan statistics', 500, 'DB_ERROR');
    }
    const rows = data ?? [];
    const totalScans = rows.length;
    const plasticTypes = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other'];
    const byPlasticType = plasticTypes.reduce((acc, type) => ({ ...acc, [type]: 0 }), {});
    let totalConfidence = 0;
    rows.forEach((row) => {
        const type = row.plastic_type;
        if (byPlasticType[type] !== undefined)
            byPlasticType[type]++;
        totalConfidence += row.confidence_score;
    });
    const mostCommonPlastic = totalScans > 0
        ? Object.entries(byPlasticType).sort(([, a], [, b]) => b - a)[0][0]
        : null;
    return {
        totalScans,
        mostCommonPlastic,
        averageConfidence: totalScans > 0 ? parseFloat((totalConfidence / totalScans).toFixed(3)) : 0,
        byPlasticType,
    };
}
//# sourceMappingURL=history.service.js.map