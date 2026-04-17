"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuidance = getGuidance;
exports.getRecyclabilityLabel = getRecyclabilityLabel;
const errors_1 = require("../types/errors");
// ─── Static Guidance Mapping ─────────────────────────────────────────────────
// Keys here are used as i18n identifiers on the frontend.
// The guidance service returns English; translations live in client/i18n/locales/.
const GUIDANCE_MAP = {
    PET: {
        disposalInstructions: [
            'Remove the cap and label before recycling',
            'Rinse thoroughly with water to remove food residue',
            'Crush flat to save space in the recycling bin',
            'Place in the blue/dry-waste recycling bin',
            'Do not bag recyclables — loose items only',
        ],
        environmentalImpact: 'PET bottles take approximately 450 years to decompose in landfill and release harmful microplastics into soil and groundwater over time.',
        recyclabilityLabel: 'Widely Recyclable',
        decompositionYears: '450 years',
    },
    HDPE: {
        disposalInstructions: [
            'Empty completely and rinse the container',
            'Check for the HDPE (2) recycling symbol on the bottom',
            'Remove pumps or spray nozzles if they are a different plastic',
            'Place in the dry-waste recycling bin',
        ],
        environmentalImpact: 'HDPE is one of the most recyclable plastics, yet only 30% is actually recycled. When landfilled, it persists for over 100 years.',
        recyclabilityLabel: 'Widely Recyclable',
        decompositionYears: '100+ years',
    },
    PVC: {
        disposalInstructions: [
            'Do NOT place in standard recycling bins — PVC contaminates other recyclables',
            'Check for specialist PVC recycling drop-off points in your area',
            'For small quantities, dispose of in general waste',
            'Never burn PVC — it releases toxic dioxins',
        ],
        environmentalImpact: 'PVC contains harmful additives (phthalates, lead) that leach into the environment. It is very rarely recyclable through mainstream channels.',
        recyclabilityLabel: 'Rarely Recyclable',
        decompositionYears: '100–1,000 years',
    },
    LDPE: {
        disposalInstructions: [
            'Check your local council or supermarket for plastic bag/film drop-off points',
            'Keep dry and clean — wet or contaminated film cannot be recycled',
            'Bundle multiple bags together inside one bag',
            'If no recycling available, dispose in general waste',
        ],
        environmentalImpact: 'LDPE film is a major contributor to ocean pollution as it is lightweight and easily airborne. It can harm marine wildlife when ingested.',
        recyclabilityLabel: 'Check Locally',
        decompositionYears: '10–1,000 years',
    },
    PP: {
        disposalInstructions: [
            'Check local recycling guidelines — PP acceptance varies by municipality',
            'Rinse food containers thoroughly before recycling',
            'Remove foil lids or labels from PP tubs',
            'Place in recycling if accepted locally, otherwise general waste',
        ],
        environmentalImpact: 'Polypropylene is increasingly recyclable but collection infrastructure is inconsistent. In landfill, it breaks down into microplastics within decades.',
        recyclabilityLabel: 'Check Locally',
        decompositionYears: '20–30 years',
    },
    PS: {
        disposalInstructions: [
            'Do NOT place expanded polystyrene (foam) in recycling bins — it jams machinery',
            'Look for dedicated foam drop-off collection points or mail-in programs',
            'Rigid PS (clear food containers) may be accepted — check locally',
            'Reduce use by choosing paper or cardboard alternatives',
        ],
        environmentalImpact: 'Polystyrene foam breaks into tiny beads that persist in the environment for over 500 years and are mistaken for food by wildlife and marine animals.',
        recyclabilityLabel: 'Not Recyclable',
        decompositionYears: '500+ years',
    },
    Other: {
        disposalInstructions: [
            'Check the resin code (number inside the recycling symbol) on the item',
            'Contact your local waste management service for guidance on mixed plastics',
            'If no recycling option, dispose in general waste',
            'Consider reducing use of multi-layer or unidentified plastics',
        ],
        environmentalImpact: 'Mixed or unidentified plastics are typically not recyclable through mainstream channels and persist in the environment for unknown durations.',
        recyclabilityLabel: 'Not Recyclable',
        decompositionYears: 'Unknown',
    },
};
function getGuidance(plasticType) {
    const guidance = GUIDANCE_MAP[plasticType];
    if (!guidance) {
        throw new errors_1.AppError(`No guidance found for plastic type: ${plasticType}`, 500, 'GUIDANCE_NOT_FOUND');
    }
    return guidance;
}
function getRecyclabilityLabel(plasticType) {
    return GUIDANCE_MAP[plasticType].recyclabilityLabel;
}
//# sourceMappingURL=guidance.service.js.map