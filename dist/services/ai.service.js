"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModel = loadModel;
exports.predict = predict;
const logger_1 = require("../utils/logger");
// ─── Mock AI Service ─────────────────────────────────────────────────────────
// Deterministic mock based on buffer properties.
// Returns consistent predictions for the same image.
// Replace this file with the real TF.js implementation when the model is ready.
const PLASTIC_CLASSES = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other'];
// Biodegradable probabilities per class (scientific estimates)
const BIO_PROBS = {
    PET: 0.12,
    HDPE: 0.10,
    PVC: 0.05,
    LDPE: 0.10,
    PP: 0.08,
    PS: 0.04,
    Other: 0.15,
};
let modelReady = false;
async function loadModel() {
    // Simulate model load time
    await new Promise((resolve) => setTimeout(resolve, 200));
    modelReady = true;
    logger_1.logger.info('AI model loaded (mock mode — swap ai.service.ts for TF.js production model)');
}
async function predict(imageBuffer) {
    if (!modelReady) {
        // Auto-initialize in dev if loadModel wasn't called explicitly
        await loadModel();
    }
    // Deterministic index from buffer checksumming
    const sum = imageBuffer.reduce((acc, byte) => acc + byte, 0);
    const index = sum % 7;
    // Confidence: deterministic range 0.72–0.99
    const confidence = 0.72 + (imageBuffer[0] % 28) / 100;
    const plasticType = PLASTIC_CLASSES[index];
    // Build raw scores array — winning class gets confidence, others get small noise
    const rawScores = PLASTIC_CLASSES.map((_, i) => i === index ? confidence : Math.abs(Math.sin(imageBuffer[i % imageBuffer.length] + i)) * 0.08);
    logger_1.logger.info('Mock prediction complete', { plasticType, confidence: confidence.toFixed(3) });
    return {
        plasticType,
        confidenceScore: parseFloat(confidence.toFixed(3)),
        biodegradableProbability: BIO_PROBS[plasticType],
        rawScores,
    };
}
//# sourceMappingURL=ai.service.js.map